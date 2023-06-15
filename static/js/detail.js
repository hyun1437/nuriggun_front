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