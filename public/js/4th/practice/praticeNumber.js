// practice.js
let datas = [];

for (let i = 0; i < 10; i++) {
  let ranNum = Math.floor(Math.random() * 50) + 1; // 1~50 사이 정수
  datas.push(ranNum);
}

datas.forEach(function (item) {
  const outer = document.querySelector('.outer');
  const div = document.createElement('div');
  div.innerText = item;
  div.setAttribute('class', 'inner');
  outer.appendChild(div);
});

let timing = 60;
document.querySelector('#delete')
  .addEventListener('click', function () {
    let search = document.querySelector('#search').value;

    let is_exist = false;
    document.querySelectorAll('div.inner')
      .forEach(function (item) {
        if (search == item.innerText) {
          item.remove();
          is_exist = true;
        }
      });
    if (is_exist) {
      alert('같은 숫자가 있습니다');
    } else {
      alert('찾는 숫자가 없습니다');
    }

    document.querySelector('#search').value = '';


    if (timing >= 0 && document.querySelectorAll('div.inner').length == 0) {
      alert("성공");
    }
  });

isFailed = false;
setInterval(function () {
  timing--;

  if (!isFailed && timing < 0 && document.querySelectorAll('div.inner').length > 0) {
    alert("실패");
    isFailed = true;
  }
}, 1000);