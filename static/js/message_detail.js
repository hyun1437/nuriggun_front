// 페이지 로딩하면 쪽지 정보 불러오기
window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    message_id = urlParams.get('message_id');
    loadMessage(message_id);
}

// 쪽지 상세보기 api
async function getMessage(message_id) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/user/messages/${message_id}/`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}

// 쪽지 상세보기 
async function loadMessage(message_id) {
    const response = await getMessage(message_id);

    const messageTitle = document.getElementById("message-title")
    const messageSender = document.getElementById("message-sender")
    const messageReceiver = document.getElementById("message-receiver");
    const messageImage = document.getElementById("message-image")
    const messageContent = document.getElementById("message-content")
    const messageTimestamp = document.getElementById("message-timestamp")

    // 쪽지 보낸 시간
    const timestamp = new Date(response.timestamp)
    const formattedTime = formatDateTime(timestamp)
    function formatDateTime(dateTime) {
        const year = dateTime.getFullYear()
        const month = String(dateTime.getMonth() + 1).padStart(2, "0");
        const day = String(dateTime.getDate()).padStart(2, "0");
        const hours = String(dateTime.getHours()).padStart(2, "0");
        const minutes = String(dateTime.getMinutes()).padStart(2, "0");
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
        return formattedDateTime;
    }

    messageTitle.innerText = "제목: " + response.title
    messageSender.innerText = "보낸 사람: " + response.sender
    messageReceiver.innerText = "받는 사람: " + response.receiver;
    messageTimestamp.innerText = "보낸 시간: " + formattedTime
    messageContent.innerText = response.content

    // 이미지 불러오기
    if (response.image) {
        const imageURL = backend_base_url + response.image;
        const imageElement = document.createElement('img');
        imageElement.setAttribute("src", imageURL);
        imageElement.setAttribute("class", "img-fluid");
        imageElement.setAttribute("style", "margin-bottom: 20px;");
        messageImage.appendChild(imageElement);
    }
}

function toggleReceiver() {
    const receiverElement = document.getElementById("message-receiver");
    receiverElement.classList.toggle("hidden");
}

// 게시글 삭제
async function removeMessage() {
    if (confirm("정말 삭제하시겠습니까??") == true) {
        await deleteMessage(message_id)
        alert("삭제되었습니다.")
        location.href = document.referrer;
    } else {
        return false;
    }
}

// 게시글 삭제 api
async function deleteMessage() {

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/user/messages/${message_id}/`,
        {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
    if (response.status == 204) {
    } else {
        alert(response.status)
    }
}

// 돌아가기
function backMessage() {
    window.location.href = '/user/message_inbox.html';
}


function replyToMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    const messageID = urlParams.get('message_id');
    window.location.href = `/user/message_reply.html?message_id=${messageID}`;
}