import React, {useMemo} from 'react';
import styled from 'styled-components';
import {useRecoilValue} from 'recoil';
import {showGridAtom, showPossibilitiesAtom, tileGridAtom, zoomAtom} from './TilesAtoms';

const TileOuterContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
  overflow: scroll;
  border: 2px solid sienna;
`;

const TileInnerContainer = styled.div<{ numRows: number, rowWidth: number, numColumns: number, showGrid: boolean }>`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: ${(props) => `repeat(${props.numColumns}, ${props.rowWidth}px)`};
  grid-template-rows: ${(props) => `repeat(${props.numRows}, ${props.rowWidth}px)`};
  gap: 0;
  padding: 0;
  margin: 0;
  
  ${(props) => (props.showGrid && `
  & > div:after {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    content: ' ';
    border: 1px solid rgba(255, 128, 128, 0.5);
    zindex: 10;
  }
  `)}
`;

const  TileElement = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const TilePossibilities = styled.span`
  width: 100px;
  height: 100px;
  top: 0;
  left: 0;
  border: 2px lightgray;
  color: lightseagreen;
  font-size: 40px;
  font-weight: 600;
`;

export default function TileGrid() {
  const tiles = useRecoilValue(tileGridAtom);
  const width = useMemo(() => tiles.length * 100, [tiles.length]);
  const height = useMemo(() => tiles[0].length * 100, [tiles[0].length]);
  const zoom = useRecoilValue(zoomAtom);
  const showGrid = useRecoilValue(showGridAtom);
  const showPossibilities = useRecoilValue(showPossibilitiesAtom);

  return (
    <TileOuterContainer>
      <TileInnerContainer
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${zoom})`,
        }}
        numRows={tiles.length}
        numColumns={tiles?.[0].length}
        rowWidth={100}
        showGrid={showGrid}
      >
        {tiles.map((yTiles, x) => (
          <>
            {yTiles.map((TileEl, y) => (
              <TileElement key={`tile_element_${x}_${y}`}>
                {TileEl.tile ?
                  <TileEl.tile.Tile angle={TileEl.tile.angle} /> : (
                    showPossibilities ?
                      <TilePossibilities>{TileEl.possibilities.length}</TilePossibilities> : null
                  )}
              </TileElement>
            ))}
          </>
        ))}
      </TileInnerContainer>
    </TileOuterContainer>
  );
}
