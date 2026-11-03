import { SAMPLE_HOLDERS, BRAND } from '../config';

export default function Leaderboard({ holders }) {
  const list = holders?.top?.length ? holders.top : SAMPLE_HOLDERS;
  const fromApi = holders?.fromApi;

  const copy = (addr) => {
    navigator.clipboard?.writeText(addr).catch(() => {});
  };

  return (
    <div className={'page'}>
      <div className={'section-label'}>On-chain</div>
      <h2 className={'section-title'} style={{ fontSize: '1.4rem' }}>Top holders</h2>
      <p className={'muted'} style={{ marginBottom: '1rem', marginTop: '-0.25rem' }}>
        Ranked by token balance. {fromApi ? 'Live from chain.' : 'Sample data — configure Helius for live rankings.'}
      </p>

      {!fromApi && (
        <div className={'notice'}>
          Connect a Helius API key to load real holder data. Sample rankings shown below.
        </div>
      )}

      <div className={'panel'} style={{ overflowX: 'auto' }}>
        <table className={'leader-table'}>
          <thead>
            <tr>
              <th>#</th>
              <th>Wallet</th>
              <th>% supply</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((h) => (
              <tr key={h.owner || h.rank}>
                <td style={{ color: 'var(--orange)', fontWeight: 600 }}>{h.rank}</td>
                <td>
                  <a
                    className={'wallet'}
                    href={'https://solscan.io/account/' + (h.owner || '')}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    title={h.owner}
                  >
                    {h.owner?.slice(0, 6)}...{h.owner?.slice(-6)}
                  </a>
                </td>
                <td>{typeof h.pct === 'number' ? h.pct.toFixed(2) : h.pct}%</td>
                <td>
                  <button
                    type={'button'}
                    className={'copy-btn'}
                    onClick={() => copy(h.owner)}
                    aria-label={'Copy wallet'}
                  >
                    copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {holders?.count != null && (
        <p className={'muted'} style={{ marginTop: '0.75rem' }}>
          Total holders tracked: {holders.count.toLocaleString()}
        </p>
      )}
    </div>
  );
}
