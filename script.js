const page = document.getElementById("page");
const pageWrapper = document.getElementById("page-wrapper");
const carriage = document.getElementById("carriage");
const keySound = document.getElementById("keySound");
const returnSound = document.getElementById("returnSound");
const colorButtons = document.querySelectorAll(".color-btn");

let text = "";
let column = 0;
let lines = 0;
const maxCols = 60;
const stepPx = 2;
const lineHeight = 18;

// Current ink color
let currentColor = "#000000";

// Handle color selection
colorButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    colorButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentColor = btn.getAttribute("data-color");
  });
});

// Typing handler
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

  // Wrap char in span with current color
  const span = `<span style="color:${currentColor}">${char}</span>`;
  text += span;
  page.innerHTML = text;

  column++;
  moveCarriage();

  keySound.currentTime = 0;
  keySound.play();
}

function backspace() {
  if (!text.length) return;

  // Remove last character span
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = text;
  tempDiv.removeChild(tempDiv.lastChild);
  text = tempDiv.innerHTML;
  page.innerHTML = text;

  if (column > 0) column--;
  moveCarriage();
}

function carriageReturn() {
  text += "<br>";
  page.innerHTML = text;

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

/* DOWNLOAD BUTTON */
document.getElementById("download").onclick = () => {
  // Strip HTML spans for text download
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = text;
  const plainText = tempDiv.textContent || tempDiv.innerText || "";
  const blob = new Blob([plainText], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "manuscript.txt";
  a.click();
};

/* RESET BUTTON */
document.getElementById("reset").onclick = () => {
  if (!text) return;

  text = "";
  column = 0;
  lines = 0;

  page.innerHTML = "";
  pageWrapper.style.transform = "translateY(0)";
  carriage.style.transform = "translateX(0)";
};
