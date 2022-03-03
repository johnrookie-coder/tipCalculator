'use strict';

const formElement = document.querySelector('.form');
const userInput = document.querySelectorAll('.user__input');
const radioElement = document.querySelectorAll('input[type="radio"]');
const inputBillElement = document.querySelector('.bill');
const inputPeopleNumber = document.querySelector('.people');
const inputCustomTipElement = document.querySelector('.custom');
const tipAmountElement = document.querySelector('.summary__amountText');
const totalPerPaxElement = document.querySelector('.summary__totalText');
const btnElementReset = document.querySelector('.btn');

let tip = [];

// Splitter Computation
const splitterComputation = () => {
  const billValue = numbersOnly(inputBillElement.value);
  const numberOfPeople = numbersOnly(inputPeopleNumber.value);
  const customTip = numbersOnly(inputCustomTipElement.value);

  let tipRate = tip.length !== 0 ? tip[0] : customTip / 100;
  const interest = billValue * tipRate;

  // Formula to get tipAmount and totalPerPax
  const tipAmount = interest / numberOfPeople;
  const total = (interest + billValue) / numberOfPeople;

  if (billValue !== 0 && numberOfPeople !== 0 && tipRate !== 0) {
    tipAmountElement.textContent = tipAmount.toFixed(2);
    totalPerPaxElement.textContent = total.toFixed(2);
  }

  // If the inputBillElement is empty, show error message
  if (billValue === 0) {
    inputBillElement.classList.add('error');
    inputBillElement.parentElement.parentElement.children[0].children[0].classList.add(
      'err'
    );
  }

  // If the inputPeopleNumber is empty, show error message
  if (numberOfPeople === 0) {
    inputPeopleNumber.classList.add('error');
    inputPeopleNumber.parentElement.parentElement.children[0].children[0].classList.add(
      'err'
    );
  }

  // If any of the checkbox remains unchecked, display an error message
  if (tipRate === 0) {
    radioElement.forEach(radio => {
      radio.parentElement.parentElement.parentElement.children[0].children[0].classList.add(
        'err'
      );
    });
  } else {
    radioElement.forEach(radio => {
      radio.parentElement.parentElement.parentElement.children[0].children[0].classList.remove(
        'err'
      );
    });
  }
};

// Removes unnecessary special characters
const numbersOnly = function (str) {
  const formattedNumber = str.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');

  return +formattedNumber;
};

// Click event: For each tip percentage
radioElement.forEach(radEl => {
  radEl.addEventListener('click', e => {
    const tipPercentage = +e.target.value / 100;

    // When any of the checkboxes has been clicked, set the custom input value to zero.
    inputCustomTipElement.value = '';

    // Remove arrays pre-existing value
    tip.pop();
    tip.push(tipPercentage);

    splitterComputation();
  });
});

// Click event: Reset button
btnElementReset.addEventListener('click', () => {
  // Input element reset
  inputBillElement.value = '';
  inputPeopleNumber.value = '';
  inputCustomTipElement.value = '';

  // Summary text content reset
  tipAmountElement.textContent = '$0.00';
  totalPerPaxElement.textContent = '$0.00';

  // Unchecked all radio buttons
  radioElement.forEach(radEl => {
    radEl.checked = false;
  });
});

// Clear error messages
const clearCustomError = () => {
  // Clear input bill error message
  inputBillElement.classList.remove('error');
  inputBillElement.parentElement.parentElement.children[0].children[0].classList.remove(
    'err'
  );

  // Clear input number of people error message
  inputPeopleNumber.classList.remove('error');
  inputPeopleNumber.parentElement.parentElement.children[0].children[0].classList.remove(
    'err'
  );
};

// Input event: All input fields
userInput.forEach(input => {
  input.addEventListener('input', e => {
    clearCustomError();

    // If custom inputs have value, unchecked the checkbox
    if (e.target.classList[0].includes('custom')) {
      // Unchecked all radio buttons
      radioElement.forEach(radEl => {
        radEl.checked = false;
      });

      // When custom tip input has been clicked, removes values from the tip array
      tip.pop();
    }
  });
});

// Submit event: Form
form.addEventListener('submit', e => {
  splitterComputation();
  e.preventDefault();
});

// Todo: Tablet view
// 912PX, 820PX, 768PX
