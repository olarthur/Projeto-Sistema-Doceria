document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById('formMessage').textContent = "Sua mensagem foi enviada com sucesso!";
    
    document.getElementById('contactForm').reset();
});

function makeDonation() {
    const donationAmount = document.getElementById('donationAmount').value;

    if (donationAmount >= 5) {
        document.getElementById('donationMessage').textContent = `Obrigado pela sua doação de R$ ${donationAmount}!`;
    } else {
        document.getElementById('donationMessage').textContent = "Por favor, insira um valor mínimo de R$ 5.";
    }
}