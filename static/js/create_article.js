// 글작성
async function ArticlePost() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const category = document.getElementById("category").value
    const img = document.getElementById("img-file").files[0]
    const imgContent = document.getElementById("img-content").value
    const token = localStorage.getItem("access")
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("image", img);
    formData.append("image_content", imgContent);


    if (!img) {
        alert("이미지를 넣어주시면 좋겠죠?!?!?.");
        return;
    }

    const response = await fetch(`${backend_base_url}/article/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
    });

   if (response.status == 201) {
        alert("작성 완료! 약 3분 뒤에 AI가 기사를 자동으로 요약해줍니다. 잠시 후 다시 오셔서 요약된 기사를 확인해보세요!")
        window.location.replace(`${frontend_base_url}/index.html`);
    } else if (title == '' || content == '' || img == '' || category == '') {
        alert("빈칸을 입력해 주세요.")
    } else if (response.status == 400) {
        alert("제목은 50자, 본문은 1650자 이내로 작성해주시길 바랍니다.\n이미지는 10MB, 1024*1024 크기를 넘지 않도록 주의해주세요.")
    }

    const saveButton = document.getElementById("articlepost");
    saveButton.addEventListener("click", articlepost);

}




