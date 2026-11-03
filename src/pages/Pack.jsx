import { PACK } from '../data';
import { useLocalPack } from '../hooks/useLocalPack';

function initials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Pack() {
  const { isJoined, toggle, joinedList } = useLocalPack();

  return (
    <div className={'page'}>
      <div className={'section-label'}>Characters</div>
      <h2 className={'section-title'} style={{ fontSize: '1.4rem' }}>The pack</h2>
      <p className={'muted'} style={{ marginBottom: '1rem', marginTop: '-0.25rem' }}>
        Six original characters. Join the ones you vibe with — saved on this device.
        {joinedList.length > 0 ? ` · ${joinedList.length} joined` : ''}
      </p>

      <div className={'pack-grid'}>
        {PACK.map((p) => (
          <div key={p.id} className={'pack-full'}>
            <div className={'header'}>
              <div
                className={'avatar-lg'}
                style={{ background: 'linear-gradient(135deg, ' + p.colors.primary + ', ' + (p.colors.secondary || p.colors.primary) + ')' }}
              >
                {initials(p.name)}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '1.05rem' }}>
                  {p.name}
                  {isJoined(p.id) && <span className={'badge-open'} style={{ marginLeft: '0.35rem' }}>Joined</span>}
                </div>
                <div className={'muted'} style={{ fontSize: '0.8rem' }}>
                  {p.handle} · {p.district}
                </div>
              </div>
            </div>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--muted)' }}>{p.bio}</p>
            <button
              type={'button'}
              className={'toggle ' + (isJoined(p.id) ? 'on' : '')}
              onClick={() => toggle(p.id)}
            >
              {isJoined(p.id) ? 'Joined' : 'Join pack'}
            </button>

            <div style={{ marginTop: '1rem' }}>
              <div className={'section-label'}>Recent signals</div>
              {p.posts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    background: 'rgba(0,0,0,0.28)',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    padding: '0.6rem 0.75rem',
                    marginBottom: '0.45rem',
                    fontSize: '0.86rem',
                  }}
                >
                  {post.text}
                  <div className={'muted'} style={{ fontSize: '0.72rem', marginTop: '0.3rem' }}>
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
