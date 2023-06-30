window.addEventListener('load',async function()  {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        viewCategory(category);
    } else {
        // 만약 category가 없다면 전체 게시글을 보여줍니다.
        viewCategory("");
    }
})

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
    // console.log(response_json)
    
    return response_json;
}

async function viewCategory(category) {
    const articles = await getCategory(category);
    const articleListElement = document.querySelector('#article-list');

    // 새로운 articles-container 생성
    const articlesContainer = document.createElement('div');
    articlesContainer.className = 'articles-container';
    articlesContainer.id = 'article-list';
    articleListElement.appendChild(articlesContainer);

    const ulElement = document.createElement('ul');
    ulElement.className = 'article-list';
    articlesContainer.appendChild(ulElement);

    articles.forEach(article => {
        const liElement = document.createElement('li');
        liElement.className = 'article-item';

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