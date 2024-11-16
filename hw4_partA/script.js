"use strict";

const table = document.getElementById("main-table");
const totalPay = document.getElementById("total-pay-box");
const btnStart = document.getElementById("start-btn");

const fixedRate = 15;
const maxTime = 40;
const fullTime = fixedRate * maxTime;
const overTime = fixedRate * 1.5;
const arr1 = [null];

let totalSum = 0;

const weeklySalary = (hour) => {
  if (hour <= maxTime) {
    return hour * fixedRate;
  } else {
    return fullTime + overTime * Math.abs(maxTime - hour);
  }
};

const addPayroll = function (employee, hour, salary) {
  table.innerHTML += `<tr><th>${employee}</th><th>${hour}</th><th>${salary}</th></tr>`;
};

btnStart.addEventListener("click", function () {
  let employeeCounter = arr1.length - 1 > 2 ? arr1.length - 1 : 0;
  while (true) {
    let employHour = +prompt("Enter salary for employee: ");
    if (isNaN(employHour) || employHour <= 0) {
      break;
    } else {
      arr1.push(weeklySalary(employHour));
      employeeCounter += 1;
      totalSum += arr1[employeeCounter];
      addPayroll(employeeCounter, employHour, arr1[employeeCounter]);
    }
  }
  totalPay.textContent = `The total pay is: ${totalSum}`;
});
