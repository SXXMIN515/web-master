/*
 * variable.js
 */
let myName = "권수민"; // 문자열
let myAge = 20; // 숫자형
// let pets = ["야옹이", "멍멍이"]; // 배열
let pets = [{
  name: "야옹이",
  age: 3
}, {
  name: "멍멍이",
  age: 4
}]; // 배열 {name, age}

let myFriend = {
  name: "홍길동",
  age: 20,
  phone: "010-1234-5678",
  address: "대구 중구 100번지"
} // 객체
// console.log(myFriend.name); // 변수(객체).속성
// console.log(myFriend.age);
// 야옹이의 이름, 나이
console.log(pets[0].age);
pets[0].age = 2; // 값을 변경
console.log(pets[0].age);