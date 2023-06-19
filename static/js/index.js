console.log("index.js 연결 확인")

window.onload = () => {
    loadMainArticles();
    loadSubArticles();
    loadToday();
}


// 게시글 불러오기 
async function getArticles(order) {
    const response = await fetch(`${backend_base_url}/article/home/?order=${order}`, {
    })
    if (response.status == 200) {
        const response_json = await response.json()
        console.log(response_json)
        return response_json
    } else {
        alert('게시글 로딩 실패')
        console.log(response_json)
    }
}

// 게시글 불러와서 메인에 표시하기
// 페이지네이션 - 4개까지
async function loadMainArticles() {
    try {
        articles = await getArticles("main");
        const sliderContainer = document.querySelector(".my-slider");
        
        console.log(articles.results)
        
        articles.results.results.forEach(article => {
            const newSlide = document.createElement("div");
            newSlide.classList.add("slide");
            
            const articleImage = document.createElement("img")
            articleImage.setAttribute("class", "main-img")
            articleImage.setAttribute("src", `${backend_base_url}${article.image} `)
            articleImage.style.width = "200px";  
            articleImage.style.height = "auto";

            const newTitle = document.createElement("h5")
            newTitle.setAttribute("class", "main-title")
            newTitle.innerText = article.title

            newSlide.appendChild(articleImage)
            newSlide.appendChild(newTitle)

            sliderContainer.appendChild(newSlide)

            // 게시글 클릭시 
            newSlide.addEventListener('click', () => {
                window.location.href = `${frontend_base_url}/article/detail.html?article_id=${article.id}`;
            });
        });
        // 슬라이더 초기화
        var slider = tns({
            container: ".my-slider",
            items: 1,
            slideBy: 'page',
            mouseDrag: true,
            autoplay: true,
            autoplayText: ["▶", "❚❚"],
            controlsText: ["◀", "▶"]

        });
    } catch (error) {
      console.error("메인기사 로딩 실패", error);
    }   

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
        articleImage.setAttribute("class", "sub-img")
        articleImage.setAttribute("src", `${backend_base_url}${article.image} `)
        articleImage.style.width = "200px";  
        articleImage.style.height = "auto";

        const newTitle = document.createElement("h5")
        newTitle.setAttribute("class", "sub-title")
        newTitle.innerText = article.title

        const newContent = document.createElement("p")
        newContent.setAttribute("class", "sub-content")
        newContent.innerText = article.content

        newArticle.appendChild(articleImage)
        newArticle.appendChild(newTitle)
        newArticle.appendChild(newContent)

        sub_article.appendChild(newArticle)

        // 게시글 클릭시 
        newArticle.addEventListener('click', () => {
            window.location.href = `${frontend_base_url}/article/detail.html?article_id=${article.id}`;
        });
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


// back to top 버튼
let debounceTimeout;
let body = document.querySelector('body');
let scrollingElement = document.scrollingElement;

setScrollClass();

window.addEventListener('scroll', setScrollClass);
window.addEventListener('resize', setScrollClass);

function setScrollClass() {
  if (debounceTimeout) {
    window.cancelAnimationFrame(debounceTimeout);
  }

  debounceTimeout = window.requestAnimationFrame(function () {
    let scrollTop = scrollingElement.scrollTop;
    let scrollHeight = scrollingElement.scrollHeight;
    let innerHeight = window.innerHeight;
    let scrollBottom = scrollHeight - innerHeight - scrollTop;

    body.classList.toggle('at-top', scrollTop < 48);
    body.classList.toggle('at-bottom', scrollBottom < 48);
  });
}

// async function getWeather() {
//     try {
//       const response = await fetch(' ', {
//         headers: {
//             Authorization: " "
//           }
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         // 날씨 데이터를 처리하는 로직 작성
//         console.log(data);
//       } else {
//         console.error('날씨 API 요청에 실패했습니다.');
//       }
//     } catch (error) {
//       console.error('날씨 API 요청 중 오류가 발생했습니다.', error);
//     }
//   }
