
/* ================= LOGIN ================= */
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
      window.location.href = "main.html"; // acceso correcto
    } else {
      errorMessage.textContent = "Usuario o contraseña incorrectos 💔";
    }
  });
}

/* ================= MAIN PAGE ================= */
const calendario = document.getElementById("calendario");
const btnCalendario = document.getElementById("btn-calendario");
const btnHome = document.getElementById("btn-home");
const btnCreditos = document.getElementById("btn-creditos");

if (btnCalendario && btnHome && btnCreditos) {
  // 🔹 Seleccionamos el texto inicial (para ocultarlo o mostrarlo)
  const pageTitle = document.querySelector(".page-title");
  const subtitle = document.querySelector(".subtitle");

  // --- Mostrar/Ocultar Calendario ---
  btnCalendario.addEventListener("click", () => {
    calendario.classList.toggle("hidden");
    // Oculta el texto inicial al abrir el calendario
    pageTitle.style.display = "none";
    subtitle.style.display = "none";
  });

  // --- Botón Casa ---
  btnHome.addEventListener("click", () => {
    // Muestra el texto inicial al volver al inicio
    pageTitle.style.display = "block";
    subtitle.style.display = "block";
    // Si quieres que además regrese al login, descomenta la siguiente línea:
    // window.location.href = "index.html";
  });

  // --- Modal Créditos ---
  const modalCreditos = document.getElementById("modal-creditos");
  const closeCreditos = document.getElementById("close-creditos");

  btnCreditos.addEventListener("click", () => {
    modalCreditos.style.display = "block";
    // Oculta el texto inicial al abrir créditos
    pageTitle.style.display = "none";
    subtitle.style.display = "none";
  });

  closeCreditos.addEventListener("click", () => {
    modalCreditos.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalCreditos) {
      modalCreditos.style.display = "none";
    }
  });

  /* ================= CALENDARIO ================= */
  const diasContainer = document.getElementById("dias-container");
  const mesesBotones = document.querySelectorAll(".mes");

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

        let diaAbsoluto =
          (mesIndex === 0 ? d : diasAcumulados[mesIndex - 1] + d);

        diaEl.addEventListener("click", () => {
          const modalCarta = document.getElementById("modal-carta");
          const closeCarta = document.getElementById("close-carta");
          const previewImg = document.getElementById("preview-img");
          const cartaInfo = document.getElementById("carta-info");
          const cartaImg = document.getElementById("carta-img");

          previewImg.src = `images/calendario/img${diaAbsoluto}.jpeg`;
          cartaImg.src = `images/cartas/carta${diaAbsoluto}.png`;
          cartaInfo.textContent = `${d} de ${nombresMeses[mesIndex]} 2025 - Carta ${diaAbsoluto}`;
          modalCarta.style.display = "block";

          closeCarta.addEventListener("click", () => {
            modalCarta.style.display = "none";
          });
          window.addEventListener("click", (e) => {
            if (e.target === modalCarta) {
              modalCarta.style.display = "none";
            }
          });
        });

        diasContainer.appendChild(diaEl);
      }
    });
  });
}
