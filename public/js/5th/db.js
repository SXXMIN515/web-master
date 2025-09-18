// db.js

// 이벤트.
document.querySelector('div.container>form') // > 자식요소
  .addEventListener('submit', function (e) {
    e.preventDefault(); // 기본 기능 차단.
    addPost();
  });

// 글등록.
function addPost() {
  const title = document.querySelector('input[name="title"]').value; // 속성선택자. p405
  const author = document.querySelector('input[name="author"]').value;
  const xhtp = new XMLHttpRequest();
  xhtp.open('post', 'http://localhost:3000/posts');
  // 요청헤더: 컨텐트 형식 지정.
  xhtp.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
  xhtp.send(JSON.stringify({
    title: title, // 사용자 입력 값
    author: author
  }));
  xhtp.onload = function () { // load될때 함수 실행
    let result = JSON.parse(xhtp.responseText); // reponse도 가능
    let div = makeRow(result);
    document.querySelector('#data-container').appendChild(div);

    // 초기화.
    document.querySelector('input[name="title"]').value = '';
    document.querySelector('input[name="author"]').value = '';
  }
}

// 게시글 한건에 대한 row 생성하는 함수.
function makeRow(post = {
  id,
  title,
  author
}) {
  let fields = ["id", "title", "author"];
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
  for (let i = 0; i < fields.length; i++) {
    let span = document.createElement('span');
    span.innerHTML = post[fields[i]];
    span.setAttribute('class', 'data-' + fields[i]);
    div.appendChild(span);
  }
  return div; // <div><span data-id>032a</span>*3</div>
};

// 글목록.
const xhtp = new XMLHttpRequest();
xhtp.open('get', 'http://localhost:3000/posts');
xhtp.send();
xhtp.onload = function () {
  let data = JSON.parse(xhtp.responseText);
  // 글목록 건수 => data
  data.forEach(function (item) {
    let div = makeRow(item);
    document.querySelector('#data-container').appendChild(div);
  });
}

let comments = [];

// 댓글목록.
const xhtp1 = new XMLHttpRequest();
xhtp1.open('get', 'http://localhost:3000/comments');
xhtp1.send();
xhtp1.onload = function () {
  comments = JSON.parse(xhtp1.responseText);
};


// forEach
// fields.forEach(function (field) {
//   console.log(field);
//   let span = document.createElement('span');
//   span.innerHTML = result[field];
//   span.setAttribute('class', 'data-' + field);
//   div.appendChild(span);
// });
//   document.querySelector('#data-container').appendChild(div);

// forEach
// fields.forEach(function (field) {
//   console.log(field);
//   let span = document.createElement('span');
//   span.innerHTML = item[field];
//   span.setAttribute('class', 'data-' + field);
//   div.appendChild(span);
// });