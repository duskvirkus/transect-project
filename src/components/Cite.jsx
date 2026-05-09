import { CITATIONS } from '../lib/citations.js'

const INDEX = Object.fromEntries(CITATIONS.map((c, i) => [c.id, i + 1]))

export default function Cite({ id }) {
  const num = INDEX[id]
  if (!num) return <sup className="cite cite-unknown">[?]</sup>
  const href = `${import.meta.env.BASE_URL}#/bibliography#ref-${id}`
  return (
    <sup className="cite">
      <a href={href} target="_blank" rel="noreferrer">[{num}]</a>
    </sup>
  )
}
