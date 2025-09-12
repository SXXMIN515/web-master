// function.js
// 매개값을 2개 => 1, 10 : 1~10까지 합 출력
function sumBy2Number(n1, n2) {
  let start = 0;
  let end = 0;
  let sum = 0;

  if (n1 > n2) {
    start = n2;
    end = n1;
  } else if (n1 < n2){
    start = n1;
    end = n2;
  } else {
    start = n1;
    end = n2;
  }
  for (let i=start; i<=end; i++) {
    sum += i;
  }
  // console.log(`두 숫자 사이의 합계는 ${sum}`);
  return sum; // 함수를 호출한 영역으로 값을 반환.
}
let result = sumBy2Number(50, 25);
console.log(`합계는 ${result}`);

// 매개변수(2개)
// 비교해서 큰 값 출력
function showMax(num1, num2) {
  if(num1 > num2) {
    console.log(`두 수중에서 큰값은 ${num1}`);
  } else if (num1 < num2) {
    console.log(`두 수중에서 큰값은 ${num2}`);
  }
}
showMax(100, 70);

// 구구단 3단을 콘솔에 출력하는 함수 => multiplication
function multiplication(num) {
  for (let i=1; i<=9; i++) {
    console.log(`${num} * ${i} = ${num * i}`);
  }
}
multiplication(5);