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
    isDrawModeActive = !isDrawModeActive; // Inverte o estado (true/false)

    if (isDrawModeActive) {
        imageContainer.style.cursor = "crosshair";
        drawBtn.classList.add("active"); // Adiciona uma classe para feedback visual
        drawBtn.style.backgroundColor = "var(--accent)"; // Exemplo de destaque
    } else {
        imageContainer.style.cursor = "default";
        drawBtn.classList.remove("active");
        drawBtn.style.backgroundColor = ""; // Volta ao normal
    }
});

/* ... (suas funções de zoom permanecem iguais) ... */

/* ============================
   LIMPAR TODAS AS DEMARCAÇÕES
   ============================ */
clearBtn.addEventListener("click", () => {
    const allRois = document.querySelectorAll(".roi-box");
    allRois.forEach(box => box.remove());
    roiCount = 0; // Reinicia a contagem
});

/* ============================
   LÓGICA DE DESENHO
   ============================ */

// Quando o usuário pressionar o mouse
imageContainer.addEventListener("mousedown", (e) => {
    if (imageContainer.style.cursor !== "crosshair") return;

    isDrawing = true;
    const rect = zoomLayer.getBoundingClientRect();

    startX = (e.clientX - rect.left) / zoomLevel;
    startY = (e.clientY - rect.top) / zoomLevel;

    // Criar a caixa
    currentRoi = document.createElement("div");
    currentRoi.classList.add("roi-box");
    
    // Criar a etiqueta de texto (NOVO)
    roiCount++; 
    const label = document.createElement("span");
    label.classList.add("roi-label");
    label.innerText = `#${roiCount}`; // Define o texto como #1, #2...
    
    currentRoi.appendChild(label); // Coloca o texto dentro da caixa

    currentRoi.style.left = `${startX}px`;
    currentRoi.style.top = `${startY}px`;

    zoomLayer.appendChild(currentRoi);
    e.preventDefault(); 
});

// Quando o usuário pressionar o mouse
imageContainer.addEventListener("mousedown", (e) => {
    if (imageContainer.style.cursor !== "crosshair") return;

    isDrawing = true;

    const rect = imageContainer.getBoundingClientRect();
    // Use scrollLeft/scrollTop caso o container tenha scroll no futuro
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    if (roiBox) roiBox.remove();

    roiBox = document.createElement("div");
    roiBox.classList.add("roi-box");
    
    // Configuração inicial
    roiBox.style.left = `${startX}px`;
    roiBox.style.top = `${startY}px`;
    roiBox.style.width = "0px";
    roiBox.style.height = "0px";

    imageContainer.appendChild(roiBox);
    
    // Evita que o navegador selecione textos ou arraste a imagem
    e.preventDefault(); 
});

// Enquanto o usuário arrasta o mouse
imageContainer.addEventListener("mousemove", (e) => {
    if (!isDrawing || !currentRoi) return;

    const rect = imageContainer.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const width = currentX - startX;
    const height = currentY - startY;

    currentRoi.style.width = `${Math.abs(width)}px`;
    currentRoi.style.height = `${Math.abs(height)}px`;
    currentRoi.style.left = `${width < 0 ? currentX : startX}px`;
    currentRoi.style.top = `${height < 0 ? currentY : startY}px`;
});

// Quando soltar o mouse
window.addEventListener("mouseup", () => {
    if (isDrawing) {
        isDrawing = false;
        currentRoi = null; // "Soltamos" a referência para que a próxima marcação seja um novo elemento
    }
});

const undoBtn = document.getElementById("undoROI");

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