async function ProfileUpdate() {
  const editButton = document.getElementById("user-edit");
  const image = document.getElementById("user-profile-image");
  const nickname = document.getElementById("user-nickname");
  const interest = document.getElementById("user-interest");

  if (editButton.innerText === "✏️ 편집") {
    // 수정 버튼을 누르면 인풋창이 나오면서 수정기모드로 변경됨
    editButton.innerText = "✏️ 완료";

    // 프사를 변경할 수 있는 입력창을 생성
    const imageInput = document.createElement("input");
    imageInput.setAttribute("type", "file");
    imageInput.setAttribute("id", "updated-image");

    // 닉네임을 변경할 수 있는 입력창을 생성
    const nicknameInput = document.createElement("input");
    nicknameInput.setAttribute("id", "updated-nickname");
    nicknameInput.setAttribute("placeholder", "변경할 닉네임");
    nicknameInput.value = nickname.innerText;
    nickname.innerText = "";
    nickname.appendChild(nicknameInput);

    const INTEREST = [
      { label: '없음', value: '' },
      { label: 'IT/과학', value: 'IT/과학' },
      { label: '경제', value: '경제' },
      { label: '생활/문화', value: '생활/문화' },
      { label: '스포츠', value: '스포츠' },
      { label: '날씨', value: '날씨' },
      { label: '세계', value: '세계' }
    ];

    // 관심분야를 변경할 수 있는 입력창을 생성
    const interestInput = document.createElement("select");
    interestInput.setAttribute("id", "updated-interest");

    INTEREST.forEach(option => {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.text = option.label;

      if (option.value === interest.innerText) {
        optionElement.setAttribute("selected", "selected");
      }
      interestInput.appendChild(optionElement);
    });

    interest.innerText = "";
    interest.appendChild(interestInput);

    // 이미지 미리보기

    // onload 이벤트가 발생하면 image 엘리먼트의 src 속성을 업데이트하여 미리보기 이미지를 표시합니다.
    imageInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          image.setAttribute("src", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });

    // 이미지 미리보기 입력 필드를 이미지 엘리먼트 바로 뒤에 추가합니다.
    image.parentNode.insertBefore(imageInput, image.nextSibling);
  } else {

    const updatedImageInput = document.getElementById("updated-image");
    const updatedImage = updatedImageInput.files[0];
    const updatedNickname = document.getElementById("updated-nickname").value;
    console.log(updatedNickname)
    const updatedInterest = document.getElementById("updated-interest").value;
    console.log(updatedInterest)

    // navbar 업데이트를 위한 코드 추가
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload);
    payload_parse.nickname = updatedNickname;
    localStorage.setItem("payload", JSON.stringify(payload_parse));

    const formData = new FormData();
    if (updatedImage) {
      formData.append("profile_img", updatedImage);
    }
    formData.append("nickname", updatedNickname);
    formData.append("interest", updatedInterest);

    const response = await fetch(`${backend_base_url}/user/profile/${user_id}/`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "PATCH",
      body: formData,
    });

    if (response.status === 200) {
      window.location.href = `${frontend_base_url}/user/profile_page.html?user_id=${user_id}`;
    } else {
      alert("수정에 실패했습니다.");
    }
  }
}
