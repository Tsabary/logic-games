export class Equation {
  problem: string;
  answer: boolean;
  id: number;
  constructor(problem: string, answer: boolean, id: number) {
    this.problem = problem;
    this.answer = answer;
    this.id = id;
  }
}

export default [
  // Simple but confusing equations

  new Equation("(4 * 5) - 3 = 17", true, 0),
  new Equation("(6 / 2) + 3 = 6", true, 1),
  new Equation("(4 * 7) + 7 = 35", true, 2),
  new Equation("(5 * 9) - 9 = 36", true, 3),
  new Equation("(8 / 4) + 4 = 6", true, 4),
  new Equation("(9 / 3) + 3 = 6", true, 5),
  new Equation("(3 * 3) + 3 = 12", true, 6),
  new Equation("(4 * 3) - 3 = 9", true, 7),
  new Equation("(5 * 2) - 7 = 3", true, 8),
  new Equation("(8 / 4) - 2 = 0", true, 9),
  new Equation("(3 * 7) - 9 = 12", true, 10),
  new Equation("(8 * 3) - 6 = 18", true, 11),
  new Equation("(7 * 2) - 7 = 7", true, 12),
  new Equation("(4 * 9) - 5 = 31", true, 13),
  new Equation("(1 * 1) - 1 = 0", true, 14),
  new Equation("(7 * 2) + 4 = 18", true, 15),
  new Equation("(6 * 3) - 5 = 13", true, 16),
  new Equation("(4 * 7) - 9 = 19", true, 17),
  new Equation("(6 * 2) + 4 = 16", true, 18),
  new Equation("(2 * 3) + 3 = 9", true, 19),
  new Equation("(1 * 5) - 1 = 4", true, 20),
  new Equation("(3 * 2) + 4 = 10", true, 21),
  new Equation("(8 / 4) + 4 = 6", true, 22),
  new Equation("(9 / 3) + 7 = 10", true, 23),
  new Equation("(10 / 5) + 4 = 6", true, 24),
  new Equation("(9 * 7) - 8 = 56", false, 25),
  new Equation("(6 * 5) - 6 = 25", false, 26),
  new Equation("(2 * 9) - 8 = 12", false, 27),
  new Equation("(10 / 5) + 2 = 5", false, 28),
  new Equation("(9 / 3) + 3 = 9", false, 29),
  new Equation("(4 * 3) - 3 = 8", false, 30),
  new Equation("(9 * 5) - 9 = 40", false, 31),
  new Equation("(7 * 7) - 6 = 41", false, 32),
  new Equation("(7 * 8) - 8 = 46", false, 33),
  new Equation("(9 * 3) + 7 = 33", false, 34),
  new Equation("(6 * 8) + 8 = 54", false, 35),
  new Equation("(4 * 4) - 4 = 14", false, 36),
  new Equation("(7 * 6) - 8 = 32", false, 37),
  new Equation("(9 * 5) + 5 = 40", false, 38),
  new Equation("(6 * 3) + 5 = 21", false, 39),
  new Equation("(8 / 4) + 9 = 13", false, 40),
  new Equation("(2 / 2) + 4 = 6", false, 41),
  new Equation("(8 / 8) - 1 = 1", false, 42),
  new Equation("(9 / 3) + 3 = 9", false, 43),
  new Equation("(5 * 3) + 3 = 17", false, 44),
  new Equation("(6 / 2) + 3 = 5", false, 45),
  new Equation("(4 / 2) + 6 = 10", false, 46),
  new Equation("(7 * 4) - 8 = 22", false, 47),
  new Equation("(6 * 2) + 4 = 18", false, 48),
  new Equation("(7 * 3) + 7 = 26", false, 49),

  // Easier equations

  new Equation("(4 * 6) + 3 = 27", true, 50),
  new Equation("(7 * 2) - 4 = 10", true, 51),
  new Equation("(5 * 6) + 7 = 37", true, 52),
  new Equation("(2 * 6 - 2 = 10) = ", true, 53),
  new Equation("(5 * 5) - 10 = 15", true, 54),
  new Equation("(8 / 2) + 5 = 9", true, 55),
  new Equation("(12 / 6) + 3 = 5", true, 56),
  new Equation("(10 / 5) + 6 = 8", true, 57),
  new Equation("(5 * 4) - 3 = 17", true, 58),
  new Equation("(6 * 3) - 8 = 10", true, 59),
  new Equation("(9 / 3) + 7 = 10", true, 60),
  new Equation("(2 * 3) + 7 = 13", true, 61),
  new Equation("(4 / 2) + 5 = 7", true, 62),
  new Equation("(7 * 4) - 6 = 22", true, 63),
  new Equation("(8 * 3) - 6 = 18", true, 64),

  new Equation("(4 * 5) + 4 = 26", false, 65),
  new Equation("(6 * 3) - 5 = 12", false, 66),
  new Equation("(4 * 4) + 7 = 28", false, 67),
  new Equation("3 * 5) - 6 = 4", false, 68),
  new Equation("(10 / 2) + 3 = 10", false, 69),
  new Equation("(8 / 4) + 2 = 5", false, 70),
  new Equation("(9 / 3) + 5 = 12", false, 71),
  new Equation("(7 * 2) - 4 = 6", false, 72),
  new Equation("(6 / 3) + 4 = 8", false, 73),
  new Equation("(7 * 5) - 10 = 20", false, 74),
  new Equation("(8 * 2) + 4 = 30", false, 75),
  new Equation("(4 * 6) - 6 = 12", false, 76),
  new Equation("(3 / 3) + 4 = 8", false, 77),
  new Equation("(1 * 8) + 1 = 10", false, 78),
  new Equation("(5 * 5) + 3 = 22", false, 79),
];
