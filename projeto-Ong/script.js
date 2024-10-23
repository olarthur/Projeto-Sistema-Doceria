document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById('formMessage').textContent = "Sua mensagem foi enviada com sucesso!";
    
    document.getElementById('contactForm').reset();
});

let totalDonated = 0;
const goal = 10000;

function setDonationAmount(amount) {
    document.getElementById("donationAmount").value = amount;
}

function updateDonationInput() {
    const customAmount = document.getElementById("customAmount").value;
    document.getElementById("donationAmount").value = customAmount;
}

function makeDonation() {
    const donationAmount = parseFloat(document.getElementById("donationAmount").value);
    if (donationAmount && donationAmount >= 5) {
        totalDonated += donationAmount;
        updateProgress();
        document.getElementById("donationMessage").textContent = "Obrigado pela sua doação de R$" + donationAmount + "!";
    } else {
        document.getElementById("donationMessage").textContent = "Por favor, insira um valor válido para a doação (mínimo R$5).";
    }
}

function updateProgress() {
    const progressPercentage = Math.min((totalDonated / goal) * 100, 100);
    document.getElementById("progress").style.width = progressPercentage + "%";
    document.getElementById("progressText").textContent = "R$" + totalDonated + " arrecadados";
}