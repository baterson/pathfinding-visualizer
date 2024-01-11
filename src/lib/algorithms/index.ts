import { bfs } from './bfs'
import { dfs } from './dfs'
import { dijkstra } from './dijkstra'
import { aStar } from './aStar'


export const algorithms = {
    aStar: aStar,
    dijkstra: dijkstra,
    bfs: bfs,
    dfs: dfs,
}

export const displayNames = {
    aStar: 'A-star',
    dijkstra: 'Dijkstra',
    bfs: 'BFS',
    dfs: 'DFS',
}
