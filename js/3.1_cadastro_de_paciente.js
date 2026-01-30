import { db } from "./firebase.js";
import { addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("formPaciente");
// Botão Voltar
const btnVoltar = document.getElementById("btnVoltar");


if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
        window.location.href = "3_perfil_recepcionista_pacientes.html"; // caminho da lista de pacientes
    });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Botão Voltar
const btnVoltar = document.getElementById("btnVoltar");


  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const dataNascimento = document.getElementById("dataNascimento").value;
  const sexo = document.getElementById("sexo").value;
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();

  const hospital = document.getElementById("hospital").value;
  const medico = document.getElementById("medico").value.trim();
  const tipoExame = document.getElementById("tipoExame").value;
  const dataExame = document.getElementById("dataExame").value; // Novo campo
  const observacoes = document.getElementById("observacoes").value.trim();
  const alergias = document.getElementById("alergias").value.trim();

  if (!nome || !cpf || !dataNascimento || !dataExame) {
    alert("Preencha os campos obrigatórios.");
    return;
  }

  try {
    const pacientesRef = collection(db, "pacientes");
    const snapshot = await getDocs(pacientesRef);
    const numeroProntuario = snapshot.size + 1;
    const prontuario = numeroProntuario.toString().padStart(4, "0");

    
    await addDoc(pacientesRef, {
      prontuario,
      nome,
      cpf,
      dataNascimento,
      sexo,
      telefone,
      email,
      hospital,
      medico,
      tipoExame,
      dataExame,
      observacoes,
      alergias,
      status: "Análise Pendente",
      criadoEm: new Date()
    });

    alert("Paciente cadastrado com sucesso!");
    form.reset();

  } catch (error) {
    console.error("Erro ao salvar paciente:", error);
    alert("Erro ao salvar paciente. Veja o console.");
  }
});
