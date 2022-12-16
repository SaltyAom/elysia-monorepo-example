import { eden } from '@elysiajs/eden'
import type { App } from 'backend'

export const api = eden<App>('http://0.0.0.0:3001/')
