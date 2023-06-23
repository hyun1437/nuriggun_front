// 최종 테스트 후 console.log 지우기
console.log('프로필 페이지 연결 확인')

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    Profile(urlParams);
    loadArticles(urlParams);
    isSubscribed()
    loadScraps()
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
                profileImage.src = `${noProfileImage}`; // 프로필 이미지 없을 시 기본 이미지로 보이게 설정
            }
        }

        // 프로필 정보
        const userNickName = document.getElementsByClassName('user-nickname'); // 값을 2번 사용하기 위해 Id 에서 ClassName으로 변경

        for (let i = 0; i < userNickName.length; i++) {
            const userNicknameElement = userNickName[i];
            userNicknameElement.innerText = response_json.nickname;
        }

        const userEmail = document.getElementById('user-email');
        const userInterest = document.getElementById('user-interest');

        if (userEmail !== null) {
            userEmail.innerText = response_json.email
        }

        if (userInterest !== null) {
            userInterest.innerText = response_json.interest
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
            document.getElementById('subscribeButton').style.display = "block";
        } else {
            document.getElementById('user-edit').style.display = "block";
            document.getElementById('user-password-reset').style.display = "block";
            document.getElementById('user-delete').style.display = "block";
            document.getElementById('subscribeButton').style.display = "none";
        }
    }
}


// 프로필 페이지의 유저가 작성한 글 목록
async function loadArticles(user_id) {
    const response = await fetch(`${backend_base_url}/article/list/${user_id}`, {
        method: 'GET',
    });

    if (response.status == 200) {
        const articles = await response.json();
        console.log(articles.length);
        // console.log(response_json[0].title);

        // 작성한 게시글 개수
        const articlesCount = document.getElementById('article-list-count');

        if (articlesCount !== null) {
            articlesCount.innerText = ` (${articles.length})`;
        }

        // 작성한 게시글
        const articleList = document.getElementById('article-list');
        articleList.innerHTML = ''; // 작성 게시글 목록 초기화

        const startIndex = (currentPage - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        const currentArticles = articles.slice(startIndex, endIndex);
        console.log(currentArticles)

        if (currentArticles !== null) {
            for (let i = 0; i < currentArticles.length; i++) {
                const article = currentArticles[i];
                const listItem = document.createElement('a');
                const articleContainer = document.createElement('div');

                const articleId = document.createElement('a'); // 글 번호
                articleId.innerText = article.id;
                articleId.classList.add('articleId'); // articleId CSS 적용을 위해 클래스 추가

                const category = document.createElement('a'); // 글 카테고리
                category.innerText = article.category;
                category.href = `../user/article_list.html?category=${article.category}`  // 카테고리 링크
                category.classList.add('category'); // category CSS 적용을 위해 클래스 추가

                const title = document.createElement('a'); // 글 제목
                title.innerText = article.title;
                console.log(title)
                title.href = `../article/detail.html?article_id=${article.id}`  // 글 링크
                title.classList.add('title'); // title CSS 적용을 위해 클래스 추가

                const createAt = document.createElement('span'); // 글 작성일
                createAt.innerText = article.created_at;
                createAt.classList.add('createdAt'); // createdAt CSS 적용을 위해 클래스 추가

                const reaction = document.createElement('span'); // 글 반응 5종
                const totalReactions = Object.values(article.reaction).reduce((sum, value) => sum + value, 0);
                reaction.innerText = `총 반응 수 ${totalReactions}`;
                reaction.classList.add('reaction'); // reaction CSS 적용을 위해 클래스 추가

                articleContainer.appendChild(articleId);
                articleContainer.appendChild(category);
                articleContainer.appendChild(title);
                articleContainer.appendChild(createAt);
                articleContainer.appendChild(reaction);
                listItem.appendChild(articleContainer);
                articleList.appendChild(listItem);
            }
        }
        // 페이지네이션 생성
        renderPagination(articles.length, articlesPerPage);
    }
}


// 프로필 페이지의 유저가 스크랩한 글 목록
async function loadScraps() {
    const response = await fetch(`${backend_base_url}/article/scrap/`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
    });
    // const response_json = await response.json();

    console.log(response)
    // console.log(response_json);


    if (response.status == 200) {
        const scraps = await response.json();
        console.log(scraps);
        // console.log(response_json[0].title);

        // 스크랩한 게시글 개수
        const scrapsCount = document.getElementById('article-scrap-list-count');

        if (scrapsCount !== null) {
            scrapsCount.innerText = ` (${scraps.length})`;
        }

        // 스크랩한 게시글
        const scrapList = document.getElementById('scrap-article-list');
        scrapList.innerHTML = '';

        const startIndex1 = (scrapCurrentPage - 1) * scrapsPerPage;
        const endIndex1 = startIndex1 + scrapsPerPage;
        const currentScraps = scraps.slice(startIndex1, endIndex1);
        console.log(currentScraps)

        if (currentScraps !== null) {
            for (let i = 0; i < currentScraps.length; i++) {
                const article = currentScraps[i];
                const listItem = document.createElement('a');
                const scrapArticleContainer = document.createElement('div');

                const articleId = document.createElement('a'); // 글 번호
                articleId.innerText = article.id;
                articleId.classList.add('articleId'); // articleId CSS 적용을 위해 클래스 추가

                const category = document.createElement('a'); // 글 카테고리
                category.innerText = article.category;
                category.href = `../user/article_list.html?category=${article.category}`
                category.classList.add('category');

                const title = document.createElement('a'); // 글 제목
                title.innerText = article.title;
                title.href = `../article/detail.html?article_id=${article.id}`
                title.classList.add('title');

                const author = document.createElement('a'); // 글 작성자
                author.innerText = article.user.nickname;
                author.href = `../user/profile_page.html?user_id=${article.user.pk}`
                author.classList.add('author');

                const createAt = document.createElement('span'); // 글 작성일
                createAt.innerText = article.created_at;
                createAt.classList.add('createdAt');

                scrapArticleContainer.appendChild(articleId);
                scrapArticleContainer.appendChild(category);
                scrapArticleContainer.appendChild(title);
                scrapArticleContainer.appendChild(createAt);
                scrapArticleContainer.appendChild(author);
                listItem.appendChild(scrapArticleContainer);
                scrapList.appendChild(listItem);
            }
        }
        renderScrapPagination(scraps.length, scrapsPerPage);
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
            document.getElementById('subscribeButton').innerText = '🌟 구독 중'
        } else {
            document.getElementById('subscribeButton').innerText = '⭐ 구독하기'
        }
    } else {
        console.error('Failed to load subscribes:', response.status);
    }
}