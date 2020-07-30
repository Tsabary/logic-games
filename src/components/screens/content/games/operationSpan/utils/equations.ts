class Equation {
  problem: string;
  answer: boolean;
  constructor(problem: string, answer: boolean) {
    this.problem = problem;
    this.answer = answer;
  }
}

export default [
  new Equation("(4 * 5) - 3 = 17", true),
  new Equation("(6 / 2) + 3 = 6", true),
  new Equation("(4 * 7) + 7 = 35", true),
  new Equation("(5 * 9) - 9 = 36", true),
  new Equation("(8 / 4) + 4 = 6", true),
  new Equation("(9 / 3) + 3 = 6", true),
  new Equation("(3 * 3) + 3 = 12", true),
  new Equation("(4 * 3) - 3 = 9", true),
  new Equation("(5 * 2) - 7 = 3", true),
  new Equation("(8 / 4) - 2 = 0", true),
  new Equation("(3 * 7) - 9 = 12", true),
  new Equation("(8 * 3) - 6 = 18", true),
  new Equation("(7 * 2) - 7 = 7", true),
  new Equation("(4 * 9) - 5 = 31", true),
  new Equation("(1 * 1) - 1 = 0", true),
  new Equation("(7 * 2) + 4 = 18", true),
  new Equation("(6 * 3) - 5 = 13", true),
  new Equation("(4 * 7) - 9 = 19", true),
  new Equation("(6 * 2) + 4 = 16", true),
  new Equation("(2 * 3) + 3 = 9", true),
  new Equation("(1 * 5) - 1 = 4", true),
  new Equation("(3 * 2) + 4 = 10", true),
  new Equation("(8 / 4) + 4 = 6", true),
  new Equation("(9 / 3) + 7 = 10", true),
  new Equation("(10 / 5) + 4 = 6", true),
  new Equation("(9 * 7) - 8 = 56", false),
  new Equation("(6 * 5) - 6 = 25", false),
  new Equation("(2 * 9) - 8 = 12", false),
  new Equation("(10 / 5) + 2 = 5", false),
  new Equation("(9 / 3) + 3 = 9", false),
  new Equation("(4 * 3) - 3 = 8", false),
  new Equation("(9 * 5) - 9 = 40", false),
  new Equation("(7 * 7) - 6 = 41", false),
  new Equation("(7 * 8) - 8 = 46", false),
  new Equation("(9 * 3) + 7 = 33", false),
  new Equation("(6 * 8) + 8 = 54", false),
  new Equation("(4 * 4) - 4 = 14", false),
  new Equation("(7 * 6) - 8 = 32", false),
  new Equation("(9 * 5) + 5 = 40", false),
  new Equation("(6 * 3) + 5 = 21", false),
  new Equation("(8 / 4) + 9 = 13", false),
  new Equation("(2 / 2) + 4 = 6", false),
  new Equation("(8 / 8) - 1 = 1", false),
  new Equation("(9 / 3) + 3 = 9", false),
  new Equation("(5 * 3) + 3 = 17", false),
  new Equation("(6 / 2) + 3 = 5", false),
  new Equation("(4 / 2) + 6 = 10", false),
  new Equation("(7 * 4) - 8 = 22", false),
  new Equation("(6 * 2) + 4 = 18", false),
  new Equation("(7 * 3) + 7 = 26", false),
];

// export default [
//   new Equation("(4 * 5) - 3 = 17", true),
//   new Equation("", ),

//   {
//     problem: "(4 * 5) - 3 = 17",
//     answer: true,
//   },
//   {
//     problem: "(6 / 2) + 3 = 6",
//     answer: true,
//   },
//   {
//     problem: "(4 * 7) + 7 = 35",
//     answer: true,
//   },
//   {
//     problem: "(5 * 9) - 9 = 36",
//     answer: true,
//   },
//   {
//     problem: "(8 / 4) + 4 = 6",
//     answer: true,
//   },
//   {
//     problem: "(9 / 3) + 3 = 6",
//     answer: true,
//   },
//   {
//     problem: "(3 * 3) + 3 = 12",
//     answer: true,
//   },
//   {
//     problem: "(4 * 3) - 3 = 9",
//     answer: true,
//   },
//   {
//     problem: "(5 * 2) - 7 = 3",
//     answer: true,
//   },
//   {
//     problem: "(8 / 4) - 2 = 0",
//     answer: true,
//   },
//   {
//     problem: "(3 * 7) - 9 = 12",
//     answer: true,
//   },
//   {
//     problem: "(8 * 3) - 6 = 18",
//     answer: true,
//   },
//   {
//     problem: "(7 * 2) - 7 = 7",
//     answer: true,
//   },
//   {
//     problem: "(4 * 9) - 5 = 31",
//     answer: true,
//   },
//   {
//     problem: "(1 * 1) - 1 = 0",
//     answer: true,
//   },

//   {
//     problem: "(7 * 2) + 4 = 18",
//     answer: true,
//   },

//   {
//     problem: "(6 * 3) - 5 = 13",
//     answer: true,
//   },

//   {
//     problem: "(4 * 7) - 9 = 19",
//     answer: true,
//   },

//   {
//     problem: "(6 * 2) + 4 = 16",
//     answer: true,
//   },

//   {
//     problem: "(2 * 3) + 3 = 9",
//     answer: true,
//   },

//   {
//     problem: "(1 * 5) - 1 = 4",
//     answer: true,
//   },

//   {
//     problem: "(3 * 2) + 4 = 10",
//     answer: true,
//   },

//   {
//     problem: "(8 / 4) + 4 = 6",
//     answer: true,
//   },

//   {
//     problem: "(9 / 3) + 7 = 10",
//     answer: true,
//   },
//   {
//     problem: "(10 / 5) + 4 = 6",
//     answer: true,
//   },
//   {
//     problem: "(9 * 7) - 8 = 56",
//     answer: false,
//   },
//   {
//     problem: "(6 * 5) - 6 = 25",
//     answer: false,
//   },
//   {
//     problem: "(2 * 9) - 8 = 12",
//     answer: false,
//   },
//   {
//     problem: "(10 / 5) + 2 = 5",
//     answer: false,
//   },
//   {
//     problem: "(9 / 3) + 3 = 9",
//     answer: false,
//   },
//   {
//     problem: "(4 * 3) - 3 = 8",
//     answer: false,
//   },
//   {
//     problem: "(9 * 5) - 9 = 40",
//     answer: false,
//   },
//   {
//     problem: "(7 * 7) - 6 = 41",
//     answer: false,
//   },
//   {
//     problem: "(7 * 8) - 8 = 46",
//     answer: false,
//   },
//   {
//     problem: "(9 * 3) + 7 = 33",
//     answer: false,
//   },
//   {
//     problem: "(6 * 8) + 8 = 54",
//     answer: false,
//   },
//   {
//     problem: "(4 * 4) - 4 = 14",
//     answer: false,
//   },
//   {
//     problem: "(7 * 6) - 8 = 32",
//     answer: false,
//   },
//   {
//     problem: "(9 * 5) + 5 = 40",
//     answer: false,
//   },
//   {
//     problem: "(6 * 3) + 5 = 21",
//     answer: false,
//   },
//   {
//     problem: "(8 / 4) + 9 = 13",
//     answer: false,
//   },
//   {
//     problem: "(2 / 2) + 4 = 6",
//     answer: false,
//   },
//   {
//     problem: "(8 / 8) - 1 = 1",
//     answer: false,
//   },
//   {
//     problem: "(9 / 3) + 3 = 9",
//     answer: false,
//   },
//   {
//     problem: "(5 * 3) + 3 = 17",
//     answer: false,
//   },
//   {
//     problem: "(6 / 2) + 3 = 5",
//     answer: false,
//   },
//   {
//     problem: "(4 / 2) + 6 = 10",
//     answer: false,
//   },
//   {
//     problem: "(7 * 4) - 8 = 22",
//     answer: false,
//   },
//   {
//     problem: "(6 * 2) + 4 = 18",
//     answer: false,
//   },
//   {
//     problem: "(7 * 3) + 7 = 26",
//     answer: false,
//   },
// ];
