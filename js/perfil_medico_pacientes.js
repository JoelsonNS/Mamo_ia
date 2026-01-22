document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".filters input");
    const filterButtons = document.querySelectorAll(".filters button");
    const tableRows = document.querySelectorAll("tbody tr");

    let activeFilter = "todos";

    /* ==============================
       BUSCA (texto livre)
    ============================== */
    searchInput.addEventListener("input", () => {
        applyFilters();
    });

    /* ==============================
       FILTROS POR STATUS
    ============================== */
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");

            activeFilter = button.textContent.trim().toLowerCase();
            applyFilters();
        });
    });

    /* ==============================
       FUNÇÃO PRINCIPAL
    ============================== */
    function applyFilters() {
        const searchValue = searchInput.value.toLowerCase();

        tableRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            const badge = row.querySelector(".badge");

            let statusMatch = true;
            let searchMatch = rowText.includes(searchValue);

            if (activeFilter !== "todos") {
                if (!badge) {
                    statusMatch = false;
                } else {
                    statusMatch = badge.textContent.toLowerCase().includes(activeFilter);
                }
            }

            if (searchMatch && statusMatch) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }
});
