// member.js
console.log('start');
//http://localhost:3000/member => json데이터.
fetch("http://localhost:3000/member/ALL/ALL/-1")
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    result.forEach((item) => {
      let tr = makeRow(item);
      document.querySelector("#list").appendChild(tr);
    });
  })
  .catch((err) => console.log(err));