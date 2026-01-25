// Botões de ação
const editar_laudo = document.getElementById("pg_edicao_laudo");
const validar_laudo = document.getElementById("pg_validar_laudo");

// Evento para editar o laudo
editar_laudo.addEventListener("click", () => {
    window.location.href = '5.1_edicao_laudo.html';
});

// Evento para validar o laudo
validar_laudo.addEventListener("click", () => {
    window.location.href = '6_pagina_visualização_do_laudo.html';
});
