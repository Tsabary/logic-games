import { Howl } from "howler";

const agree = require("./agree.mp3");
const click = require("./click.mp3");
const correct = require("./correct.wav");
const countdownFinal = require("./countdownFinal.wav");
const countdownGo = require("./countdownGo.wav");
const countdownStart = require("./countdownStart.wav");
const finished = require("./finished.wav");
const wrong = require("./wrong.wav");

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

export const playClick = new Howl({
  src: [click],
});
