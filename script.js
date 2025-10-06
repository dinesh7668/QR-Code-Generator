const qrText = document.querySelector("#qr-text")
const generateBtn = document.querySelector("#generate")
const downloadBtn = document.querySelector("#download")
const sizes = document.querySelector("#size")

const qrContainer = document.querySelector(".qr-body")


generateBtn.addEventListener("click", (e) => {

    e.preventDefault()
    isEmptyText()

})

function isEmptyText() {
    // if (qrText.value.length > 0) {
    //     generateQRCode()
    // } else {
    //     alert(`Please enter a text or URL to generate your QR Code`)
    // }
    qrText.value.length > 0 ? generateQRCode() : alert(`Please enter a text or URL to generate your QR Code`);
}



sizes.addEventListener("change", (e) => {
    size = e.target.value
    isEmptyText()
})


let size = sizes.value
function generateQRCode() {
    qrContainer.innerHTML = ""
    new QRCode(qrContainer, {
        text: qrText.value,
        height: size,
        width: size,
        colorLight: "#fff",
        colorDark: "#000e79ff",
    })
}

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault()
  let img = document.querySelector(".qr-body img")
  if(img !== null){
    let imgAttr = img.getAttribute('src')
    downloadBtn.setAttribute('href','imgAttr')
  }else{
    alert(`QR Code is not Generated yet!`)
  }
    
})