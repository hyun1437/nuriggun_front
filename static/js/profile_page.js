// 최종 테스트 후 console.log 지우기
console.log('프로필 페이지 연결 확인')

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    Profile(urlParams);
    loadArticles(urlParams);
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

        // 구독자 수
        const userSubscribe = document.getElementById('user-subscribe');

        if (userSubscribe !== null) {
            userSubscribe.innerText = `구독자 수: ${response_json.subscribe_count}`;
            userSubscribe.href = `../user/subscribe_list.html?user_id=${user_id}`;
        }
    }
}


// 프로필 페이지의 유저가 작성한 글 목록
async function loadArticles(user_id) {
    const response = await fetch(`${backend_base_url}/article/list/${user_id}`, {
        method: 'GET',
    });

    if (response.status == 200) {
        const response_json = await response.json();
        // console.log(response_json);
        // console.log(response_json[0].title);

        // 작성한 게시글
        const articleList = document.getElementById('article-list');

        if (articleList !== null) {
            for (let i = 0; i < response_json.length; i++) {
                const article = response_json[i];
                const listItem = document.createElement('li');
                const articleContainer = document.createElement('div');

                const link = document.createElement('a');
                link.href = article.link;  // 글 링크
                link.innerText = article.title;  // 글 제목

                const createAt = document.createElement('span'); // 글 작성일
                createAt.innerText = article.created_at;

                articleContainer.appendChild(link);
                articleContainer.appendChild(createAt);
                listItem.appendChild(articleContainer);
                articleList.appendChild(listItem);
            }
        }
    }
}
