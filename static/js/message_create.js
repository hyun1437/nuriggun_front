window.onload = function () {
    const createForm = document.getElementById('create-form');
    createForm.addEventListener('submit', createMessage);
};

async function createMessage(event) {
    event.preventDefault(); // Prevent the form from being submitted normally

    const form = document.getElementById('create-form'); // Select the form element

    const formData = new FormData(form);

    // Get form inputs
    const receiverInput = document.getElementById('receiver').value;
    const titleInput = document.getElementById('title').value;
    const contentInput = document.getElementById('content').value;
    const imageInput = document.getElementById('image').files[0];

    // Create form data
    formData.append('receiver', receiverInput);
    formData.append('title', titleInput);
    formData.append('content', contentInput);

    if (imageInput) {
        formData.append('image', imageInput);
    }

    // Send request to create a message
    const response = await sendMessage(formData);
    if (response.status == 200) {
        const data = await response.json();
        alert('Message sent successfully.');
        // Redirect to the message detail page
        const message_id = data.message_id; // Use 'data' instead of 'response.data'
        window.location.href = `/user/message_detail.html?message_id=${message_id}`;
    } else {
        alert('Failed to send message. Please try again.');
    }
}

async function sendMessage(messageData) {
    const token = localStorage.getItem('access');

    // if (imageInput) {
    //     // Create a new FormData object to send image as binary
    //     messageData.append('image', imageInput, imageInput.name);

    //     // Set content type header for binary data
    //     headers['Content-Type'] = 'multipart/form-data';
    // }

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
    window.location.href = '/user/message.html';
}