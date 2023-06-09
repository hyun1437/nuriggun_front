window.onload = () => {
    console.log('회원가입 페이지 로딩확인')
}

async function handleSignUp() {
    const email = document.getElementById("email").value
    const nickname = document.getElementById("nickname").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value

    console.log(email, password, password2)
    if (password === password2) {
        const response = await fetch(`${backend_base_url}/user/signup/`, {
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "nickname": nickname,
                "password": password,
            })
        })
        console.log(response)
        if (response.status == 201) {
            alert("이메일로 인증링크가 발송되었습니다")
        } else {
            alert(response.statusText)
        }
    } else {
        alert("비밀번호가 일치하지 않습니다")
    } 
}