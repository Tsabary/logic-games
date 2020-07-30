import { Asset } from "../../utils/classes";

export interface OrderedImageProps {
  image: Asset;
  index: number;
  handleClick: (image: Asset) => void;
}
