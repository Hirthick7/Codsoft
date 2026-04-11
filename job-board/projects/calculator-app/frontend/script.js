const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentValue = '';
let previousValue = '';
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  if (currentValue !== '' && previousValue !== '' && operator !== null) {
    display.textContent = `${previousValue}${operator}${currentValue}`;
  } else if (currentValue !== '') {
    display.textContent = currentValue;
  } else if (previousValue !== '' && operator !== null) {
    display.textContent = `${previousValue}${operator}`;
  } else if (previousValue !== '') {
    display.textContent = previousValue;
  } else {
    display.textContent = '0';
  }
}

function appendNumber(number) {
  if (shouldResetDisplay) {
    currentValue = '';
    shouldResetDisplay = false;
  }

  if (number === '.' && currentValue.includes('.')) return;
  if (number === '.' && currentValue === '') {
    currentValue = '0.';
    return;
  }

  currentValue += number;
}

function chooseOperator(selectedOperator) {
  if (currentValue === '') return;

  if (previousValue !== '' && operator !== null) {
    compute();
  }

  operator = selectedOperator;
  previousValue = currentValue;
  currentValue = '';
}

async function compute() {
  if (operator === null || previousValue === '' || currentValue === '') return;

  try {
    const response = await fetch('/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        left: previousValue,
        right: currentValue,
        operator,
      }),
    });

    const data = await response.json();
    if (!response.ok || data.error) {
      currentValue = 'Error';
    } else {
      currentValue = data.result;
    }
  } catch (error) {
    currentValue = 'Error';
  }

  operator = null;
  previousValue = '';
  shouldResetDisplay = true;
}

function clearCalculator() {
  currentValue = '';
  previousValue = '';
  operator = null;
  shouldResetDisplay = false;
}

function deleteLast() {
  if (shouldResetDisplay || currentValue === 'Error') {
    currentValue = '';
    shouldResetDisplay = false;
    return;
  }

  currentValue = currentValue.slice(0, -1);
}

buttons.forEach(button => {
  button.addEventListener('click', async () => {
    const number = button.dataset.number;
    const action = button.dataset.action;

    if (number !== undefined) {
      appendNumber(number);
      updateDisplay();
      return;
    }

    if (action === 'operator') {
      chooseOperator(button.textContent);
      updateDisplay();
      return;
    }

    if (action === 'equals') {
      await compute();
      updateDisplay();
      return;
    }

    if (action === 'clear') {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (action === 'delete') {
      deleteLast();
      updateDisplay();
      return;
    }
  });
});

updateDisplay();