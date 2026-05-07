import KoppenMap from '../components/KoppenMap.jsx'

export default function KoppenViewerPage() {
  return (
    <div className="koppen-page">
      <header className="koppen-page-header">
        <h1>Koppen-Geiger Climate Classification</h1>
        <p>
          The Koppen-Geiger system classifies Earth&apos;s climates into five major groups (Tropical,
          Arid, Temperate, Continental, and Polar) based on monthly temperature and precipitation
          thresholds. The overlay below uses 1 km resolution classification data averaged over
          1986–2010 from{' '}
          <a
            href="https://doi.org/10.1038/sdata.2018.214"
            target="_blank"
            rel="noreferrer"
          >
            Beck et al. (2018)
          </a>
          .
        </p>
      </header>
      <KoppenMap />
    </div>
  )
}
