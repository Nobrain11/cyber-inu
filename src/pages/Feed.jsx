import { useState } from 'react';
import { BRAND, SAMPLE_MENTIONS, SAMPLE_HOLDERS } from '../config';
import { PACK, FEED_POSTS } from '../data';
import { useLocalPack } from '../hooks/useLocalPack';
import Skyline from '../components/Skyline';

function avatarColor(id) {
  const p = PACK.find((x) => x.id === id);
  return p?.colors?.primary || '#3ee8ff';
}

function initials(name) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function shortWallet(w) {
  if (!w) return '-';
  return w.slice(0, 4) + '...' + w.slice(-4);
}

export default function Feed({ holders, mentions, countdown, navigate }) {
  const { isJoined, toggle, joinedList } = useLocalPack();
  const [likes, setLikes] = useState({});
  const [boosts, setBoosts] = useState({});
  const [filter, setFilter] = useState('for-you');

  const holderList = holders?.top?.length ? holders.top : SAMPLE_HOLDERS;
  const mentionList = mentions?.length ? mentions : SAMPLE_MENTIONS;
  const apiNotice = holders && mentions && (!holders.fromApi || !mentions.fromApi);

  return (
    <div className={'page'}>
      {apiNotice && (
        <div className={'notice'}>
          Showing sample data. Connect Helius / X API keys on the server for live holders and mentions.
        </div>
      )}

      <div className={'layout-3'}>
        <aside className={'col-side'}>
          <div className={'glass'}>
            <div className={'section-label'}>Hall of fame</div>
            <h2 className={'section-title'}>Top holders</h2>
            {holderList.slice(0, 10).map((h, i) => (
              <div className={'holder-row'} key={h.wallet || i}>
                <span className={'holder-rank'}>{i + 1}</span>
                <div className={'holder-avatar'}>{String(i + 1)}</div>
                <div className={'holder-info'}>
                  <div className={'name'}>{shortWallet(h.wallet)}</div>
                  <div className={'sub'}>pack dog</div>
                </div>
                <span className={'holder-pct'}>
                  {h.pct != null ? Number(h.pct).toFixed(2) + '%' : '-'}
                </span>
              </div>
            ))}
          </div>
          <div className={'glass'}>
            <div className={'section-label'}>Live from X</div>
            <h2 className={'section-title'}>Raid marketing</h2>
            <button type={'button'} className={'btn btn-cyan'} style={{ width: '100%' }} onClick={() => navigate('#/raid')}>
              Open raid generator
            </button>
          </div>
        </aside>

        <main className={'col-main'}>
          <div className={'lore-card'}>
            <div className={'section-label'}>The lore</div>
            <h2 className={'section-title'}>Wait, what is Cyber Inu?</h2>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55 }}>
              Half-robot Shiba. Full neon prophecy. $CYBERINU is the pack that refused to log off.
              Community-owned. Raid-ready. Not financial advice. Just the signal.
            </p>
            <div className={'actions'}>
              <button type={'button'} className={'btn btn-primary'} onClick={() => navigator.clipboard?.writeText(BRAND.ca)}>
                Copy CA
              </button>
              <button type={'button'} className={'btn btn-cyan'} onClick={() => navigate('#/raid')}>
                Raid generator
              </button>
              <a className={'btn btn-ghost'} href={BRAND.pumpUrl} target={'_blank'} rel={'noopener noreferrer'}>
                $CYBERINU on pump.fun
              </a>
            </div>
          </div>

          <div className={'glass'}>
            <div className={'section-label'}>Suggested</div>
            <h2 className={'section-title'}>The pack</h2>
            <div className={'pack-grid-peek'}>
              {PACK.slice(0, 6).map((p) => (
                <div className={'pack-model'} key={p.id}>
                  <div className={'cover'}>
                    <div
                      className={'cover-avatar'}
                      style={{ background: 'linear-gradient(135deg, ' + (p.colors?.primary || '#3ee8ff') + ', ' + (p.colors?.secondary || '#ff7a2f') + ')' }}
                    >
                      {initials(p.name)}
                    </div>
                  </div>
                  <div className={'body'}>
                    <div className={'name'}>{p.name} <span className={'badge-open'}>Open</span></div>
                    <div className={'handle'}>@{p.handle}</div>
                    <button type={'button'} className={'toggle ' + (isJoined(p.id) ? 'on' : '')} onClick={() => toggle(p.id)} style={{ width: '100%' }}>
                      {isJoined(p.id) ? 'Joined' : 'Join pack'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button type={'button'} className={'btn btn-ghost'} style={{ width: '100%', marginTop: '0.75rem' }} onClick={() => navigate('#/pack')}>
              View full pack
            </button>
          </div>

          <div>
            <div className={'feed-filter'}>
              <button type={'button'} className={'nav-pill ' + (filter === 'for-you' ? 'active' : '')} onClick={() => setFilter('for-you')}>For you</button>
              <button type={'button'} className={'nav-pill ' + (filter === 'x' ? 'active' : '')} onClick={() => setFilter('x')}>Live from X</button>
            </div>

            {filter === 'for-you' && FEED_POSTS.map((post) => (
              <article className={'post-card'} key={post.id}>
                <div className={'post-header'}>
                  <div className={'post-avatar'} style={{ background: avatarColor(post.authorId) }}>{initials(post.author)}</div>
                  <div className={'post-meta'}>
                    <div className={'name'}>{post.author}</div>
                    <div className={'handle'}>@{post.handle} · {post.time}</div>
                  </div>
                </div>
                <p className={'post-text'}>{post.text}</p>
                {post.skyline && <Skyline seed={post.id} className={'skyline'} />}
                <div className={'post-actions'}>
                  <button type={'button'} className={'action-btn ' + (likes[post.id] ? 'active' : '')} onClick={() => setLikes((s) => ({ ...s, [post.id]: !s[post.id] }))}>
                    {likes[post.id] ? 'Liked' : 'Like'}
                  </button>
                  <button type={'button'} className={'action-btn ' + (boosts[post.id] ? 'boosted' : '')} onClick={() => setBoosts((s) => ({ ...s, [post.id]: !s[post.id] }))}>
                    {boosts[post.id] ? 'Boosted' : 'Boost'}
                  </button>
                  <button type={'button'} className={'action-btn'} onClick={() => navigate('#/raid')}>Raid this</button>
                </div>
              </article>
            ))}

            {filter === 'x' && mentionList.map((m, i) => (
              <article className={'post-card'} key={m.id || i}>
                <div className={'post-header'}>
                  <div className={'post-avatar'} style={{ background: 'linear-gradient(135deg,#3ee8ff,#ff7a2f)' }}>{(m.author || 'X')[0].toUpperCase()}</div>
                  <div className={'post-meta'}>
                    <div className={'name'}>{m.author || 'Anon'}</div>
                    <div className={'handle'}>@{m.handle || 'unknown'}</div>
                  </div>
                </div>
                <p className={'post-text'}>{m.text}</p>
                <div className={'post-actions'}>
                  <button type={'button'} className={'action-btn'} onClick={() => navigate('#/raid')}>Raid this post</button>
                </div>
              </article>
            ))}
          </div>
        </main>

        <aside className={'col-side'}>
          <div className={'glass'}>
            <div className={'section-label'}>Countdown</div>
            <div className={'countdown-big'}>{countdown || '-'}</div>
            <p className={'muted'} style={{ margin: '0.35rem 0 0' }}>Next pack pulse</p>
          </div>
          <div className={'glass'}>
            <div className={'section-label'}>Dogs online</div>
            <div className={'countdown-big'} style={{ fontSize: '1.4rem' }}>{joinedList.length || 12}</div>
            <p className={'muted'} style={{ margin: '0.35rem 0 0' }}>Estimated pack activity</p>
          </div>
          <div className={'glass'}>
            <div className={'section-label'}>Official feed</div>
            <h2 className={'section-title'}>Cyber Inu on X</h2>
            <a className={'btn btn-cyan'} style={{ width: '100%' }} href={BRAND.xUrl} target={'_blank'} rel={'noopener noreferrer'}>Open X</a>
            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <a href={BRAND.pumpUrl} target={'_blank'} rel={'noopener noreferrer'}>pump.fun</a>
              <a href={'https://solscan.io/token/' + BRAND.ca} target={'_blank'} rel={'noopener noreferrer'}>Solscan</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
