const $form = document.querySelector(".form");

$form.addEventListener("submit", handlesubmit);

async function handlesubmit(event) {
  event.preventDefault();
  const form = new FormData(this);
  const response = await fetch(this.action, {
    method: this.method,
    body: form,
    headers: {
      Accept: "application/json",
    },
  });
  if (response.ok) {
    this.reset();
    alert("Event request sent");
  }
}

let langLS;
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  langDefect();
});

async function selectLanguage() {
  if (langLS == "en") {
    const language = await fetch(`/languaje/en.json`);
    const langE = await language.json();
    translator(langE);
  } else {
    const language = await fetch(`/languaje/es.json`);
    const langS = await language.json();
    translator(langS);
  }
}

async function translator(language) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-lang");
    element.innerHTML = language[key];
  });
}

function langDefect() {
  if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", "en");
    langLS = "en";
  } else {
    langLS = localStorage.getItem("lang");
  }
  selectLanguage();
}
