export const addImageToSequence = (iconAssets, images, setImages) => {
  // To prevent repeating the same image twice, we need to see which images have already been presented to the user. This variable holds he index of all the indexes of images that havent been presented to the user yet.
  // We create a map of all asset indexes, and then filter by checking for every index if it exists in the images array or not.
  const remainingIconsIndexes = iconAssets
    .map((ic) => ic.index)
    .filter((ic) => !images.map((i) => i.index).includes(ic));

  // Then, using our list of remaining indexes, we extract a random item/index from that list
  const newIconIndex =
    remainingIconsIndexes[
      Math.floor(Math.random() * remainingIconsIndexes.length)
    ];

  // Then, we add another icon to our sequence by filtering ou icon assets array to match the new randm index we've just created
  setImages((ics) => [
    ...ics,
    iconAssets.filter((ic) => ic.index === newIconIndex)[0],
  ]);
};
