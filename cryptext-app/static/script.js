function openFile() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
    fileInput.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('plainText').value = e.target.result;
            };
            reader.readAsText(file);
        }
    };
}

function encryptMessage() {
    const plainText = document.getElementById('plainText').value;
    let encrypted = '';
    for (let i = 0; i < plainText.length; i++) {
        const charCode = plainText.charCodeAt(i);
        encrypted += String.fromCharCode(charCode + 3);
    }
    document.getElementById('encryptedText').value = encrypted;
}

function saveEncrypted() {
    const encryptedText = document.getElementById('encryptedText').value;
    if (!encryptedText) {
        alert('Nothing to save!');
        return;
    }
    const blob = new Blob([encryptedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'encrypted_message.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function clearText() {
    document.getElementById('plainText').value = '';
    document.getElementById('encryptedText').value = '';
}

function exitApp() {
    if (confirm('Are you sure you want to exit?')) {
        window.close();
    }
}

// Add lightning emojis randomly
function addLightningEmojis() {
    const container = document.querySelector('.emoji-container');
    const numEmojis = 20; 
    for (let i = 0; i < numEmojis; i++) {
        const emoji = document.createElement('span');
        emoji.className = 'lightning';
        emoji.innerHTML = '⚡';
        // Random position within viewport
        const x = Math.random() * (window.innerWidth - 30); // Adjust for emoji size
        const y = Math.random() * (window.innerHeight - 30);
        emoji.style.left = `${x}px`;
        emoji.style.top = `${y}px`;
        container.appendChild(emoji);
    }
}

// Run on page load
window.onload = addLightningEmojis;