const card = document.querySelector(".cards-content");
const login = document.querySelector("#logR");

document.addEventListener("DOMContentLoaded", () => {
  consumirAPI();
});

async function consumirAPI() {
  const URL = "http://localhost:8080/api/v1/events/filter/CONFERENCE";
  const respuesta = await fetch(URL);
  const datos = await respuesta.json();

  printEvents(await datos);
}

function printEvents(datos) {
  console.log(datos);
  cleanHTML();
  datos.forEach((event) => {
    const fecha = new Date(event.date);

    const año = fecha.getFullYear();
    const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
    const día = ("0" + fecha.getDate()).slice(-2);

    event.date = `${año}-${mes}-${día}`;

    card.innerHTML += `
        <div class="card">

          <div class="card_animation">


            <div class="card-image">
              <img src="/img/coachella.jpg" alt="Card Image">
            </div>
            <div class="card-content">
            <h2 class="card-title">${event.name}</h2>
            <h3 class="card-subtitle">${event.date}</h3>
            <p class="card-description">${event.description}</p>
        </div>
        </div>
          <div class="card-footer">
            <button data-lang="obtTickets" onClick="verificacionLogin()" class="btn-tickets obtTickets">Obtener entradas</button>
          </div>
        </div>
        `;
  });
}

function cleanHTML() {
  while (card.firstChild) {
    card.removeChild(card.firstChild);
  }
}

function verificacionLogin() {
  const token = localStorage.getItem("token");
  const obtTickets = document.querySelector(".obtTickets");

  if (!token) {
    login.click();
    obtTickets.click();
  }
}
