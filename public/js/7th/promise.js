// promise.js
// 콜백함수 -> 순차적으로 구성.

// 매개값을 함수.
function callFnc(x1 = 0, x2 = 0, anonymousFnc) {
  return anonymousFnc(x1, x2);
}

let result = callFnc(10, 20, function (a, b) {
  return a + b;
});

console.log(result);

const promise = new Promise(function (resolve, reject) { // new Object()
  resolve('OK');
  // reject('NG');
});

promise
  .then(function (response) {
    console.log(response);
  })
  .then(function (result) {
    console.log(result);
  })
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err);
  });