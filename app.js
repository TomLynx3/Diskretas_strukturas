const exercises = document.querySelectorAll(".content-container");
const btnController = document.getElementById("ex-control-forward");
const btnControllerBack = document.getElementById("ex-control-back");
const exTitle = document.querySelector(".exercise-title ");
const dropDown = document.getElementById("dropdown");
const greyCodeOutput = document.getElementById("grey-code-output");
const openModal = document.getElementById("open-modal");

let currentEx = {};
getCurrentEx();
btnController.addEventListener("click", () => {
  if (currentEx.index === exercises.length - 2) {
    btnController.disabled = true;
  } else {
    btnControllerBack.disabled = false;
  }
  currentEx.index += 1;
  exTitle.innerHTML = `${currentEx.index + 1}.Uzdevums`;
  currentEx.element.classList.remove("current-ex");
  currentEx.element = exercises[currentEx.index];
  currentEx.element.classList.add("current-ex");
});

btnControllerBack.addEventListener("click", () => {
  if (currentEx.index === 1) {
    btnControllerBack.disabled = true;
  } else {
    btnController.disabled = false;
  }
  currentEx.element.classList.remove("current-ex");
  currentEx.index -= 1;
  currentEx.element = exercises[currentEx.index];
  currentEx.element.classList.add("current-ex");

  exTitle.innerHTML = `${currentEx.index + 1}.Uzdevums`;
});

openModal.addEventListener("click", () => {
  generateGreyOutput(5);
});

dropDown.addEventListener("change", (e) => {
  const value = dropDown.options[dropDown.selectedIndex].value;

  generateGreyOutput(value);
});

function getCurrentEx() {
  for (let i = 0; i < exercises.length; i++) {
    if (exercises[i].classList.contains("current-ex")) {
      currentEx = {
        element: exercises[i],
        index: i,
      };
      break;
    }
  }
}

function generateGreyOutput(n) {
  const greyCode = generateGreyarr(n);
  greyCodeOutput.innerHTML = "";
  for (let code of greyCode) {
    const span = document.createElement("div");
    span.innerHTML = code;
    greyCodeOutput.appendChild(span);
  }
}

function generateGreyarr(n) {
  if (n <= 0) return;

  let arr = [];

  arr.push("0");
  arr.push("1");

  let i, j;
  for (i = 2; i < 1 << n; i = i << 1) {
    for (j = i - 1; j >= 0; j--) {
      arr.push(arr[j]);
    }

    for (j = 0; j < i; j++) {
      arr[j] = "0" + arr[j];
    }

    for (j = i; j < 2 * i; j++) arr[j] = "1" + arr[j];
  }

  return arr;
}
