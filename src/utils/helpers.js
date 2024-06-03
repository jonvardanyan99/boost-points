export const dataUrlToFile = async (dataUrl, fileName) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();

  return new File([blob], fileName, { type: 'image/png' });
};

export const capitalize = word => {
  const capitalized = word[0].toUpperCase();

  const result = capitalized + word.slice(1);

  return result;
};
