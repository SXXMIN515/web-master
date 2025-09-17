// scope.js
// 전역(global) vs. 지역(local)
// 블럭단위 변수
// var & let, const

var myAge = 20;

function showAge() {
  var myAge = 22;
  console.log(myAge + 1);
}
showAge();

{
  var myAge = 10;
  myAge += 1;
}

console.log(myAge + 1);