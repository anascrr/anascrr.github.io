document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input-text");
  const display = document.getElementById("typed");

  input.addEventListener("input", function () {
    display.textContent = input.value;
  });
});
