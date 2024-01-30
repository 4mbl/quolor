export type SpecialElements = 'html';

export type Binding = {
  type: 'text' | 'background';
  css: string;
  query: string;
  elements?: string[];
  specialElements?: SpecialElements[];
};

export const DEFAULT_ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

export const DEFAULT_SPECIAL_ELEMENTS: SpecialElements[] = ['html'];

export const DEFAULT_COLOR_BINDINGS: Binding[] = [
  {
    type: 'text',
    css: '--query-color-text',
    query: 'color-text',
    elements: DEFAULT_ELEMENTS,
  },
  {
    type: 'background',
    css: '--query-color-bg',
    query: 'color-bg',
    specialElements: DEFAULT_SPECIAL_ELEMENTS,
  },
];

export function quolor(
  document: Document,
  bindings: Binding[] = DEFAULT_COLOR_BINDINGS
) {
  const params = new URLSearchParams(document.location.search);

  bindings.forEach((binding) => {
    const param = params.get(binding.query);
    if (!param) return;

    let value = decodeURIComponent(param)?.toLowerCase();

    if (value?.match(/^[0-9a-f]/)) {
      value = '#' + value;
    }

    if (binding.specialElements?.includes('html')) {
      if (binding.type === 'background') {
        document.documentElement.style.backgroundColor = value;
      } else if (binding.type === 'text') {
        document.documentElement.style.color = value;
      }
    }

    for (const el of binding.elements ?? []) {
      const matchingElements = document.querySelectorAll(el);
      const htmlElements = Array.from(matchingElements).filter(
        (el) => el instanceof HTMLElement
      );
      htmlElements.forEach((element) => {
        if (binding.type === 'background') {
          (element as HTMLElement).style.backgroundColor = value;
        } else if (binding.type === 'text') {
          (element as HTMLElement).style.color = value;
        }
      });
    }

    if (binding.css) {
      document.documentElement.style.setProperty(binding.css, value);
    }
  });
}
