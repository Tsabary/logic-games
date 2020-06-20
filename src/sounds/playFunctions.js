import { Howl } from "howler";
import agree from "./agree.mp3";
import correct from "./correct.wav";
import countdownFinal from "./countdownFinal.wav";
import countdownGo from "./countdownGo.wav";
import countdownStart from "./countdownStart.wav";
import finished from "./finished.wav";
import wrong from "./wrong.wav";

export const playAgree = new Howl({
  src: [agree],
});

export const playCdStart = new Howl({
  src: [countdownStart],
});

export const playCdGo = new Howl({
  src: [countdownGo],
});

export const playCorrect = new Howl({
  src: [correct],
});

export const playWrong = new Howl({
  src: [wrong],
});

export const playCdFinal = new Howl({
  src: [countdownFinal],
});

export const playFinished = new Howl({
  src: [finished],
});
