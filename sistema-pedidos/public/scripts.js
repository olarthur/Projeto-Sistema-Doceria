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

// Validação do telefone em tempo real
document.getElementById("telefone").addEventListener("input", function() {
    const telPattern = /^\(\d{2}\) \d{5}-\d{4}$/;
    const feedback = document.getElementById("telefoneFeedback");
    if (!telPattern.test(this.value)) {
        feedback.textContent = "Por favor, use o formato (XX) XXXXX-XXXX.";
    } else {
        feedback.textContent = "";
    }
});

// Salvar dados do formulário no armazenamento local
document.getElementById("pedidoForm").addEventListener("input", function() {
    localStorage.setItem("nome", document.getElementById("nome").value);
    localStorage.setItem("telefone", document.getElementById("telefone").value);
});

// Recuperar dados salvos do armazenamento local ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("nome").value = localStorage.getItem("nome") || '';
    document.getElementById("telefone").value = localStorage.getItem("telefone") || '';
});

// Lógica de envio do formulário com uso do fetch e async/await
document.getElementById("pedidoForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Coleta de dados do formulário
    const nome = document.getElementById("nome").value;
    const produto = document.getElementById("produto").value;
    const telefone = document.getElementById("telefone").value;
    const mensagem = document.getElementById("mensagem").value;

    try {
        // Envio dos dados para o back-end
        const response = await fetch('/api/pedido', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, produto, telefone, mensagem })
        });

        const result = await response.json();

        // Feedback ao usuário
        const feedback = document.getElementById("pedidoFeedback");
        if (response.ok) {
            feedback.textContent = result.message;
            document.getElementById("pedidoForm").reset();
            localStorage.removeItem("nome");  // Remove dados do localStorage após envio
            localStorage.removeItem("telefone");
        } else {
            feedback.textContent = "Erro ao enviar pedido: " + result.error;
        }
    } catch (error) {
        app.post('/api/pedido', async (req, res) => {
            const { nome, produto, telefone, mensagem } = req.body;
        
            try {
                const query = 'INSERT INTO pedidos (nome, produto, telefone, mensagem) VALUES (?, ?, ?, ?)';
                await db.promise().query(query, [nome, produto, telefone, mensagem]);
                res.status(200).json({ message: 'Pedido recebido com sucesso!' });
            } catch (error) {
                console.error('Erro ao inserir pedido:', error);
                res.status(500).json({ error: 'Erro ao processar o pedido' });
            }
        });
    }
});