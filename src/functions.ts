const randomizeArray = (array: string[]): string[] => {
  let arrayCopy = [...array];
  let returnArray: string[] = [];
  let arrayLength = arrayCopy.length;

  while (arrayLength > 0) {
    let randomIndex = Math.floor(Math.random() * arrayLength);
    let randomElement = arrayCopy.splice(randomIndex, 1);
    returnArray.push(randomElement[0]);
    arrayLength--;
  }
  return returnArray;
};
export { randomizeArray };
