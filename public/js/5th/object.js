// object.js
let obj = {};
let obj2 = obj;
console.log(obj == obj2);

let obj3 = {};

obj.name = 'Hong';
obj.age = 20;

obj3.name = 'Hong';
obj3.age = 20;

console.log(obj == obj3); // 다른 주소 값을 가지고 있기 때문에 false

// 원시 데이터 타입. 실제 변수에 값을 가지고 있음.
let str1 = 'Hong';
let str2 = 'Hong';

let ary = [];
console.log(typeof ary);

str1 = 10;
str2 = '10';

console.log(str1 === str2); // === 데이터 타입까지 비교하는 연산자

// 함수 정의식 vs 함수 표현식
// function sum(num1, num2) {
//   return num1 + num2;
// }

// 줄인 표현식 => 화살표 함수.
const sum = (num1 = 0, num2 = 0) => num1 + num2;
console.log(sum(sum(1, 2), sum(2)));

// [23, 10, 17, 45].forEach((item) => console.log(item));