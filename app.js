const cardHolderName = document.getElementById("card-name")
const cardHolderNumber = document.getElementById("card-number-input")
const cardHolderExpMonth = document.getElementById("exp-month")
const cardHolderExpyear = document.getElementById("exp-year")
const cardHolderCvv = document.getElementById("card-cvv")
const submitBtn = document.getElementById("submit-btn")
const continueBtn = document.getElementById("continueBtn")

const numberOnCard = document.getElementById("card-number")
const nameOnCard = document.getElementById("name")
const expDateOnCard = document.getElementById("exp-date")
const lastNumberOnCard = document.getElementById("last-number")

const expMonthRegex = /^[0-1]\d$/
const expYearRegex = /^2\d$/
const cvvRegex = /^\d\d\d$/
const cardNumberRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/

const cardHolder = {
  name: "JANE APPLESEED",
  month: "00",
  year: "00",
  cardNumber: "0000-0000-0000-0000",
  lastNumber: "0000"
}

const submitForm = e => {
  e.preventDefault()
  inputName()
  inputExpDate()
  inputCardNumber()
  inputCvv()
  if (showValues()) {
    completeState()
  }
}

const inputExpDate = e => {
  let month = cardHolderExpMonth.value
  let year = cardHolderExpyear.value
  if (expMonthRegex.test(month) && expYearRegex.test(year)) {
    cardHolder.month = cardHolderExpMonth.value
    cardHolder.year = cardHolderExpyear.value
    document.querySelector("#error-exp").classList.remove("visible")
  }
  else {
    cardHolder.month = null
    cardHolder.year = null
    document.querySelector("#error-exp").classList.add("visible")
  }
}

const inputName = e => {
  if (cardHolderName.value.trim() != "") {
    let cardHolderNameArr = cardHolderName.value.trim().split(" ")
    cardHolder.name = cardHolderNameArr[0] + " " + cardHolderNameArr[1]
    document.querySelector("#error-name").classList.remove("visible")
  }
  else {
    cardHolder.name = null
    document.querySelector("#error-name").classList.add("visible")
  }
}

const inputCardNumber = e => {
  if (cardNumberRegex.test(cardHolderNumber.value.trim())) {
    cardHolder.cardNumber = cardHolderNumber.value.trim()
    let cardNumberArr = cardHolder.cardNumber.split('-')
    cardHolder.lastNumber = cardNumberArr[cardNumberArr.length - 1]
    document.querySelector("#error-number").classList.remove("visible")
  }
  else {
    cardHolder.cardNumber = null
    cardHolder.lastNumber = null
    console.log("Wrong card number");
    document.querySelector("#error-number").classList.add("visible")
  }
}

const inputCvv = e => {
  if (cvvRegex.test(cardHolderCvv.value)) {
    document.querySelector("#error-cvv").classList.remove("visible")
  }
  else {
    document.querySelector("#error-cvv").classList.add("visible")
  }
}

const showValues = () => {
  for (const key in cardHolder) {
    if (cardHolder[key] == null) {
      console.log("Incomplete Info");
      return false
    }
  }
  numberOnCard.textContent = cardHolder.cardNumber
  nameOnCard.textContent = cardHolder.name
  expDateOnCard.textContent = `${cardHolder.month}/${cardHolder.year}`
  lastNumberOnCard.textContent = cardHolder.lastNumber
  clear()
  return true
}

const clear = e => {
  cardHolderName.value = ""
  cardHolderCvv.value = ""
  cardHolderExpMonth.value = ""
  cardHolderExpyear.value = ""
  cardHolderNumber.value = ""
}

const completeState = e => {
  document.querySelector("form").classList.add("invisible")
  document.querySelector("#complete-state").classList.add("visible")
}

const continueBtnHandler = e => {
  document.querySelector("form").classList.remove("invisible")
  document.querySelector("#complete-state").classList.remove("visible")
  numberOnCard.textContent = "0000-0000-0000-0000"
  nameOnCard.textContent = "Jane Applesseed"
  expDateOnCard.textContent = "00/00"
  lastNumberOnCard.textContent = "0000"
}


submitBtn.addEventListener("click", submitForm)
continueBtn.addEventListener("click", continueBtnHandler)