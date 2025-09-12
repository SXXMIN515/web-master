// todo.js

// 2개의 값을 입력받도록 화면구성 input 태그 두개로 값 받고 input 태그 하나에 결과값
// 계산하는 기능 구현.
// 연산(+, -, *, /)
// 함수 이름(plus, minus, multiply, divide)
let n1 = document.querySelector('#n1').value;
let n2 = document.querySelector('#n2').value;
let result = 0;

function calculate() {
  let opr = document.querySelector('#opr').value;
  switch (opr) {
    case '+' :
      plus();
      break;
    case '-' :
      minus();
      break;
    case '*' :
      multiply();
      break;
    case '/' :
      divide();
  }
}

function plus(n1, n2) {
  result = n1 + n2;
}
function minus(n1, n2) {
  result = n1 - n2;
}
function multiply(n1, n2) {
  result = n1 * n2;
}
function divide(n1, n2) {
  result = n1 / n2;
}

result = document.querySelector('#result').value;