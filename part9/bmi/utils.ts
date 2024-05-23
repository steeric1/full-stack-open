export const asNumbers = (arr: string[]) => {
  return arr.map((item) => {
    let num = Number(item);
    if (isNaN(num)) throw new Error(`Argument '${item}' is not a number`);

    return num;
  });
};
