import { CITATIONS } from '../lib/citations.js'

const DATA_SOURCES = CITATIONS.filter(c => c.type === 'data')
const TOOLS = CITATIONS.filter(c => c.type === 'tool')

function CitationEntry({ citation, index }) {
  return (
    <div id={`ref-${citation.id}`} className="bib-entry">
      <span className="bib-num">[{index}]</span>
      <div className="bib-body">
        <span className="bib-authors">{citation.authors}</span>
        {' '}
        <span className="bib-year">({citation.year}).</span>
        {' '}
        <em className="bib-title">{citation.title}.</em>
        {' '}
        <span className="bib-publisher">{citation.publisher}.</span>
        {' '}
        <a href={citation.url} target="_blank" rel="noreferrer" className="bib-url">
          {citation.url}
        </a>
      </div>
    </div>
  )
}

export default function BibliographyPage() {
  let globalIndex = 1
  const dataEntries = DATA_SOURCES.map(c => ({ citation: c, index: globalIndex++ }))
  const toolEntries = TOOLS.map(c => ({ citation: c, index: globalIndex++ }))

  return (
    <div className="bibliography-page-outer">
    <div className="bibliography-page">
      <h1>Bibliography</h1>

      <section className="bib-section">
        <h2>Data Sources</h2>
        {dataEntries.map(({ citation, index }) => (
          <CitationEntry key={citation.id} citation={citation} index={index} />
        ))}
      </section>

      <section className="bib-section">
        <h2>Tools &amp; Libraries</h2>
        {toolEntries.map(({ citation, index }) => (
          <CitationEntry key={citation.id} citation={citation} index={index} />
        ))}
      </section>
    </div>
    </div>
  )
}
