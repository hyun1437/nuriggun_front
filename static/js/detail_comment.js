// 댓글 작성하기
async function postComment() {
    const comment = document.getElementById("comment").value

    const response = await fetch(`${backend_base_url}/article/${article_id}/comment/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify({
            "comment": comment,
        }),
        method: 'POST',
    });
    console.log(response)

    if (response.status == 201) {
        alert("댓글을 등록하였습니다.")
        window.location.reload()
    } else if (comment == '') {
        alert("댓글 내용을 입력해 주세요.")
    }
}


// 댓글 불러오기
async function loadComments() {
    const response = await fetch(`${backend_base_url}/article/${article_id}/comment`);
    console.log(response)
    const comments = await response.json();
    console.log(comments)

    const commentList = document.getElementById('comment-list');
    commentList.innerHTML = ''; // 기존 댓글 목록 초기화

    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const currentComments = comments.slice(startIndex, endIndex);


    currentComments.forEach((comment) => {
        // const commentList = document.getElementById('comment-list');

        // 댓글 수정 버튼 : 로그인한 유저 아이디와 댓글 작성한 유저 아이디가 같을 경우 보이게 진행
        const editbutton = logined_id === comment.user.pk // 조건
            ? `<a href="#" id="editbutton" onclick="showEditForm(${comment.id}); event.preventDefault();">수정</a>` // ? 조건이 참인 경우 실행
            : ''; // : 조건이 거짓인 경우 실행

        // 댓글 삭제 버튼 : 로그인한 유저 아이디와 댓글 작성한 유저 아이디가 같을 경우 보이게 진행
        const deletebutton = logined_id === comment.user.pk
            ? `<a href="#" id="deletebutton" onclick="deleteComment(${comment.id})">삭제</a>`
            : '';

        commentList.insertAdjacentHTML('beforeend', `
        <div id="comment-container-${comment.id}" class="comment-container">
            <div id="comment-container-md">
                ${deletebutton} ${editbutton}         

                <!-- 작성자 / 클릭 시 프로필 페이지로 이동 -->
                <a class="comment-author" href="${frontend_base_url}/user/profile_page.html?user_id=${comment.user.pk}">
                    <span class="profile-img" id="comment-user-profile-img">
                        <img style="width:50px; height:50px; margin-right:5px; border-radius: 50%;"
                            src="${backend_base_url}${payload_parse.profile_img}" alt="No Image"
                            onerror="this.onerror=null; this.src='${noProfileImage}'">
                    </span> <span id="comment-commentauthor">${comment.user.nickname}</span>
                </a>

                <!-- 날짜 / 작성일, 최종일 -->
                <p id="comment-create-month"> ${comment.comment_created_at}</p>          

                <!-- 댓글 내용 -->
                <a id="comment-comment">${comment.comment}</a>

                <!-- 댓글 상태 버튼 / 추천, 비추천, 수정, 삭제  -->
                <div id="comment-info">
                    <a href="#" onclick="commentLike(${comment.id})">👍<span>${comment.like_count}</span></a>
                    <a href="#" onclick="commentHate(${comment.id})">👎<span>${comment.hate_count}</span></a>
                </div>
            </div>
        </div>`);
    });
    // <p>등록 ${comment.comment_created_at} | 수정 ${comment.comment_updated_at}</p>

    // 페이지네이션 생성
    renderPagination(comments.length);
}


// 댓글 페이지 네이션
let currentPage = 1; // 현재 페이지
const commentsPerPage = 5; // 페이지당 댓글 수


// 페이지네이션 생성 함수
function renderPagination(totalComments) {
    const totalPages = Math.ceil(totalComments / commentsPerPage);

    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination-container');

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;

        if (i === currentPage) {
            pageLink.classList.add('active');
        } else {
            pageLink.addEventListener('click', () => {
                currentPage = i;
                loadComments();
            });
        }

        pagination.appendChild(pageLink);
    }
    pagination.appendChild(paginationContainer);
}


// 댓글 수정 폼
async function showEditForm(comment_id) {
    const response = await fetch(`${backend_base_url}/article/${article_id}/comment/`);
    const comments = await response.json();

    const index = comments.findIndex(comment => comment.id === comment_id);

    const commentEditContainer = document.getElementById(`comment-container-${comment_id}`);
    console.log(commentEditContainer)
    commentEditContainer.style.margin = "10px";
    commentEditContainer.style.padding = "20px";
    commentEditContainer.style.backgroundColor = "#f1f1f1";
    commentEditContainer.style.border = "1px solid #ddd";
    commentEditContainer.style.borderRadius = "5px";
    commentEditContainer.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
    commentEditContainer.style.fontSize = "14px";
    commentEditContainer.style.color = "#333";


    // 기존 댓글 내용 가져오기
    const originalComment = comments[index].comment;
    console.log(originalComment)

    // 텍스트 박스 생성
    const editTextarea = document.createElement('textarea');
    editTextarea.value = originalComment;
    editTextarea.classList.add('edit-textarea');

    // 댓글 수정 저장 버튼 생성
    const commentEditSaveButton = document.createElement('button');
    commentEditSaveButton.innerText = '저장';
    commentEditSaveButton.classList.add('comment-save-button');
    commentEditSaveButton.addEventListener('click', async () => {
        const updatedContent = editTextarea.value;
        await updateComment(comment_id, { comment: updatedContent });
    });

    // 댓글 수정 취소 버튼 생성
    const commentEditCancelButton = document.createElement('button');
    commentEditCancelButton.innerText = '취소';
    commentEditCancelButton.classList.add('comment-cancel-button');
    commentEditCancelButton.addEventListener('click', () => {
        commentEditContainer.innerText = originalComment;
        location.reload();
    });

    commentEditContainer.innerText = '';
    commentEditContainer.appendChild(editTextarea);
    commentEditContainer.appendChild(commentEditSaveButton);
    commentEditContainer.appendChild(commentEditCancelButton);
}

// 댓글 수정하기
async function updateComment(comment_id, updatedComment) {
    const response = await fetch(`${backend_base_url}/article/comment/${comment_id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify(updatedComment),
        method: 'PUT',
    });

    if (response.status == 200) {
        alert("댓글을 수정했습니다.")
        window.location.reload()
    } else {
        alert("댓글 작성자만 수정할 수 있습니다.")
    }
}


// 댓글 삭제하기
async function deleteComment(comment_id) {
    if (confirm("정말 댓글을 삭제하시겠습니까?")) {
        const response = await fetch(`${backend_base_url}/article/comment/${comment_id}`, {
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: 'DELETE',
        });
        console.log(response)

        if (response.status == 200) {
            alert("댓글을 삭제하였습니다.")
            window.location.reload()
        } else {
            alert("댓글 작성자만 삭제할 수 있습니다.")
        }
    }
}


// 댓글 추천
async function commentLike(comment_id) {
    const response = await fetch(`${backend_base_url}/article/comment/${comment_id}/like/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
    })

    if (response.status == 200) {
        alert("댓글 추천을 눌렀습니다.")
        window.location.reload()
    } else if (response.status == 202) {
        alert("댓글 추천을 취소했습니다.")
        window.location.reload()
    } else if (response.status == 201) {
        alert("댓글 비추천을 취고하고 댓글 추천을 눌렀습니다.")
        window.location.reload()
    } else {
        alert("댓글 추천을 진행할 수 없습니다.")
    }
}


// 댓글 비추천
async function commentHate(comment_id) {
    const response = await fetch(`${backend_base_url}/article/comment/${comment_id}/hate/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
    })

    if (response.status == 200) {
        alert("댓글 비추천을 눌렀습니다.")
        window.location.reload()
    } else if (response.status == 202) {
        alert("댓글 비추천을 취소했습니다.")
        window.location.reload()
    } else if (response.status == 201) {
        alert("댓글 추천을 취고하고 댓글 비추천을 눌렀습니다.")
        window.location.reload()
    } else {
        alert("댓글 비추천을 진행할 수 없습니다.")
    }
}