import React from 'react';
import styled, {StyledComponent} from 'styled-components';

const WHITE = '#f1d8bf';
const BLUE = '#6783f2';
const GREEN = '#7dd784';
const DAM = '#e6c35d';

interface TileProps {
  angle: number;
}

const TileBase = styled.div<TileProps>`
  position: absolute;
  width: 100px;
  height: 100px;
  overflow: hidden;
  transform: rotate(${(props) => props.angle}deg);
`;

export const WhiteTile = styled(TileBase)`
  background-color: ${WHITE};
`;

export const GreenTile = styled(TileBase)`
  background-color: ${GREEN};
`;

export const BlueTile = styled(TileBase)`
  background-color: ${BLUE};
`;

const QuarterCircle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 52px;
  height: 52px;
  
  box-sizing: border-box;
  border-bottom: 4px solid black;
  border-right: 4px solid black;
  border-bottom-right-radius: 27px;
`;

const OppositeQuarterCircle = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 52px;
  height: 52px;

  box-sizing: border-box;
  border-top: 4px solid black;
  border-left: 4px solid black;
  border-top-left-radius: 27px;
`;

const HalfField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 52px;
  height: 100px;

  box-sizing: border-box;
  border-right: 4px solid black;
`;

const DamEndRight = styled.div`
  position: absolute;
  left: 0;
  top: 35px;
  height: 30px;
  width: 80px;
  border-bottom-right-radius: 30px 10px;
  border-top-right-radius: 30px 10px;
  border-right: 4px solid sandybrown;
  border-bottom: 4px solid darkgoldenrod;
  border-top: 8px solid #ede0a6;
  background-color: ${DAM};
`;

const DamEndLeft = styled.div`
  position: absolute;
  right: 0;
  top: 35px;
  height: 30px;
  width: 80px;
  border-bottom-left-radius: 30px 10px;
  border-top-left-radius: 30px 10px;
  border-left: 4px solid sandybrown;
  border-bottom: 4px solid darkgoldenrod;
  border-top: 8px solid #ede0a6;
  background-color: ${DAM};
`;

const DamMiddle = styled.div`
  position: absolute;
  left: 0;
  top: 35px;
  height: 30px;
  width: 100px;
  border-bottom: 4px solid darkgoldenrod;
  border-top: 8px solid #ede0a6;
  background-color: ${DAM};
`;

const HalfFieldWhite = styled(HalfField)`
  background-color: ${WHITE};
`;

const HalfFieldGreen = styled(HalfField)`
  background-color: ${GREEN};
`;

const HalfFieldBlue = styled(HalfField)`
  background-color: ${BLUE};
`;

const HalfFieldBlueOpposite = styled(HalfField)`
  background-color: ${BLUE};
  right: 0;
  left: auto;
  transform: rotate(180deg);
`;

const QuarterCircleWhite = styled(QuarterCircle)`
  background-color: ${WHITE};
`;

const QuarterCircleGreen = styled(QuarterCircle)`
  background-color: ${GREEN};
`;

const QuarterCircleBlue = styled(QuarterCircle)`
  background-color: ${BLUE};
`;

const OppositeQuarterCircleWhite = styled(OppositeQuarterCircle)`
  background-color: ${WHITE};
`;

const OppositeQuarterCircleGreen = styled(OppositeQuarterCircle)`
  background-color: ${GREEN};
`;

const OppositeQuarterCircleBlue = styled(OppositeQuarterCircle)`
  background-color: ${BLUE};
`;

interface AngleInput {
  angle: number;
}

export function WhiteWithGreenQuarter({ angle }: AngleInput) {
  return (
    <WhiteTile angle={angle}>
      <QuarterCircleGreen />
    </WhiteTile>
  );
}

export function WhiteWithGreenHalf({ angle }: AngleInput) {
  return (
    <WhiteTile angle={angle}>
      <HalfFieldGreen />
    </WhiteTile>
  );
}

export function WhiteWithGreenThreeQuarter({ angle }: AngleInput) {
  return (
    <GreenTile angle={angle}>
      <QuarterCircleWhite />
    </GreenTile>
  );
}

export function WhiteWithTwoGreenQuarters({ angle }: AngleInput) {
  return (
    <WhiteTile angle={angle}>
      <QuarterCircleGreen />
      <OppositeQuarterCircleGreen />
    </WhiteTile>
  );
}


export function GreenWithBlueQuarter({ angle }: AngleInput) {
  return (
    <GreenTile angle={angle}>
      <QuarterCircleBlue />
    </GreenTile>
  );
}

export function GreenWithBlueHalf({ angle }: AngleInput) {
  return (
    <GreenTile angle={angle}>
      <HalfFieldBlue />
    </GreenTile>
  );
}

export function GreenWithBlueThreeQuarter({ angle }: AngleInput) {
  return (
    <BlueTile angle={angle}>
      <QuarterCircleGreen />
    </BlueTile>
  );
}

export function GreenWithTwoBlueQuarters({ angle }: AngleInput) {
  return (
    <BlueTile angle={angle}>
      <QuarterCircleGreen />
      <OppositeQuarterCircleGreen />
    </BlueTile>
  );
}

export function GreenWithBlueHalfAndDamRight({ angle }: AngleInput) {
  return (
    <GreenTile angle={angle}>
      <HalfFieldBlue />
      <DamEndRight />
    </GreenTile>
  );
}

export function GreenWithBlueHalfAndDamLeft({ angle }: AngleInput) {
  return (
    <GreenTile angle={angle}>
      <HalfFieldBlueOpposite />
      <DamEndLeft />
    </GreenTile>
  );
}

export function BlueWithDam({ angle }: AngleInput) {
  return (
    <BlueTile angle={angle}>
      <DamMiddle />
    </BlueTile>
  );
}

export enum SideCodes {
  WWW,
  GBW,
  WBG,
  GGG,
  GBB,
  BBG,
  BBB,
  BDlB,
  BDrB,
}

export const SideMappings = new Map<SideCodes, SideCodes>([
  [SideCodes.WWW, SideCodes.WWW],
  [SideCodes.GBW, SideCodes.WBG],
  [SideCodes.WBG, SideCodes.GBW],
  [SideCodes.GGG, SideCodes.GGG],
  [SideCodes.GBB, SideCodes.BBG],
  [SideCodes.BBG, SideCodes.GBB],
  [SideCodes.BBB, SideCodes.BBB],
  [SideCodes.BDlB, SideCodes.BDrB],
  [SideCodes.BDrB, SideCodes.BDlB],
]);

export interface TileDefinition {
  Tile: StyledComponent<'div', any, TileProps, never> | ((props: TileProps) => React.ReactElement);
  angle: number;
  weight: number;
  north: SideCodes;
  south: SideCodes;
  east: SideCodes;
  west: SideCodes;
}

export type TileMatrix = (TileDefinition)[][];

export const TILESET: TileDefinition[] = [
  {
    Tile: WhiteTile,
    angle: 0,
    weight: 1.5,
    north: SideCodes.WWW,
    south: SideCodes.WWW,
    east: SideCodes.WWW,
    west: SideCodes.WWW,
  },
  {
    Tile: WhiteWithGreenQuarter,
    angle: 0,
    weight: 0.6,
    north: SideCodes.GBW,
    south: SideCodes.WWW,
    east: SideCodes.WWW,
    west: SideCodes.WBG,
  },
  {
    Tile: WhiteWithGreenQuarter,
    angle: 90,
    weight: 0.6,
    north: SideCodes.WBG,
    south: SideCodes.WWW,
    east: SideCodes.GBW,
    west: SideCodes.WWW,
  },
  {
    Tile: WhiteWithGreenQuarter,
    angle: 180,
    weight: 0.6,
    north: SideCodes.WWW,
    south: SideCodes.GBW,
    east: SideCodes.WBG,
    west: SideCodes.WWW,
  },
  {
    Tile: WhiteWithGreenQuarter,
    angle: -90,
    weight: 0.6,
    north: SideCodes.WWW,
    south: SideCodes.WBG,
    east: SideCodes.WWW,
    west: SideCodes.GBW,
  },
  {
    Tile: WhiteWithGreenHalf,
    angle: 0,
    weight: 1.2,
    north: SideCodes.GBW,
    south: SideCodes.WBG,
    east: SideCodes.WWW,
    west: SideCodes.GGG,
  },
  {
    Tile: WhiteWithGreenHalf,
    angle: 90,
    weight: 1.2,
    north: SideCodes.GGG,
    south: SideCodes.WWW,
    east: SideCodes.GBW,
    west: SideCodes.WBG,
  },
  {
    Tile: WhiteWithGreenHalf,
    angle: 180,
    weight: 1.2,
    north: SideCodes.WBG,
    south: SideCodes.GBW,
    east: SideCodes.GGG,
    west: SideCodes.WWW,
  },
  {
    Tile: WhiteWithGreenHalf,
    angle: -90,
    weight: 1.2,
    north: SideCodes.WWW,
    south: SideCodes.GGG,
    east: SideCodes.WBG,
    west: SideCodes.GBW,
  },
  {
    Tile: WhiteWithGreenThreeQuarter,
    angle: 0,
    weight: 1,
    north: SideCodes.WBG,
    south: SideCodes.GGG,
    east: SideCodes.GGG,
    west: SideCodes.GBW,
  },
  {
    Tile: WhiteWithGreenThreeQuarter,
    angle: 90,
    weight: 1,
    north: SideCodes.GBW,
    south: SideCodes.GGG,
    east: SideCodes.WBG,
    west: SideCodes.GGG,
  },
  {
    Tile: WhiteWithGreenThreeQuarter,
    angle: 180,
    weight: 1,
    north: SideCodes.GGG,
    south: SideCodes.WBG,
    east: SideCodes.GBW,
    west: SideCodes.GGG,
  },
  {
    Tile: WhiteWithGreenThreeQuarter,
    angle: -90,
    weight: 1,
    north: SideCodes.GGG,
    south: SideCodes.GBW,
    east: SideCodes.GGG,
    west: SideCodes.WBG,
  },
  {
    Tile: WhiteWithTwoGreenQuarters,
    angle: 0,
    weight: 0.4,
    north: SideCodes.GBW,
    south: SideCodes.GBW,
    east: SideCodes.WBG,
    west: SideCodes.WBG,
  },
  {
    Tile: WhiteWithTwoGreenQuarters,
    angle: 90,
    weight: 0.4,
    north: SideCodes.WBG,
    south: SideCodes.WBG,
    east: SideCodes.GBW,
    west: SideCodes.GBW,
  },
  {
    Tile: GreenTile,
    angle: 0,
    weight: 2,
    north: SideCodes.GGG,
    south: SideCodes.GGG,
    east: SideCodes.GGG,
    west: SideCodes.GGG,
  },
  {
    Tile: GreenWithBlueQuarter,
    angle: 0,
    weight: 0.8,
    north: SideCodes.BBG,
    south: SideCodes.GGG,
    east: SideCodes.GGG,
    west: SideCodes.GBB,
  },
  {
    Tile: GreenWithBlueQuarter,
    angle: 90,
    weight: 0.8,
    north: SideCodes.GBB,
    south: SideCodes.GGG,
    east: SideCodes.BBG,
    west: SideCodes.GGG,
  },
  {
    Tile: GreenWithBlueQuarter,
    angle: 180,
    weight: 0.8,
    north: SideCodes.GGG,
    south: SideCodes.BBG,
    east: SideCodes.GBB,
    west: SideCodes.GGG,
  },
  {
    Tile: GreenWithBlueQuarter,
    angle: -90,
    weight: 0.8,
    north: SideCodes.GGG,
    south: SideCodes.GBB,
    east: SideCodes.GGG,
    west: SideCodes.BBG,
  },
  {
    Tile: GreenWithBlueHalf,
    angle: 0,
    weight: 1,
    north: SideCodes.BBG,
    south: SideCodes.GBB,
    east: SideCodes.GGG,
    west: SideCodes.BBB,
  },
  {
    Tile: GreenWithBlueHalf,
    angle: 90,
    weight: 1,
    north: SideCodes.BBB,
    south: SideCodes.GGG,
    east: SideCodes.BBG,
    west: SideCodes.GBB,
  },
  {
    Tile: GreenWithBlueHalf,
    angle: 180,
    weight: 1,
    north: SideCodes.GBB,
    south: SideCodes.BBG,
    east: SideCodes.BBB,
    west: SideCodes.GGG,
  },
  {
    Tile: GreenWithBlueHalf,
    angle: -90,
    weight: 1,
    north: SideCodes.GGG,
    south: SideCodes.BBB,
    east: SideCodes.GBB,
    west: SideCodes.BBG,
  },
  {
    Tile: GreenWithBlueThreeQuarter,
    angle: 0,
    weight: 0.6,
    north: SideCodes.GBB,
    south: SideCodes.BBB,
    east: SideCodes.BBB,
    west: SideCodes.BBG,
  },
  {
    Tile: GreenWithBlueThreeQuarter,
    angle: 90,
    weight: 0.6,
    north: SideCodes.BBG,
    south: SideCodes.BBB,
    east: SideCodes.GBB,
    west: SideCodes.BBB,
  },
  {
    Tile: GreenWithBlueThreeQuarter,
    angle: 180,
    weight: 0.6,
    north: SideCodes.BBB,
    south: SideCodes.GBB,
    east: SideCodes.BBG,
    west: SideCodes.BBB,
  },
  {
    Tile: GreenWithBlueThreeQuarter,
    angle: -90,
    weight: 0.6,
    north: SideCodes.BBB,
    south: SideCodes.BBG,
    east: SideCodes.BBB,
    west: SideCodes.GBB,
  },
  {
    Tile: GreenWithTwoBlueQuarters,
    angle: 0,
    weight: 0.4,
    north: SideCodes.GBB,
    south: SideCodes.GBB,
    east: SideCodes.BBG,
    west: SideCodes.BBG,
  },
  {
    Tile: GreenWithTwoBlueQuarters,
    angle: 90,
    weight: 0.4,
    north: SideCodes.BBG,
    south: SideCodes.BBG,
    east: SideCodes.GBB,
    west: SideCodes.GBB,
  },
  {
    Tile: GreenWithBlueHalfAndDamRight,
    angle: 0,
    weight: 0.3,
    north: SideCodes.BBG,
    south: SideCodes.GBB,
    east: SideCodes.GGG,
    west: SideCodes.BDlB,
  },
  {
    Tile: GreenWithBlueHalfAndDamLeft,
    angle: 0,
    weight: 0.3,
    north: SideCodes.GBB,
    south: SideCodes.BBG,
    east: SideCodes.BDrB,
    west: SideCodes.GGG,
  },
  {
    Tile: BlueWithDam,
    angle: 0,
    weight: 0.3,
    north: SideCodes.BBB,
    south: SideCodes.BBB,
    east: SideCodes.BDrB,
    west: SideCodes.BDlB,
  },
  {
    Tile: BlueTile,
    angle: 0,
    weight: 2,
    north: SideCodes.BBB,
    south: SideCodes.BBB,
    east: SideCodes.BBB,
    west: SideCodes.BBB,
  },
];

export const SideCodeArray = [
  SideCodes.GGG,
  SideCodes.GBB,
  SideCodes.BBG,
  SideCodes.GBW,
  SideCodes.WBG,
  SideCodes.BBB,
  SideCodes.WWW,
  SideCodes.BDlB,
  SideCodes.BDrB,
];

export const EastMap = new Map<SideCodes, TileDefinition[]>(SideCodeArray.map((code, i) => {
  const opposite = SideMappings.get(code);
  return [code, TILESET.filter(({ west }) => west === opposite)];
}));
export const NorthMap = new Map<SideCodes, TileDefinition[]>(SideCodeArray.map((code, i) => {
  const opposite = SideMappings.get(code);
  return [code, TILESET.filter(({ south }) => south === opposite)];
}));
export const SouthMap = new Map<SideCodes, TileDefinition[]>(SideCodeArray.map((code, i) => {
  const opposite = SideMappings.get(code);
  return [code, TILESET.filter(({ north }) => north === opposite)];
}));
export const WestMap = new Map<SideCodes, TileDefinition[]>(SideCodeArray.map((code, i) => {
  const opposite = SideMappings.get(code);
  return [code, TILESET.filter(({ east }) => east === opposite)];
}));
