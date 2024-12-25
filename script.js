// Initialize event listeners for buttons once, not every time QR is generated
document.getElementById('qr-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get user input
    const data = document.getElementById('data').value;
    const size = parseInt(document.getElementById('size').value);
    const bgColor = document.getElementById('bg-color').value;
    const fgColor = document.getElementById('fg-color').value;

    if (!data) {
        alert('Please enter some data.');
        return;
    }

    // Generate QR code using QRCode.js
    const qrCodeContainer = document.getElementById('qr-code-container');
    qrCodeContainer.innerHTML = '';  // Clear previous QR code

    const qrCode = new QRCode(qrCodeContainer, {
        text: data,
        width: size,
        height: size,
        colorDark: fgColor,
        colorLight: bgColor,
        correctLevel: QRCode.CorrectLevel.L, // Error correction level
    });

    // Enable Copy and Download buttons
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');
    copyBtn.disabled = false; // Enable the copy button once QR is generated
    downloadBtn.disabled = false; // Enable the download button once QR is generated

    // Copy QR code to clipboard
    copyBtn.removeEventListener('click', copyQRCode); // Remove previous event listeners
    copyBtn.addEventListener('click', copyQRCode);

    // Download QR code as image
    downloadBtn.removeEventListener('click', downloadQRCode); // Remove previous event listeners
    downloadBtn.addEventListener('click', downloadQRCode);
});

// Copy QR code to clipboard
function copyQRCode() {
    const qrCodeContainer = document.getElementById('qr-code-container');
    const canvas = qrCodeContainer.querySelector('canvas');
    if (!canvas) return;

    canvas.toBlob(function (blob) {
        const clipboardItem = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([clipboardItem]).then(() => {
            alert('QR Code copied to clipboard!');
        });
    });
}

// Download QR code as image
function downloadQRCode() {
    const qrCodeContainer = document.getElementById('qr-code-container');
    const canvas = qrCodeContainer.querySelector('canvas');
    if (!canvas) return;

    const dataUrl = canvas.toDataURL(); // Get the data URL of the QR code image

    // Create a temporary link to trigger the download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'qrcode.png';  // Specify the file name
    link.click();  // Trigger the download
}
