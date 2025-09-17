// todo.js
// 반복문 활용해서 출력.

// *
// **
// ***
// ****
// *****

let stars = '';
for (let s = 1; s <= 5; s++) {
  stars += '*';
  console.log(stars);
}

// *****
//  ****
//   ***
//    **
//     *

for (let i = 0; i <= 4; i++) {
  let line = '';
  for (let j = 0; j < i; j++) {
    line += ' ';
  }
  for (let k = 0; k < 5 - i; k++) {
    line += '*';
  }
  console.log(line);
}