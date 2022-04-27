import React, {useEffect, useState} from 'react';
import {chooseWeightedProbability, ProbabilityTuple} from './probability';
import styled from 'styled-components';

const RowContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 32px;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const weightedList: ProbabilityTuple<string>[] = [{
  item: 'A',
  probability: 3,
}, {
  item: 'B',
  probability: 2,
}, {
  item: 'C',
  probability: 5,
}, {
  item: 'D',
  probability: 1,
}, {
  item: 'E',
  probability: 4,
}];

export default function DistributionTest() {
  const [outArr, setOutArr] = useState<[key: string, value: number][]>([]);

  useEffect(() => {
    const results: Record<string, number> = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
    };

    let i = 0;
    while (i < 10000) {
      const val = chooseWeightedProbability(weightedList);
      results[val]++;
      i++;
    }
    setOutArr(Object.entries(results));
  }, []);

  return (
    <RowContainer>
      {outArr.map(([item, count], i) => (
        <ColumnContainer key={`result_${item}`}>
          <span>{item}</span>
          <span>{count}</span>
        </ColumnContainer>
      ))}
    </RowContainer>
  );
}
