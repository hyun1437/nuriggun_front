document.addEventListener("DOMContentLoaded", function () {
    // 푸터를 삽입할 위치
    const footer = document.querySelector("#footer");

    if (footer) {
        // footer.html 파일을 가져와서 푸터 위치에 삽입
        fetch("/footer.html")
            .then(response => response.text())
            .then(data => {
                footer.innerHTML = data;
                // 푸터가 삽입된 후에 실행할 동작 추가 가능
                // 예: 푸터 클릭 이벤트 등록 등
            });
    }
});