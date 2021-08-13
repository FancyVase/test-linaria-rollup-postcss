# Linaria Rollup + PostCSS + preserveModules Issue

I'm using Rollup with `@linaria/rollup` + `rollup-plugin-postcss` to bundle React components that inject their styles on hydration.

I also have an output format of `esm` w/ `preserveModules: true` in order to support tree-shaking.

With this configuration, style files get generated incorrectly.

## Troubleshooting

Given a simple React component with Linaria:

```jsx
import React from 'react';
import {styled} from '@linaria/react';

const Wrapper = styled.div`
  background-color: pink;
`;

export const LinariaComponent = () => <Wrapper />;
```

Rollup builds this to:

```js
import React from 'react';
import { styled } from '@linaria/react';
import '../_virtual/LinariaComponent.jsx_52jihk.css';

var Wrapper = /*#__PURE__*/styled("div")({
  name: "Wrapper",
  "class": "w195sr2l"
});
var LinariaComponent = function LinariaComponent() {
  return /*#__PURE__*/React.createElement(Wrapper, null);
};

export { LinariaComponent };
//# sourceMappingURL=LinariaComponent.js.map
```

I would expect a `.js` import on the fourth line instead of `import '../_virtual/LinariaComponent.jsx_52jihk.css';`

Opening that file gives me:

```css
import styleInject from '../node_modules/style-inject/dist/style-inject.es.js';

var css_248z = ".w195sr2l{background-color:pink;}";
styleInject(css_248z);

export { css_248z as default };
//# sourceMappingURL=LinariaComponent.jsx_52jihk.css.map
```

Which is valid JS, but not valid CSS, and so attempting to use this component errors out.

This issue only appears when I set the Rollup `output.format` to `'esm'` and set `preserveModules: true`, which I have to support tree-shaking.

-----

I have a second `PostcssComponent.jsx` file that gets bundled as expected.

I also included an `esm` output without `preserveModules` as well as a `cjs` output, both of which work as expected.

## Building

```
npm install
npm run build
```

And see `dist/preserveModules/` directory.