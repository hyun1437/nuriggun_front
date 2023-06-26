async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${backend_base_url}/user/login/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
    
    if (response.status == 200) {
        // access,refresh 토큰 데이터 json으로 받기
        const response_json = await response.json();

        // 로컬 스토리지에 jwt 토큰 저장하기
        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);
        console.log(response_json);

        // payload로 저장하기 
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        localStorage.setItem("payload", jsonPayload);

        alert('로그인 되었습니다.')
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert("이메일 혹은 비밀번호가 틀렸습니다.")
    }
}

// 카카오 버튼 클릭시 카카오 로그인 API를 호출하는 함수
function kakaoLogin(){
    const kakao_api ='b4640364ec9206e20fd092f6967d430c'
    const redirect_uri = "https://teamnuri.xyz/user/kakaocode.html"  // 카카오에 등록된 리다이렉트 URI 배포때 변경해야됨
    // 사용자를 카카오 인증 페이지로 리다이렉트
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_api}&redirect_uri=${redirect_uri}&response_type=code`
}

// 콜백 URL에서 인증 코드를 추출하는 함수 !!**중요**!! 이 함수를 바디에 onload = "getKakaoCode()"형태로 넣어줘야함
function getKakaoCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');  // URL에서 code 파라미터를 가져옴
    if (code !== null) {
        KakaoLoginApi(code);  // 인증 코드가 있으면 API 호출
    }
}

// 인증 코드를 사용하여 로그인 API를 호출하는 함수
async function KakaoLoginApi(kakao_code) {
    // 서버에 로그인 요청
    const response = await fetch(`${backend_base_url}/user/kakao/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"code":kakao_code}),  // 인증 코드를 JSON 형식으로 전송
    })

    // 서버 응답 처리
    if (response.status === 200) {  // 성공적인 응답일때
        const response_json = await response.json()  // 응답 본문을 JSON으로 파싱
        localStorage.setItem("access", response_json.access);   // 액세스 토큰을 로컬 저장소에 저장
        localStorage.setItem("refresh", response_json.refresh);  // 리프레시 토큰을 로컬 저장소에 저장
        // JWT 토큰에서 payload를 추출하여 로컬 저장소에 저장
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(function (c) {
                return '%' + (
                    '00' + c.charCodeAt(0).toString(16)
                ).slice(-2);
            }).join('')
        );
        localStorage.setItem("payload", jsonPayload);
        history.replaceState(null, null, window.location.pathname);  // URL에서 code 파라미터를 제거
        window.location.replace(`${frontend_base_url}/index.html`);
    } else { 
        const error = await response.json()  // 응답 본문을 JSON으로 파싱
        alert(error['error'])  // 에러 메시지를 알림
        window.history.back()  // 이전 페이지로 이동
    }
}