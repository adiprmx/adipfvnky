// toggle menu responsive
function toggleMenu() {
  const navMenu = document.querySelector("nav ul");
  navMenu.classList.toggle("show");
}

// scroll smooth ke section
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// === PLAY/STOP MUSIC DI CARD + AUTO GENERATE JUDUL ===
const cards = document.querySelectorAll(".card");
let currentAudio = null;

cards.forEach((card) => {
  const audioSrc = card.getAttribute("data-audio");
  const audio = new Audio(audioSrc);

  // ambil nama file tanpa folder & extension
  let fileName = audioSrc.split("/").pop().replace(".mp3", "");

  // bikin kapital tiap kata (title case)
  fileName = fileName
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // isi otomatis ke dalam card (tanpa teks tambahan)
  card.innerHTML = `<h3>${fileName}</h3>`;

  card.addEventListener("click", () => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.parentCard?.classList.remove("playing");
    }

    if (audio.paused) {
      audio.play();
      currentAudio = audio;
      currentAudio.parentCard = card;
      card.classList.add("playing");
    } else {
      audio.pause();
      audio.currentTime = 0;
      currentAudio = null;
      card.classList.remove("playing");
    }
  });
});