import React from 'react';
import { RecoilRoot } from 'recoil';
import TileControls from './Tiles/TileControls';
import TileGrid from './Tiles/TileGrid';
import { ColumnContainer } from './Components/elements';

export default function WaveFunctionPage() {
  return (
    <RecoilRoot>
      <ColumnContainer style={{ width: '100%', height: 'calc(100% - 40px)' }}>
        <TileControls />
        <TileGrid />
      </ColumnContainer>
    </RecoilRoot>
  );
}