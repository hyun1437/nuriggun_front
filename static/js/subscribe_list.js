
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    Subscribe(urlParams);
}


const article_id = new URLSearchParams(window.location.search).get('article_id');
const userInfo = payload_parse || defaultUser; // 로그인하지 않았을 때 defaultUser 값 불러오기
const logined_id = userInfo.user_id;
const user_id = parseInt(new URLSearchParams(window.location.search).get('user_id'));


// 프로필 페이지의 유저가 구독한 사람 목록
async function Subscribe(user_id) {
    // 프로필 페이지의 유저 정보 가져오기
    const profile = await fetch(`${backend_base_url}/user/profile/${user_id}`);
    const profileUser = await profile.json();

    const profileUserNickname = document.getElementById('profile-page-user')
    profileUserNickname.innerText = `${profileUser.nickname} 기자의 구독 목록`;

    // 프로필 페이지의 구독 정보 가져오기
    const response = await fetch(`${backend_base_url}/user/subscribe/${user_id}`, {
        method: 'GET',
    });

    if (response.status == 200) {
        const response_json = await response.json();
        const subscribeList = document.getElementById('subscribe-list');
        const subscribe = response_json.subscribe[0]?.subscribe;

        if (subscribe && subscribe.length > 0) {
            subscribe.forEach(subscribe => {
                const subscribeProfileImage = subscribe.profile_image;
                const subscribeNickname = subscribe.nickname;
                const subscribeId = subscribe.id;

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

                // 구독 버튼 추가
                const subscribeButton = document.createElement('button');
                subscribeButton.innerText = '🌟 구독 중';
                subscribeButton.classList.add('subscribe-button3');

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
    if (confirm("구독을 취소하시겠습니까?")) {
        const button = document.getElementById("subscribeButton");
        const response = await fetch(`${backend_base_url}/user/subscribe/${subscribeId}/`, {
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: 'POST',
        })

        if (response.status == 205) {
            alert("구독을 취소하였습니다.")
            window.location.reload()
        } else {
            alert("구독을 진행 할 수 없습니다.")
        }
    }
}