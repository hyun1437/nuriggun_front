// 최종 테스트 후 console.log 지우기
// console.log('게시글 상세 페이지 연결 확인')

window.onload = () => {
    // const urlParams = new URLSearchParams(window.location.search).get('article_id');
    articleDetail();
    loadComments();
}


const article_id = new URLSearchParams(window.location.search).get('article_id');

const userInfo = payload_parse || defaultUser; // 로그인하지 않았을 때 defaultUser 값 불러오기

const logined_id = userInfo.user_id;

const loginedNickname = document.getElementById('logined-nickname');
const loginedProfileImg = document.getElementById('logined-profile-img');

if (loginedNickname !== null) {
    loginedNickname.innerText = userInfo.nickname;
}

if (loginedProfileImg !== null) {
    if (userInfo.profile_img) {
        loginedProfileImg.src = `${backend_base_url}${payload_parse.profile_img}`;
    } else {
        loginedProfileImg.src = `${noProfileImage}`; // 프로필 이미지 없을 시 기본 이미지로 보이게 설정
    }
}


// 게시글 공유하기(현재 페이지 URL 복사하기)
function articleShare() {
    // 현재 페이지 URL 가져오기
    const currentUrl = window.location.href;

    // 클립보드에 URL 복사하기
    navigator.clipboard.writeText(currentUrl)
        .then(() => {
            alert("URL이 복사되었습니다.")
        })
        .catch((error) => {
            alert("URL 복사에 실패했습니다.")
        });
}


// 게시글 스크랩(북마크)
async function articleScrap() {
    const response = await fetch(`${backend_base_url}/article/${article_id}/scrap/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
    })

    if (response.status == 200) {
        alert("스크랩을 했습니다.")
        window.location.reload()
    } else if (response.status == 202) {
        alert("스크랩을 취소했습니다.")
        window.location.reload()
    } else if (response.status == 401) {
        alert("로그인 후 진행 바랍니다.")
    } else {
        alert("스크랩을 진행할 수 없습니다.")
    }

}


// 게시글 삭제하기
async function articleDelete() {
    if (confirm("정말 게시글을 삭제하시겠습니까?")) {
        const response = await fetch(`${backend_base_url}/article/${article_id}/`, {
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: 'DELETE',
        });

        if (response.status == 204) {
            alert("게시글을 삭제하였습니다.")
            window.location.replace(`${frontend_base_url}/index.html`);
        } else {
            alert("게시글 작성자만 삭제할 수 있습니다.")
        }
    }
}


// 게시글 상세 페이지
async function articleDetail() {
    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        method: 'GET',
    });

    if (response.status == 200) {
        const response_json = await response.json();
        const article_user_id = response_json.user.pk;
        const articleUpdateButton = document.getElementById('article-update-button');
        const articleDeleteButton = document.getElementById('article-delete-button');
        const subscribeButton1 = document.getElementById('subscribe-button1');
        const articleScrapButton = document.getElementById('article-scrap-button')
        isSubscribed(article_user_id);

        // 게시글 작성자가 로그인한 유저일 경우 수정, 삭제 버튼 보이게 함.(+ 작성자 구독 버튼 안보이게 진행)
        if (article_user_id === logined_id) {
            articleUpdateButton.style.display = 'block';
            articleDeleteButton.style.display = 'block';
            subscribeButton1.style.display = 'none';
        } else if (logined_id === null) {
            articleUpdateButton.style.display = 'none';
            articleDeleteButton.style.display = 'none';
            subscribeButton1.style.display = 'none';
            articleScrapButton.style.display = 'none';
        } else {
            articleUpdateButton.style.display = 'none';
            articleDeleteButton.style.display = 'none';
            subscribeButton1.style.display = 'block';
        }

        const articleSummary = document.getElementById('article-content-summary');
        const articleTitle = document.getElementById('article-detail-title');
        const articleCategory = document.getElementById('article-category');
        const articleCreatedAt = document.getElementById('article-created-at');
        const articleUpdatedAt = document.getElementById('article-updated-at');
        const articleImage = document.getElementById('article-image');
        const articleImageContent = document.getElementById('article-image-content');
        const articleContent = document.getElementById('article-content');
        const articleUserNickname = document.getElementsByClassName('article-user-nickname');
        const articleUserEmail = document.getElementsByClassName('article-user-email');
        const articleCommentsCount = document.getElementById('article-comments-count');

        if (response_json.summary != '') {
            articleSummary.innerText = "AI가 요약한 기사 내용:\n" + response_json.summary;
        }
        articleTitle.innerText = response_json.title;
        articleCategory.innerText = response_json.category;
        articleCreatedAt.innerText = response_json.created_at;

        if (response_json.updated_at !== response_json.created_at) {
            articleUpdatedAt.innerText = ` | 수정 ${response_json.updated_at}`;
        } else {
            articleUpdatedAt.innerText = "";
        }

        articleImage.src = `${backend_base_url}${response_json.image}`;
        articleContent.innerText = response_json.content;
        articleImageContent.innerText = response_json.image_content;

        for (let i = 0; i < articleUserNickname.length; i++) {
            const articleUserNicknameElement = articleUserNickname[i];
            articleUserNicknameElement.innerText = response_json.user.nickname;
        }

        for (let i = 0; i < articleUserEmail.length; i++) {
            const articleUserEmailElement = articleUserEmail[i];
            articleUserEmailElement.innerText = response_json.user.emial;
        }

        articleCommentsCount.innerText = `(${response_json.comments_count})`;

        const reactionCounts = ['good', 'great', 'sad', 'angry', 'subsequent'];

        reactionCounts.forEach(reaction => {
            const count = response_json.reaction[reaction];
            if (count !== null) {
                const element = document.getElementById(`${reaction}-count`);
                if (element) {
                    element.innerText = count;
                }
            }
        });

        // 게시글 수정 진행 시 기존 값 가져오기 위한 설정
        const originalTitle = response_json.title;
        const originalCategory = response_json.category;
        const originalImage = `${backend_base_url}${response_json.image}`;
        const originalImageContent = response_json.image_content;

        const originalContent = response_json.content;

        sessionStorage.setItem('article-title', originalTitle);
        sessionStorage.setItem('article-category', originalCategory);
        sessionStorage.setItem('article-image', originalImage);
        sessionStorage.setItem('article-image-content', originalImageContent);
        sessionStorage.setItem('article-content', originalContent);

        const articleCategoryUrl = document.getElementById('article-category-url');
        const articleCategoryLink = `../article/article_list.html?category=${response_json.category}`;
        articleCategoryUrl.href = articleCategoryLink

        const articleUserUrl = document.getElementById('article-user-url');
        const articleUserLink = `../user/profile_page.html?user_id=${article_user_id}`;
        articleUserUrl.href = articleUserLink
    }
}


// 구독 등록 및 취소
async function postSubscribe() {
    const response1 = await fetch(`${backend_base_url}/article/${article_id}`, {
        method: 'GET',
    });
    const response1_json = await response1.json();
    const article_user_id = response1_json.user.pk

    const response = await fetch(`${backend_base_url}/user/subscribe/${article_user_id}/`, {
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
async function isSubscribed(article_user_id) {
    const response = await fetch(`${backend_base_url}/user/subscribe/${logined_id}`, {
        method: 'GET',
    });

    if (response.ok) {
        const subscribes = await response.json();
        const ids = subscribes.subscribe[0].subscribe.map(subscribe => parseInt(subscribe.id));
        const intsubscribe_id = parseInt(article_user_id)
        const isSubscribeExists = ids.includes(intsubscribe_id);
        if (isSubscribeExists) {
            document.getElementById('subscribe-button1').innerText = '🌟 구독 중'
        } else {
            document.getElementById('subscribe-button1').innerText = '⭐ 구독하기'
        }
    } else {
        console.error('Failed to load subscribes:', response.status);
    }
}


// 게시글 반응 5종
async function handleArticleReaction(reactionType) {
    const selectreaction = document.getElementById(`reaction-${reactionType}-button`).getAttribute('class');

    const data = { "reaction": selectreaction };

    const response = await fetch(`${backend_base_url}/article/${article_id}/reaction/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify(data),
        method: 'POST',
    })

    if (response.status == 200) {
        alert(`${reactionType} 반응을 취소했습니다.`)
        window.location.reload()
    } else if (response.status == 201) {
        alert(`${reactionType} 반응을 눌렀습니다.`)
        window.location.reload()
    } else if (response.status == 401) {
        alert("로그인 후 진행 바랍니다.")
    } else {
        alert("다시 눌러보라구요 아시겠어요?!!?!.")
    }
}

const reactionButtons = ['great', 'sad', 'angry', 'good', 'subsequent'];

reactionButtons.forEach(reaction => {
    document.getElementById(`reaction-${reaction}-button`).addEventListener('click', () => {
        handleArticleReaction(reaction);
    });
});
