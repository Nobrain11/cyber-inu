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

  const caShort = BRAND.ca.slice(0, 4) + '...' + BRAND.ca.slice(-4);

  return (
    <header className={'top-chrome'}>
      <div className={'chrome-row brand-row'}>
        <div className={'brand-block'}>
          <img src={BRAND.logo} alt={''} className={'brand-logo'} width={36} height={36} />
          <span className={'brand-name'}>{BRAND.name}</span>
        </div>
        <div className={'brand-actions'}>
          <span className={'pill-countdown'}>{countdown || '\u2014'}</span>
          <a className={'pill-cta'} href={BRAND.pumpUrl} target={'_blank'} rel={'noopener noreferrer'}>
            Buy
          </a>
        </div>
      </div>

      <div className={'chrome-row stats-row'}>
        <button type={'button'} className={'stat-chip ca'} onClick={copyCa} title={BRAND.ca}>
          <span className={'k'}>CA</span>
          <span className={'v'}>{caShort}</span>
        </button>
        <div className={'stat-chip'}>
          <span className={'k'}>Mcap</span>
          <span className={'v'}>{market.loading ? '...' : formatMcap(market.marketCap)}</span>
        </div>
        <div className={'stat-chip'}>
          <span className={'k'}>Holders</span>
          <span className={'v'}>{holdersCount != null ? holdersCount.toLocaleString() : '\u2014'}</span>
        </div>
        <div className={'stat-chip'}>
          <span className={'k'}>24h</span>
          <span className={'v ' + (market.priceChange24h > 0 ? 'pos' : market.priceChange24h < 0 ? 'neg' : '')}>
            {market.loading ? '...' : formatChange(market.priceChange24h)}
          </span>
        </div>
      </div>

      <nav className={'nav-pills'} aria-label={'Main'}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type={'button'}
            className={'nav-pill ' + (route === t.id ? 'active' : '')}
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
