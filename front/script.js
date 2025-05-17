document.addEventListener("DOMContentLoaded", function () {
    const listButton = document.getElementById("list-button");
    const createButton = document.getElementById("create-button");
    const createNome = document.getElementById("create-nome");
    const createCor = document.getElementById("create-cor");
    const createSubmit = document.getElementById("create-submit");

    const editSelect = document.getElementById("edit-select");
    const editNome = document.getElementById("edit-nome");
    const editCor = document.getElementById("edit-cor");
    const editSubmit = document.getElementById("edit-submit");

    const deleteSelect = document.getElementById("delete-select");
    const listContent = document.getElementById("list-content");
    const deleteSubmit = document.getElementById("delete-submit")

    let carros = [];

    // Função para listar carros
    async function listCarros() {
        try {
            const response = await fetch("http://localhost:8080/carros");
            if (!response.ok) {
                throw new Error(`Erro ao buscar dados: ${response.statusText}`);
            }

            carros = await response.json();
            console.log("Carros recebidos:", carros);

            listContent.innerHTML = "";  // Limpar a lista de carros antes de atualizar

            carros.forEach((carro) => {
                const item = document.createElement("div");
                item.classList.add("carro-item");

                const info = document.createElement("div");
                info.classList.add("carro-info");
                info.innerHTML = `
                    <strong>${carro.name}</strong>
                    <span>Cor: ${carro.cor}</span>
                `;

                item.appendChild(info);
                listContent.appendChild(item);
            });

            preencherSelectEdicao();  // Atualiza o select da edição
            preencherSelectDelecao(); // Preenche o select da deleção

        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            listContent.innerHTML = `<p>Ocorreu um erro ao carregar a lista de carros. Tente novamente mais tarde.</p>`;
        }
    }

    // Função para preencher o select de edição
    function preencherSelectEdicao() {
        editSelect.innerHTML = "";
        carros.forEach((carro) => {
            const option = document.createElement("option");
            option.value = carro.id;
            option.textContent = `${carro.name} (${carro.cor})`;
            editSelect.appendChild(option);
        });
    }

    // Função para preencher o select de deleção
    function preencherSelectDelecao() {
        deleteSelect.innerHTML = "";
        carros.forEach((carro) => {
            const option = document.createElement("option");
            option.value = carro.id;
            option.textContent = `${carro.name} (${carro.cor})`;
            deleteSelect.appendChild(option);
        });
    }

    // Função para deletar um carro existente
    async function deletarCarro() {
        const id = deleteSelect.value;

        if (!id) {
            alert("Selecione um carro para deletar.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/carros/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao deletar carro: ${response.statusText}`);
            }

            alert("Carro deletado com sucesso!");
            await listCarros(); // Atualiza a lista após deletar
        } catch (error) {
            console.error("Erro ao deletar carro:", error);
        }
    }

    // Função para criar um novo carro
    async function createCarro() {
        const nome = createNome.value.trim();
        const cor = createCor.value.trim();

        if (!nome || !cor) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const novoCarro = {
            name: nome,
            cor: cor
        };

        try {
            const response = await fetch("http://localhost:8080/carros", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoCarro)
            });

            if (!response.ok) {
                throw new Error(`Erro ao criar carro: ${response.statusText}`);
            }

            await listCarros();
            createNome.value = "";
            createCor.value = "";
        } catch (error) {
            console.error("Erro ao criar carro:", error);
        }
    }

    // Função para editar um carro existente
    async function editarCarro() {
        const id = editSelect.value;
        const nome = editNome.value.trim();
        const cor = editCor.value.trim();

        if (!id || !nome || !cor) {
            alert("Preencha todos os campos de edição.");
            return;
        }

        const carroAtualizado = {
            name: nome,
            cor: cor
        };

        try {
            const response = await fetch(`http://localhost:8080/carros/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(carroAtualizado)
            });

            if (!response.ok) {
                throw new Error(`Erro ao editar carro: ${response.statusText}`);
            }

            await listCarros();
            editNome.value = "";
            editCor.value = "";
            alert("Carro atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao editar carro:", error);
        }
    }

    // Eventos
    createSubmit.addEventListener("click", createCarro);
    listButton.addEventListener("click", listCarros);
    editSubmit.addEventListener("click", editarCarro);
    deleteSubmit.addEventListener("click", deletarCarro);

    // Carrega ao iniciar
    listCarros();
});
