// while.js
// 반복문.
// 1 ~ 10 까지 콘솔출력 
let i = 1;
while (i <= 10) { // while 블럭
  console.log(`현재 i의 값은 => ${i}`);
  i++;
}

// 조건만족할 동안만 실행.
while(true) {
  let rv = parseInt(Math.random() * 10);
  console.log(`임의의 값 => ${rv}`);
  if(rv == 0) {
    break; // while 구문종료.
  }
}
console.log('end of prog.');