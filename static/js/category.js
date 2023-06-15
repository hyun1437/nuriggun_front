window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        viewCategory(category);
    } else {
        // 만약 category가 없다면 전체 게시글을 보여줍니다.
        viewCategory("");
    }
}

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
    console.log(response_json)
    
    return response_json;
}

async function viewCategory(category) {
    const articles = await getCategory(category);
    const articlesContainer = document.querySelector('.articles-container');

    // 기존에 있던것들을 지우기
    articlesContainer.innerHTML = '';

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'card';
    
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
    
        const titleElement = document.createElement('h5');
        titleElement.className = 'card-title';
        titleElement.textContent = article.title;
    
        const contentElement = document.createElement('p');
        contentElement.className = 'card-text';
        contentElement.textContent = article.content;
    
        cardBody.appendChild(titleElement);
        cardBody.appendChild(contentElement);
        articleElement.appendChild(cardBody);
    
        // 게시글 클릭시 
        articleElement.addEventListener('click', () => {
            window.location.href = `${front_base_url}/article/detail.html?article_id=${article.id}`;
        });
    
        articlesContainer.prepend(articleElement);
    });
}



// <img src='${backend_base_url}${article.image}' alt=""> 이 부분 잠시 뺌 (사진 사이즈가 너무 큼)