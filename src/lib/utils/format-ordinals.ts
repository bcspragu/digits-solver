const suffixes = new Map([
  ['one', 'st'],
  ['two', 'nd'],
  ['few', 'rd'],
  ['other', 'th'],
]);

const formatter = new Intl.PluralRules('en', { type: 'ordinal' });

export const formatOrdinals = (n: number): string => {
  const rule = formatter.select(n);
  const suffix = suffixes.get(rule);
  return `${n}${suffix}`;
};
