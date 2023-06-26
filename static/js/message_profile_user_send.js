window.onload = function () {
    const createForm = document.getElementById('create-form');
    createForm.addEventListener('submit', createMessage);

    const profileUserEmail = sessionStorage.getItem('user-email');
    document.getElementById('receiver').value = profileUserEmail;
};

async function createMessage(event) {
    event.preventDefault();

    const form = document.getElementById('create-form');

    const formData = new FormData(form);

    const receiverInput = document.getElementById('receiver').value;
    const titleInput = document.getElementById('title').value;
    const contentInput = document.getElementById('content').value;
    const imageInput = document.getElementById('image').files[0];

    formData.append('receiver', receiverInput);
    formData.append('title', titleInput);
    formData.append('content', contentInput);

    if (imageInput) {
        formData.append('image', imageInput);
    }

    const response = await sendMessage(formData);
    if (response.status == 200) {
        const data = await response.json();
        alert('쪽지를 성공적으로 보냈습니다.');
        const message_id = data.message_id;
        window.location.href = `/user/message_detail.html?message_id=${message_id}`;
    } else {
        alert('쪽지를 보내는 데에 실패했습니다. 다시 시도해주세요.');
    }
}

async function sendMessage(messageData) {
    const token = localStorage.getItem('access');
    const response = await fetch(`${backend_base_url}/user/messages/create/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: messageData,
    });

    return response;
}

function cancelMessage() {
    window.location.href = '/index.html';
}