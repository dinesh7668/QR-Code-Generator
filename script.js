const qrText = document.querySelector("#qr-text");
const generateBtn = document.querySelector("#generate");
const downloadBtn = document.querySelector("#download");
const sizes = document.querySelector("#size");
const qrContainer = document.querySelector(".qr-body");

let size = sizes.value;
let qr;

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
  qr = new QRCode(qrContainer, {
    text: qrText.value,
    width: size,
    height: size,
    colorLight: "#fff",
    colorDark: "#19086fff",
  });
}

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
  } else {
    alert("Please generate a QR code first.");
  }
});
