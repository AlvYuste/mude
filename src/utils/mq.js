export const bps = { mobile: 480, tablet: 600, laptop: 1024, desktop: 1200 };

export const mq = Object.keys(bps).reduce(
  (memo, currentKey) => ({
    ...memo,
    [currentKey]: `@media (min-width: ${bps[currentKey]}px)`,
  }),
  {},
);
