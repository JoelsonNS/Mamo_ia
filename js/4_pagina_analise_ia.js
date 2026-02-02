//variáveis globais
const examImage = document.getElementById("examImage");
const imageContainer = document.getElementById("imageContainer");

const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const drawBtn = document.getElementById("drawROI");
const clearBtn = document.getElementById("clearROI");

let roiCount = 0; // Contador para numerar as marcações
let zoomLevel = 1;
let isDrawing = false;
let startX = 0;
let startY = 0;
let currentRoi = null; // Agora usamos 'currentRoi' para a marcação que está sendo desenhada no momento
let isDrawModeActive = false; // Nova variável de controle


/* ============================
   FUNÇÃO DE ZOOM
   ============================ */

const zoomLayer = document.getElementById("zoomLayer"); // Seleciona o novo wrapper   

function applyZoom() {
    zoomLayer.style.transform = `scale(${zoomLevel})`;
}

zoomInBtn.addEventListener("click", () => {
    zoomLevel += 0.1;
    applyZoom();
});

zoomOutBtn.addEventListener("click", () => {
    if (zoomLevel > 0.2) {
        zoomLevel -= 0.1;
        applyZoom();
    }
});

/* ============================
   ATIVAR MODO DEMARCAÇÃO
   ============================ */

drawBtn.addEventListener("click", () => {
    isDrawModeActive = !isDrawModeActive;

    if (isDrawModeActive) {
        imageContainer.style.cursor = "crosshair";
        drawBtn.classList.add("active");
        drawBtn.style.backgroundColor = "var(--accent)";
    } else {
        imageContainer.style.cursor = "default";
        drawBtn.classList.remove("active");
        drawBtn.style.backgroundColor = "";
        isDrawing = false;
        currentRoi = null;
    }
});


/* ... (suas funções de zoom permanecem iguais) ... */

/* ============================
   LIMPAR TODAS AS DEMARCAÇÕES
   ============================ */
clearBtn.addEventListener("click", () => {
    const allRois = zoomLayer.querySelectorAll(".roi-box");
    allRois.forEach(box => box.remove());
    roiCount = 0;
});

/* ============================
   LÓGICA DE DESENHO CORRIGIDA
   ============================ */

imageContainer.addEventListener("mousedown", (e) => {
    // Só desenha se o modo estiver ativo
    if (!isDrawModeActive) return;

    // Evita desenhar ao clicar nos botões
    if (e.target.closest(".controls")) return;

    isDrawing = true;

    const rect = zoomLayer.getBoundingClientRect();
    startX = (e.clientX - rect.left) / zoomLevel;
    startY = (e.clientY - rect.top) / zoomLevel;

    currentRoi = document.createElement("div");
    currentRoi.classList.add("roi-box");

    roiCount++;
    const label = document.createElement("span");
    label.classList.add("roi-label");
    label.innerText = `#${roiCount}`;
    currentRoi.appendChild(label);

    currentRoi.style.left = `${startX}px`;
    currentRoi.style.top = `${startY}px`;

    zoomLayer.appendChild(currentRoi);
    e.preventDefault();
});

imageContainer.addEventListener("mousemove", (e) => {
    if (!isDrawing || !currentRoi) return;

    const rect = zoomLayer.getBoundingClientRect();
    const currentX = (e.clientX - rect.left) / zoomLevel;
    const currentY = (e.clientY - rect.top) / zoomLevel;

    const width = currentX - startX;
    const height = currentY - startY;

    currentRoi.style.width = `${Math.abs(width)}px`;
    currentRoi.style.height = `${Math.abs(height)}px`;
    currentRoi.style.left = `${width < 0 ? currentX : startX}px`;
    currentRoi.style.top = `${height < 0 ? currentY : startY}px`;
});

window.addEventListener("mouseup", () => {
    if (isDrawing) {
        isDrawing = false;
        currentRoi = null;
    }
});


const undoBtn = document.getElementById("undoROI");

document.querySelectorAll(".controls button").forEach(btn => {
    btn.addEventListener("mousedown", e => e.stopPropagation());
});


/* ============================
   DESFAZER ÚLTIMA MARCAÇÃO
   ============================ */
undoBtn.addEventListener("click", () => {
    const allRois = document.querySelectorAll(".roi-box");
    if (allRois.length > 0) {
        // Pega o último elemento da lista e remove
        const lastRoi = allRois[allRois.length - 1];
        lastRoi.remove();
    }
});


const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", () => {
    // Simula um processamento da IA
    const resultadoIA = `
Exame Realizado: MAMOGRAFIA DIGITAL BILATERAL

Técnica: Foram obtidas incidências craniocaudais e mediolaterais oblíquas de ambas as mamas.

Análise:
Não foram observados nódulos suspeitos, microcalcificações agrupadas ou distorções arquiteturais.
Padrão fibroglandular compatível com ACR B.

Conclusão:
Achados benignos. Categoria BI-RADS 2.

Recomendação: Controle mamográfico anual.
`;

    // Salva o resultado para a próxima página
    localStorage.setItem("resultadoLaudoIA", resultadoIA);

    // Redireciona para a página de resultado
    window.location.href = "5_pagina_resultado_analise_ia.html";
});


const logout = document.getElementById("botao_sair");


logout.addEventListener("click", () => {
    window.location.href = '1_login.html';
});