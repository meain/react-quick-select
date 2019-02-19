const genUuid = (): string => {
  let result, i, j;
  result = "";
  for (j = 0; j < 32; j++) {
    if (j == 8 || j == 12 || j == 16 || j == 20) result = result + "_";
    i = Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase();
    result = result + i;
  }
  return result;
};

// I really did not wanna bring in another library
export const updateMaxHeight = (height: string, styles: any): string => {
  const uuid = genUuid().toLocaleLowerCase();
  const css = `.${styles.wrapper}:hover>.${uuid} {max-height: ${height};}`;
  console.log("css:", css);
  const style = document.createElement("style");
  //@ts-ignore
  if (style.styleSheet) style.styleSheet.cssText = css;
  else style.appendChild(document.createTextNode(css));
  document.getElementsByTagName("head")[0].appendChild(style);
  return uuid;
};
