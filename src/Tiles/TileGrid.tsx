import React, {useMemo} from 'react';
import styled from 'styled-components';
import { TileMatrix } from './Tiles';
import {useRecoilValue} from 'recoil';
import { scrollOffsetAtom, showPossibilitiesAtom, tileGridAtom, zoomAtom } from './TilesAtoms';

const TileOuterContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
  overflow: scroll;
  border: 2px solid sienna;
`;

const TileInnerContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  gap: 0;
  padding: 0;
  margin: 0;
`;

const TileColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 0;
  padding: 0;
  margin: 0;
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
  const showPossibilities = useRecoilValue(showPossibilitiesAtom);

  return (
    <TileOuterContainer>
      <TileInnerContainer style={{
        width: `${width}px`,
        height: `${height}px`,
        zoom: `${zoom}`,
      }}>
        {tiles.map((yTiles, x) => (
          <TileColumn key={`tile_column_${x}`}>
            {yTiles.map((TileEl, y) => (
              <TileElement key={`tile_element_${x}_${y}`}>
                {TileEl.tile ?
                  <TileEl.tile.Tile angle={TileEl.tile.angle} /> : (
                    showPossibilities ?
                      <TilePossibilities>{TileEl.possibilities.length}</TilePossibilities> : null
                  )}
              </TileElement>
            ))}
          </TileColumn>
        ))}
      </TileInnerContainer>
    </TileOuterContainer>
  );
}
