// 최종 테스트 후 console.log 지우기
console.log('구독자 목록 페이지 연결 확인')

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    Subscribe(urlParams);
}


const user_id = parseInt(new URLSearchParams(window.location.search).get('user_id'));
console.log(user_id)
const logined_id = parseInt(payload_parse.user_id);
console.log(logined_id)


// 프로필 페이지의 유저가 구독한 사람 목록
async function Subscribe(user_id) {
    const response = await fetch(`${backend_base_url}/user/subscribe/${user_id}`, {
        method: 'GET',
    });
    console.log(response)

    if (response.status == 200) {
        const response_json = await response.json();
        const subscribeList = document.getElementById('subscribe-list');
        const subscribe = response_json.subscribe[0]?.subscribe;

        console.log(response_json);
        console.log(response_json.subscribe);


        if (subscribe && subscribe.length > 0) {
            console.log(response_json.subscribe[0].subscribe[0].nickname);
            subscribe.forEach(subscribe => {
                const subscribeProfileImage = subscribe.profile_image;
                const subscribeNickname = subscribe.nickname;
                const subscribeId = subscribe.id;
                console.log(subscribeProfileImage);
                console.log(subscribeNickname);
                console.log(subscribeId);

                const subscribeUser = document.createElement('div');
                subscribeUser.classList.add('user_wrap');

                // 프로필 이미지 박스 생성
                const profileImageBox = document.createElement('div');
                profileImageBox.classList.add('profile_image_box');

                // 프로필 이미지 설정
                const subscribeProfileImageElement = document.createElement('img');
                subscribeProfileImageElement.classList.add('profile_image');
                subscribeProfileImageElement.src = `${backend_base_url}${subscribeProfileImage}`;

                // 프로필 이미지 없을 시 기본 이미지 설정
                subscribeProfileImageElement.onerror = function () { this.src = '../static/image/unknown.png'; };

                // 프로필 이미지에 해당 유저의 프로필 페이지 url 연결
                const userLink = document.createElement('a');
                const profilePageURL = `../user/profile_page.html?user_id=${subscribeId}`;
                userLink.href = profilePageURL;

                // 페이지의 유저가 구독한 닉네임
                const subscribeNicknameElement = document.createElement('div');
                subscribeNicknameElement.classList.add('nickname');
                subscribeNicknameElement.innerText = subscribeNickname;
                console.log('subscribeNickname:', subscribeNickname);

                // 구독 버튼 추가
                const subscribeButton = document.createElement('button');
                subscribeButton.innerText = '구독 취소하기';

                // 버튼 클릭 시 구독 취소
                subscribeButton.addEventListener('click', () => { postSubscribe(subscribeId); });

                // 해당 구독 목록 페이지가 로그인 한 유저의 페이지일 경우만 구독 취소하기 버튼 보이게 하기
                if (user_id != logined_id) {
                    subscribeButton.style.display = "none";
                } else {
                    subscribeButton.style.display = "block";
                }

                profileImageBox.appendChild(subscribeProfileImageElement);
                userLink.appendChild(profileImageBox);

                subscribeUser.appendChild(userLink);
                subscribeUser.appendChild(subscribeNicknameElement);
                subscribeUser.appendChild(subscribeButton);

                subscribeList.appendChild(subscribeUser);
            });
        }
    }
}


// 구독 취소 기능
async function postSubscribe(subscribeId) {
    const button = document.getElementById("subscribeButton");
    const response = await fetch(`${backend_base_url}/user/subscribe/${subscribeId}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
    })

    if (response.status == 200) {
        alert("구독을 하였습니다.")
        window.location.reload()
    } else if (response.status == 205) {
        alert("구독을 취소하였습니다.")
        window.location.reload()
    } else if (response.status == 403) {
        alert("자신을 구독 할 수 없습니다.")
    }
}