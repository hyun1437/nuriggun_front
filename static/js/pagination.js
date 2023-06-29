// 최종 테스트 후 console.log 지우기
console.log('페이지 네이션 연결 확인')


// 작성 게시글 페이지 네이션
let currentPage = 1; // 현재 페이지
const articlesPerPage = 5; // 페이지당 댓글 수

// 페이지네이션 생성 함수
function renderPagination(totalArticles, articlesPerPage) {
    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    const articlePagination = document.getElementById('article-pagination');
    articlePagination.innerHTML = '';

    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination-container');

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;

        if (i === currentPage) {
            pageLink.classList.add('active');
        } else {
            pageLink.addEventListener('click', () => {
                currentPage = i;
                loadArticles(user_id, i);
            });
        }
        articlePagination.appendChild(pageLink);
    }
    articlePagination.appendChild(paginationContainer);
}


// 게시글 스크랩 페이지 네이션
let scrapCurrentPage = 1;
const scrapsPerPage = 5;

// 페이지네이션 생성 함수
function renderScrapPagination(totalScraps, scrapsPerPage) {
    const scrapTotalPages = Math.ceil(totalScraps / scrapsPerPage);

    const scrapPagination = document.getElementById('scrap-pagination');
    scrapPagination.innerHTML = '';

    const scrapPaginationContainer = document.createElement('div');
    scrapPaginationContainer.classList.add('scrap-pagination-container');

    for (let i = 1; i <= scrapTotalPages; i++) {
        const scrapPageLink = document.createElement('a');
        scrapPageLink.href = '#';
        scrapPageLink.textContent = i;

        if (i === scrapCurrentPage) {
            scrapPageLink.classList.add('scrap-active');
        } else {
            scrapPageLink.addEventListener('click', () => {
                scrapCurrentPage = i;
                loadScraps();
            });
        }
        scrapPagination.appendChild(scrapPageLink);
    }
    scrapPagination.appendChild(scrapPaginationContainer);
}