// 유저 ID 가져오기
const userId = payload_parse.user_id;

window.addEventListener('load', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category === 'moaview' && userId) {
        viewSubscribeArticle(userId); // 모아보기 기능
    } else {
        viewCategory(category); // 카테고리별 보기 기능
    }
});

async function getCategory(category) {
let url;
if (category) {
    url = `${backend_base_url}/article/${category}/`;
} else {
    url = `${backend_base_url}/article/`;
}
const response = await fetch(url, {
    method: 'GET',
});

const response_json = await response.json();
console.log(response_json);

return response_json;
}

async function viewCategory(category) {
const articles = await getCategory(category);
createArticleList(articles);
}

async function getSubscribeArticle(userId) {
const url = `${backend_base_url}/user/moaview/${userId}`;
const response = await fetch(url, {
    method: 'GET',
});

const response_json = await response.json();
console.log(response_json);

return response_json;
}

async function viewSubscribeArticle(userId) {
    const category = 'moaview'; // 모아보기 페이지에서는 'moaview' 카테고리로 설정
    const articles = await getSubscribeArticle(userId);
    createArticleList(articles);
}

function createArticleList(articles) {
const articleListElement = document.querySelector('#article-list');
articleListElement.innerHTML = '';

const ulElement = document.createElement('ul');
ulElement.className = 'article-list';
articleListElement.appendChild(ulElement);

articles.forEach(article => {
    const liElement = document.createElement('li');
    liElement.className = 'article-item';

    const categoryElement = document.createElement('h5');
    categoryElement.className = 'article-category';
    categoryElement.textContent = article.category;
    liElement.appendChild(categoryElement);

    const imgElement = document.createElement('img');
    imgElement.src = `${backend_base_url}${article.image}`;
    imgElement.alt = article.title;
    imgElement.className = 'article-img';
    liElement.appendChild(imgElement);

    const titleElement = document.createElement('h5');
    titleElement.className = 'article-title';
    titleElement.textContent = article.title;
    liElement.appendChild(titleElement);

    const infoElement = document.createElement('div');
    infoElement.className = 'article-info';

    const nicknameElement = document.createElement('p');
    nicknameElement.textContent = article.user.nickname;
    infoElement.appendChild(nicknameElement);

    const dateElement = document.createElement('p');
    dateElement.textContent = article.created_at;
    infoElement.appendChild(dateElement);

    liElement.appendChild(infoElement);

    // 게시글 클릭시
    liElement.addEventListener('click', () => {
    window.location.href = `${frontend_base_url}/article/detail.html?article_id=${article.id}`;
    });

    ulElement.insertBefore(liElement, ulElement.firstChild);
});
}


