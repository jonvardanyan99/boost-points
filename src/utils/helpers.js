import isEqual from 'lodash.isequal';

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

export const diffObjects = (obj1, obj2) => {
  return Object.keys(obj1).reduce((acc, key) => {
    if (!isEqual(obj1[key], obj2[key])) {
      acc[key] = obj1[key];
    }

    return acc;
  }, {});
};
