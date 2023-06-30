// // 글작성
// async function submitPost() {
//     const title = document.getElementById("title").value
//     const content = document.getElementById("content").value
//     // const category = document.getElementById("category").value
//     const img = document.getElementById("myFile").files[0]
//     const token = localStorage.getItem("access")


//     const formData = new FormData();
//     formData.append("article_title", title);
//     formData.append("article_content", content);
//     // formData.append("category", category);
//     formData.append("article_img", img);

//     const response = await fetch(`${backend_base_url}/article/`, {
//         method: "POST",
//         headers: {
//             Authorization: "Bearer " + token,
//         },
//         body: formData,
//     });

//     if (response.status == 201) {
//         alert("글 작성 완료")
//         window.location.replace('base/index.html')
//     } else if (title == '' || content == '' ||img =='' ) {
//         alert("빈칸을 입력해 주세요.")
//     }

//     const saveButton = document.getElementById("save-article");
//     saveButton.addEventListener("click", save_article);

// }

// const user_id = parseInt(payload_parse.user_id);
// console.log(user_id)


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
        alert("글 작성 완료")
        window.location.replace(`${frontend_base_url}/article/article_list.html`);
    } else if (title == '' || content == '' || category == '') {
        alert("빈칸을 입력해 주세요.")
    }

    const saveButton = document.getElementById("articlepost");
    saveButton.addEventListener("click", articlepost);

}


// // 이미지 업로드 미리보기
// function setThumbnail(event) {
//     let reader = new FileReader();

//     reader.onload = function (event) {
//         let img = document.createElement("img");
//         img.setAttribute("src", event.target.result);

//         // 썸네일 크기 조절
//         img.style.width = "500px"; // 너비 500px로 설정
//         img.style.height = "auto"; // 높이 자동 설정
//         document
//             .querySelector("#imgthumbnail")
//             .appendChild(img);
//     };

//     reader.readAsDataURL(event.target.files[0]);
// }




