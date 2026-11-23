function renderExpenseOverview() {
  document.getElementById("totalExpenses").textContent =
    "$" + expenseData.totalExpenses;
  document.getElementById("income").textContent = "$" + user.income;
  document.getElementById("balance").textContent =
    "$" + (user.income - expenseData.totalExpenses);
}

function renderExpenseSummary() {
  const summaryTableBody = document.querySelector("#expense-summary tbody");
  summaryTableBody.innerHTML = "";
  expenseSummaryData.forEach(function (expenseCat) {
    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    cell1.textContent = expenseCat.categoryName;
    row.appendChild(cell1);
    const cell2 = document.createElement("td");
    cell2.textContent = expenseCat.percentage;
    row.appendChild(cell2);
    summaryTableBody.appendChild(row);
  });
}

function updateDateFormat(date) {
  const d1 = new Date(date);
  const month = d1.toLocaleString("en-us", { month: "short" });
  const day = d1.getDate();
  const dayOfWeek = d1.toLocaleString("en-us", { weekday: "short" });
  return `${month} ${day}, ${dayOfWeek}`;
}

function renderExpenseData() {
  const expenses = expenseData.expenses;
  const tableBody = document.querySelector("#expenseTable tbody");
  tableBody.innerHTML = "";
  expenses.forEach(function (expense) {
    const row = document.createElement("tr");

    /** Date column **/
    const cell1 = document.createElement("td");
    cell1.textContent = updateDateFormat(expense.date);
    cell1.className = "text-nowrap";
    row.appendChild(cell1);

    /** Description column **/
    const cell2 = document.createElement("td");
    cell2.textContent = expense.description;
    row.appendChild(cell2);

    /** Amount column **/
    const cell3 = document.createElement("td");
    cell3.textContent = "$" + expense.amount;
    row.appendChild(cell3);

    /** Edit and Delete icons **/
    const cell4 = document.createElement("td");
    cell4.innerHTML =
      '<a href="#" class="me-2 edit expButton" data-mode="edit"' +
      " data-expense='" +
      JSON.stringify(expense) +
      "'>" +
      '<img src="./images/edit.png" alt="Edit"></a>' +
      '<a href="#" class="delete" data-bs-toggle="modal"' +
      ' data-bs-target="#deleteModal"><img src="./images/delete.png" alt="Delete"></a>';
    row.appendChild(cell4);

    tableBody.appendChild(row);
  });
}

function setCategoryDropdown() {
  const categoryDropdown = document.getElementById("category");
  expenseCategories.categories.forEach(function (item) {
    const op = document.createElement("option");
    op.text = item;
    op.value = item;
    categoryDropdown.appendChild(op);
  });
}

function addExpenseHandler() {
  $(".expButton").click(function (event) {
    event.preventDefault();
    const mode = $(this).data("mode");
    if (mode === "edit") {
      const expense = $(this).data("expense");
      $("#modalTitle").text("Edit Expense");
      $("#date").val(expense.date.split("T")[0]);
      $("#category").val(expense.categoryName);
      $("#description").val(expense.description);
      $("#amount").val(expense.amount);
      $("#expense-submit-btn").text("Save Changes");
      $("#expenseModal").modal("show");
    } else {
      $("#modalTitle").text("Add Expense");
      $("#expense-submit-btn").text("Submit");
      $("#expenseForm")[0].reset();
      $("#expenseModal").modal("show");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderExpenseOverview();
  renderExpenseSummary();
  renderExpenseData();
  setCategoryDropdown();
  addExpenseHandler();
});