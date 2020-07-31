export class Asset {
  id: string;
  icon: JSX.Element;
  constructor(id: string, icon: JSX.Element) {
    this.id = id;
    this.icon = icon;
  }
}

// This fills the conditions required so reorder component is visible
export const makeReorderVisible = (
  setIsReorderingVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImageAndChallengeSetVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >
) => {
  // We set the reorder component visibility to visible
  setIsReorderingVisible(true);

  // We make the other components visibility to false
  setIsImageAndChallengeSetVisible(false);
};

// This fills the conditions required so reorder component is visible
export const makeImageAndChallengeVisible = (
  setIsReorderingVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImageAndChallengeSetVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >
) => {
  // We set the reorder component visibility to visible
  setIsImageAndChallengeSetVisible(true);

  // We make the other components visibility to false
  setIsReorderingVisible(false);
};
