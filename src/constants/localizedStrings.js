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

    // GENERAL //
    submit: "submit",
    image: "image",
    images: "images",

    box: "box",
    boxes: "boxes",

    // INSTRUCTIONS //
    instructionsTitle: "Instructions",
    statement: "statement",
    wrongAnswer: "Wrong answer",
    correctAnswer: "Correct answer",
    iUnderstand: "I understand",

    // Double Truble instructions
    dtInstructionsLineOne:
      "See what color the top word is. Select that color from the two options below.",
    dtInstructionsLineTwo:
      "DON'T pay attention to what the top word says or the color of the two options below.",
    dtInstructionsLineThree:
      "It's important to match the color of the top word with the meaning of the word below.",
    dtSampleExplain: "Word is in blue color",

    // Gramatical reasoning instructions
    grInstructionsLineOne:
      "There are two shapes and a statement describing the relationship between the shape.",
    grInstructionsLineTwo: "Choose if the statement is true or false.",
    grSampleExplain: "Circle is bigger than square",

    // Corsi Block instructions
    cbInstructionsLineOne:
      "In each round a number of boxes will be highlighted in a specific sequence.",
    cbInstructionsLineTwo:
      "Wait for the boxes to finish highlighting and then repeat the sequence by clicking on the boxes.",
    cbStateOneTitle: "Box",
    cbStateOneOrder:
      "(Clicking on the boxes, highlights them. Do it in the same sequence)",
    cbStateTwoTitle: "Highlighted box",
    cbStateTwoOrder:
      "(Remember the sequence in which the boxes are highlighted, then replay)",

    // Operation Span instructions
    osInstructionsLineOne:
      "Each round you will be presented with a number of math equations, to decide if they are true or false.",
    osInstructionsLineTwo:
      "Before each math equation, you will be shown an image, which you have to remember.",
    osInstructionsLineThree:
      "At the end of each round, you have to select the images you saw, in the order they were presented to you.",

    // Token Search instructions
    tsInstructionsLineOne:
      "Find a token hidden inside the boxes, by clicking on them.",
    tsInstructionsLineTwo:
      "You are allowed to click on each box only once, before you find a token.",
    tsInstructionsLineThree:
      "Once you find a token, search for a new one inside other boxes.",
    tsInstructionsLineFour:
      "DON'T click on a box where you already found a token",
    tsInstructionsLineFive:
      "The round ends when you find tokens inside all of the boxes.",

    // Token Search indicators explain

    tsIndicatorExplainTitleOne: "box",
    tsIndicatorExplainDetailsOne:
      "(only click on it once, before finding a token)",
    tsIndicatorExplainTitleTwo: "empty box",
    tsIndicatorExplainDetailsTwo:
      "(don't click on it again, before finding a token)",
    tsIndicatorExplainTitleThree: "you've opened the same box",
    tsIndicatorExplainDetailsThree:
      "(dont click on the same box twice, before finding a token)",
    tsIndicatorExplainTitleFour: "you found a token!",
    tsIndicatorExplainDetailsFour:
      "(now search for the token inside the other boxes. don't click on this box again.)",
    tsIndicatorExplainTitleFive: "you re-opened a box with a token",
    tsIndicatorExplainDetailsFive:
      "(don't click on the box where you already found a token)",

    imageInfo: "An image will be shown before each math equation. Remember it.",

    mathEquation: "math equation",
    mathEquationInfoOne:
      "Answer if this equation is true or false, by clicking on the buttons below.",
    mathEquationInfoTwo:
      "You have 5 seconds for each math equation. If you run out of time, or if your answer is wrong, you will lose half a life.",

    selectImages: "select images",
    selectImagesInfoOne:
      "At the end of each round, you have 15 seconds to select the images you saw, in the same order they were presented to you",
    selectImagesInfoTwo:
      "If you do this incorrectly, you will lose a whole life",
    selectThe: "Select the",

    // START SCREEN //
    startGame: "Start the game",

    // SIDE BAR //
    time: " Time",
    score: "Score",
    livesRemaining: "Lives Remaining",

    // DONE //
    thankYou: "Thank you!",
    thankYouMessage:
      "We will reach you as soon as we carfully review your interview.",
    youScored: "Your score is",
    playAgain: "Play again",

    // CORSI BLOCKS //
    blocks: "blocks",
    livesLeft: "lives left!",
    lifeLeft: "life left!",
    roundComplete: "Round complete!",
  },
});

export default strings;
