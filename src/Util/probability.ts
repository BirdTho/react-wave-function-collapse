import { Random, browserCrypto } from 'random-js';

const random = new Random(browserCrypto);

export interface ProbabilityTuple<T,> {
  probability: number;
  item: T;
}

export function chooseWeightedProbability<T>(choices: ProbabilityTuple<T>[]): T {
  const sum = choices.reduce((total, { probability }) => total + probability, 0);
  let result = random.real(0, sum, false);
  let i = 0;

  // We'll keep subtracting probability values for the result
  // which is in range [0, sum) until the probability is less than
  // the current choice's probability
  while (result >= choices[i].probability && i < choices.length) {
    result -= choices[i].probability;
    ++i;
  }

  if (i >= choices.length) {
    console.error('Issue: Random weighted probability did not choose any of the existing choices');
    console.error(`Vars: i = ${i}, result = ${result}, sum = ${sum}, probabilities = ${choices.map(({ probability }) => probability)}`);
    i = choices.length - 1;
  }

  return choices[i].item;
}