
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

    const response_json = await response.json()

    if (response.status == 200) {
        alert('비밀번호 재설정이 완료되었습니다.')
        window.location.replace(`${frontend_base_url}/user/login.html`);
    } else if (response.status == 401) {
        alert("유효하지 않은 링크입니다.")
    } else {
        let errorMessages = ''
        if (response_json.password) {
            errorMessages += response_json.password[0] + '\n'
        }
        if (response_json.password2) {
            errorMessages += response_json.password2[0] + '\n'
        }
        if (response_json.non_field_errors
            ) {
            errorMessages += response_json.non_field_errors
            [0] + '\n'
        }
        alert(errorMessages)
    }
}