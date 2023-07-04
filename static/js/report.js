  
// "신고" 

async function reportUser() {
    const reportButton = document.getElementById("article-user-url");
    const user_id = parseInt(reportButton.className);

    // Check if user is logged in
  if (!localStorage.getItem('access')) {
  alert('로그인 상태에서만 신고가 가능합니다.');
  return;
  }
  
    const response = await fetch(`${backend_base_url}/user/report/${user_id}/report/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access'),
      },
      method: 'POST',
    });


    if (response.ok) {
      if (response.status === 200) {
        const responseData = await response.json();
        if (responseData === '정지된 악질 유저입니다.') {
          alert(responseData);
        } else {
          alert('신고가 접수되었습니다.');
        }
      } else if (response.status === 400) {
        const responseData = await response.json();
        alert(responseData.message || '이미 신고한 유저입니다.');
      } else if (response.status === 403) {
        alert('자신을 신고할 수 없습니다.');
      }
    } else {
      const errorMessage = await response.text();
      if (response.status === 400) {
        alert('이미 신고한 유저입니다.');
      } else if (response.status === 405) {
        alert('신고 요청을 처리할 수 없습니다.');
      } else {
        alert(`${errorMessage}`);
      }
    }
  }
  
