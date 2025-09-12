/*
* operator.js
*/
let num1 = 10; // 변수를 초기화
let num2 = 20; 
let result;
result = num1 + num2;
console.log("결과는 " + result); // 결과는 30
console.log("결과는 " + num1 + num2); // 결과는 "10"+"20" =>1020
console.log("결과는 " + (num1 + num2)); // 결과는 30
console.log(num1 + num2 + "입니다"); // 30입니다

num1 = 425;
result = num1 % num2;
console.log('나머지 ' + result);
num1 = 3;
console.log(num1 % 2); // 짝수/홀수 구분

result = num1 % 2 == 0; // false

// 조건문 num1 < num2 => true/false 결과값
if (result) {
  console.log("짝수입니다."); // 실행 X
}

if (num1 % 2 == 1) {
  console.log("홀수입니다."); // 실행 O
}