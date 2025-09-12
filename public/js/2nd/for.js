// for.js
// 반복문.
let sum = 0;
// 3 * 1 = 3
// 3 * 2 = 6
// ...
// 3 * 9 = 27
{/* <table>
  <thead>
    <tr>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
    </tr>
  </tbody>
</table> */}
document.writeln(`<table class='table table-striped table-hover'>`);
document.writeln(`<thead>
                    <tr>
                      <th>단수</th><th></th><th>배수</th><th></th><th>결과</th>
                    </tr>
                  </thead>
                  <tbody>`);
document.writeln(``);
for (let i=1; i<=9; i=i+1) { // for 문
  document.writeln(`<tr>
                      <td> 3 </td>
                      <td> * </td>
                      <td> ${i} </td>
                      <td> = </td>
                      <td>${3 * i}</td>
                    </tr>`);
}
document.writeln(`</tbody></table>`);