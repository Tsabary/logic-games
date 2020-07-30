export const makeLevelIndicatorVisible = (
  setIsLevelIndicatorVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsGameVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSuccessIndicatorVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLevelIndicatorVisible(true);
  setIsGameVisible(false);
  setIsSuccessIndicatorVisible(false);
};

export const makeGameVisible = (
  setIsLevelIndicatorVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsGameVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSuccessIndicatorVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLevelIndicatorVisible(false);
  setIsGameVisible(true);
  setIsSuccessIndicatorVisible(false);
};

export const makeSuccessIndicatorVisible = (
  setIsLevelIndicatorVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsGameVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSuccessIndicatorVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLevelIndicatorVisible(false);
  setIsGameVisible(false);
  setIsSuccessIndicatorVisible(true);
};
