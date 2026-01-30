import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const tbody = document.querySelector("tbody");
const searchInput = document.querySelector(".filters input");
const filterButtons = document.querySelectorAll(".filters button");
let filtroAtivo = "todos";

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

function adicionarLinha(p, id) {
  const tr = document.createElement("tr");
  const statusLower = (p.status || "").toLowerCase();
  const ehPendente = statusLower.includes("pendente");
  const statusTexto = ehPendente ? "Análise Pendente" : p.status;
  const acaoTexto = ehPendente ? "Realizar análise" : "Abrir";

  tr.innerHTML = `
    <td>#${p.prontuario ?? ""}</td>
    <td>${p.nome ?? ""}</td>
    <td>${formatarData(p.dataNascimento)}</td>
    <td>${formatarData(p.dataExame)}</td>
    <td><span class="badge ${classeStatus(statusTexto)}">${statusTexto}</span></td>
    <td><button class="acao-link">${acaoTexto}</button></td>
  `;

  tr.querySelector(".acao-link").addEventListener("click", () => {
    if (ehPendente) {
      window.location.href = `4_pagina_analise_ia.html?id=${id}`;
    } else {
      alert("Visualização do paciente (não implementado).");
    }
  });

  tbody.appendChild(tr);
}

function mostrarTabelaVazia() {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td colspan="6" style="text-align:center; opacity:0.6;">Nenhum paciente cadastrado no sistema</td>`;
  tbody.appendChild(tr);
}

function iniciarFiltros() {
  searchInput.addEventListener("input", aplicarFiltros);
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      filtroAtivo = button.textContent.trim().toLowerCase();
      aplicarFiltros();
    });
  });
}

function aplicarFiltros() {
  const termo = searchInput.value.toLowerCase();
  const linhas = document.querySelectorAll("tbody tr");

  linhas.forEach(linha => {
    const textoLinha = linha.textContent.toLowerCase();
    const badge = linha.querySelector(".badge");
    let statusOk = true;
    let textoOk = textoLinha.includes(termo);
    if (filtroAtivo !== "todos" && badge) {
      statusOk = badge.textContent.toLowerCase().includes(filtroAtivo);
    }
    linha.style.display = (textoOk && statusOk) ? "" : "none";
  });
}

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
  return new Date(data).toLocaleDateString("pt-BR");
}
