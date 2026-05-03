export default function WhatIsFelsiusPage() {
  return (
    <div className="what-is-felsius-page">
      <div className="what-is-felsius-content">
      <h1>What is Felsius (°Ꞓ)?</h1>
      <p>
        Felsius is a satirical temperature scale created by Randall Munroe in{' '}
        <a href="https://xkcd.com/1923/" target="_blank" rel="noreferrer">
          xkcd comic #1923
        </a>
        . Rather than settling the Celsius vs. Fahrenheit debate, Randall proposed
        taking the average of both — a compromise that manages to discard the
        main advantages of each scale.
      </p>
      <p>
        The conversion formula is straightforward:
      </p>
      <pre className="felsius-formula">°Ꞓ = °C × 7/5 + 16</pre>
      <p>
        Some reference points on the Felsius scale:
      </p>
      <table className="felsius-table">
        <thead>
          <tr>
            <th>°C</th>
            <th>°Ꞓ</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>100</td><td>156</td><td>Water boils</td></tr>
          <tr><td>37</td><td>67.8</td><td>Body temperature</td></tr>
          <tr><td>22</td><td>46.8</td><td>Room temperature</td></tr>
          <tr><td>0</td><td>16</td><td>Water freezes</td></tr>
          <tr><td>−40</td><td>−40</td><td>Equivalence point (= °C = °F)</td></tr>
          <tr><td>−273.15</td><td>−366.4</td><td>Absolute zero</td></tr>
        </tbody>
      </table>
      <p>
        The symbol °Ꞓ is itself an average — Randall describes it as combining
        the Euro symbol (€) and the Greek lunate epsilon (ϵ).
      </p>
      <div className="felsius-links">
        <a
          href="https://duskvirkus.github.io/FelsiusWeather/"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
        >
          FelsiusWeather — current temperature in °Ꞓ
        </a>
        <a
          href="https://xkcd.com/1923/"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
        >
          Original xkcd comic #1923
        </a>
      </div>
      </div>
    </div>
  )
}
