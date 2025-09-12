// function.js
// 함수: 코드의 묶음.
// 반복되는 기능.
// 전역(global) 변수.
let n1 = 10;
let n2 = 20; 

// 10 + 5, 콘솔출력 : 기능을 정의.
function sum(n1, n2) { // 매개 변수 sum함수의 지역(local).
  let result = n1 + n2; // 지역 변수.
  console.log(`결과는 ${result}`);
}

sum(n1, n2);