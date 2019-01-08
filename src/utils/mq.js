/* Functions to help with Media Queries */

const bps = { Mobile: 480, Tablet: 600, Laptop: 1024, Desktop: 1200 };

export const mq = Object.keys(bps).reduce(
  (memo, currentKey) => ({
    ...memo,
    [`from${currentKey}`]: `@media (min-width: ${bps[currentKey]}px)`,
    [`until${currentKey}`]: `@media (max-width: ${bps[currentKey]}px)`,
  }),
  {},
);
