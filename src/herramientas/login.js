export function toggle() {
  const cortina = document.getElementById("cortina");
  const login = document.getElementById("login-form");
  const registro = document.getElementById("registro-form");

  if (cortina.classList.contains("left")) {
    cortina.classList.add("right");
    cortina.classList.remove("left");

    login.classList.add("form-visible");
    registro.classList.remove("form-visible");
  } else {
    cortina.classList.add("left");
    cortina.classList.remove("right");

    login.classList.remove("form-visible");
    registro.classList.add("form-visible");
  }
}
