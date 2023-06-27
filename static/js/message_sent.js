window.onload = function () {
    loadSentMessages();
};

async function getSentMessages() {
    const token = localStorage.getItem("access");
    const response = await fetch(`${backend_base_url}/user/messages/sent/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}

async function loadSentMessages() {
    const messages = await getSentMessages();

    const sentMessagesElement = document.getElementById("sent-messages");
    sentMessagesElement.innerHTML = "";

    if (messages.length == 0) {
        const noMessagesElement = document.createElement("tr");
        noMessagesElement.innerHTML = "<td colspan='3'>받은 쪽지가 없습니다.</td>";
        sentMessagesElement.appendChild(noMessagesElement);
    } else {
        messages.forEach(message => {
            const messageElement = createMessageElement(message);
            sentMessagesElement.appendChild(messageElement);
        });
    }
}

function createMessageElement(message) {
    const messageElement = document.createElement("tr");
    messageElement.innerHTML = `
        <td>${message.receiver}</td>
        <td>${message.title}</td>
        <td>${formatDateTime(new Date(message.timestamp))}</td>
    `;

    messageElement.addEventListener("click", () => {
        window.location.href = `/user/message_detail.html?message_id=${message.id}`;
    });

    return messageElement;
}

function formatDateTime(dateTime) {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    };
    return dateTime.toLocaleString(undefined, options);
}

function goToCreateMessage() {
    window.location.href = '/user/message_create.html';
}

function goToInboxMessage() {
    window.location.href = '/user/message_inbox.html';
}

function goToMessage() {
    window.location.href = '/index.html';
}