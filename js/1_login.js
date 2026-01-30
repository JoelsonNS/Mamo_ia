import { db } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const tipo = document.getElementById("tipoUsuario").value;

    if (!usuario || !senha || !tipo) {
        alert("Preencha todos os campos e selecione o tipo de usuário!");
        return;
    }

    try {
        const usuariosRef = collection(db, "usuarios");

        const q = query(
            usuariosRef,
            where("usuario", "==", usuario),
            where("senha", "==", senha),
            where("tipo", "==", tipo)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            alert("Usuário, senha ou tipo incorreto.");
            console.log("Nenhum usuário encontrado para:", { usuario, tipo });
            return;
        }

        // Usuário encontrado → redireciona conforme tipo
        if (tipo === "medico") {
            window.location.href = "2_perfil_medico_pacientes.html";
        } else if (tipo === "recepcionista") {
            window.location.href = "3_perfil_recepcionista_pacientes.html";
        }

    } catch (error) {
        console.error("Erro no login:", error);
        alert("Erro ao tentar fazer login. Veja o console.");
    }
});

// Redireciona para cadastro ao clicar no link
const linkCadastro = document.querySelector("#loginForm a"); 
linkCadastro.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "1.1_cadastro_login.html"; 
});
