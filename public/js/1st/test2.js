/*
* test2.js
*/

let friend1 = {
  name: "박규태",
  height: 180
};

let friend2 = {
  name: "김민식",
  height: 180
};

// 박규태가 김민식보다 크냐?
// 박규태가 크다 vs 박규태가 작다.
if(friend1.height > friend2.height) {
  console.log(friend1.name + "(이)가 크다");
}
if(friend1.height < friend2.height) {
  console.log(friend2.name + "(이)가 크다");
}
if(friend1.height == friend2.height) {
  console.log("두 사람의 키가 동일하다.");
}

let num3 = prompt("숫자를 입력하세요: ");
console.log(num3); // 사용자의 입력값 => 홀수/짝수 출력
// if ... else ...
if(num3 % 2 == 1) { // 조건만족
  console.log("홀수입니다");
} else { // 조건이외의 경우
  console.log("짝수입니다");
}

// if(num3 % 2 == 0) {
//   console.log("짝수입니다");
// };