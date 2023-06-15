window.onload = () => {
    console.log('비밀번호 재설정 페이지 로딩확인')
}

async function handlePasswordReset() {
    const email = document.getElementById('email').value;

    const response = await fetch(`${backend_base_url}/user/password/reset/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email
        })
    })

    const response_json = await response.json()

    if (response.status == 200) {
        alert('이메일로 비밀번호 재설정 링크가 전송되었습니다.')
        // window.location.replace(`${frontend_base_url}/user/login.html`);
    } else {
        console.log(response_json)
        alert("잘못된 이메일입니다. 다시 입력해주세요.")
    }
}