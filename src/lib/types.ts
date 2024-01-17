export type Position = { row: number; col: number };

export type Node = Position & {
	visited: boolean;
	prevNode: null | Node;
	path: boolean;
	x: number;
	y: number;
};

export type WeightedNode = { weight: number; node: Node };

export type Grid = Map<string, Node>;

export type PlayerSpeed = 1 | 5 | 10 | 20;

export type PlayerState = 'notStarted' | 'play' | 'pause' | 'forward' | 'backward' | 'finished';

export type Theme = 'light' | 'dark';

export type Tool = 'weight' | 'wall' | 'reset' | null;

export type Screen = { row: number; col: number };

export type AlgorithmOptions = {
	startNode: Node;
	endNode: Node;
	isEndNode: (node: Node) => boolean;
	isWall: (node: Node) => boolean;
	getNode: (node: Position) => Node;
	screen: Screen;
	getWeight: (node: Node) => number;
	hitBoundary: (node: Node) => boolean;
	intercept: () => Promise<void>;
};

// startNode: $grid.get($startNodeKey),
// endNode: $grid.get($endNodeKey),
// isEndNode: (node) => toMapKey(node) === $endNodeKey,
// isWall: (node) => $walls.has(toMapKey(node)),
// getNode: (node) => $grid.get(toMapKey(node)),
// screen: $layout.screen,
// getWeight: (node) => {
//     return $weight.get(toMapKey(node)) || 0;
// },
// hitPlayerBoundary: (node) => {
//     // 21 18
//     // console.log('$layout.player', $layout.player);
//     if (node.row > $layout.player.row && node.col <= $layout.player.col) {
//         console.log('Hit...', node.row, node.col);
//         // console.log($layout.player);
//         return true;
//     }
// },
// intercept: intercept
