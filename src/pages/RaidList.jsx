import { SAMPLE_MENTIONS, BRAND } from '../config';

export default function RaidList({ mentions }) {
  const list = Array.isArray(mentions) && mentions.length ? mentions : SAMPLE_MENTIONS;
  const fromApi = mentions?.fromApi;

  return (
    <div className={'page'}>
      <div className={'section-label'}>Signals</div>
      <h2 className={'section-title'} style={{ fontSize: '1.4rem' }}>Raid list</h2>
      <p className={'muted'} style={{ marginBottom: '1rem', marginTop: '-0.25rem' }}>
        {fromApi ? 'Live mentions from X.' : 'Pack signal board — open live search for realtime chatter.'}
      </p>

      {!fromApi && (
        <a
          className={'community-banner'}
          href={'https://x.com/search?q=%24CYBERINU&src=typed_query&f=live'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          <div className={'icon search-icon'}>S</div>
          <div>
            <div className={'title'}>Open live $CYBERINU search</div>
            <div className={'sub'}>See what the timeline is saying right now.</div>
          </div>
        </a>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.75rem' }}>
        {list.map((m) => (
          <article key={m.id || m.url} className={'post-card'}>
            <div className={'post-header'}>
              <div className={'post-avatar'} style={{ background: 'linear-gradient(135deg, #3ee8ff, #ff7a2f)' }}>
                {(m.name || 'P')[0]}
              </div>
              <div className={'post-meta'}>
                <div className={'name'}>{m.name || 'Pack'}</div>
                <div className={'handle'}>@{m.handle || 'pack'}</div>
              </div>
            </div>
            <p className={'post-text'}>{m.text}</p>
            {m.url && (
              <a className={'btn btn-ghost'} style={{ minHeight: 32, fontSize: '0.75rem' }} href={m.url} target={'_blank'} rel={'noopener noreferrer'}>
                View post
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
