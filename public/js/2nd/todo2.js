// todo.js

// 2개의 값을 입력받도록 화면구성 input 태그 두개로 값 받고 input 태그 하나에 결과값
// 계산하는 기능 구현.
// 연산(+, -, *, /)
// 함수 이름(plus, minus, multiply, divide)

function calculate() {
  let n1 = document.querySelector('#n1').value;
  let n2 = document.querySelector('#n2').value;
  let opr = document.querySelector('#opr').value;
  let result = 0;

  switch (opr) {
    case '+' :
      result = plus(n1, n2);
      break;
    case '-' :
      result = minus(n1, n2);
      break;
    case '*' :
      result = multiply(n1, n2);
      break;
    case '/' :
      result = divide(n1, n2);
  }

  document.querySelector('#result').value = result;
}

function plus(n1, n2) {
  return parseInt(n1) + parseInt(n2);
}

function minus(n1, n2) {
  return parseInt(n1) - parseInt(n2);
}

function multiply(n1, n2) {
  return parseInt(n1) * parseInt(n2);
}

function divide(n1, n2) {
  return parseInt(n1) / parseInt(n2);
}