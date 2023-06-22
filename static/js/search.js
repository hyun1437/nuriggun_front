
// search.js

async function searchFilter() {
  console.log("searchFilter 함수 실행됨")
    const input_value = document.getElementById("article-search").value;
    console.log(input_value)
    const response = await fetch(`${backend_base_url}/article/search/?search=${input_value}`, {
      method: 'GET'
    });
  
    const response_json = await response.json();
    console.log(response_json);
    
    
    const cardsBox = document.getElementById("feed-article");
    console.log(cardsBox)
    if (!cardsBox) {
      console.error("feed-article 요소를 찾을 수 없습니다.");
      return;
    }
    console.log("검색성공")
    cardsBox.innerHTML = '';
  
    response_json.forEach((result) => {
        const cardLink = document.createElement("a");
        cardLink.setAttribute("href", `/article/detail.html?article_id=${result.id}`);
        cardLink.setAttribute("class", "card-link");

        const newCard = document.createElement("div");
        newCard.setAttribute("class", "card");
        newCard.setAttribute("id", result.id);

        const image = document.createElement("img");
        image.setAttribute("class", "card-img-top");
        image.setAttribute("src", result.image);
      

        const cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        const title = document.createElement("h5");
        title.setAttribute("class", "card-title");
        title.textContent = result.title;

        const content = document.createElement("p");
        content.setAttribute("class", "card-text");
        content.textContent = result.content;

        cardBody.appendChild(title);
        cardBody.appendChild(content);

        newCard.appendChild(image);
        newCard.appendChild(cardBody);

        cardLink.appendChild(newCard);
        cardsBox.appendChild(cardLink);
    });
}

// // 검색 버튼 클릭 이벤트 리스너 등록
// const searchButton = document.querySelector(".btn");
// searchButton.addEventListener("click", searchFilter);

// // Enter 키 눌렀을 때 검색 이벤트 처리
// const searchInput = document.getElementById("article-search");
// searchInput.addEventListener("keydown", (event) => {
//   if (event.key === 'Enter') {
//     event.preventDefault(); // 기본 엔터 동작 방지
//     searchFilter();
//   }
// });



// window.addEventListener('DOMContentLoaded', (event) => {
//   // 기존의 searchFilter 함수 정의
//   async function searchFilter() {
//     const input_value = document.getElementById("article-search").value;
//     console.log(input_value);
//     const response = await fetch(`${backend_base_url}/article/search/?search=${input_value}`, {
//       method: 'GET'
//     });

//     const response_json = await response.json();
//     console.log(response_json);

//     const cardsBox = document.getElementById("main-article");
//     if (!cardsBox) {
//       console.error("main-article 요소를 찾을 수 없습니다.");
//       return;
//     }
//     cardsBox.innerHTML = '';

//     response_json.forEach((result) => {
//       const cardLink = document.createElement("a");
//       cardLink.setAttribute("href", `/article/detail.html?id=${result.id}`);
//       cardLink.setAttribute("class", "card-link");

//       const newCard = document.createElement("div");
//       newCard.setAttribute("class", "card");
//       newCard.setAttribute("id", result.id);

//       const image = document.createElement("img");
//       image.setAttribute("class", "card-img-top");
//       image.setAttribute("src", result.image);

//       const cardBody = document.createElement("div");
//       cardBody.setAttribute("class", "card-body");

//       const title = document.createElement("h5");
//       title.setAttribute("class", "card-title");
//       title.textContent = result.title;

//       const content = document.createElement("p");
//       content.setAttribute("class", "card-text");
//       content.textContent = result.content;

//       cardBody.appendChild(title);
//       cardBody.appendChild(content);

//       newCard.appendChild(image);
//       newCard.appendChild(cardBody);

//       cardLink.appendChild(newCard);
//       cardsBox.appendChild(cardLink);
//     });
//   }

//   // 검색 버튼 클릭 이벤트 리스너 등록
//   const searchButton = document.querySelector(".btn");
//   searchButton.addEventListener("click", searchFilter);

//   // Enter 키 눌렀을 때 검색 이벤트 처리
//   const searchInput = document.getElementById("article-search");
//   searchInput.addEventListener("keydown", (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault(); // 기본 엔터 동작 방지
//       searchFilter();
//     }
//   });
// });