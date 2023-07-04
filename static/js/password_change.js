
// 비밀번호 변경 버튼
async function handlePasswordChange() {
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const user_id = payload_parse.user_id

    const response = await fetch(`${backend_base_url}/user/password/change/${user_id}/`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        method: 'PUT',
        body: JSON.stringify({
            "password": password,
            "password2": password2
        })
    })

    const response_json = await response.json()

    if (response.status == 200) {
        alert('비밀번호를 변경했습니다.')
        window.location.replace(`${frontend_base_url}/user/profile_page.html?user_id=${payload_parse.user_id}`);
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