const saveBtn = document.getElementById("saveBtn");
const btnCancel = document.getElementById("btnCancel");
const textarea = document.querySelector(".laudo-editor textarea");

// ============================
// BOTÃO SALVAR
// ============================
saveBtn.addEventListener('click', () => {
  const textoEditado = textarea.value;

  // Salva o texto no localStorage
  localStorage.setItem("resultadoLaudoIA", textoEditado);

  // Redireciona para a página de resultado
  window.location.href = '5_pagina_resultado_analise_ia.html';
});

// ============================
// BOTÃO CANCELAR
// ============================
btnCancel.addEventListener('click', () => {
  window.location.href = '5_pagina_resultado_analise_ia.html';
});
