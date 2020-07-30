import { Asset } from "../../utils/classes";
import { DropResult } from "react-beautiful-dnd";

// This function compares the user order as they're guessing it to be with the order that we have provided for the test
export const compareOrders = (
  userOrder: Asset[],
  providedOrder: Asset[],
  handleSubmit: (isSuccessful: boolean) => void,
  setUserOrder: React.Dispatch<React.SetStateAction<Asset[]>>
) => {
  const reorderingIsSuccessful =
    userOrder.map((img) => img.id).join("-") ===
    providedOrder.map((img) => img.id).join("-");

  handleSubmit(reorderingIsSuccessful);
  setUserOrder([]);
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
