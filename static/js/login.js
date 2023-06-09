window.onload = () => {
    console.log('로그인 페이지 로딩확인')
}

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
        window.location.replace(`${frontend_base_url}/base.html/index.html`);
    } else {
        alert("이메일 혹은 비밀번호가 틀렸습니다.")
    }
}
