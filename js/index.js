function getInputValueById(id) {
  return parseFloat(document.getElementById(id).value);
}

function showError(id) {
  document.getElementById(id).classList.remove("hidden");
}

// getting all the  value
let count = 0;
const calculateButton = document.getElementById("calculate");
calculateButton.addEventListener("click", function () {
  count += 1;
  // const income = parseFloat(document.getElementById("income").value);

  // const software = parseFloat(document.getElementById("software").value);
  // const courses = parseFloat(document.getElementById("courses").value);
  // const internet = parseFloat(document.getElementById("internet").value);
  // get value from function
  const income = getInputValueById("income");
  const software = getInputValueById("software");
  const courses = getInputValueById("courses");
  const internet = getInputValueById("internet");

  if (income <= 0 || isNaN(income)) {
    // document.getElementById("income-error").classList.remove("hidden");
    showError("income-error");
    return;
  }
  if (software <= 0 || isNaN(software)) {
    showError("software-error");
  }
  if (totalExpenses > income) {
    showError("logic-error");
  }
  //   console.table({ income, software, courses, internet });
  const totalExpenses = software + courses + internet;
  const balance = income - totalExpenses;
  //   where to show the value of input field
  const totalExpensesElement = document.getElementById("total-expenses");
  totalExpensesElement.innerText = totalExpenses.toFixed(2);

  const balanceElement = document.getElementById("balance");
  balanceElement.innerText = balance.toFixed(2);

  const result = document.getElementById("results");
  result.classList.remove("hidden");
  // history
  const historyItem = document.createElement("div");
  historyItem.className =
    "bg-white p-3 rounded-md border-l-2 border-indigo-500";
  historyItem.innerHTML = `
    <p>Serial: ${count}</p>
  <p class='text-xs text-gray-500'> ${new Date().toLocaleDateString()}</p>
    <p>Income: ${income.toFixed(2)}</p>
    <p>Expenses: ${totalExpenses.toFixed(2)}</p>
    <p>Balance: ${balance.toFixed(2)}</p>
    `;
  const historyContainer = document.getElementById("history-list");
  historyContainer.insertBefore(historyItem, historyContainer.firstChild);
});

const calculateSavingButton = document.getElementById("calculate-savings");
calculateSavingButton.addEventListener("click", function () {
  const savingPercentage = parseFloat(document.getElementById("savings").value);
  const income = parseFloat(document.getElementById("income").value);
  const software = parseFloat(document.getElementById("software").value);
  const courses = parseFloat(document.getElementById("courses").value);
  const internet = parseFloat(document.getElementById("internet").value);

  const totalExpenses = software + courses + internet;
  const balance = income - totalExpenses;

  const savingAmount = (savingPercentage * balance) / 100;

  const remainingBalance = balance - savingAmount;
  const savingElement = document.getElementById("savings-amount");
  savingElement.innerText = savingAmount.toFixed(2);

  const remaingElement = document.getElementById("remaining-balance");
  remaingElement.innerText = remainingBalance.toFixed(2);
});

// history tab functionality
const historyTab = document.getElementById("history-tab");
const assistantTab = document.getElementById("assistant-tab");
historyTab.addEventListener("click", function () {
  historyTab.classList.add(
    "text-white",
    "bg-gradient-to-r",
    "from-blue-500",
    "to-purple-600"
  );
  historyTab.classList.remove("text-gray-600");
  assistantTab.classList.remove(
    "text-white",
    "bg-gradient-to-r",
    "from-blue-500",
    "to-purple-600"
  );
  assistantTab.classList.add("text-gray-600");
  document.getElementById("expense-form").classList.add("hidden");
  document.getElementById("history-section").classList.remove("hidden");
});

assistantTab.addEventListener("click", function () {
  assistantTab.classList.add(
    "text-white",
    "bg-gradient-to-r",
    "from-blue-500",
    "to-purple-600"
  );
  historyTab.classList.remove(
    "text-white",
    "bg-gradient-to-r",
    "from-blue-500",
    "to-purple-600"
  );

  document.getElementById("expense-form").classList.remove("hidden");
  document.getElementById("history-section").classList.add("hidden");
});
