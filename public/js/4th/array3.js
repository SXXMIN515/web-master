// array3.js
// 객체.
const friends = [{
  name: '김우진',
  phone: '010-1111-2222'
}];

friends.push({
  name: '박은식',
  phone: '010-2222-3333'
});

friends.push({
  name: '김우식',
  phone: '010-3333-4444'
});

// let search = prompt('연락처를 찾을 친구의 이름을 입력> ');
// forEach
let search;
friends.forEach(function (item, idx, ary) {
  if (item.name == search) {
    console.log(`이름은 ${item.name}`); // 이름은 박은식
  }
});

// data 사원정보
// 1. 급여가 5000 이상의 사원 출력. "이름, 급여"
// 2. 남자사원들만 maleAry에 추가.
const maleAry = [];

data.forEach(function (item, idx, ary) {
  // 1.
  // if (item.salary >= 5000) {
  //   console.log(`이름은 ${item.first_name}, 급여는 ${item.salary}`);
  // }
  // 2.
  if (item.gender == 'Male') {
    maleAry.unshift(item);
  }
});
// sort 정렬 // 급여 오름차순 정렬
maleAry.sort(function (a, b) {
  if (a.salary < b.salary) {
    return -1;
  } else {
    return 1;
  }
});

console.log(maleAry);

console.log([10, 34, 23, 1, 100].sort(function (a, b) {
  if (a < b) {
    return -100;
  } else {
    return 100;
  }
}));