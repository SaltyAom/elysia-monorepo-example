import { edenTreaty } from '@elysiajs/eden'
import type { App } from 'backend'

export const api = edenTreaty<App>('http://0.0.0.0:3000/')
