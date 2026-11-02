import { PACK } from '../data';
import { useLocalPack } from '../hooks/useLocalPack';

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Pack() {
  const { isJoined, toggle } = useLocalPack();

  return (
    <div className="page">
      <h2>The pack</h2>
      <p className="muted" style={{ marginBottom: '1rem' }}>
        Six original characters. Join the ones you vibe with — preference is saved locally.
      </p>

      <div className="pack-grid">
        {PACK.map((p) => (
          <div key={p.id} className="pack-full">
            <div className="header">
              <div
                className="avatar-lg"
                style={{ background: p.colors.primary }}
              >
                {initials(p.name)}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600 }}>{p.name}</div>
                <div className="muted" style={{ fontSize: '0.85rem' }}>
                  {p.handle} · {p.district}
                </div>
              </div>
            </div>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', lineHeight: 1.5 }}>{p.bio}</p>
            <button
              type="button"
              className={`toggle ${isJoined(p.id) ? 'on' : ''}`}
              onClick={() => toggle(p.id)}
              style={{ width: 'auto', padding: '0.4rem 1rem' }}
            >
              {isJoined(p.id) ? 'Joined' : 'Join pack'}
            </button>

            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                Recent signals
              </h4>
              {p.posts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    background: 'var(--base)',
                    borderRadius: 8,
                    padding: '0.65rem 0.75rem',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                  }}
                >
                  {post.text}
                  <div className="muted" style={{ fontSize: '0.75rem', marginTop: '0.35rem' }}>
                    {post.likes} likes{post.boosted ? ' · boosted' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
