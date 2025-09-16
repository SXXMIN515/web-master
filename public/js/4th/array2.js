// array2.js

const numAry = []; // new Array();
numAry.push(10); // [10]
// numAry = []; // const 상수는 재할당이 불가.
numAry.push(25); // [10, 25]

numAry.push(34); // [10, 25, 34]
numAry.unshift(47); // [47, 10, 25, 34]
numAry.splice(2, 0, 33); // [47, 10, 33, 25, 34]
numAry.splice(2, 0, 22, 19); // [47, 10, 22, 19, 33, 25, 34]

// 배열의 요소, 인덱스위치, 배열
let sum = 0;
numAry.forEach(function (item, idx, ary) {
  // 홀수인 요소 합계
  // if (item % 2 == 1) {
  //   console.log(item);
  //   sum += item;
  // }
  // 짝수 인덱스 합계
  // if (idx % 2 == 0) {
  //   console.log(item);
  //   sum += item;
  // }
  // 첫번째, 마지막값 합계
  if (idx == 0 || idx == ary.length - 1) {
    console.log(item);
    sum += item;
  }
});

console.log(`sum의 값은 ${sum}`);