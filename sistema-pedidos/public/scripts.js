// Suavizar a rolagem para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Animações de exibição ao rolar a página
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
});


document.querySelectorAll(".parallax").forEach(section => observer.observe(section));

// Resposta visual para botões de redes sociais
document.querySelectorAll(".social-icons a").forEach(icon => {
    icon.addEventListener("mouseover", () => icon.classList.add("hover"));
    icon.addEventListener("mouseleave", () => icon.classList.remove("hover"));
});

document.getElementById("telefone").addEventListener("input", function() {
    const telPattern = /^\(\d{2}\) \d{5}-\d{4}$/; // Formato esperado
    const feedback = document.getElementById("telefoneFeedback");
    if (!telPattern.test(this.value)) {
        feedback.textContent = "Por favor, use o formato (XX) XXXXX-XXXX.";
    } else {
        feedback.textContent = "";
    }
});

// Lógica de envio para a página de pedidos personalizados
document.getElementById("pedidoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    
    // Coleta de dados do formulário
    const nome = document.getElementById("nome").value;
    const produto = document.getElementById("produto").value;
    const telefone = document.getElementById("telefone").value;
    const mensagem = document.getElementById("mensagem").value;
    
    // Exibe resposta personalizado de envio
    const feedback = document.getElementById("pedidoFeedback");
    feedback.textContent = `Obrigado, ${nome}! Seu pedido de ${produto} foi enviado com sucesso. Vamos entrar em contato pelo telefone ${telefone}.`;
    
    // Limpa o formulário após o envio
    document.getElementById("pedidoForm").reset();
});

// Salvar dados no armazenamento local
document.getElementById("pedidoForm").addEventListener("input", function() {
    localStorage.setItem("nome", document.getElementById("nome").value);
    localStorage.setItem("telefone", document.getElementById("telefone").value);
});

// Recuperar dados do armazenamento local
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("nome").value = localStorage.getItem("nome") || '';
    document.getElementById("telefone").value = localStorage.getItem("telefone") || '';
});

document.getElementById("pedidoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Coleta de dados do formulário
    const nome = document.getElementById("nome").value;
    const produto = document.getElementById("produto").value;
    const telefone = document.getElementById("telefone").value;
    const mensagem = document.getElementById("mensagem").value;

    // Envio de dados via fetch para o back-end
    fetch('/pedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, produto, telefone, mensagem })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("pedidoFeedback").textContent = data.message;
        document.getElementById("pedidoForm").reset();
    })
    .catch(error => console.error('Erro ao enviar o pedido:', error));
});

document.getElementById("pedidoForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const produto = document.getElementById("produto").value;
    const telefone = document.getElementById("telefone").value;
    const mensagem = document.getElementById("mensagem").value;

    try {
        const response = await fetch('/api/pedido', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, produto, telefone, mensagem })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            document.getElementById("pedidoForm").reset();
        } else {
            alert("Erro ao enviar pedido: " + result.error);
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao enviar pedido.");
    }
});