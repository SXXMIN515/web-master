// todo.js

// 등록
function newElement() {
  let txt = document.getElementById('myInput').value;
  // 생성할 html
  let cloned = document.querySelector('#myUL>li').cloneNode(true); // li태그 복제.
  let spand = cloned.querySelector('span');
  // cloned.className = ''; // 클래스 전체 삭제
  // cloned.className = 'btn btn-primary checked'; // 클래스 관리.
  cloned.classList.remove('checked'); // cloned.classList.add("checked")
  cloned.innerHTML = txt;
  cloned.appendChild(spand);
  console.log(cloned);
  document.querySelector('#myUL').appendChild(cloned);

  // 삭제
  document.querySelector('#myUL').addEventListener('click', function (e) {
    if (e.target.classList.contains('close')) {
      e.target.parentElement.remove();
    }
  });
}

function newElement1() {
  let myInput = document.querySelector('#myInput').value;
  let li = document.createElement('li');
  let span = document.createElement('span');
  li.innerHTML = myInput;
  span.innerHTML = 'X';
  span.setAttribute('class', 'close');
  li.appendChild(span);
  document.querySelector('#myUL').appendChild(li);

  document.querySelectorAll('span.close').forEach((item) => {
    item.addEventListener('click', function (e) {
        e.stopPropagation(); // 이벤트의 전파 차단.
        item.parentElement.remove();
      }, true // bubbling (하위->상위), capturing(상->하)
    );
  });
};

// 삭제
// document.querySelector('#myUL').addEventListener('click', function (e) {
//   if (e.target.classList.contains('close')) {
//     e.target.parentElement.remove();
//   }
// });

// 삭제 span1
document.querySelectorAll('span.close').forEach((item) => {
  item.addEventListener('click', function (e) {
      e.stopPropagation(); // 이벤트의 전파 차단.
      item.parentElement.remove();
    }, true // bubbling (하위->상위), capturing(상->하)
  );
});

// 상태 변경
document.querySelectorAll('ul>li').forEach((item) => {
  item.addEventListener('click', function (e) {
      // e.stopPropagation(); // e.preventDefault (기본기능 차단)
      console.log(item.getAttribute('class'));
      if (!item.getAttribute('class')) {
        item.setAttribute('class', 'checked');
      } else {
        item.setAttribute('class', '');
      }
    }
    // ,true
  );
});