import isEqual from 'lodash.isequal';

export const dataUrlToFile = async (dataUrl: string, fileName: string) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();

  return new File([blob], fileName, { type: 'image/png' });
};

export const capitalize = (word: string) => {
  const capitalized = word[0].toUpperCase();

  const result = capitalized + word.slice(1);

  return result;
};

export const diffObjects = <T extends Record<string, unknown>>(obj1: T, obj2: T) => {
  return Object.keys(obj1).reduce<Record<string, unknown>>((acc, key) => {
    if (!isEqual(obj1[key], obj2[key])) {
      acc[key] = obj1[key];
    }

    return acc;
  }, {});
};

export const generateId = () => {
  return `${Date.now()}-${Math.random()}`;
};

export const createParagraphsList = (text: string) => {
  return text.split('\\n').map(paragraph => {
    if (paragraph === '') {
      return '\u00A0';
    }

    return paragraph;
  });
};
