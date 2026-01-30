const saveBtn = document.getElementById("saveBtn");
const btnCancel = document.getElementById("btnCancel");

// ============================
// BOTÃO SALVAR
// ============================
saveBtn.addEventListener('click', () => {
  alert("Configurações salvas com sucesso!");
});

// ============================
// BOTÃO CANCELAR
// ============================
btnCancel.addEventListener('click', () => {
  window.location.href = '5_pagina_resultado_analise_ia.html';
});
