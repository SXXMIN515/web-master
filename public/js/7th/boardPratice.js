// boardPractice.js

// 이벤트 추가버튼.
document.querySelector('form[name="postForm"]')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    let userTitle = document.querySelector('input[name="title"]').value;
    let userAuthor = document.querySelector('input[name="author"]').value;

    if (!userTitle || !userAuthor) {
      alert('내용, 작성자를 입력해주세요.');
      return;
    }

    fetch('http://localhost:3000/posts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          userTitle,
          userAuthor
        }),
      })
      .then(response => response.json())
      .then(result => {
        let div = document.createElement('div');
        for (let prop in result) {
          let span = document.createElement('span');
          span.innerHTML = result[prop];
          span.setAttribute('class', 'data-' + prop);
          div.appendChild(span);
        }
        container.appendChild(div);
      })
      .catch(err => console.log(err));
  });

// 글 목록 가져오기
const container = document.querySelector('.data-container');
fetch('http://localhost:3000/posts')
  .then((response) => response.json())
  .then(result => {
    result.forEach((item) => {
      let div = document.createElement('div');
      div.addEventListener('click', function () {
        const target = this;
        const post_id = this.children[0].innerHTML;
        const cList = document.querySelector(".comments");
        cList.innerHTML = "";
        const filterList = comments.filter(item => item.postId == post_id);
        filterList.forEach(item => {
          let div = document.createElement('div');
          let span = document.createElement('span');
          span.innerHTML = item.id;
          div.appendChild(span);
          span = document.createElement('span');
          span.innerHTML = item.content;
          div.appendChild(span);
          cList.appendChild(div);
        });
        target.appendChild(cList);
      });

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


let comments = [];
// 댓글 목록 가져오기
fetch('http://localhost:3000/comments')
  .then(reponse => reponse.json())
  .then(result => {
    comments = result;
  })
  .catch(err => console.log(err));