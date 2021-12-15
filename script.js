"use strict";

const text_box = document.querySelector(".text_box");

var operations = {
  SUM: "sum",
  SUB: "subtract",
  MULT: "multiply",
  DIV: "divide",
  RES: "result",
}
var store = {
  lastOperation: null,
  firstOperand: 0,
  secondOperand: 0,
}

function updateStore(buff) {
  store.secondOperand = buff;
  text_box.innerHTML = buff;
  store.firstOperand = 0;
  store.lastOperation = operations.RES;
} 

function addStore() {
  let buff = store.firstOperand + store.secondOperand;
  return updateStore(buff);
}
function subStore() {
  let buff = store.firstOperand - store.secondOperand;
  return updateStore(buff);
}
function multiplyStore() {
  let buff = store.firstOperand * store.secondOperand;
  return updateStore(buff);
}
function divideStore() {
  let buff = store.firstOperand / store.secondOperand;
  return updateStore(buff);
}

function addDigit(e) {
  if (store.lastOperation == operations.RES) {
    store.secondOperand = e;
    text_box.innerHTML = e;
    store.lastOperation = null;
    return;
  }
  store.secondOperand = store.secondOperand * 10 + e;
  if (text_box.innerHTML == "0") {
    text_box.innerHTML = e;
  } else {
    text_box.innerHTML += e;
  }
}
function add() {
  store.firstOperand = store.secondOperand;
  store.secondOperand = 0;
  store.lastOperation = operations.SUM;
  text_box.innerHTML += " + ";
}
function subtract() {
  store.firstOperand = store.secondOperand;
  store.secondOperand = 0;
  store.lastOperation = operations.SUB;
  text_box.innerHTML += " - ";
}
function multiply() {
  store.firstOperand = store.secondOperand;
  store.secondOperand = 0;
  store.lastOperation = operations.MULT;
  text_box.innerHTML += " * ";
}
function divide() {
  store.firstOperand = store.secondOperand;
  store.secondOperand = 0;
  store.lastOperation = operations.DIV;
  text_box.innerHTML += " / ";
}
function result() {
  switch (store.lastOperation) {
    case operations.SUM:
      return addStore();
    case operations.SUB:
      return subStore();
    case operations.DIV:
      return divideStore();
    case operations.MULT:
      return multiplyStore();
  }
}

function dot() {
  console.log(store.firstOperand);
  console.log(store.secondOperand);
}
function clearCalc() {
  store.lastOperation = null;
  store.secondOperand = 0;
  store.firstOperand = 0;
  text_box.innerHTML = "0";
}
function backspc() {
  if (store.lastOperation == operations.RES || text_box.innerHTML == "0") {
    clearCalc();
  } else if (store.lastOperation == null) {
    text_box.innerHTML = text_box.innerHTML.substring(0, text_box.innerHTML.length - 1);
    store.secondOperand = (store.secondOperand - store.secondOperand % 10) / 10;
  } else if (text_box.innerHTML[text_box.innerHTML.length-1] >= '0' && text_box.innerHTML[text_box.innerHTML.length-1] <= '9' ) { 
    text_box.innerHTML = text_box.innerHTML.substring(0, text_box.innerHTML.length - 1);
    store.secondOperand = (store.secondOperand - store.secondOperand % 10) / 10;
  } else {
    text_box.innerHTML = text_box.innerHTML.substring(0, text_box.innerHTML.length - 3);
    store.secondOperand = store.firstOperand;
    store.firstOperand = 0;
    store.lastOperation = null;
  }
}