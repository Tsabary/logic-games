import { Asset } from "../../../../utils/classes";

export const getNewImage = (
  iconAssets: any[],
  providedOrder: Asset[]
): Asset => {
  // To prevent repeating the same image twice, we need to see which images have already been presented to the user. This variable holds he index of all the indexes of images that havent been presented to the user yet.
  // We create a map of all asset indexes, and then filter by checking for every index if it exists in the images array or not.
  const remainingIconsIndexes = iconAssets
    .map((ic) => ic.id)
    .filter((ic) => !providedOrder.map((i) => i.id).includes(ic));

  // Then, using our list of remaining indexes, we extract a random item/index from that list
  const newIconIndex =
    remainingIconsIndexes[
      Math.floor(Math.random() * remainingIconsIndexes.length)
    ];

  return iconAssets.filter((ic) => ic.id === newIconIndex)[0];
};
