import { BRAND, TABS } from '../config';
import { useMarket } from '../hooks/useMarket';

function formatMcap(n) {
  if (n == null) return '\u2014';
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function formatChange(n) {
  if (n == null) return '\u2014';
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(1)}%`;
}

export default function Header({ route, navigate, holdersCount, countdown }) {
  const market = useMarket();

  const copyCa = () => {
    navigator.clipboard?.writeText(BRAND.ca).catch(() => {});
  };

  return (
    <header className="top-chrome">
      <div className="top-row">
        <div className="brand-block">
          <img src={BRAND.logo} alt="" className="brand-logo" width={40} height={40} />
          <div>
            <div className="brand-name">{BRAND.name}</div>
            <div className="brand-ticker">{BRAND.ticker}</div>
          </div>
        </div>

        <div className="stat-pills">
          <div className="stat-pill ca">
            <span className="label">CA</span>
            <span className="value ca-text" title={BRAND.ca}>
              {BRAND.ca.slice(0, 4)}\u2026{BRAND.ca.slice(-4)}
            </span>
            <button type="button" className="copy-btn" onClick={copyCa} aria-label="Copy contract address">
              \u2398
            </button>
          </div>
          <div className="stat-pill">
            <span className="label">Mcap</span>
            <span className="value">{market.loading ? '\u2026' : formatMcap(market.marketCap)}</span>
          </div>
          <div className="stat-pill">
            <span className="label">Holders</span>
            <span className="value">{holdersCount != null ? holdersCount.toLocaleString() : '\u2014'}</span>
          </div>
          <div className="stat-pill">
            <span className="label">24h</span>
            <span
              className={`value ${
                market.priceChange24h > 0 ? 'pos' : market.priceChange24h < 0 ? 'neg' : ''
              }`}
            >
              {market.loading ? '\u2026' : formatChange(market.priceChange24h)}
            </span>
          </div>
        </div>

        <div className="top-actions">
          <span className="stat-pill">
            <span className="label">Next</span>
            <span className="value">{countdown || '\u2014'}</span>
          </span>
          <a className="btn btn-ghost" href={BRAND.xUrl} target="_blank" rel="noopener noreferrer">
            X
          </a>
          <a className="btn btn-primary" href={BRAND.pumpUrl} target="_blank" rel="noopener noreferrer">
            Buy on pump.fun
          </a>
        </div>
      </div>

      <nav className="nav-pills" aria-label="Main">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`nav-pill ${route === t.id ? 'active' : ''}`}
            onClick={() => navigate(t.path)}
            aria-current={route === t.id ? 'page' : undefined}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
