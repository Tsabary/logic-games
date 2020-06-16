import LocalizedStrings from "react-localization";

// These are all the strings accross the app. Can intoduce new languages if needed, otherwise, English is the default regarldess of the local language
let strings = new LocalizedStrings({
  en: {
    // COLORS //
    red: "red",
    blue: "blue",

    // INSTRUCTIONS //
    instructionsTitle: "Instructions",
    instructionsLineOne:
      "See what color the top word is. Select that color from the two options below.",
    instructionsLineTwo:
      "DON'T pay attention to what the top word says or the color of the two options below.",
    instructionsLineThree:
      "It's important to match the color of the top word with the meaning of the word below.",
    sampleExplain: "Word is in blue color",
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
