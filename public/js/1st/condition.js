/*
* condition.js
*/
console.log("연산자 커밋 이후");
function calculate(){
  let first = document.querySelector("#user1").value; // 문자열 숫자
  let last = document.querySelector("#user2").value; // 문자열 숫자

  let opr = document.querySelector("#oper").value; // 연산자 구하기
  let result = 0; // 결과값을 저장.
  console.log(first, last, opr);

  // 조건문
  switch(opr) {
    case '+':
      result = parseInt(first) + parseInt(last);
      break; // 아래부분으로 진행하는 것을 break.
    case '-':
      result = first - last;
      break;
    case '*':
      result = first * last;
      break;
    case '/':
      result = first / last;
  }

  if (opr == '+') {
    result = parseInt(first) + parseInt(last);
  } else if (opr == '-') {
    result = first - last;
  } else if (opr == '*') {
    result = first * last;
  } else {
    result = first / last;
  }

  document.querySelector('#result').value = result;
} // end of calculate().