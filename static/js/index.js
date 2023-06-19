console.log("index.js 연결 확인")

window.onload = () => {
    loadMainArticles();
    loadSubArticles();
    loadToday()
}

// 게시글 불러오기 
async function getArticles(order) {
    const response = await fetch(`${backend_base_url}/article/home/?order=${order}`, {
    })
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert('게시글 로딩 실패')
        console.log(response_json)
    }
}

// 게시글 불러와서 메인에 표시하기
// 페이지네이션 - 4개까지
async function loadMainArticles() {
    
    articles = await getArticles("main");
    
    console.log(articles.results)
    
    const main_article = document.getElementById("main-article")
    
    articles.results.results.forEach(article => {
        const newArticle = document.createElement("div");
        newArticle.setAttribute("class", "article")
        
        const articleImage = document.createElement("img")
        articleImage.setAttribute("class", "card-img-top")
        articleImage.setAttribute("src", `${backend_base_url}${article.image} `)
        articleImage.style.width = "200px";  
        articleImage.style.height = "auto";

        const newTitle = document.createElement("h5")
        newTitle.setAttribute("class", "title")
        newTitle.innerText = article.title

        const newContent = document.createElement("p")
        newContent.setAttribute("class", "content")
        newContent.innerText = article.content

        newArticle.appendChild(articleImage)
        newArticle.appendChild(newTitle)
        newArticle.appendChild(newContent)

        main_article.appendChild(newArticle)
})
}

// 게시글 불러와서 서브구역에 표시하기
async function loadSubArticles() {
    
    articles = await getArticles("sub");
    
    console.log(articles.results)
    
    const sub_article = document.getElementById("sub-article")
    
    articles.results.results.forEach(article => {
        const newArticle = document.createElement("div");
        newArticle.setAttribute("class", "article")
        
        const articleImage = document.createElement("img")
        articleImage.setAttribute("class", "card-img-top")
        articleImage.setAttribute("src", `${backend_base_url}${article.image} `)
        articleImage.style.width = "200px";  
        articleImage.style.height = "auto";

        const newTitle = document.createElement("h5")
        newTitle.setAttribute("class", "title")
        newTitle.innerText = article.title

        const newContent = document.createElement("p")
        newContent.setAttribute("class", "content")
        newContent.innerText = article.content

        newArticle.appendChild(articleImage)
        newArticle.appendChild(newTitle)
        newArticle.appendChild(newContent)

        sub_article.appendChild(newArticle)
})
}

// today 표시
async function loadToday() {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()

    const formattedDate = `${year}-${month}-${day}`

    const todayElement = document.getElementById("today")
    todayElement.innerText = formattedDate
}


