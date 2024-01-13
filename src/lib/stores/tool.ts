import { get, writable } from "svelte/store"
import { execution } from "./execution"
import { setSelectedNode } from "./nodes"

// TODO Rename to tools

export const tool = writable(null)
