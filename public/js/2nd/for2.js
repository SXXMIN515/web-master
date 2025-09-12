// for.js
// 조건문 추가.
let sum = 0;
let bae2 = 0;
let bae3 = 0;
let bae6 = 0;

//console.log(parseInt(Math.random() * 100)); // 0 <= x < 100
// 1 ~ 10 까지만 범위.
for (let i=1; i<=100; i++) {
  let ranNum = parseInt(Math.random() * 10) + 1;
  // console.log(`${ranNum}`);
  if(ranNum % 2 == 0) {
    bae2 += ranNum;
  }
  if (ranNum % 3 == 0) {
    bae3 += ranNum;
  }
}
console.log(`2의 배수의 합은 ${bae2}, 3의 배수의 합은 ${bae3}`);

// 1 ~ 100 까지의 숫자중에서 2의 배수, 3의 배수 => 각각 저장.
bae2 = 0;
bae3 = 0;
bae6 = 0;
for (let i=1; i<=100; i++) {
  if(i % 2 == 0) {
    bae2 += i;
  }
  if (i % 3 == 0) {
    bae3 += i;
  }
}
console.log(`2의 배수의 합은 ${bae2}, 3의 배수의 합은 ${bae3}`);


// for (let i=1; i<=100; i++) {
//   if(i % 2 == 0) {
//     bae2 += i;
//   } else if (i % 3 == 0) {
//       bae3 += i;
//     }
// }

// for (let i=1; i<=100; i++) {
//   if (i % 6 == 0) {
//     bae6 += i;
//   }
// }
// console.log(`2의 배수의 합은 ${bae2}, 3의 배수의 합은 ${sum}`);
// sum = bae3 + bae6;


// 1 ~ 100 값중에서 3의 배수의 합을 구하도록.
sum = 0;
for(let i=1; i<=100; i++) {
  if(i % 3 == 0) {
    sum += i;
  }
}
console.log(`3의 배수의 합은 ${sum}`);

// 1 ~ 10 까지 합 => 합이 30보다 크면 출력하도록.
sum = 0;
for(let i=1; i<=10; i++) {
  sum += i;
  if (sum >= 30) {
    console.log(`현재 i의 값은 => ${i}, sum은 ${sum}`);
  }
}

for(let i=1; i<=10; i++) {
  // 짝수일 경우에만 출력.
  if (i%2 == 0) {
    console.log(`현재 i의 값은 => ${i}`);
  }
}