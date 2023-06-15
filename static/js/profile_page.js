// 최종 테스트 후 console.log 지우기
console.log('프로필 페이지 연결 확인')

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    Profile(urlParams);
    loadArticles(urlParams);
    isSubscribed()
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

        // 해당 프로필 페이지가 로그인 한 유저의 페이지일 때 보이게 하기 - 회원 탈퇴, 비밀번호 변경, 수정하기
        if (user_id != logined_id) {
            document.getElementById('user-edit').style.display = "none";
            document.getElementById('user-password-reset').style.display = "none";
            document.getElementById('user-delete').style.display = "none";
        } else {
            document.getElementById('user-edit').style.display = "block";
            document.getElementById('user-password-reset').style.display = "block";
            document.getElementById('user-delete').style.display = "block";
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
                link.href = `../article/detail.html?article_id=${article.id}`  // 글 링크             
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


// 회원 탈퇴
async function DeleteUser() {
    const delConfirm = confirm("정말 회원 탈퇴를 진행하시겠습니까?")
    const token = localStorage.getItem("access")
    const password = document.getElementById("password").value

    if (delConfirm) {
        const response = await fetch(`${backend_base_url}/user/profile/${user_id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                "password": password
            })
        });

        if (response.status == 200) {
            const data = await response.json();
            alert("탈퇴 완료!")
            location.assign('login.html')

        } else if (response.status == 400) {
            const data = await response.json();
            alert("비밀번호를 확인해주세요.");

        } else {
            alert("탈퇴 실패!")
        }
    }
}

// 회원 탈퇴 폼
function toggleDeleteForm() {
    var deleteForm = document.getElementById("delete-form");
    if (deleteForm.style.display == "none") {
        deleteForm.style.display = "block";
    } else {
        deleteForm.style.display = "none";
    }
}


// 구독 등록 및 취소
async function postSubscribe() {
    const button = document.getElementById("subscribeButton");
    const response = await fetch(`${backend_base_url}/user/subscribe/${user_id}/`, {
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

// 구독 여부 확인
async function isSubscribed() {
    const response = await fetch(`${backend_base_url}/user/subscribe/${logined_id}`, {
        method: 'GET',
    });

    if (response.ok) {
        const subscribes = await response.json();
        // console.log(subscribes.subscribe[0].subscribe)
        // console.log(subscribes.subscribe[0].subscribe[0].id)
        const ids = subscribes.subscribe[0].subscribe.map(subscribe => parseInt(subscribe.id));
        // console.log(ids)
        const intsubscribe_id = parseInt(user_id)
        // console.log(intsubscribe_id)
        const isSubscribeExists = ids.includes(intsubscribe_id);
        // console.log(isSubscribeExists)
        if (isSubscribeExists) {
            document.getElementById('subscribeButton').innerText = '구독 중'
        } else {
            document.getElementById('subscribeButton').innerText = '구독'
        }
    } else {
        console.error('Failed to load subscribes:', response.status);
    }
}