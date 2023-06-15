// 최종 테스트 후 console.log 지우기
console.log('게시글 상세 페이지 연결 확인')

window.onload = () => {
    // const urlParams = new URLSearchParams(window.location.search).get('article_id');
    articleDetail();
    loadComments();
}


const article_id = new URLSearchParams(window.location.search).get('article_id');
console.log(article_id)
const logined_id = parseInt(payload_parse.user_id);
console.log(logined_id)


// 게시글 공유하기(현재 페이지 URL 복사하기)
function articleShare() {
    // 현재 페이지 URL 가져오기
    const currentUrl = window.location.href;

    // 클립보드에 URL 복사하기
    navigator.clipboard.writeText(currentUrl)
        .then(() => {
            alert("URL이 복사되었습니다.")
            console.log('URL이 복사되었습니다.');
        })
        .catch((error) => {
            alert("URL 복사에 실패했습니다.")
            console.error('URL 복사에 실패했습니다.', error);
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
    } else {
        alert("스크랩을 진행할 수 없습니다.")
    }
}


// 게시글 수정하기
async function articleUpdate() {
    const response = await fetch(`${backend_base_url}/article/${article_id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify(updatedArticle),
        method: 'PATCH',
    });

    if (response.status == 200) {
        alert("게시글을 수정했습니다.")
        window.location.reload()
    } else {
        alert("게시글 작성자만 수정할 수 있습니다.")
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
        console.log(response)
        console.log(article_id)

        if (response.status == 204) {
            alert("게시글을 삭제하였습니다.")
            window.location.replace(`${frontend_base_url}/base/index.html`);
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
    console.log(response)

    if (response.status == 200) {
        const response_json = await response.json();
        const article_user_id = response_json.user.pk;

        const articleUpdateButton = document.getElementById('article-update-button');
        const articleDeleteButton = document.getElementById('article-delete-button');
        const articleSubscribeButton1 = document.getElementById('subscribeButton1');
        isSubscribed(article_user_id);

        // 게시글 작성자가 로그인한 유저일 경우 수정, 삭제 버튼 보이게 함.(+ 작성자 구독 버튼 안보이게 진행)
        if (article_user_id === logined_id) {
            articleUpdateButton.style.display = 'block';
            articleDeleteButton.style.display = 'block';
            articleSubscribeButton1.style.display = 'none';
        } else {
            articleUpdateButton.style.display = 'none';
            articleDeleteButton.style.display = 'none';
            articleSubscribeButton1.style.display = 'block';
        }

        const articleTitle = document.getElementById('article-title');
        const articleImage = document.getElementById('article-image');
        const articleContent = document.getElementById('article-content');
        const articleUser = document.getElementById('article-user');

        if (articleTitle !== null) {
            articleTitle.innerText = response_json.title;
        }
        if (articleImage !== null) {
            articleImage.src = `${backend_base_url}${response_json.image}`;
        }
        if (articleContent !== null) {
            articleContent.innerText = response_json.content;
        }
        if (articleUser !== null) {
            articleUser.innerText = response_json.user.nickname;
        }

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
    }
}


// 구독 등록 및 취소
async function postSubscribe() {
    const response = await fetch(`${backend_base_url}/user/subscribe/${article_id}/`, {
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
    console.log(response)

    if (response.ok) {
        const subscribes = await response.json();
        const ids = subscribes.subscribe[0].subscribe.map(subscribe => parseInt(subscribe.id));
        const intsubscribe_id = parseInt(article_user_id)
        const isSubscribeExists = ids.includes(intsubscribe_id);
        if (isSubscribeExists) {
            document.getElementById('subscribeButton1').innerText = '구독 중'
        } else {
            document.getElementById('subscribeButton1').innerText = '구독'
        }
    } else {
        console.error('Failed to load subscribes:', response.status);
    }
}


// 게시글 반응 5종
async function handleArticleReaction(reactionType) {
    const selectreaction = document.getElementById(`reaction-${reactionType}-button`).getAttribute('class');
    console.log(selectreaction)

    const data = { "reaction": selectreaction };
    console.log(data)

    const response = await fetch(`${backend_base_url}/article/${article_id}/reaction/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify(data),
        method: 'POST',
    })
    console.log(response)

    if (response.status == 200) {
        alert(`${reactionType} 반응을 취소했습니다.`)

        window.location.reload()
    } else if (response.status == 201) {
        alert(`${reactionType} 반응을 눌렀습니다.`)

        window.location.reload()
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