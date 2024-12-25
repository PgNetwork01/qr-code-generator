// script.js
document.getElementById('qr-form').addEventListener('submit', function(e) {
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

    // Enable Copy button
    const copyBtn = document.getElementById('copy-btn');
    copyBtn.disabled = false;  // Enable the copy button once QR is generated

    // Enable Download button
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.disabled = false;  // Enable the download button once QR is generated

    // Copy QR code to clipboard
    copyBtn.addEventListener('click', function() {
        const canvas = qrCodeContainer.querySelector('canvas');
        canvas.toBlob(function(blob) {
            const clipboardItem = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([clipboardItem]).then(() => {
                alert('QR Code copied to clipboard!');
            });
        });
    });

    // Download QR code as image
    downloadBtn.addEventListener('click', function() {
        const canvas = qrCodeContainer.querySelector('canvas');
        const dataUrl = canvas.toDataURL(); // Get the data URL of the QR code image

        // Create a temporary link to trigger the download
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qrcode.png';  // Specify the file name
        link.click();  // Trigger the download
    });
});
