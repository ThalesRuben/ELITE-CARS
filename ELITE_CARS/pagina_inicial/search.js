// main.js
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const local = document.querySelector('input[placeholder="Digite o local"]').value;
    const data = document.querySelector('input[placeholder="Digite Data"]').value;

    // Aqui você pode fazer algo com os dados, como enviar para um servidor ou filtrar resultados
    console.log(`Local: ${local}, Data: ${data}`);
    
    // Exemplo de redirecionamento (opcional)
    // window.location.href = `/search?local=${encodeURIComponent(local)}&data=${encodeURIComponent(data)}`;
});
