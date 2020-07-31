import { Asset } from "../../../utils/classes";

export interface ReorderInnerListProps {
  images: Asset[];
  handleClick: (image: Asset) => void;
}

export interface ReorderProps {
  assets: Asset[];
  level: number;
  handleSubmit: (isCorrect: boolean) => void;
  providedOrder: Asset[];
}
