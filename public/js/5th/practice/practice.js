// practice.js

// 문제: 다음과 같은 피라미드 모양을 출력해보세요.
// 출력 예:
//     *
//    ***
//   *****
//  *******
// *********

for (let i = 0; i < 5; i++) {
  let line = '';
  for (let j = 0; j < i; j++) {
    line += ' ';
  }
  for (let k = 0; k < 9 - 2 * i; k++) {
    line += '*';
  }
  console.log(line);
}