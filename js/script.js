const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const bookingForm = document.getElementById("bookingForm");

const API_URL ="https://script.google.com/macros/s/AKfycbwBgCKM8WUp3Nqy0d82dYLaaKJxBrTvczoZJEXyZxx9GsENVk_qeZ8JktePvnZptNo6pA/exec";
  
const phoneNumber = "50254152272";

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const style = document.getElementById("style").value;
  const length = document.getElementById("length").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!name || !style || !length || !date || !time) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const message = `Hola GlossyNails, quiero agendar una cita.

Nombre: ${name}
Estilo: ${style}
Largo: ${length}
Fecha: ${date}
Hora: ${time}`;

  const callbackName = "handleBookingResponse";

  window.handleBookingResponse = function (result) {
    console.log("Respuesta Google:", result);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Cita registrada correctamente.");

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.location.href = whatsappURL;

    bookingForm.reset();
  };

  const params = new URLSearchParams({
    name,
    style,
    length,
    date,
    time,
    callback: callbackName,
  });

  const oldScript = document.getElementById("googleSheetScript");

  if (oldScript) {
    oldScript.remove();
  }

  const script = document.createElement("script");

  script.id = "googleSheetScript";

  script.src = `${API_URL}?${params.toString()}`;

  script.onerror = function () {
    alert(
      "No se pudo conectar con Google Sheets. Verifica que el deployment esté en Anyone."
    );
  };

  document.body.appendChild(script);
});

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);