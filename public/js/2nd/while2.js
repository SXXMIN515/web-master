// while.js
// 학생점수를 입력 >> 
// while 반복을 활용해서 입력받은 학생의 총점수 구하기.
// 평균 => 총합/명
let stuSum = 0; // 점수의 합계
let count = 0; // 학생카운트
let stuAvg = 0; // 점수의 평균
while (true) {
  let stuScore = prompt("학생 점수를 입력하세요. 종료하려면 exit");
  if (stuScore == 'exit') { // 종료조건
    break;
  }
  count++;
  console.log(stuScore);
  stuSum += parseInt(stuScore);
  stuAvg = stuSum/count;
}
console.log(`학생의 총점은 ${stuSum}, 평균은 ${stuAvg}`);

// let userValue = prompt("숫자를 입력하세요. 종료하려면 exit");
// let userValue = 'exit';
// console.log(userValue == 'exit');
