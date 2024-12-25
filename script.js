// Event listeners for copy and download buttons should be added only once
document.addEventListener('DOMContentLoaded', function () {
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');

    // Initialize the buttons to be disabled
    copyBtn.disabled = true;
    downloadBtn.disabled = true;

    // Add event listeners for the buttons
    copyBtn.addEventListener('click', copyQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);

    // Form submission handler
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

        // Enable Copy and Download buttons once QR is generated
        copyBtn.disabled = false;
        downloadBtn.disabled = false;
    });

    // Function to copy QR code to clipboard
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

    // Function to download QR code as image
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
});
