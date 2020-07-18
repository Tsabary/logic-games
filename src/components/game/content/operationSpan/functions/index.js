// // The test is comprised of sets of a visual asset (images), and a distraction question. This function initializes new values for both
// export const nextSet = (setStartTime, iconAssets, images, setImages, setEquation) => {
//   // We set a new start time to check how long it takes the user to answer
//   setStartTime(Date.now());

//   // To prevent repeating the same image twice, we need to see which images have already been presented to the user. This variable holds he index of all the indexes of images that havent been presented to the user yet.
//   // We create a map of all asset indexes, and then filter by checking for every index if it exists in the images array or not.
//   const remainingIconsIndexes = iconAssets
//     .map((ic) => ic.index)
//     .filter((ic) => !images.map((i) => i.index).includes(ic));

//   // Then, using our list of remaining indexes, we extract a random item/index from that list
//   const newIconIndex =
//     remainingIconsIndexes[
//       Math.floor(Math.random() * remainingIconsIndexes.length)
//     ];

//   // Then, we add another icon to our sequence by filtering ou icon assets array to match the new randm index we've just created
//   setImages((ics) => [
//     ...ics,
//     iconAssets.filter((ic) => ic.index === newIconIndex)[0],
//   ]);

//   // We set a new distraction question
//   setEquation(equations[Math.floor(Math.random() * equations.length)]);

//   // We set the icon's visibility to visible
//   setIsImageVisible(true);

//   // We set a timer to hide the icon after 1.5 seconds
//   setTimeout(() => {
//     setIsImageVisible(false);
//   }, [1500]);
// };
