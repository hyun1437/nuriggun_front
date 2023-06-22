window.onload = async function () {
    const replyForm = document.getElementById('reply-form');
    replyForm.addEventListener('submit', replyMessage);

    const urlParams = new URLSearchParams(window.location.search);
    const messageID = urlParams.get('message_id');
    const message = await getMessage(messageID);

    const receiverInput = document.getElementById('receiver');
    const titleInput = document.getElementById('title');

    receiverInput.value = message.sender;
    titleInput.value = `Re: ${message.title}`;
};

async function replyMessage(event) {
    event.preventDefault();

    const receiverInput = document.getElementById('receiver');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const imageInput = document.getElementById('image');

    const receiver = receiverInput.value;
    const title = titleInput.value;
    const content = contentInput.value;
    const image = imageInput.files[0];

    const formData = new FormData();
    formData.append('receiver', receiver);
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
        formData.append('image', image);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const messageID = urlParams.get('message_id');
    const response = await sendMessage(formData, messageID);
    if (response.status == 200) {
        const replyMessage = await response.json();
        alert('답장을 성공적으로 보냈습니다.');
        window.location.href = `/user/message_detail.html?message_id=${replyMessage.message_id}`;
    } else {
        alert('답장을 보내는 데에 실패했습니다.');
    }
};

async function sendMessage(messageData, messageID) {
    const response = await fetch(`${backend_base_url}/user/messages/${messageID}/reply/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: messageData,
    });

    return response;
}

async function getMessage(messageID) {
    const response = await fetch(`${backend_base_url}/user/messages/${messageID}/`);
    if (response.status == 200) {
        const message = await response.json();
        return message;
    } else {
        alert('쪽지 정보를 불러오는 데에 실패했습니다.');
    }
}

function cancelMessage() {
    history.go(-1);
}
