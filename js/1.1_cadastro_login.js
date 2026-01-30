import { db } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("cadastroForm");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const tipo = document.getElementById("tipoUsuario").value;
    const nome = document.getElementById("nome").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const senhaConfirm = document.getElementById("senhaConfirm").value.trim();

    if (!tipo) {
        alert("Selecione o tipo de usuário!");
        return;
    }

    if (!nome || !usuario || !senha || !senhaConfirm) {
        alert("Preencha todos os campos!");
        return;
    }

    if (senha !== senhaConfirm) {
        alert("As senhas não conferem!");
        return;
    }

    try {
        const usuariosRef = collection(db, "usuarios");

        await addDoc(usuariosRef, {
            tipo,
            nome,
            usuario,
            senha,
            criadoEm: new Date()
        });

        alert(`Cadastro concluído para ${tipo}!\nUsuário: ${usuario}`);
        form.reset();

        // Redireciona para o login após cadastro
        window.location.href = "1_login.html";

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        alert("Erro ao cadastrar usuário. Veja o console.");
    }
});
