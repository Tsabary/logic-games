import LocalizedStrings from "react-localization";

// These are all the strings accross the app. Can intoduce new languages if needed, otherwise, English is the default regarldess of the local language
let strings = new LocalizedStrings({
  en: {
    // COLORS //
    red: "red",
    blue: "blue",

    // BOOLEANS //
    true: "true",
    false: "false",

    // INSTRUCTIONS //
    instructionsTitle: "Instructions",
    dtInstructionsLineOne:
      "See what color the top word is. Select that color from the two options below.",
    dtInstructionsLineTwo:
      "DON'T pay attention to what the top word says or the color of the two options below.",
    dtInstructionsLineThree:
      "It's important to match the color of the top word with the meaning of the word below.",
    dtSampleExplain: "Word is in blue color",

    grInstructionsLineOne:
      "There are two shapes and a statement describing the relationship between the shape.",
    grInstructionsLineTwo: "Choose if the statement is true or false.",
    grSampleExplain: "Circle is bigger than square",
    statement: "statement",

    wrongAnswer: "Wrong answer",
    correctAnswer: "Correct answer",
    iUnderstand: "I understand",

    // START SCREEN //
    StartGame: "Start the game",

    // SIDE BAR //
    time: " Time",
    score: "Score",

    // DONE //
    thankYou: "Thank you!",
    thankYouMessage:
      "We will reach you as soon as we carfully review your interview.",
  },
});

export default strings;
