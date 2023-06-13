window.onload = () => {
    console.log('회원가입 페이지 로딩확인')
    console.log(backend_base_url)
}

async function handleSignUp() {
    const email = document.getElementById("email").value
    const nickname = document.getElementById("nickname").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    
    console.log(email, nickname, password, password2)
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
            alert("이메일로 인증링크가 전송되었습니다")
        } else {
            const response_json = await response.json()
            console.log(response_json)
            alert(response.statusText)
        }
    } else {
        alert("비밀번호가 일치하지 않습니다")
    } 
}