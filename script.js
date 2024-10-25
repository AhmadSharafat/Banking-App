const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2024-10-15T17:01:17.194Z",
    "2024-10-21T23:36:17.929Z",
    "2024-10-20T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "en-US", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Formating Currency
const formatCur = function (value, currency, locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};
// Formating the time
const formatMovementDate = function (date, locale) {
  const daysPassed = Math.round((new Date() - date) / (1000 * 60 * 60 * 24));
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return "7 days ago";
  return new Intl.DateTimeFormat(locale).format(date);
};
// Displaying Movements
const displayMovements = function (acc) {
  containerMovements.innerHTML = "";

  acc.movements.forEach(function (mov, i) {
    //   Condition to check condition
    const type = mov > 0 ? "deposit" : "withdrawal";
    //   To formate Currency
    const formatedMov = formatCur(mov, acc.currency, acc.locale);
    // formate the dates
    const date = new Date(acc.movementsDates[i]);
    const formatedDate = formatMovementDate(date, acc.locale);
    //   updating Html
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type}</div>
          <div class="movements__date">${formatedDate}</div>
          <div class="movements__value">${formatedMov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1);

// Creating user names for login
const userNames = function (name) {
  return name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toLowerCase();
};

// Runing For each loop on every Accounts object
// This loop creates usernames
const creatingUserName = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = userNames(acc.owner);
  });
};
creatingUserName(accounts);
// Calculation of total balnce
const calTotalBalnce = function (accs) {
  accs.balance = accs.movements.reduce((acc, mov) => acc + mov, 0);
  // formating balance
  const formatBalnce = formatCur(accs.balance, accs.currency, accs.locale);
  labelBalance.textContent = `${formatBalnce}`;
};
// Adding And Formatting Current Account Date
const accDate = function (accs) {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const date = new Intl.DateTimeFormat(accs.locale, options).format(now);
  labelDate.textContent = `${date}`;
};
// Login Feature

let currentAccount;

const loginFeature = function (inputUsername, inputPin) {
  currentAccount = accounts.find((acc) => acc.username === inputUsername);
  if (currentAccount && currentAccount.pin === inputPin) {
    // Welcome Messege
    const firstName = currentAccount.owner.split(" ")[0];
    labelWelcome.textContent = `Welcome Back, ${firstName}`;
    // Bring Opacity back
    containerApp.style.opacity = 100;
    // Display Current Account Movements
    displayMovements(currentAccount);
    // Display balance
    calTotalBalnce(currentAccount);
    // calculate the Date according to locale
    accDate(currentAccount);
    // Clear input fields
    inputLoginUsername.value = "";
    inputLoginPin.value = "";

    //Make it blur to field
    inputLoginPin.blur();
    totalDeposits(currentAccount);
    // Update the Withdrwal
    totalWithdrawal(currentAccount);
    // display intreset
    CalInterestRate(currentAccount);
  }
};
// Transfer the money
const transferMoney = function (receiverAcc, amount) {
  const account = accounts.find((acc) => acc.username === receiverAcc);
  if (account && amount > 0 && currentAccount.balance >= amount) {
    // Adding Movements to recevier Account
    account.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    // Removing from sender account
    currentAccount.movements.push(-amount);
    account.movementsDates.push(new Date().toISOString());
    displayMovements(currentAccount);
    calTotalBalnce(currentAccount);
    // Making Input fields empty
    inputTransferTo.value = "";
    inputTransferAmount.value = "";

    //Makig input field blur
    inputTransferTo.blur();
    inputTransferAmount.blur();
    // Updating depoits
    totalDeposits(currentAccount);
    // update withdrwal
    totalWithdrawal(currentAccount);
    // display intreset
    CalInterestRate(currentAccount);
  }
};
// Loan feature
const loanFeature = function (amount) {
  const loanApprove = currentAccount.movements.some(
    (mov) => mov >= amount * 0.1
  );
  if (loanApprove) {
    setTimeout(() => {
      console.log(`Loan of ${amount} approved and added.`);
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update the UI For Movemets and deposits
      // Display Movements
      displayMovements(currentAccount);
      // Calculate Total Balance
      calTotalBalnce(currentAccount);
      // Calculate total Deposits
      totalDeposits(currentAccount);
      // Calculate Total Withdrawals
      totalWithdrawal(currentAccount);
      // display intreset
      CalInterestRate(currentAccount);
    }, 3000);
  }
};
// Total deposits
const totalDeposits = function (mov) {
  const deposits = mov.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const formattedDeposits = formatCur(deposits, mov.currency, mov.locale);
  // displayMovements(currentAccount);
  // calTotalBalnce(currentAccount);
  labelSumIn.textContent = `${formattedDeposits}`;
};
// Total Withdrawls
const totalWithdrawal = function (mov) {
  const withdrawls = mov.movements
    .filter((mov) => mov < 0)
    .map((mov) => Math.abs(mov))
    .reduce((acc, mov) => acc + mov, 0);
  const formattedWithdraws = formatCur(withdrawls, mov.currency, mov.locale);
  labelSumOut.textContent = `${formattedWithdraws}`;
};
// Calculate intreset rate on deposits
const CalInterestRate = function (mov) {
  const intreset = mov.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * mov.interestRate) / 100)
    .reduce((acc, mov) => acc + mov,0);
  const formattedRate = formatCur(intreset, mov.currency, mov.locale);
  labelSumInterest.textContent = `${formattedRate}`;
};
// Event Listeners
// Login Btn
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  const inputUsername = inputLoginUsername.value;
  const inputPin = Number(inputLoginPin.value);
  loginFeature(inputUsername, inputPin);
});
// transfer btn
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const receiverAcc = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);
  transferMoney(receiverAcc, amount);
});
// Loan Btn
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0) {
    loanFeature(amount);
    inputLoanAmount.value = "";
  }
});
