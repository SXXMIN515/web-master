/*
* test.js
*/
// 학생(학생번호: 101, 학생이름: 김민수, 영어: 87, 수학: 90)
let student = {
  stuID: 101,
  stuName: "김민수",
  engScore: 87,
  mathScore: 90 
};
// 콘솔에 출력: 이름은 김민수
console.log("이름은 " + student.stuName);
// 김만수
student.stuName = "김만수";
// 콘솔에 출력: "김민수의 영어점수는 87"
console.log(student.stuName + "의 영어점수는 " + student.engScore);

// 좋아하는 과일: (사과, 복숭아, 수박)
let fruits = ["사과", "복숭아", "수박"];
// 콘솔에 출력: 내가 좋아하는 과일 첫번째: 사과
console.log("내가 좋아하는 과일 첫번째: " + fruits[0]);