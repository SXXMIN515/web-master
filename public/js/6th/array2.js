// array2.js
const xhtp = new XMLHttpRequest();
xhtp.open('get', '../5th/data.json');
xhtp.send();

xhtp.onload = function() {
  const employees = JSON.parse(xhtp.responseText);
  console.log(employees);
  // filter, map => 여자사원의 사번, 이름(성+이름) , 급여 출력
  employees
    .filter((item) => item.gender == "Female")
    .map((item) => {
      let {id, name, salary} = item;
      name = item.last_name + ' ' + item.first_name;
      return {id, name, salary};
    })
    .forEach((item) => {
      console.log(`사번: ${item.id}, 이름: ${item.name}, 급여: ${item.salary}`);
    });
};