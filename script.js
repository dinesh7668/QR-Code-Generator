const qrText = document.querySelector("#qr-text");
const generateBtn = document.querySelector("#generate");
const downloadBtn = document.querySelector("#download");
const sizes = document.querySelector("#size");
const qrContainer = document.querySelector(".qr-body");

let size = sizes.value;
let qr;

// Create timer element for mobile
let timerElem = document.createElement("div");
timerElem.style.textAlign = "center";
timerElem.style.color = "#155e75";
timerElem.style.fontWeight = "bold";
timerElem.style.marginTop = "10px";
timerElem.style.fontSize = "1.1rem";
timerElem.id = "qr-timer";

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function setDownloadState(enabled) {
  downloadBtn.style.opacity = enabled ? "1" : "0.5";
  downloadBtn.style.pointerEvents = enabled ? "auto" : "none";
}

generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  generateQRCode();
});

sizes.addEventListener("change", (e) => {
  size = e.target.value;
  generateQRCode();
});

function generateQRCode() {
  qrContainer.innerHTML = "";
  setDownloadState(false);
  if (isMobile()) {
    timerElem.textContent = "Rendering QR code...";
    qrContainer.appendChild(timerElem);
  }
  qr = new QRCode(qrContainer, {
    text: qrText.value,
    width: size,
    height: size,
    colorLight: "#fff",
    colorDark: "#19086fff",
  });
  // Wait for QR code to render
  let checkReady = setInterval(() => {
    let img = qrContainer.querySelector("img");
    let canvas = qrContainer.querySelector("canvas");
    if (img || canvas) {
      clearInterval(checkReady);
      setDownloadState(true);
      if (isMobile()) {
        timerElem.textContent = "QR code is ready! You can download now.";
        setTimeout(() => {
          if (timerElem.parentNode) timerElem.parentNode.removeChild(timerElem);
        }, 1200);
      }
    }
  }, 200);
}

setDownloadState(false); // Initial state

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let img = qrContainer.querySelector("img");
  let canvas = qrContainer.querySelector("canvas");
  let imgSrc = null;
  if (img) {
    imgSrc = img.src;
  } else if (canvas) {
    imgSrc = canvas.toDataURL("image/png");
  }
  if (imgSrc) {
    let a = document.createElement("a");
    a.href = imgSrc;
    a.download = "QR_Code_By_Dinesh.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Mobile browser fallback
    setTimeout(() => {
      if (isMobile()) {
        alert("On some smartphones, automatic download may not work. Please long-press the QR code image and select 'Download' or 'Save Image'.");
      }
    }, 500);
  } else {
    alert("Please generate a QR code first.");
  }
});
