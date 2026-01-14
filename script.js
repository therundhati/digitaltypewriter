const page = document.getElementById("page");
const carriage = document.getElementById("carriage");
const keySound = document.getElementById("keySound");
const returnSound = document.getElementById("returnSound");

let text = "";
let column = 0;
const maxCols = 60;
const stepPx = 2;

document.addEventListener("keydown", e => {
  if (e.key.length === 1) {
    typeChar(e.key);
  }

  if (e.key === "Enter") {
    carriageReturn();
  }

  if (e.key === "Backspace") {
    text = text.slice(0, -1);
    page.textContent = text;
    column = Math.max(0, column - 1);
    moveCarriage();
  }
});

function typeChar(char) {
  if (column >= maxCols) carriageReturn();

  text += char;
  page.textContent = text;

  column++;
  moveCarriage();

  keySound.currentTime = 0;
  keySound.play();
}

function carriageReturn() {
  text += "\n";
  page.textContent = text;

  column = 0;
  carriage.style.transform = `translateX(0px)`;

  returnSound.currentTime = 0;
  returnSound.play();
}

function moveCarriage() {
  carriage.style.transform = `translateX(${-column * stepPx}px)`;
}

document.getElementById("download").onclick = () => {
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "manuscript.txt";
  a.click();
};
