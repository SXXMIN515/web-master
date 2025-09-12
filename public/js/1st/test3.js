/*
* test3.js
*/
// prompt함수를 활용. 2개의 숫자값을 입력
// 2수의 합이 3의 배수인지 / 3의 배수가 아닌지 판별
// 3의 배수입니다 or 3의 배수가 아닙니다
// "3" -> 3
let num1 = prompt("첫번째 숫자를 입력하세요");
let num2 = prompt("두번째 숫자를 입력하세요");
// let result = parseInt(num1) + parseInt(num2);
let result = parseFloat(num1) + parseFloat(num2);
// 정수(1,2,3,.....,10) - 실수(1.1, 3.456)
if (result % 3 == 0) {
  console.log(result +"는 3의 배수입니다");
} else {
  console.log(result + "는 3의 배수가 아닙니다");
}
console.log(result);
console.log("여기 수정됨");
