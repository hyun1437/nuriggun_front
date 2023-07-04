

// 전체 적용 js 


const frontend_base_url = "https://www.teamnuri.xyz"
const backend_base_url = "https://www.nuriggun.xyz"

// const frontend_base_url = "http://127.0.0.1:5500"
// const backend_base_url = "http://127.0.0.1:8000"

const payload = localStorage.getItem("payload")
const payload_parse = JSON.parse(payload);

// 로그인 안했을 경우의 값 설정
const defaultUser = {
  user_id: null, 
  nickname: '게스트', 
  profile_img: null
};

const token = localStorage.getItem("access")

// 디폴트 프로필이미지 랜덤
const profileImageList = [
  "../static/image/defaultprofile/noprofileimage1.jpg",
  "../static/image/defaultprofile/noprofileimage2.jpg",
  "../static/image/defaultprofile/noprofileimage3.jpg",
  "../static/image/defaultprofile/noprofileimage4.jpg",
  "../static/image/defaultprofile/noprofileimage5.jpg",
  "../static/image/defaultprofile/noprofileimage6.jpg",
  "../static/image/defaultprofile/noprofileimage7.jpg",
]

const randomIndex = Math.floor(Math.random() * profileImageList.length)
const noProfileImage = profileImageList[randomIndex]



