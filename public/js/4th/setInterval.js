// setInterval.js
document.querySelector('table').remove();

// sample data.
let str = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, possimus nemo voluptatum temporibus iste iusto neque minima ipsam officia sed doloremque molestias quisquam, praesentium aut porro ipsa sit reprehenderit laborum.`;
let strAry = str.split(' '); // 구분자(' ')를 기준으로 문자열 배열로 생성.
const outer = document.querySelector('div.outer');

// 화면 출력.
strAry.forEach(function (item, idx, ary) {
  let div = document.createElement("div");
  div.innerText = item;
  div.setAttribute("class", "inner"); // <div class="inner">Lorem</div>
  outer.appendChild(div);
});

const timer = document.querySelector('#timer');
let timing = 60;

// 이벤트(찾기 버튼 클릭하면 alert('클릭'))
document.querySelector('button#search_word')
  .addEventListener('click', function () {
    let search = document.querySelector('#user_value').value;
    // 삭제할 값을 찾아서 "같은 값이 있습니다" / "찾는 값이 없습니다"
    // 사용자 입력값을 비워주기
    // document.querySelector('#user_value').value = '';
    let is_exist = false;
    document.querySelectorAll('div.inner')
      .forEach(function (item) {
        // console.log(item); // <div class="inner">Lorem</div>
        // console.log(item.innerText); // Lorem
        // 입력값이 div의 innerText값과 같은지 비교.
        if (search == item.innerText) {
          item.remove();
          is_exist = true;
        }
      });
    if (is_exist) {
      alert('같은 값이 있습니다');
    } else {
      alert('찾는 값이 없습니다');
    }
    document.querySelector('#user_value').value = '';
    console.log(document.querySelectorAll('div.inner').length);
    //document.querySelectorAll('div.inner').length == 0
    if (timing >= 0 && document.querySelectorAll('div.inner').length == 0) {
      alert('성공');
    }
  });

let isFailed = false;
setInterval(function () {
  timing--;

  if (document.querySelectorAll('div.inner').length == 0) {
    timer.innerText = '성공';
    return;
  }

  if (timing < 0) {
    timer.innerText = '실패';
  } else {
    timer.innerText = `남은 시간: ${timing}초`;
  }

  if (!isFailed && timing < 0 && document.querySelectorAll('div.inner').length > 0) {
    alert('실패');
    isFailed = true;
  }
}, 1000);