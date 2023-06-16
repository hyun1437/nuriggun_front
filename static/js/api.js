console.log("api.js 연결 확인")

// 전체 적용 js 
const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

const payload = localStorage.getItem("payload")
const payload_parse = JSON.parse(payload);
const token = localStorage.getItem("access")

const noProfileImage = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmC5jq%2FbtshzYZQFIL%2FkKMAW65wigPLiKvVkfQkTk%2Fimg.png"


