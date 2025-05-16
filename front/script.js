const listButton = document.getElementById("list-button");
const listTab = document.getElementById("list-tab");
const listContent = document.getElementById("list-content");

let carros = [];

async function listCarros() {
  try {
    const response = await fetch("http://localhost:8080/carros");
    carros = await response.json();
    listContent.innerHTML = "";
    carros.forEach((carro) => {
      const item = document.createElement("div");
      item.classList.add("carro-item");

      const info = document.createElement("div");
            info.classList.add("carro-info");
            info.innerHTML = `
                <strong>${carro.name}</strong>
                <span>Cor: ${carro.cor}</span>
              `;

          ;

          item.appendChild(info);
                listContent.appendChild(item);
              });
            } catch (error) {
              console.error("Erro ao buscar dados:", error);
            }
          }

          listButton.addEventListener("click", async function () {
            await listCarros();
          });