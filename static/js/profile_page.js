// 최종 테스트 후 console.log 지우기
console.log('프로필 페이지 연결 확인')

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    Profile(urlParams);
}


const user_id = parseInt(new URLSearchParams(window.location.search).get('user_id'));
console.log(user_id)
const logined_id = parseInt(payload_parse.user_id);
console.log(logined_id)


// user_id의 프로필 페이지
async function Profile(user_id) {
    const response = await fetch(`${backend_base_url}/user/profile/${user_id}`, {
        method: 'GET',
    });
    console.log(response)

    if (response.status == 200) {
        const response_json = await response.json();
        console.log(response_json);
        console.log(response_json.profile_img);


        // 프로필 이미지
        const profileImage = document.getElementById('user-profile-image');
        if (profileImage !== null) {
            if (response_json.profile_img) {
                profileImage.src = `${backend_base_url}${response_json.profile_img}`;
            } else {
                profileImage.src = '../static/image/unknown.png'; // 프로필 이미지 없을 시 기본 이미지로 보이게 설정
            }
        }

        // 프로필 정보
        const userNickName = document.getElementById('user-nickname');
        const userEmail = document.getElementById('user-email');
        const userInterest = document.getElementById('user-interest');

        if (userNickName !== null) {
            userNickName.innerText = response_json.nickname
        }

        if (userEmail !== null) {
            const emailElement = document.getElementById('user-email');
            emailElement.innerText = `기자 이메일: ${response_json.email}`;
        }

        if (userInterest !== null) {
            const interestElement = document.getElementById('user-interest');
            interestElement.innerText = `관심 분야: ${response_json.interest}`;
        }
    }
}
