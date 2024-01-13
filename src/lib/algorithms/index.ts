import { bfs } from './bfs'
import { startDfs } from './dfs'
import { dijkstra } from './dijkstra'
import { aStar } from './aStar'


export const algorithms = {
    aStar: aStar,
    dijkstra: dijkstra,
    bfs: bfs,
    dfs: startDfs,
}

export const displayNames = {
    aStar: 'A-star',
    dijkstra: 'Dijkstra',
    bfs: 'BFS',
    dfs: 'DFS',
}
