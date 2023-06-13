window.onload = () => {
    console.log('비밀번호 재설정 confirm 페이지 로딩확인')
    console.log('로딩하면서 링크의 토큰 유효성을 검사') 
}


// 비밀번호 변경 버튼
async function handlePasswordResetConfirm() {
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const urlParams = new URLSearchParams(window.location.search);
    const uidb64 = urlParams.get('id').replace(/'/g, '').replace('$b', '');
    const token = urlParams.get('token').replace('$', '');
    
    const response = await fetch(`${backend_base_url}/user/password/reset/confirm/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
            "password": password,
            "password2": password2,
            "uidb64": uidb64, 
            "token": token
        })
    })

    if (response.status == 200) {
        alert('비밀번호 재설정이 완료되었습니다.')
        window.location.replace(`${frontend_base_url}/user/login.html`);
    } else if (response.status == 401) {
        alert("유효하지 않은 링크입니다.")

    } else {
        alert("존재하지 않는 회원입니다.")
    }
}