const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

const logoutBtn = document.getElementById("logout");
const loginButton = document.getElementById("logInButton");


signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-activeM");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-activeM");
});

const modal = document.getElementById("modalContentM");
const body = document.querySelector("body");
const logR = document.getElementById("logR");
const logClosed = document.getElementById("logC");
const logC = document.getElementById("logCd");

logR.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("entro");
  if (
    modal.classList.contains("initial_disabled") ||
    modal.classList.contains("disebled_")
  ) {
    window.location.href = "#header";
    modal.classList.remove("initial_disabled");
    modal.classList.add("disebled_");
    modal.classList.add("action_look");
    body.classList.add("noScroll");
  }
});

logClosed.addEventListener("click", (e) => {

  e.preventDefault();
  if (modal.classList.contains("action_look")) {
    body.classList.remove("noScroll");
    modal.classList.add("initial_disabled");
    modal.classList.remove("action_look");
  }
});
logC.addEventListener("click", (e) => {

  e.preventDefault();
  if (modal.classList.contains("action_look")) {
    body.classList.remove("noScroll");
    modal.classList.add("initial_disabled");
    modal.classList.remove("action_look");
  }
});

const btn = document.getElementById("Sign");

btn.addEventListener("click", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("emailRegister").value;
  const password = document.getElementById("passwordRegister").value;

  const formData = {
    username: username,
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response);

    if (response.ok) {
      console.log("Registro exitoso");
      signInButton.click();
      document.getElementById("username").value="";
      document.getElementById("emailRegister").value="";
      document.getElementById("passwordRegister").value="";
      await saveUser(formData);
    } else {
      document.getElementById("username").value="";
      document.getElementById("emailRegister").value="";
      document.getElementById("passwordRegister").value="";
      alert("Failed Register, try again!");
      console.error("Error en el registro uno");
    }
  } catch (error) {
    console.error("Error en el registro:", error);
  }
}

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", handleLogin);

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  const formData = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      
      console.log('Inicio de sesión exitoso');
      // Redireccionar a la página de inicio después del inicio de sesión exitoso
      window.location.href = '../index.html';
      //loginButton.style.display = "none";
      //logoutBtn.style.display = "block";

      const token = await response.json()

      console.log(token);
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      console.error("Error en el inicio de sesión");
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
  }

  
}
logoutBtn.addEventListener('click', handleLogout);

  function handleLogout() {

    localStorage.removeItem('token');
    window.location.href = '../index.html';

    console.log('Sesión cerrada');
    
    //logoutBtn.style.display = "none";
    //loginButton.style.display = "block";
  }
  
async function saveUser(user) {
  user.role = "USER";
  try {
    const response = await fetch("http://localhost:8080/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      console.log("success User");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  
}

//Prueba
const token = localStorage.getItem('token')

if(token){
  loginButton.style.display = "none";
  logoutBtn.style.display = "block";
}else{
  loginButton.style.display = "block";
  logoutBtn.style.display = "none";
}
