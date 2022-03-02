'use strict';

const formElement = document.querySelector('.form');
const radioElement = document.querySelectorAll('input[type="radio"]');
const inputBillElement = document.querySelector('.bill');
const inputPeopleNumber = document.querySelector('.people');
const inputCustomTipElement = document.querySelector('.custom');
const tipAmountElement = document.querySelector('.summary__amountText');
const totalPerPaxElement = document.querySelector('.summary__totalText');
const btnElementReset = document.querySelector('.btn');

let tip = [];

// Click event: Tip Percentage
radioElement.forEach(radEl => {
  radEl.addEventListener('click', e => {
    const tipPercentage = +e.target.value / 100;

    return tip.push(tipPercentage);
  });
});

// Click event: Reset button
btnElementReset.addEventListener('click', () => {
  inputBillElement.value = '';
  inputPeopleNumber.value = '';
  inputCustomTipElement.value = '';
  tipAmountElement.textContent = '$0.00';
  totalPerPaxElement.textContent = '$0.00';
});

form.addEventListener('submit', e => {
  const billValue = +inputBillElement.value;
  const numberOfPeople = +inputPeopleNumber.value;

  const [tipRate] = tip.slice(-1);
  const interest = billValue * tipRate;

  // Formula to get tipAmount and totalPerPax
  const tipAmount = interest / numberOfPeople;
  const total = (interest + billValue) / numberOfPeople;

  tipAmountElement.textContent = tipAmount.toFixed(2);
  totalPerPaxElement.textContent = total.toFixed(2);

  e.preventDefault();
});
