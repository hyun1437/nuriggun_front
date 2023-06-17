console.log("index.js 연결 확인")

window.onload = () => {
    loadMainArticles();
    loadSubArticles();
    loadToday()

    // top 버튼 시작
    // function trackScroll() {
    //     var scrolled = window.pageYOffset;
    //     var coords = document.documentElement.clientHeight;
    
    //     if (scrolled > coords) {
    //       goTopBtn.classList.add('back_to_top-show');
    //     }
    //     if (scrolled < coords) {
    //       goTopBtn.classList.remove('back_to_top-show');
    //     }
    //   }
    
    //   function backToTop() {
    //     if (window.pageYOffset > 0) {
    //       window.scrollBy(0, -80);
    //       setTimeout(backToTop, 0);
    //     }
    //   }
    
    //   var goTopBtn = document.querySelector('.back_to_top');
    
    //   window.addEventListener('scroll', trackScroll);
    //   goTopBtn.addEventListener('click', backToTop);
    // top 버튼 끝
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

// // top 버튼 시작

// document.addEventListener('DOMContentLoaded', function() {
  
//     function trackScroll() {
//       var scrolled = window.pageYOffset;
//       var coords = document.documentElement.clientHeight;
  
//       if (scrolled > coords) {
//         goTopBtn.classList.add('back_to_top-show');
//       }
//       if (scrolled < coords) {
//         goTopBtn.classList.remove('back_to_top-show');
//       }
//     }
  
//     function backToTop() {
//       if (window.pageYOffset > 0) {
//         window.scrollBy(0, -80);
//         setTimeout(backToTop, 0);
//       }
//     }
  
//     var goTopBtn = document.querySelector('.back_to_top');
  
//     window.addEventListener('scroll', trackScroll);
//     goTopBtn.addEventListener('click', backToTop);
//   })();

// // top 버튼 끝