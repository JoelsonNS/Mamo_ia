// ============================
// UPLOAD DA LOGO
// ============================

// Seleciona os elementos
const uploadBox = document.getElementById("uploadBox");
const logoInput = document.getElementById("logoInput");
const saveBtn = document.getElementById("saveBtn");

// Ao clicar na caixa, abre o seletor de arquivos
uploadBox.addEventListener("click", () => {
  logoInput.click();
});

// Quando o usuário selecionar um arquivo
logoInput.addEventListener("change", () => {
  const file = logoInput.files[0];

  if (file) {
    uploadBox.innerHTML = `
      <div class="upload-icon">📄</div>
      <p>Arquivo selecionado:</p>
      <strong>${file.name}</strong>
    `;
  }
});

// Suporte a arrastar e soltar
uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadBox.style.borderColor = "#0c9286";
});

uploadBox.addEventListener("dragleave", () => {
  uploadBox.style.borderColor = "#2a3b46";
});

uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];

  if (file) {
    uploadBox.innerHTML = `
      <div class="upload-icon">📄</div>
      <p>Arquivo selecionado:</p>
      <strong>${file.name}</strong>
    `;
  }
});

// ============================
// BOTÃO SALVAR
// ============================

saveBtn.addEventListener("click", () => {
  alert("Configurações salvas com sucesso!");
});
