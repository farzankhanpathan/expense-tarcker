const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
function addTransaction(e) {
    e.preventDefault();

    const transaction = {
        id: Math.floor(Math.random() * 100000),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = '';
    amount.value = '';
}

form.addEventListener('submit', addTransaction);
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text}
        <span>${sign}₹${Math.abs(transaction.amount)}</span>
        <button onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}
function updateValues() {
    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, val) => acc + val, 0);
    const inc = amounts.filter(val => val > 0).reduce((a, b) => a + b, 0);
    const exp = amounts.filter(val => val < 0).reduce((a, b) => a + b, 0);

    balance.innerText = `₹${total}`;
    income.innerText = `₹${inc}`;
    expense.innerText = `₹${Math.abs(exp)}`;
}
function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    init();
}
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();