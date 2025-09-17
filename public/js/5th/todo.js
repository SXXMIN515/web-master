// todo.js
// 반복문 활용해서 출력.

// *
// **
// ***
// ****
// *****

let star = '';
for (let i = 1; i <= 5; i++) {
  star += '*';
  console.log(star);
}

// *****
//  ****
//   ***
//    **
//     *

star = '';
let space = '';
for (let i = 1; i <= 5; i++) {
  space += ' ';
  console.log(space);
  for (let j = 1; i <= 5; i++) {
    star += '*';
    console.log(star);
  }
}