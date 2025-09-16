// practice.js
let datas = `red green blue yellow purple`;
let colors = datas.split(' ');

const outer = document.querySelector('.outer');

colors.forEach(function (item) {
  let div = document.createElement('div');
  div.innerText = item;
  div.setAttribute('class', 'inner');
  outer.appendChild(div);
});

let timing = 30;

document.querySelector('button#delete')
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
      alert('같은 색상이 있습니다.');
    } else {
      alert('찾는 색상이 없습니다');
    }

    document.querySelector('#search').value = '';
    // console.log(document.querySelectorAll('div.inner').length);
    if (timing >= 0 && document.querySelectorAll('div.inner').length == 0) {
      alert('성공');
    }
  });

let isFailed = false;
setInterval(function () {
  timing--;

  if (!isFailed && timing < 0 && document.querySelectorAll('div.inner').length > 0) {
    alert('실패');
    isFailed = true;
  }
}, 1000);