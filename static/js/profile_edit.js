async function ProfileUpdate() {
    const editButtun = document.getElementById("user-edit");
    const image = document.getElementById("user-profile-image")
    const nickname = document.getElementById("user-nickname")// 이 부분 확실치않음
    
    if (editButtun.innerText === '수정하기') {
        // 수정 모드로 변경
        editButtun.innerText = '저장';
    
        const imageInput = document.createElement('input');
        imageInput.setAttribute('type', 'text');
        imageInput.setAttribute('id', 'updated-image');
        imageInput.setAttribute('placeholder', 'url을 입력해주세요 #임시#');
        imageInput.value = image.innerText;
        image.innerText = '';
        image.appendChild(imageInput);
    
        const nicknameInput = document.createElement('input');
        nicknameInput.setAttribute('id', 'updated-nickname');
        nicknameInput.setAttribute('placeholder', '변경할 닉네임');
        nicknameInput.value = nickname.innerText;
        nickname.innerText = '';
        nickname.appendChild(nicknameInput);
    
    } else {
        // 저장 모드로 변경
        const updatedimage = document.getElementById('updated-image').value;
        const updatednickname = document.getElementById('updated-nickname').value;

        const response = await fetch(`${backend_base_url}/user/profile/${user_id}/`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access'),
            'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
            image: updatedimage,
            nickname: updatednickname,
        }),
});

    if (response.status === 200) {
        // 수정된 내용을 받아와서 디테일 페이지를 다시 로드
        window.location.href = `${frontend_base_url}/user/profile_page.html?id=${user_id}`;
    } else {
        alert('수정에 실패했습니다.');
    }
    }
}