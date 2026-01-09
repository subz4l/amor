/* ================= LOGIN (index.html) ================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const USER = "mai";
    const PASS = "stivymai12";
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    if (username === USER && password === PASS) {
      window.location.href = "main.html";
    } else {
      errorMessage.textContent = "Usuario o contraseña incorrectos 💔";
    }
  });
}

/* ================= LÓGICA GENERAL DE PÁGINA PRINCIPAL (main.html) ================= */
// Definimos las variables al principio
const calendario = document.getElementById("calendario");
const clipsSection = document.getElementById("clips-section");
const initialTextDiv = document.getElementById("initial-text");

// Botones del menú
const btnCalendario = document.getElementById("btn-calendario");
const btnClips = document.getElementById("btn-clips");
const btnHome = document.getElementById("btn-home");
const btnCreditos = document.getElementById("btn-creditos");

// Función para ocultar todas las secciones antes de mostrar una nueva
function hideAllSections() {
  if (calendario) calendario.classList.add("hidden");
  if (clipsSection) clipsSection.classList.add("hidden");
  // Ocultamos el texto de bienvenida si existe
  const pageTitle = document.querySelector(".page-title");
  const subtitle = document.querySelector(".subtitle");
  
  // Opción A: Si usaste el div contenedor nuevo
  if (initialTextDiv) {
      initialTextDiv.style.display = "none";
  } 
  // Opción B: Si aun tienes el html antiguo, ocultamos por clases
  else {
      if(pageTitle) pageTitle.style.display = "none";
      if(subtitle) subtitle.style.display = "none";
  }
}

// --- 1. Botón HOME (Regresar al Login) ---
if (btnHome) {
  btnHome.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// --- 2. Botón CALENDARIO ---
if (btnCalendario && calendario) {
  btnCalendario.addEventListener("click", () => {
    if (!calendario.classList.contains("hidden")) {
       // Si ya se ve, no hacemos nada o podríamos cerrarlo (opcional)
    } else {
       hideAllSections();
       calendario.classList.remove("hidden");
       window.scrollTo(0, 0);
    }
  });
}

// --- 3. Botón CLIPS (Nueva funcionalidad) ---
if (btnClips && clipsSection) {
  btnClips.addEventListener("click", () => {
    hideAllSections();
    clipsSection.classList.remove("hidden");
  });
}

// --- 4. Modal CRÉDITOS ---
const modalCreditos = document.getElementById("modal-creditos");
const closeCreditos = document.getElementById("close-creditos");

if (btnCreditos && modalCreditos) {
  btnCreditos.addEventListener("click", () => {
    modalCreditos.style.display = "block";
  });
  
  if (closeCreditos) {
      closeCreditos.addEventListener("click", () => {
        modalCreditos.style.display = "none";
      });
  }
  
  window.addEventListener("click", (e) => {
    if (e.target === modalCreditos) {
      modalCreditos.style.display = "none";
    }
  });
} 

/* ================= LÓGICA INTERNA DEL CALENDARIO ================= */
const diasContainer = document.getElementById("dias-container");
const mesesBotones = document.querySelectorAll(".mes");

// Solo ejecutamos esto si existen los elementos del calendario
if (diasContainer && mesesBotones.length > 0) {
  const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const nombresMeses = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];
  
  const diasAcumulados = diasPorMes.map((dias, i) =>
    diasPorMes.slice(0, i + 1).reduce((a, b) => a + b, 0)
  );

  mesesBotones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const mesIndex = parseInt(boton.dataset.mes);
      const totalDias = diasPorMes[mesIndex];

      diasContainer.innerHTML = "";
      diasContainer.classList.remove("hidden");

      for (let d = 1; d <= totalDias; d++) {
        const diaEl = document.createElement("div");
        diaEl.classList.add("dia");
        diaEl.textContent = d;

        // Cálculo del día absoluto para buscar la imagen/carta
        let diaAbsoluto = (mesIndex === 0 ? d : diasAcumulados[mesIndex - 1] + d);

        diaEl.addEventListener("click", () => {
          const modalCarta = document.getElementById("modal-carta");
          const closeCarta = document.getElementById("close-carta");
          const previewImg = document.getElementById("preview-img");
          const cartaInfo = document.getElementById("carta-info");
          const cartaImg = document.getElementById("carta-img");

          if (modalCarta) {
              if(previewImg) previewImg.src = `images/calendario/img${diaAbsoluto}.jpeg`;
              if(cartaImg) cartaImg.src = `images/cartas/carta${diaAbsoluto}.png`;
              if(cartaInfo) cartaInfo.textContent = `${d} de ${nombresMeses[mesIndex]} 2025 - Carta ${diaAbsoluto}`;
              
              modalCarta.style.display = "block";

              if (closeCarta) {
                  closeCarta.onclick = () => { modalCarta.style.display = "none"; };
              }
              
              // Cerrar al hacer click fuera
              window.onclick = (e) => {
                if (e.target === modalCarta) {
                  modalCarta.style.display = "none";
                }
                 // Mantenemos la lógica de créditos aquí también por si acaso se solapan eventos
                if (modalCreditos && e.target === modalCreditos) {
                   modalCreditos.style.display = "none";
                }
              };
          }
        });

        diasContainer.appendChild(diaEl);
      }
    });
  });
}