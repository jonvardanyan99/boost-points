export type AtLeastOne<T> = Partial<T> & { [K in keyof T]: Required<Pick<T, K>> }[keyof T];

export type DeepNonNullable<T, E extends keyof T = never> = {
  [K in keyof T]: K extends E
    ? T[K]
    : NonNullable<T[K]> extends object
      ? NonNullable<T[K]> extends Date
        ? NonNullable<T[K]>
        : DeepNonNullable<NonNullable<T[K]>>
      : NonNullable<T[K]>;
};
