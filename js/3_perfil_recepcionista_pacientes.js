import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ====================
// Botão de logout
// ====================
const logoutBtn = document.querySelector(".logout");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        window.location.href = "1_login.html"; 
    });
}

// ====================
// Botão de Início
// ====================
const inicioBtn = document.querySelector(".menu a:first-child");

if (inicioBtn) {
    inicioBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "1_login.html";
    });
}

// ====================
// Variáveis da tabela
// ====================
const tbody = document.getElementById("pacientesBody");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filters button");
const btnNovoPaciente = document.getElementById("btnNovoPaciente");

let filtroAtivo = "todos";

// ====================
// Botão Novo Paciente
// ====================
btnNovoPaciente.addEventListener("click", () => {
  window.location.href = "3.1_cadastro_de_pacientes.html";
});

// ====================
// Carregar pacientes
// ====================
document.addEventListener("DOMContentLoaded", () => {
  carregarPacientes();
  iniciarFiltros();
});

async function carregarPacientes() {
  tbody.innerHTML = "";
  try {
    const snapshot = await getDocs(collection(db, "pacientes"));

    if (snapshot.empty) {
      mostrarTabelaVazia();
      return;
    }

    snapshot.forEach(doc => {
      const paciente = doc.data();
      adicionarLinha(paciente, doc.id);
    });

  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
  }
}

// ====================
// Renderizar linha
// ====================
function adicionarLinha(p, id) {
  const tr = document.createElement("tr");

  const statusLower = (p.status || "").toLowerCase();

  // 🔹 ALTERAÇÃO AQUI
  const statusTexto = statusLower.includes("pendente")
    ? "Análise pendente"
    : p.status || "";

  tr.innerHTML = `
    <td>#${p.prontuario ?? ""}</td>
    <td>${p.nome ?? ""}</td>
    <td>${formatarData(p.dataNascimento)}</td>
    <td>${formatarData(p.dataExame)}</td>
    <td>
      <span class="status ${classeStatus(statusTexto)}">
        ${statusTexto}
      </span>
    </td>
    <td>—</td>
  `;

  tbody.appendChild(tr);
}

// ====================
// Tabela vazia
// ====================
function mostrarTabelaVazia() {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td colspan="6" style="text-align:center; opacity:0.6;">
    Nenhum paciente cadastrado no sistema
  </td>`;
  tbody.appendChild(tr);
}

// ====================
// Filtros
// ====================
function iniciarFiltros() {
  searchInput.addEventListener("input", aplicarFiltros);

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");

      filtroAtivo = button.dataset.status;
      aplicarFiltros();
    });
  });
}

function aplicarFiltros() {
  const termo = searchInput.value.toLowerCase();
  const linhas = document.querySelectorAll("#pacientesBody tr");

  linhas.forEach(linha => {
    const textoLinha = linha.textContent.toLowerCase();
    const badge = linha.querySelector(".status");

    let statusOk = true;
    let textoOk = textoLinha.includes(termo);

    if (filtroAtivo !== "todos" && badge) {
      statusOk = badge.textContent.toLowerCase().includes(filtroAtivo);
    }

    linha.style.display = (textoOk && statusOk) ? "" : "none";
  });
}

// ====================
// Utilitários
// ====================
function classeStatus(status) {
  if (!status) return "";
  const s = status.toLowerCase();
  if (s.includes("pendente")) return "pending";
  if (s.includes("laudo")) return "done";
  if (s.includes("prioridade")) return "danger";
  return "";
}

function formatarData(data) {
  if (!data) return "";

  // 🔹 Firestore Timestamp
  if (data.seconds) {
    const d = new Date(data.seconds * 1000);
    return d.toLocaleDateString("pt-BR");
  }

  // 🔹 yyyy-mm-dd
  if (typeof data === "string" && data.includes("-")) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  // 🔹 mm/dd/yyyy  ← ESTE ERA O CASO REAL
  if (typeof data === "string" && data.includes("/")) {
    const [mes, dia, ano] = data.split("/");
    return `${dia}/${mes}/${ano}`;
  }

  return data;
}







