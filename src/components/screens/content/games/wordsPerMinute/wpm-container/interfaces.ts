export interface WpmContainerProps {
  /**
   * The required text to type
   */
  text: string;

  /**
   * The user's input
   */
  userInput?: string;

  /**
   * The callback for when the text and the user's input match
   */
  onComplete?: () => void;
}
