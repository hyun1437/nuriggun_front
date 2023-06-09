window.onload = () => {
    console.log('회원가입 페이지 로딩확인')
}

async function handleSignUp() {
    const email = document.getElementById("email").value
    const password1 = document.getElementById("password1").value
    const password2 = document.getElementById("password2").value

    console.log(email, password1, password2)

    const response = await fetch(`${backend_base_url}/user/dj-rest-auth/registration/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password1": password1,
            "password2": password2
        })
    })
    console.log(response)
    if (response.status == 201) {
        alert("이메일로 인증링크가 발송되었습니다")
    } else {
        alert(response.statusText)
    }
}