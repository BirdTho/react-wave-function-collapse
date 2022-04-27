import React from 'react';
import styled from 'styled-components';
import {
  SideCodes, SideMappings,
  TILESET,
} from './Tiles';

const TileContainer = styled.div`
  position: relative;
  border: 2px solid slategrey;
  width: 140px;
  height: 190px;
  
  & > div {
    position: absolute;
    top: 20px;
    left: 20px;
  }
  
  & > span {
    position: absolute;
    &.north, &.south, &.east, &.west {
      letter-spacing: 15px;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      font-family: monospace;
      transform-origin: top;
      width: 90px;
    }
  }
  
  & > span.north {
    left: 32px;
    top: 2px;
  }
  
  & > span.east {
    right: -43px;
    transform: rotate(90deg);
    top: 77px;
  }
  
  & > span.west {
    left: -43px;
    top: 63px;
    transform: rotate(-90deg);
  }
  
  & > span.south {
    left: 27px;
    direction: rtl;
    transform-origin: bottom;
    font-size: 14px;
    bottom: 52px;
    width: 100px;
  }
  
  & > span.angle {
    position: absolute;
    width: 140px;
    bottom: 0;
    left: 0;
    font-size: 12px;
  }
  
  & > p {
    position: absolute;
    width: 140px;
    height: 40px;
    left: 0;
    bottom: 12px;
    margin-block-end: 0;
    margin-block-start: 0;
    word-wrap: anywhere;
    text-wrap: normal;
    font-size: 12px;
  }
`;

const TileLayout = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  padding: 64px;
`;

let count = 0;
export default function TilePage() {
  count = 0;
  return (
    <TileLayout>
      {TILESET.map(({ Tile, south, west, east, north, angle}, i) => (
        <TileContainer key={`tile_${count++}`}>
          <Tile angle={angle}/>
          <span className="north">{SideCodes[north]}</span>
          <span className="south">{SideCodes[SideMappings.get(south) as unknown as SideCodes]}</span>
          <span className="east">{SideCodes[east]}</span>
          <span className="west">{SideCodes[west]}</span>
          <p>{Tile.name}</p>
          <span className="angle">{angle} deg</span>
        </TileContainer>
      ))}
    </TileLayout>
  );
}
