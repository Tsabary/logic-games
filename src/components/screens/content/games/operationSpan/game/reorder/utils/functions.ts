import { Asset } from "../../../utils/classes";
import { DropResult } from "react-beautiful-dnd";

// This function compares the user order as they're guessing it to be with the order that we have provided for the test
export const compareOrders = (
  userOrder: Asset[],
  providedOrder: Asset[],
  jumpLevel: () => void,
  dropLevel: () => void
) => {
  const isCorrect =
    userOrder.map((img) => img.id).join("-") ===
    providedOrder.map((img) => img.id).join("-");

  console.log(`COMPARING AND IT IS LEVEL ${isCorrect}`);

  isCorrect ? jumpLevel() : dropLevel();
};

export const repopulateRows = (
  setFirstRow: React.Dispatch<React.SetStateAction<Asset[]>>,
  setSecondRow: React.Dispatch<React.SetStateAction<Asset[]>>,
  userOrder: Asset[]
) => {
  // First row get first 7 items
  setFirstRow([...userOrder.slice(0, 7)]);

  if (userOrder.length > 7) {
    // If there are more than 7 items, second row gets the rest (we use 14 assets, so a maximum of 7 items for this row as well)
    setSecondRow([...userOrder.slice(7, 14)]);
  } else {
    // If there are only 7 guesses or less, we need to make sure that the secnd row is empty. Otherwise, it might have left over items from when the user has added more than 7 guesses, but then deleted some.
    setSecondRow([]);
  }
};

// This handles when the user clicks an image option. It'll remove it from the options and will add it as their last guess.
export const handleImageClick = (
  img: Asset,
  setAllImages: React.Dispatch<React.SetStateAction<Asset[]>>,
  setUserOrder: React.Dispatch<React.SetStateAction<Asset[]>>
) => {
  setAllImages((all) => all.filter((i) => i.id !== img.id));
  setUserOrder((uo) => [...uo, img]);
};

// This handles when the user clicks the "X" on an ordered image. It'll remove it from their list of guesses back to the options row.
export const handleOrderedImageClick = (
  img: Asset,
  setAllImages: React.Dispatch<React.SetStateAction<Asset[]>>,
  setUserOrder: React.Dispatch<React.SetStateAction<Asset[]>>
) => {
  setAllImages((uo) => [...uo, img]);
  setUserOrder((all) => all.filter((i) => i.id !== img.id));
};

// This method handles what happens when a dragging of an product is over.
export const onDragEnd = (
  result: DropResult,
  firstRow: Asset[],
  secondRow: Asset[],
  assets: Asset[],
  setUserOrder: React.Dispatch<React.SetStateAction<Asset[]>>
) => {
  const { destination, source, draggableId } = result;

  // If there was no final desination nothing happened - return
  if (!destination) {
    return;
  }

  // if the product started and finished in the same column and same index nothing happened - return
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return;

  let newFirstRow = [...firstRow];
  let newSecondRow = [...secondRow];

  // If we moved items from within the same row, then this is where we handle them
  if (source.droppableId === destination.droppableId) {
    if (source.droppableId === "ordered-assets-1") {
      newFirstRow.splice(source.index, 1);

      newFirstRow.splice(
        destination.index,
        0,
        assets.filter((img) => img.id === draggableId)[0]
      );
      setUserOrder([...newFirstRow, ...newSecondRow]);
    } else {
      newSecondRow.splice(source.index, 1);

      newSecondRow.splice(
        destination.index,
        0,
        assets.filter((img) => img.id === draggableId)[0]
      );
      setUserOrder([...newFirstRow, ...newSecondRow]);
    }
  }

  // Otherwise, if the items moved between different rows, we handle them here
  else {
    // If we moved an item from row 1 to row 2
    if (source.droppableId === "ordered-assets-1") {
      newFirstRow.splice(source.index, 1);
      newFirstRow.push(newSecondRow[0]);

      newSecondRow.splice(
        destination.index,
        0,
        assets.filter((img) => img.id === draggableId)[0]
      );

      newSecondRow.splice(0, 1);

      setUserOrder([...newFirstRow, ...newSecondRow]);
    }
    // Otherwise if we moved an item from row 2 to row 1
    else {
      newSecondRow.splice(source.index, 1);
      newSecondRow = [newFirstRow[newFirstRow.length - 1], ...newSecondRow];

      newFirstRow.splice(
        destination.index,
        0,
        assets.filter((img) => img.id === draggableId)[0]
      );
      newFirstRow.pop();

      setUserOrder([...newFirstRow, ...newSecondRow]);
    }
  }
};
