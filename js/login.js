document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (usuario && senha) {
        window.location.href = "perfil_medico_pacientes.html";
    } else {
        alert("Preencha usuário e senha!");
    }
});