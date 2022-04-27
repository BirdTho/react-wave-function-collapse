import { atom } from 'recoil';
import { TileGridArray } from '../Util/tileGridSolver';

export const tileGridAtom = atom<TileGridArray>({
  key: 'Tile grid atom',
  default: [[]],
});

export const scrollOffsetAtom = atom<[number, number]>({
  key: 'Tile grid scroll offsets',
  default: [0, 0],
});

export const zoomAtom = atom<number>({
  key: 'zoom',
  default: 1,
});

export const showPossibilitiesAtom = atom<boolean>({
  key: 'show possibilities',
  default: false,
});
