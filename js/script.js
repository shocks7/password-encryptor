document.addEventListener('DOMContentLoaded', function () {
    const passwordForm = document.getElementById('password-form');
    const encryptButton = document.getElementById('encrypt-button');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result');

    encryptButton.addEventListener('click', function (e) {
        e.preventDefault();
        const passwordInput = document.getElementById('password');
        const passwordValue = passwordInput.value;

        if (passwordValue) {
            // encrypt
            const cryptoResult = sha256(passwordValue);

            resultText.textContent = cryptoResult;
            resultContainer.classList.remove('hidden');

            // save
            fetch('crypto.php', {
                method: 'POST',
                body: JSON.stringify({password: cryptoResult}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
        }
    });

    function sha256(input) {
        return CryptoJS.SHA256(input).toString();
    }
});
