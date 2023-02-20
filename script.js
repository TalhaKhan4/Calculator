"use strict";

// functions

// display function
function display(operation) {
  operation = operation.replaceAll("*", "×");
  operation = operation.replaceAll("/", "÷");
  screenOutput.textContent = operation;
}

// function to change button from AC to C
function acToC() {
  ac.textContent = "C";
}

// function to get last operation
function getLastOperation(operation) {
  let lastOperation = "";
  for (let i = operation.length - 1; i >= 0; i--) {
    lastOperation += operation[i];
    if (
      operation[i] === "+" ||
      operation[i] === "-" ||
      operation[i] === "*" ||
      operation[i] === "/"
    ) {
      break;
    }
  }
  if (
    lastOperation.indexOf("+") !== -1 ||
    lastOperation.indexOf("-") !== -1 ||
    lastOperation.indexOf("*") !== -1 ||
    lastOperation.indexOf("/") !== -1
  ) {
    // reversing the last operation
    lastOperation = lastOperation.split("");
    lastOperation.reverse();
    lastOperation = lastOperation.join("");
    return lastOperation;
  }
  return "";
}

// This function checks for brackets and if there is any missing it automatically adds them
function checkForBrackets(operation) {
  let openBrac = 0;
  let closeBrac = 0;
  for (let i = operation.length - 1; i >= 0; i--) {
    if (operation[i] === "(") {
      openBrac++;
    } else if (operation[i] === ")") {
      closeBrac++;
    }
  }
  if (openBrac > closeBrac) {
    let difference = openBrac - closeBrac;
    for (let i = 1; i <= difference; i++) {
      operation += ")";
    }
  }
  return operation;
}

//function for dot
function checkForDot(operation) {
  let lastOperation = "";
  for (let i = operation.length - 1; i >= 0; i--) {
    lastOperation += operation[i];
    if (
      operation[i] === "+" ||
      operation[i] === "-" ||
      operation[i] === "*" ||
      operation[i] === "/"
    ) {
      break;
    }
  }
  if (lastOperation.indexOf(".") === -1) {
    return true;
  } else {
    return false;
  }
}
// function for buttons
function changeOperation(e) {
  // +
  if (e === "+" || e.key === "+") {
    if (
      operation[operation.length - 1] !== "+" &&
      screenOutput.textContent !== "" &&
      (operation.length !== 1 || operation[operation.length - 1] !== "-")
    ) {
      if (
        operation[operation.length - 1] === "-" ||
        operation[operation.length - 1] === "*" ||
        operation[operation.length - 1] === "/"
      ) {
        operation = operation.slice(0, operation.length - 1);
      }
      operation += "+";
      counterForEqualTo = 0;
    }
  }
  // -
  else if (e === "-" || e.key === "-") {
    if (operation[operation.length - 1] !== "-") {
      if (
        operation[operation.length - 1] === "+" ||
        operation[operation.length - 1] === "*" ||
        operation[operation.length - 1] === "/"
      ) {
        operation = operation.slice(0, operation.length - 1);
      }
      operation += "-";
      counterForEqualTo = 0;
    }
  }
  // *
  else if (e === "*" || e.key === "*") {
    if (
      operation[operation.length - 1] !== "*" &&
      screenOutput.textContent !== "" &&
      (operation.length !== 1 || operation[operation.length - 1] !== "-")
    ) {
      if (
        operation[operation.length - 1] === "-" ||
        operation[operation.length - 1] === "+" ||
        operation[operation.length - 1] === "/"
      ) {
        operation = operation.slice(0, operation.length - 1);
      }
      operation += "*";
      counterForEqualTo = 0;
    }
  }
  // /
  else if (e === "/" || e.key === "/") {
    if (
      operation[operation.length - 1] !== "/" &&
      screenOutput.textContent !== "" &&
      (operation.length !== 1 || operation[operation.length - 1] !== "-")
    ) {
      if (
        operation[operation.length - 1] === "-" ||
        operation[operation.length - 1] === "*" ||
        operation[operation.length - 1] === "+"
      ) {
        operation = operation.slice(0, operation.length - 1);
      }
      operation += "/";
      counterForEqualTo = 0;
    }
  }
  // (
  else if (e === "(" || e.key === "(") {
    if (
      operation[operation.length - 1] === ")" ||
      operation[operation.length - 1] === "1" ||
      operation[operation.length - 1] === "2" ||
      operation[operation.length - 1] === "3" ||
      operation[operation.length - 1] === "4" ||
      operation[operation.length - 1] === "5" ||
      operation[operation.length - 1] === "6" ||
      operation[operation.length - 1] === "7" ||
      operation[operation.length - 1] === "8" ||
      operation[operation.length - 1] === "9" ||
      operation[operation.length - 1] === "0"
    ) {
      operation += "*";
    }
    operation += "(";
  }
  // )
  else if (e === ")" || e.key === ")") {
    if (
      operation[operation.length - 1] !== "(" &&
      screenOutput.textContent !== ""
    ) {
      operation += ")";
    }
  }
  // .
  else if (e === "." || e.key === ".") {
    if (checkForDot(operation)) {
      operation += ".";
    }
  }
  // =
  else if (e === "=" || e.key === "=" || e.key === "Enter") {
    if (operation !== "" && operation !== "-") {
      if (
        //5+= problem
        operation.length === 2 &&
        (operation[operation.length - 1] === "+" ||
          operation[operation.length - 1] === "-" ||
          operation[operation.length - 1] === "/")
      ) {
        operation += operation[0];
        lastOperation = getLastOperation(operation);
        counterForEqualTo++;
        operation = eval(operation);
        operation = String(operation);
      } else if (counterForEqualTo === 0) {
        // First I will get the last operation
        lastOperation = getLastOperation(operation);
        counterForEqualTo++;
        operation = checkForBrackets(operation);
        operation = eval(operation);
        operation = String(operation);
      } else {
        operation += lastOperation;
        operation = eval(operation);
        operation = String(operation);
      }
    }
  }
  // AC
  else if (e === "ac" || e.key === "Delete") {
    operation = "";
    counterForEqualTo = 0;
  }
  //Bacskpace
  else if (e === "backspace" || e.key === "Backspace") {
    operation = operation.slice(0, operation.length - 1);
    counterForEqualTo = 0;
  }
  //   rest of the buttons
  else if (e.key !== undefined) {
    if (
      e.key === "1" ||
      e.key === "2" ||
      e.key === "3" ||
      e.key === "4" ||
      e.key === "5" ||
      e.key === "6" ||
      e.key === "7" ||
      e.key === "8" ||
      e.key === "9" ||
      e.key === "0"
    ) {
      if (operation[operation.length - 1] === ")") {
        operation += "*";
      }
      if (counterForEqualTo === 0) {
        if (operation === "0" && e.key !== ".") {
          operation = operation.split("");
          operation.pop();
          operation = operation.join("");
        } else if (
          operation[operation.length - 1] === "0" &&
          (operation[operation.length - 2] === "+" ||
            operation[operation.length - 2] === "-" ||
            operation[operation.length - 2] === "*" ||
            operation[operation.length - 2] === "/") &&
          e.key !== "."
        ) {
          operation = operation.split("");
          operation.pop();
          operation = operation.join("");
        }
        operation += e.key;
      } else {
        operation = "";
        operation += e.key;
      }

      counterForEqualTo = 0;
    }
  } else {
    if (operation[operation.length - 1] === ")") {
      operation += "*";
    }
    if (counterForEqualTo === 0) {
      if (operation === "0" && e.key !== ".") {
        operation = operation.split("");
        operation.pop();
        operation = operation.join("");
      } else if (
        operation[operation.length - 1] === "0" &&
        (operation[operation.length - 2] === "+" ||
          operation[operation.length - 2] === "-" ||
          operation[operation.length - 2] === "*" ||
          operation[operation.length - 2] === "/") &&
        e.key !== "."
      ) {
        operation = operation.split("");
        operation.pop();
        operation = operation.join("");
      }
      operation += e;
    } else {
      operation = "";
      operation += e;
    }
    counterForEqualTo = 0;
  }

  // We are calling the display function to dislay new operation value on the screen everytime the user enters something or performs some operation
  display(operation);

  // This conditon checks if there is any output on the calculator display and if there is any it changes the button from AC to C and if there is not then converts it back to AC
  if (screenOutput.textContent !== "") {
    acToC();
  } else {
    ac.textContent = "AC";
  }
}
// variables and constants

let operation = "";
let counterForEqualTo = 0;
let lastOperation = "";
const one = document.querySelector(".btn-1");
const two = document.querySelector(".btn-2");
const three = document.querySelector(".btn-3");
const four = document.querySelector(".btn-4");
const five = document.querySelector(".btn-5");
const six = document.querySelector(".btn-6");
const seven = document.querySelector(".btn-7");
const eight = document.querySelector(".btn-8");
const nine = document.querySelector(".btn-9");
const zero = document.querySelector(".btn-0");
const dot = document.querySelector(".btn-dot");
const equal = document.querySelector(".btn-equalTo");
const plus = document.querySelector(".btn-plus");
const minus = document.querySelector(".btn-minus");
const multiply = document.querySelector(".btn-multiply");
const divide = document.querySelector(".btn-divide");
const openBrac = document.querySelector(".btn-open-brac");
const closeBrac = document.querySelector(".btn-close-brac");
const ac = document.querySelector(".btn-AC");
const backspace = document.querySelector(".btn-backspace");
const screenOutput = document.querySelector(".output-div");
//Event listeners
// ()=>{} this syntax helps us in passing the arguments to the event handler function

one.addEventListener("click", () => {
  changeOperation("1");
});
two.addEventListener("click", () => {
  changeOperation("2");
});
three.addEventListener("click", () => {
  changeOperation("3");
});
four.addEventListener("click", () => {
  changeOperation("4");
});
five.addEventListener("click", () => {
  changeOperation("5");
});
six.addEventListener("click", () => {
  changeOperation("6");
});
seven.addEventListener("click", () => {
  changeOperation("7");
});
eight.addEventListener("click", () => {
  changeOperation("8");
});
nine.addEventListener("click", () => {
  changeOperation("9");
});
zero.addEventListener("click", () => {
  changeOperation("0");
});
plus.addEventListener("click", () => {
  changeOperation("+");
});
minus.addEventListener("click", () => {
  changeOperation("-");
});
multiply.addEventListener("click", () => {
  changeOperation("*");
});
divide.addEventListener("click", () => {
  changeOperation("/");
});
dot.addEventListener("click", () => {
  changeOperation(".");
});
openBrac.addEventListener("click", () => {
  changeOperation("(");
});
closeBrac.addEventListener("click", () => {
  changeOperation(")");
});
equal.addEventListener("click", () => {
  changeOperation("=");
});
ac.addEventListener("click", () => {
  changeOperation("ac");
});
backspace.addEventListener("click", () => {
  changeOperation("backspace");
});
// event listener for keyboard keys
// global event listener
document.addEventListener("keydown", changeOperation);
