import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useGranularCallback, useGranularEffect } from 'granular-hooks';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  showPossibilitiesAtom,
  tileGridAtom,
  zoomAtom,
  showGridAtom,
} from './TilesAtoms';

import {
  addXNewAdjacentNodes,
  addXNewNodes,
  createTileGrid,
  hasEmptyNodesLeft,
  TileGridArray,
} from '../Util/tileGridSolver';
import { ColumnContainer, RowContainer } from '../Components/elements';

const ControlsContainer = styled(ColumnContainer)`
  width: 100%;
  justify-content: center;
  align-items: start;
  gap: 8px;
  padding: 16px;
  font-size: 16px;


  & .option-group {
    display: flex;
    gap: 0.5rem;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  padding: 16px 32px;
  gap: 32px;
  
  & > span {
    font-size: 14px;
  }
`;

const StartButton = styled.button`
  width: 7rem;
  color: #fff;
  background-color: #ef8302;
  align-content: center;
  font-size: 1.75rem;
  padding: 4px 8px;
  border: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff9d2e;
  }

  &:active {
    background-color: #a8640d;
  }
`;

const PossibleLabel = styled.label`
  font-size: 14px;
`;

const DelayMarks = {
  0: '0',
  100: '.1s',
  300: '.3s',
  500: '.5s',
  700: '.7s',
  1000: '1s',
  1500: '1.5s',
  2000: '2s',
  3000: '3s',
};

export default function TileControls() {
  const [tileGrid, setTileGrid] = useRecoilState(tileGridAtom);
  const [running, setRunning] = useState(false);
  const [refreshRate, setRefreshRate] = useState(1000);
  const [gridSize, setGridSize] = useState(7);
  const [numStarterNodes, setNumStarterNodes] = useState(1);
  const [numIterationNodes, setNumIterationNodes] = useState(1);
  const [tick, setTick] = useState(0);
  const [zoom, setZoom] = useRecoilState(zoomAtom);
  const [showPossibilities, setShowPossibilities] = useRecoilState(showPossibilitiesAtom);
  const [showGrid, setShowGrid] = useRecoilState(showGridAtom);

  useGranularEffect(() => {
    console.log(tick);
    if (!running) {
      return;
    }
    const hasEmptyNodes = hasEmptyNodesLeft();
    if (hasEmptyNodes) {
      setTileGrid(addXNewAdjacentNodes(tileGrid, numIterationNodes));
      setTimeout(() => setTick((prevTick) => prevTick + 1), refreshRate);
    } else {
      setRunning(false);
    }
  }, [tick], [tileGrid, setTick, running, setTileGrid, setRunning, refreshRate]);

  const createGrid = useGranularCallback(() => {
    if (!running) {
      setRunning(true);
      let grid: TileGridArray;
      grid = createTileGrid(gridSize, gridSize);
      grid = addXNewNodes(grid, numStarterNodes);
      setTileGrid(grid);
      setTimeout(() => setTick((prevTick) => prevTick ? 0 : 1), refreshRate);
    } else {
      setRunning(false);
    }
  }, [running, setTick, gridSize], [refreshRate, tick]);

  return (
    <ControlsContainer>
      <RowContainer>
        <SliderContainer>
          <span>Refresh delay:</span>
          <Slider
            style={{ width: '400px' }}
            min={0}
            max={3000}
            marks={DelayMarks}
            onChange={setRefreshRate as ((val: number | number[]) => void)}
            value={refreshRate}
          />
        </SliderContainer>
        <SliderContainer>
          <span>Grid size: {gridSize}</span>
          <Slider
            style={{ width: '400px' }}
            min={3}
            max={80}
            step={1}
            onChange={setGridSize as ((val: number | number[]) => void)}
            value={gridSize}
          />
        </SliderContainer>
      </RowContainer>
      <RowContainer>
        <SliderContainer>
          <span>Initial nodes:</span>
          <Slider
            style={{ width: '400px' }}
            min={1}
            max={10}
            step={1}
            marks={{1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10'}}
            onChange={setNumStarterNodes as ((val: number | number[]) => void)}
            value={numStarterNodes}
          />
        </SliderContainer>
        <SliderContainer>
          <span>Zoom: {zoom}x</span>
          <Slider
            style={{ width: '400px' }}
            min={0.05}
            max={1}
            step={0.05}
            onChange={setZoom as ((val: number | number[]) => void)}
            value={zoom}
          />
        </SliderContainer>
      </RowContainer>
      <RowContainer style={{ alignItems: 'center', gap: '2rem' }}>
        <StartButton onClick={createGrid}>{running ? 'Stop' : 'Start'}</StartButton>
        <div className="option-group">
          <PossibleLabel htmlFor="showPossibilityCheck">Show remaining possibilities</PossibleLabel>
          <input id="showPossibilityCheck" type="checkbox" checked={showPossibilities} onChange={(e) => setShowPossibilities(e.target.checked)} />
        </div>
        <div className="option-group">
          <PossibleLabel htmlFor="showGridCheck">Show grid</PossibleLabel>
          <input id="showGridCheck" type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
        </div>
      </RowContainer>
    </ControlsContainer>
  );
}