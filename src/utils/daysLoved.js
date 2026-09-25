import { RELATIONSHIP_START } from '../constants/content'

export function getDaysLoved(now = new Date()) {
  const start = new Date(RELATIONSHIP_START)
  start.setHours(0, 0, 0, 0)
  const end = new Date(now)
  end.setHours(0, 0, 0, 0)
  const diff = end.getTime() - start.getTime()
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
}
