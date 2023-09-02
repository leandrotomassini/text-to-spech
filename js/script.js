let speech = new SpeechSynthesisUtterance();
let voices = [];

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[262];
};

speech.onend = function () {
  console.log("La reproducción del audio ha terminado.");
};

document.querySelector("button").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
});
