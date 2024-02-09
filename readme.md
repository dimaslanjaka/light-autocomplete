# Form auto complete

simple input form auto complete

## Pre-requirements
- wrapper of `input` must have style `position: relative`
- `autocomplete=off` in input or textarea
<!-- - `data-autocomplete='[json array]'` in input or textarea -->

## Usages

in your html

import css

```html
<!-- import js -->
<link rel="stylesheet" href="dist/style.css" />
<!-- or using development cdn -->
<link rel="stylesheet" href="https://raw.githack.com/dimaslanjaka/light-autocomplete/master/dist/style.css" />
<!-- or using production cdn (change commit hash) -->
<link rel="stylesheet" href="https://rawcdn.githack.com/dimaslanjaka/light-autocomplete/6dab56fc3fdcb5be2c96b4ed3aa7bf5ba1ca2921/dist/style.css" />
```

import js

```html
<link rel="stylesheet" href="dist/style.css" />
<!-- import js -->
<script src="dist/browser/light-autocomplete.js"></script>
<!-- or using development cdn -->
<script src="https://raw.githack.com/dimaslanjaka/light-autocomplete/master/dist/browser/light-autocomplete.min.js"></script>
<!-- or using production cdn (change commit hash) -->
<script src="https://rawcdn.githack.com/dimaslanjaka/light-autocomplete/6dab56fc3fdcb5be2c96b4ed3aa7bf5ba1ca2921/dist/browser/light-autocomplete.min.js"></script>
```

in your js

```js
// generate array string random data auto complete
const randomData = [];
for (let i = 0; i < 10000; i++) {
  randomData.push(
    Array.from(crypto.getRandomValues(new Uint8Array(10))).reduce(
      (s, b) => s + (b % 35).toString(36)[(b % 2) - 1 ? 'toLowerCase' : 'toUpperCase'](),
      ''
    )
  );
}
autocomplete(document.getElementById('myInput'), randomData);
```

[initial project](https://codepen.io/dimaslanjaka/pen/MWxqJRX?editors=1010)