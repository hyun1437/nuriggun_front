// search.js

function handleSearch(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchFilter();
  }
}

async function searchFilter() {
  const input_value = document.getElementById("article-search").value;
  const response = await fetch(`${backend_base_url}/article/search/?search=${input_value}`, {
    method: 'GET'
  });

  const response_json = await response.json();
  const cardsBox = document.getElementById("feed-article");

  if (!cardsBox) {
    console.error("feed-article 요소를 찾을 수 없습니다.");
    return;
  }

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

    const category = document.createElement("h6");
    category.setAttribute("class", "card-category");
    category.textContent = result.category;

    const content = document.createElement("p");
    content.setAttribute("class", "card-text");
    content.textContent = result.content;

    const maxLength = 20; // 최대 글자수

    if (result.content.length > maxLength) {
      content.textContent = result.content.substring(0, maxLength) + "..."; // 최대 글자수까지 자르고 생략 부호 추가
    } else {
      content.textContent = result.content; // 최대 글자수보다 짧으면 그대로 사용
    }

    cardBody.appendChild(category);
    cardBody.appendChild(title);
    cardBody.appendChild(content);

    newCard.appendChild(image);
    newCard.appendChild(cardBody);

    cardLink.appendChild(newCard);
    cardsBox.appendChild(cardLink);
  });
}






