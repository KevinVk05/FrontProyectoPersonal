export function toggle() {
  let cortina = document.getElementById("cortina");
  if (cortina.classList.contains("left")) {
    cortina.classList.add("right");
    cortina.classList.remove("left");
  } else {
    cortina.classList.add("left");
    cortina.classList.remove("right");
  }
}
