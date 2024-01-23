export type Position = { row: number; col: number };

export type Node = Position & {
	visited: boolean;
	prevNode: null | Node;
	path: boolean;
	key: string;
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
	intercept: () => Promise<void>;
};
