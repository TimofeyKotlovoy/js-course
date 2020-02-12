'use strict';

let money = prompt("Ваш бюджет на месяц?", ""),
    time  = prompt("Введите дату в формате YYYY-MM-DD", ""),
    exp = prompt('Введите обязательную статью расходов в этом месяце', ""),
    cost = prompt('Во сколько обойдется?', "");
let appData = {
    budget: money,
    timeData: time,
    expenses: {
        exp: cost
    },
    optionalExpenses: {},
    income: [],
    savings: false
};
console.log(appData);
let oneDayBudget = money/30;
alert("Бюджет на 1 день: " + oneDayBudget);