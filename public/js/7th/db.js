// db.js

// 삭제버튼. 'delete'

// 댓글. fetch

// 추가버튼.
console.log(document.forms['postForm']); // 모든 폼 요소 출력
document.forms['postForm'].addEventListener('submit', function (e) {
  e.preventDefault(); // 이벤트의 기본 기능 차단 함수.
  let title = document.querySelector('[name="title"]').value; // 입력값(title)
  let author = document.querySelector('[name="author"]').value; // 입력값(author)
  if (!title || !author) {
    alert('내용, 작성자 입력해주세요.');
    return;
  }
  // ajax. 요청방식:post
  fetch('http://localhost:3000/posts', { // 요청방식 post면 뒤에 옵션
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        title,
        author
      }),
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      let div = document.createElement('div');
      for (let item in result) {
        let span = document.createElement('span');
        span.innerHTML = result[item];
        span.setAttribute('class', 'data-' + item);
        div.appendChild(span);
      }
      container.appendChild(div);
      // 초기화.
      document.querySelector('input[name="title"]').value = '';
      document.querySelector('input[name="author"]').value = '';
    })
    .catch(err => console.log(err));
});

// 게시글 목록.
const container = document.querySelector('#data-container');
fetch('http://localhost:3000/posts') // json문자열 데이터.
  .then((response) => response.json())
  .then(result => {
    // 게시글 건수만큼 row 생성
    result.forEach((item) => {
      let div = document.createElement('div');
      for (let prop in item) {
        let span = document.createElement('span');
        span.innerHTML = item[prop];
        span.setAttribute('class', 'data-' + prop);
        div.appendChild(span);
      }
      container.appendChild(div);
    });
  })
  .catch((err) => console.log(err));