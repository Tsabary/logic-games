import { Asset } from "../../utils/classes";

export interface UnorderedImageProps {
  image: Asset;
  isFull: boolean;
  handleClick: () => void;
}
