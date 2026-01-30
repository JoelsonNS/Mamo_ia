const confirmCheck = document.getElementById("confirmCheck");
const printBtn = document.getElementById("printBtn");
const exportBtn = document.getElementById("exportBtn");

// Ativa/desativa os botões conforme o checkbox
confirmCheck.addEventListener("change", () => {
  const isChecked = confirmCheck.checked;
  printBtn.disabled = !isChecked;
  exportBtn.disabled = !isChecked;
});

// Imprimir
printBtn.addEventListener("click", () => {
  window.print();
});

// Exportar PDF
exportBtn.addEventListener("click", async () => {
  const report = document.querySelector(".report-card");
  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF("p", "mm", "a4");

  await pdf.html(report, {
    callback: function (doc) {
      doc.save("laudo_mamografia.pdf");
    },
    x: 10,
    y: 10,
    width: 180,
    windowWidth: report.scrollWidth
  });
});
