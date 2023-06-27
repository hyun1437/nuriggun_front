window.onload = function () {
    loadInboxMessages();
};

async function getInboxMessages() {
    const token = localStorage.getItem("access");
    const response = await fetch(`${backend_base_url}/user/messages/inbox/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}

async function loadInboxMessages() {
    const messages = await getInboxMessages();

    const inboxMessagesElement = document.getElementById("inbox-messages");
    inboxMessagesElement.innerHTML = "";

    const messageCountElement = document.getElementById("message-count");
    messageCountElement.innerText = messages.message_count;

    const unreadCountElement = document.getElementById("unread-count");
    unreadCountElement.innerText = messages.unread_count;

    if (messages.length == 0) {
        const noMessagesElement = document.createElement("tr");
        noMessagesElement.innerHTML = "<td colspan='3'>받은 쪽지가 없습니다.</td>";
        inboxMessagesElement.appendChild(noMessagesElement);
    } else {
        messages.messages.forEach(message => {
            const messageElement = createMessageElement(message);
            inboxMessagesElement.appendChild(messageElement);
        });
    }
}

function createMessageElement(message) {
    const isReadText = message.is_read ? "💌" : "✉";
    const messageElement = document.createElement("tr");
    messageElement.innerHTML = `
        <td>${isReadText}</td>
        <td>${message.sender}</td>
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

function goToSentMessage() {
    window.location.href = '/user/message_sent.html';
}

function goToMessage() {
    window.location.href = '/index.html';
}