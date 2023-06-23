console.log("api.js 연결 확인")


// 전체 적용 js 

const frontend_base_url = "https://teamnuri.xyz"
const backend_base_url = "https://nuriggun.xyz"

const payload = localStorage.getItem("payload")
const payload_parse = JSON.parse(payload);
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



