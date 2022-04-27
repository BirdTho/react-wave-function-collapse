import {
  TileDefinition,
  SideCodes,
  TILESET,
  NorthMap,
  WestMap,
  EastMap,
  SouthMap,
} from '../Tiles/Tiles';
import {browserCrypto, Random} from 'random-js';
import {chooseWeightedProbability} from './probability';

const random = new Random(browserCrypto);

function intersect<T,>(arrays: T[][]): T[] {
  const currentSet = new Set(arrays[0]);
  const length = arrays.length;
  let i = 1;
  while (i < length) {
    const nextArray = arrays[i];
    const nextSet = new Set(nextArray);
    currentSet.forEach((val) => {
      if (!nextSet.has(val)) {
        currentSet.delete(val);
      }
    });

    i++;
  }
  return [...currentSet];
}

function union<T,>(arrays: T[][]): T[] {
  const currentSet = new Set(arrays[0]);
  const length = arrays.length;
  let i = 1;
  while (i < length) {
    const nextArray = arrays[i];
    nextArray.forEach((val) => currentSet.add(val));
    i++;
  }
  return [...currentSet];
}


export interface TileGridCell {
  tile: TileDefinition | null;
  possibilities: TileDefinition[];
}

export type TileGridArray = TileGridCell[][];

const edgeSet = new Set<string>();

export function hasEmptyNodesLeft() {
  return edgeSet.size > 0;
}

export function createTileGrid(width: number, height: number): TileGridArray {
  edgeSet.clear();
  const grid: TileGridArray = [];
  for (let i = 0; i < width; ++i) {
    const col: TileGridCell[] = [];
    for (let j = 0; j < height; j++) {
      col.push({
        tile: null,
        possibilities: [...TILESET],
      });
    }
    grid.push(col);
  }
  return grid;
}

export function addXNewNodes(grid: TileGridArray, num: number): TileGridArray {
  let localGrid = [...grid.map((subArr) => [...subArr])];
  let nodesLeft = num;
  while (nodesLeft > 0) {
    const x = random.integer(0, localGrid.length - 1);
    const y = random.integer(0, localGrid[0].length - 1);
    const gridNode = localGrid[x][y];
    if (!gridNode.tile) {
      nodesLeft--;
      localGrid[x][y] = {
        ...gridNode,
        tile: chooseWeightedProbability(
          gridNode.possibilities.map(
            (def) => ({ probability: def.weight, item: def })
          )),
      };
      localGrid = propagateWaveCollapse(localGrid, x, y);
    }
  }

  return localGrid;
}

export function addXNewAdjacentNodes(grid: TileGridArray, num: number): TileGridArray {
  let localGrid = [...grid.map((subArr) => [...subArr])];
  let nodesLeft = Math.min(num, edgeSet.size);
  while (nodesLeft > 0) {
    const index = random.integer(0, edgeSet.size - 1);
    const [x, y] = stringToCoords(Array.from(edgeSet.values())[index]);
    const gridNode = localGrid[x][y];
    if (!gridNode.tile) {
      nodesLeft--;
      localGrid[x][y] = {
        ...gridNode,
        tile: chooseWeightedProbability(
          gridNode.possibilities.map(
            (def) => ({ probability: def.weight, item: def })
          )),
      };
      localGrid = propagateWaveCollapse(localGrid, x, y);
    }
  }

  return localGrid;
}

function getDirPossibilities(
  thisPossibilities: TileDefinition[],
  existingPossibilities: TileDefinition[],
  direction: keyof TileDefinition,
  map: Map<SideCodes, TileDefinition[]>,
): TileDefinition[] {
  const northPossibilities = union(thisPossibilities
    .map(possibility => possibility[direction] as SideCodes)
    .map((code) => map.get(code) ?? []));
  return intersect([existingPossibilities, northPossibilities]);
}

function coordsToString(x: number, y: number): string {
  return `${x}x${y}`;
}

function stringToCoords(str: string): [number, number] {
  return str.split('x').map(num => parseInt(num, 10)) as [number, number];
}

function addUncollapsedEdgeTilesToSet(grid: TileGridArray, x: number, y: number) {
  const width = grid.length;
  const height = grid[0].length;

  if (x > 0) {
    const gridCell = grid[x - 1][y];
    if (!gridCell.tile) {
      edgeSet.add(coordsToString(x - 1, y));
    }
  }

  if (y > 0) {
    const gridCell = grid[x][y - 1];
    if (!gridCell.tile) {
      edgeSet.add(coordsToString(x, y - 1));
    }
  }

  if (x < width - 1) {
    const gridCell = grid[x + 1][y];
    if (!gridCell.tile) {
      edgeSet.add(coordsToString(x + 1, y));
    }
  }

  if (y < height - 1) {
    const gridCell = grid[x][y + 1];
    if (!gridCell.tile) {
      edgeSet.add(coordsToString(x, y + 1));
    }
  }
}

function removeTileFromEdgeTileSet(x: number, y: number) {
  edgeSet.delete(coordsToString(x, y));
}

function propagateWaveCollapse(grid: TileGridArray, x: number, y: number): TileGridArray {
  const localGrid = [...grid.map((subArr) => [...subArr])];
  const width = localGrid.length;
  const height = localGrid[0].length;
  const queue: [number, number][] = [[x, y]];

  while (queue.length) {
    const currentCoords = queue.shift();
    if (!currentCoords) {
      break;
    }
    const [thisX, thisY] = currentCoords;
    let thisNode = localGrid[thisX][thisY];
    if (thisNode.tile?.Tile) {
      localGrid[thisX][thisY] = {
        ...thisNode,
        possibilities: [thisNode.tile],
      };
      thisNode = localGrid[thisX][thisY];
      removeTileFromEdgeTileSet(thisX, thisY);
      addUncollapsedEdgeTilesToSet(localGrid, thisX, thisY);
    }

    // NORTH
    if (thisY > 0 && localGrid[thisX][thisY - 1].tile === null) {
      const existingPossibilities = localGrid[thisX][thisY - 1].possibilities;
      const newPossibilities = getDirPossibilities(
        thisNode.possibilities,
        existingPossibilities,
        'north', NorthMap);
      if (newPossibilities.length < existingPossibilities.length) {
        if (newPossibilities.length === 0) {
          console.error(`Ran out of possibilities for grid position ${thisX}, ${thisY - 1}`);
        } else {
          localGrid[thisX][thisY - 1] = {
            tile: newPossibilities.length === 1 ? newPossibilities[0] : null,
            possibilities: newPossibilities,
          };
          if (newPossibilities.length === 1) {
            removeTileFromEdgeTileSet(thisX, thisY - 1);
            addUncollapsedEdgeTilesToSet(localGrid, thisX, thisY - 1);
          }
          queue.push([thisX, thisY - 1]);
        }
      }
    }

    // SOUTH
    if (thisY < (height - 1) && localGrid[thisX][thisY + 1].tile === null) {
      const existingPossibilities = localGrid[thisX][thisY + 1].possibilities;
      const newPossibilities = getDirPossibilities(
        thisNode.possibilities,
        existingPossibilities,
        'south', SouthMap);
      if (newPossibilities.length < existingPossibilities.length) {
        if (newPossibilities.length === 0) {
          console.error(`Ran out of possibilities for grid position ${thisX}, ${thisY + 1}`);
        } else {
          localGrid[thisX][thisY + 1] = {
            tile: newPossibilities.length === 1 ? newPossibilities[0] : null,
            possibilities: newPossibilities,
          };
          if (newPossibilities.length === 1) {
            removeTileFromEdgeTileSet(thisX, thisY + 1);
            addUncollapsedEdgeTilesToSet(localGrid, thisX, thisY + 1);
          }
          queue.push([thisX, thisY + 1]);
        }
      }
    }

    // WEST
    if (thisX > 0 && localGrid[thisX - 1][thisY].tile === null) {
      const existingPossibilities = localGrid[thisX - 1][thisY].possibilities;
      const newPossibilities = getDirPossibilities(
        thisNode.possibilities,
        existingPossibilities,
        'west', WestMap);
      if (newPossibilities.length < existingPossibilities.length) {
        if (newPossibilities.length === 0) {
          console.error(`Ran out of possibilities for grid position ${thisX - 1}, ${thisY}`);
        } else {
          localGrid[thisX - 1][thisY] = {
            tile: newPossibilities.length === 1 ? newPossibilities[0] : null,
            possibilities: newPossibilities,
          };
          if (newPossibilities.length === 1) {
            removeTileFromEdgeTileSet(thisX - 1, thisY);
            addUncollapsedEdgeTilesToSet(localGrid, thisX - 1, thisY);
          }
          queue.push([thisX - 1, thisY]);
        }
      }
    }

    // EAST
    if (thisX < (width - 1) && localGrid[thisX + 1][thisY].tile === null) {
      const existingPossibilities = localGrid[thisX + 1][thisY].possibilities;
      const newPossibilities = getDirPossibilities(
        thisNode.possibilities,
        existingPossibilities,
        'east', EastMap);
      if (newPossibilities.length < existingPossibilities.length) {
        if (newPossibilities.length === 0) {
          console.error(`Ran out of possibilities for grid position ${thisX + 1}, ${thisY}`);
        } else {
          localGrid[thisX + 1][thisY] = {
            tile: newPossibilities.length === 1 ? newPossibilities[0] : null,
            possibilities: newPossibilities,
          };
          if (newPossibilities.length === 1) {
            removeTileFromEdgeTileSet(thisX + 1, thisY);
            addUncollapsedEdgeTilesToSet(localGrid, thisX + 1, thisY);
          }
          queue.push([thisX + 1, thisY]);
        }
      }
    }
  }

  return localGrid;
}
