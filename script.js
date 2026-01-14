const page = document.getElementById("page");
const pageWrapper = document.getElementById("page-wrapper");
const carriage = document.getElementById("carriage");

const keySound = document.getElementById("keySound");
const returnSound = document.getElementById("returnSound");

let text = "";
let column = 0;
let lines = 0;

const maxCols = 60;
const stepPx = 2;
const lineHeight = 18;

document.addEventListener("keydown", e => {

  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    typeChar(e.key);
    e.preventDefault();
  }

  if (e.key === "Enter") {
    carriageReturn();
    e.preventDefault();
  }

  if (e.key === "Backspace") {
    backspace();
    e.preventDefault();
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

function backspace() {
  if (!text.length) return;

  text = text.slice(0, -1);
  page.textContent = text;

  if (column > 0) column--;
  moveCarriage();
}

function carriageReturn() {
  text += "\n";
  page.textContent = text;

  column = 0;
  lines++;

  pageWrapper.style.transform =
    `translateY(${-lines * lineHeight}px)`;

  carriage.style.transform = "translateX(0)";

  returnSound.currentTime = 0;
  returnSound.play();
}

function moveCarriage() {
  const jitter = Math.random() * 0.6;
  carriage.style.transform =
    `translate(${-column * stepPx}px, ${jitter}px)`;
}

/* DOWNLOAD */
document.getElementById("download").onclick = () => {
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "manuscript.txt";
  a.click();
};
