declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;

  // eslint-disable-next-line import/no-default-export
  export default src;
}

declare module '*.module.scss' {
  const classes: Record<string, string>;

  // eslint-disable-next-line import/no-default-export
  export default classes;
}
