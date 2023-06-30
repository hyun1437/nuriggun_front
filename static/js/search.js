// search.js


// search.js

async function searchFilter() {
  // console.log("searchFilter 함수 실행됨")
    const input_value = document.getElementById("article-search").value;
    // console.log(input_value)
    const response = await fetch(`${backend_base_url}/article/search/?search=${input_value}`, {
      method: 'GET'
    });
  
    const response_json = await response.json();
    // console.log(response_json);
    
    
    
    const cardsBox = document.getElementById("feed-article");
    // console.log(cardsBox)
    if (!cardsBox) {
      console.error("feed-article 요소를 찾을 수 없습니다.");
      return;
    }
    // console.log("검색성공")
    cardsBox.innerHTML = '';
  
    response_json.forEach((result) => {
      if (!result.image) {
        // 대체 이미지 또는 기본 텍스트를 사용하거나, 해당 항목을 건너뛸 수 있음
        return;
      }
        const cardLink = document.createElement("a");
        cardLink.setAttribute("href", `/article/detail.html?article_id=${result.id}`);
        cardLink.setAttribute("class", "card-link");

        const newCard = document.createElement("div");
        newCard.setAttribute("class", "card");
        newCard.setAttribute("id", result.id);

        const image = document.createElement("img");
        image.setAttribute("class", "card-img-top");

        // 이미지 url을 리플레이스
        let imageSrc = result.image.replace('http://backend:8000', 'https://www.nuriggun.xyz');
        image.setAttribute("src", imageSrc);

      

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


// async function searchFilter() {
//   console.log("searchFilter 함수 실행됨")
//     const input_value = document.getElementById("article-search").value;
//     console.log(input_value)
//     const response = await fetch(`${backend_base_url}/article/search/?search=${input_value}`, {
//       method: 'GET'
//     });
  
//     const response_json = await response.json();
//     console.log(response_json);
    
    
//     const cardsBox = document.getElementById("feed-article");
//     console.log(cardsBox)
//     if (!cardsBox) {
//       console.error("feed-article 요소를 찾을 수 없습니다.");
//       return;
//     }
//     console.log("검색성공")
//     cardsBox.innerHTML = '';
  
//     response_json.forEach((result) => {
//         const cardLink = document.createElement("a");
//         cardLink.setAttribute("href", `/article/detail.html?article_id=${result.id}`);
//         cardLink.setAttribute("class", "card-link");

//         const newCard = document.createElement("div");
//         newCard.setAttribute("class", "card");
//         newCard.setAttribute("id", result.id);

//         const image = document.createElement("img");
//         image.setAttribute("class", "card-img-top");
//         image.setAttribute("src", result.image);
      

//         const cardBody = document.createElement("div");
//         cardBody.setAttribute("class", "card-body");

//         const title = document.createElement("h5");
//         title.setAttribute("class", "card-title");
//         title.textContent = result.title;

//         const content = document.createElement("p");
//         content.setAttribute("class", "card-text");
//         content.textContent = result.content;

//         cardBody.appendChild(title);
//         cardBody.appendChild(content);

//         newCard.appendChild(image);
//         newCard.appendChild(cardBody);

//         cardLink.appendChild(newCard);
//         cardsBox.appendChild(cardLink);
//     });
// }




