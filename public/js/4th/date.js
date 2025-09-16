// date.js
const now = new Date();
console.log(now.toLocaleDateString() + now.toLocaleTimeString()); // 오늘 날짜, 시간 출력

let today = new Date('2025-09-14 10:30:30');
today.setFullYear(2024); // 지정
today.setMonth(9);
console.log(today.toLocaleDateString() + today.toLocaleTimeString());

console.log('월:' + (today.getMonth() + 1)); // 0: 1월, 1: 2월, ......, 11: 12월
console.log('일:' + today.getDate());
console.log('요일:' + today.getDay()); // 0: 일, 1: 월, 2: 화, ..... , 6: 토

// 날짜 입력 하면 '2025-11-12' => 요일정보를 반환해주는 함수.
function translateDay(userDate) {
  // 일(0) 월(1) 화(2) 수(3) 목(4) 금(5) 토(6)
  let dayAry = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  // 날짜 -> 요일 반환
  let date = new Date(userDate);
  let day = date.getDay();
  // console.log(day); // 요일 출력
  return userDate + '은 ' + dayAry[day] + '입니다.';
}

console.log(translateDay('2025-09-16'));