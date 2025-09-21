// db.js

// 이벤트 추가버튼.
console.log(document.forms['postForm']); // 모든 폼 요소 출력
document.forms['postForm'].addEventListener('submit', function (e) {
  e.preventDefault(); // 이벤트의 기본 기능 차단 함수.
  addPost();
});

// 글등록.
function addPost() {
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
      let div = makeRow(result);
      div.appendChild(btn);
      container.appendChild(div);

      // 초기화.
      document.querySelector('input[name="title"]').value = '';
      document.querySelector('input[name="author"]').value = '';
    })
    .catch(err => console.log(err));
}

// 게시글 한건에 대한 row 생성하는 함수.
function makeRow(post) {
  let div = document.createElement('div');
  // div에 클릭이벤트
  div.addEventListener('click', function () {
    // 댓글목록을 가져와서 보여주기
    const target = this; // this에 바인딩되는 값을 확인.
    const post_id = this.children[0].innerHTML; // this를 확인 후 postId 값을 계산
    // 댓글목록 만들기.
    const cList = document.querySelector(".comments"); // <div class='comments'> 찾기.
    cList.innerHTML = ""; // html값을 초기화하기
    // 전체 댓글목록에서 post에 해당하는 댓글을 filtering 하기
    const filterList = comments.filter((item) => item.postId == post_id);
    // 댓글목록을 반복하면서 <span>댓글번호</span><span>댓글내용</span> 만들기.
    filterList.forEach((item) => {
      let div = document.createElement("div");
      let span = document.createElement("span"); // 댓글id
      span.innerHTML = item.id;
      div.appendChild(span);
      span = document.createElement("span"); // 댓글내용.
      span.innerHTML = item.content;
      div.appendChild(span);
      // div와 span의 부모자식관계 만들기.
      cList.appendChild(div); // <div class='container'>의 부모자식관계 만들기.
    });
    target.appendChild(cList); // 선택한 div에 하위요소로 보여주기.
  }); // div의 클릭이벤트 끝.

  // 글목록 만들기
  for (let key in post) {
    let span = document.createElement('span');
    span.innerHTML = post[key];
    span.setAttribute('class', 'data-' + key);
    div.appendChild(span);
  }

  // 삭제화면으로 이동하는 버튼.
  let btn = document.createElement('button');
  btn.innerHTML = '삭제';
  btn.addEventListener('click', function (e) {
    fetch(`http://localhost:3000/posts/${post.id}`, {
        method: 'delete'
      })
      .then(response => {
        if (response.ok) {
          div.remove(); // 화면에서 제거
        } else {
          alert('삭제 실패!');
        }
      })
      .catch((err) => console.log(err));
  });

  return div;
}

// 게시글 목록.
const container = document.querySelector('#data-container');
fetch('http://localhost:3000/posts') // json문자열 데이터.
  .then((response) => response.json())
  .then(result => {
    // 게시글 건수만큼 row 생성
    result.forEach((item) => {
      let div = makeRow(item);
      container.appendChild(div);
    });
  })
  .catch((err) => console.log(err));

let comments = [];

// 댓글 목록.
fetch('http://localhost:3000/comments') // json문자열 데이터.
  .then((response) => response.json())
  .then(result => {
    comments = result;
  })
  .catch((err) => console.log(err));