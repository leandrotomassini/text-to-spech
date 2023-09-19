import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-spech.component.html',
  styleUrls: ['./text-to-spech.component.css']
})
export class TextToSpeechComponent implements OnInit {
  speech = new SpeechSynthesisUtterance();
  voices: SpeechSynthesisVoice[] = [];
  voiceSelect: HTMLSelectElement | null = null;

  ngOnInit() {
    this.voiceSelect = document.querySelector("select");

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }

    if (this.voiceSelect) {
      this.voiceSelect.addEventListener("change", () => {
        this.selectVoice();
      });
    }

    const button = document.querySelector("button");
    if (button) {
      button.addEventListener("click", () => {
        this.speakText();
      });
    }
  }

  loadVoices() {
    this.voices = window.speechSynthesis.getVoices();
    this.speech.voice = this.voices[0];

    if (this.voiceSelect) {
      this.voices.forEach((voice, index) => {
        this.voiceSelect!.options[index] = new Option(voice.name, index.toString());
      });
    }
  }

  selectVoice() {
    if (this.voiceSelect) {
      this.speech.voice = this.voices[parseInt(this.voiceSelect.value, 10)];
    }
  }

  speakText() {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      this.speech.text = textarea.value;
      window.speechSynthesis.speak(this.speech);
    }
  }
}
