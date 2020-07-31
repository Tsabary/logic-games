// This fills the conditions required so the image component is visible
export const makeImageVisible = (
  setIsImageVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDistractionQuestionVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsImageVisible(true);
  setIsDistractionQuestionVisible(false);
};

export const makeDistractionChallengeVisible = (
  setIsImageVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDistractionQuestionVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsDistractionQuestionVisible(true);
  setIsImageVisible(false);
};
