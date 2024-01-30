# Quolor

> A simple library to apply colors from the query string to the page.

## Usage

```ts
import { quolor } from 'quolor';

quolor(document);
```

### Custom Rules

```ts
import { quolor, Binding } from 'quolor';

const rules: Binding[] = [
  {
    type: 'text',
    css: '--query-color-text',
    query: 'color-text',
    elements: ['p', 'a'],
  },
  {
    type: 'background',
    css: '--query-color-bg',
    query: 'color-bg',
    specialElements: ['html'],
  },
];

quolor(document, rules);
```

## Default Rules

```ts
{
    type: 'text',
    css: '--query-color-text',
    query: 'color-text',
    elements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
},
{
    type: 'background',
    css: '--query-color-bg',
    query: 'color-bg',
    specialElements: ['html'],
},
```
