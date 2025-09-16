// array.js
// 배열 메소드.
const obj = {
  name: '홍길동',
  age: 20,
  showInfo: function () {
    return `이름은 ${obj.name}, 나이는 ${obj.age}`;
  }
}

const fruits = ['사과', '복숭아']; // 배열크기 fruits.length
fruits[fruits.length] = '배';
fruits[fruits.length] = '참외';
fruits[0] = '포도'; // 첫번째 위치의 값 '사과' -> '포도'
delete fruits[0]; // 포도 -> undefined

// 메소드. 추가, 삭제(push, pop)
fruits.push('메론');
fruits.pop();
// unshift, shift
fruits.unshift('메론'); // 메론, undefined, 복숭아, 배, 참외
fruits.shift(); // [undefined, '복숭아', '배', '참외']

// splice
// 인덱스위치, 삭제할 갯수, 대체값
fruits.splice(1, 1); // [undefined, '배', '참외'] 
fruits.splice(0, 1, '사과'); // ['사과', '배', '참외']
fruits.splice(1, 0, '수박'); // ['사과', '수박', '배', '참외']
fruits.splice(1, 3, '수박'); // ['사과', '수박']

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}