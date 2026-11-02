import { SAMPLE_MENTIONS } from '../config';

export default function RaidList({ mentions }) {
  const list = mentions?.length ? mentions : SAMPLE_MENTIONS;
  const fromApi = mentions?.fromApi;

  return (
    <div className="page">
      <h2>Raid list</h2>
      <p className="muted" style={{ marginBottom: '1rem' }}>
        Recent mentions. {fromApi ? 'Live from X.' : 'Sample data — configure X_BEARER_TOKEN for live mentions.'}
      </p>

      {!fromApi && (
        <div className="notice">
          Connect an X API bearer token to load real mentions. Sample posts shown below.
        </div>
      )}

      {list.map((m) => (
        <div key={m.id} className="post-card">
          <div className="post-header">
            <div className="post-avatar" style={{ background: '#3ee8ff' }}>
              {(m.name || m.handle || '?')[0].toUpperCase()}
            </div>
            <div className="post-meta">
              <div className="name">{m.name || m.handle}</div>
              <div className="handle">
                @{m.handle}
                {m.created && (
                  <span> · {new Date(m.created).toLocaleString()}</span>
                )}
              </div>
            </div>
          </div>
          <p className="post-text">{m.text}</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {m.url && (
              <a
                className="btn btn-ghost"
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ minHeight: 36, fontSize: '0.85rem' }}
              >
                View post
              </a>
            )}
            <a
              className="btn btn-cyan"
              href={`https://twitter.com/intent/tweet?in_reply_to=${m.id}&text=${encodeURIComponent(
                'Pack up. $CYBERINU'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ minHeight: 36, fontSize: '0.85rem' }}
            >
              Raid this post
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
