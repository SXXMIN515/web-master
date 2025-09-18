// string.js
let name = 'Hong';
let age = 20;
let result = "";

if (age >= 20) {
  result = "성인";
} else {
  result = "미성년";
}

result = age >= 20 ? "성인" : "미성년";

console.log(`내 이름은 ${name == 'Hong'}, ${result}`);

// indexOf('매개값')
let idx = 'Hello, World'.indexOf('W'); // 7 반환


idx = "김성태, 박명식, 홍길동".indexOf("박명석"); // -1 반환.
console.log(idx);

let myFriends = ["김성태", "박명식", "홍길동"];

myFriends.forEach((item, idx, ary) => {
  if (item.indexOf("박") == 0) { //  item == '박명식'
    console.log(item);
  }
});
// 원시데이터형. string, number, boolean,

// 문자열 <-> 문자객체 new String("Hello");

// slice
console.log('pizza, orange, cereals'.slice(-7).toUpperCase());
console.log('pizza, orange, cereals'.substring(0, 5).toLowerCase());

// charAt()
console.log("Hello, World".charAt(7));

// replace()
console.log("Hello, World".replace("W", "w"));

// trim()
console.log("       Hello      ".trim());

const code = "ABCDEFG";
code.startsWith("ABG");

// 1번. 성별판별 함수.
function getGender(no) {
  // 주민번호의 성별(뒷자리7중에 1번째 값) => 1,3 남/ 2,4 여
  let pos = -1; // 성별위치
  pos = no.length == 14 ? 7 : 6;
  console.log(no.charAt(pos));
  if (no.charAt(pos) == 1 || no.charAt(pos) == 3) {
    console.log("남성입니다.");
  } else if (no.charAt(pos) == 2 || no.charAt(pos) == 4) {
    console.log("여성입니다.");
  }
  // let gender = no.slice(-7).slice(0, 1);
  // if (gender == '1' || gender == '3') {
  //   console.log("남성입니다.");
  // } else if (gender == '2' || gender == '4') {
  //   console.log("여성입니다.");
  // }
}

const numAry = ["990101-1237874", "030303-3234545", "9803042324567"];
// console.log(numAry[0].slice(-7).startsWith("1"));
numAry.forEach((item) => {
  getGender(item);
});

// 2번. 사용자 아이디 확인.
function getId(mail) {
  // 메일주소에서 아이디 부분을 반환.
  let pos = mail.indexOf("@");
  console.log(mail.substring(0, pos));
  // console.log(mail.slice(0, pos))
}
const emails = [
  "ldubarrye@oracle.com",
  "ddgsg@smumd.com",
  "kdjkk33@wiley.com",
  "sgdgsggs@marketwatch.com"
];
console.log(emails[0].indexOf("@"));
emails.forEach((item) => {
  getId(item);
});