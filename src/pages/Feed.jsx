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
  if (!name) return '?';
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function shortWallet(w) {
  if (!w) return '-';
  return w.slice(0, 4) + '...' + w.slice(-4);
}

function packMember(id) {
  return PACK.find((x) => x.id === id) || { name: 'Pack', handle: '@pack' };
}

export default function Feed({ holders, mentions, countdown, navigate }) {
  const { isJoined, toggle, joinedList } = useLocalPack();
  const [likes, setLikes] = useState({});
  const [boosts, setBoosts] = useState({});
  const [filter, setFilter] = useState('for-you');

  const holderList = holders?.top?.length ? holders.top : SAMPLE_HOLDERS;
  const mentionList = Array.isArray(mentions) && mentions.length ? mentions : SAMPLE_MENTIONS;
  const holdersLive = holders?.fromApi;
  const mentionsLive = mentions?.fromApi;
  let noticeText = null;
  if (holders && mentions) {
    if (!holdersLive && !mentionsLive) {
      noticeText = 'Showing sample data. Connect Helius / X API keys for live holders and mentions.';
    } else if (!mentionsLive) {
      noticeText = 'Holders are live. Connect X_BEARER_TOKEN for live mentions.';
    } else if (!holdersLive) {
      noticeText = 'Mentions are live. Connect HELIUS_API_KEY for live holders.';
    }
  }

  return (
    <div className={'page'}>
      {noticeText && (
        <div className={'notice'}>
          {noticeText}
        </div>
      )}

      <a className={'community-banner'} href={BRAND.xUrl} target={'_blank'} rel={'noopener noreferrer'}>
        <div className={'icon'}>X</div>
        <div>
          <div className={'title'}>Join the Cyber Inu pack on X</div>
          <div className={'sub'}>Raids, signals, and lore with the pack.</div>
        </div>
      </a>

      <div className={'layout-3'}>
        <aside className={'col-side'}>
          <div className={'glass'}>
            <div className={'section-label'}>Hall of fame</div>
            <h2 className={'section-title'}>Top holders</h2>
            {holderList.slice(0, 10).map((h, i) => {
              const wallet = h.wallet || h.owner || '';
              return (
                <div className={'holder-row'} key={wallet || i}>
                  <span className={'holder-rank'}>{i + 1}</span>
                  <div className={'holder-avatar'}>{String(i + 1)}</div>
                  <div className={'holder-info'}>
                    <div className={'name'}>{shortWallet(wallet)}</div>
                    <div className={'sub'}>pack dog</div>
                  </div>
                  <span className={'holder-pct'}>
                    {h.pct != null ? Number(h.pct).toFixed(2) + '%' : '-'}
                  </span>
                </div>
              );
            })}
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
            <div className={'section-label'}>Cyber Inu · the pack that refused to log off</div>
            <h2 className={'section-title'}>WAIT, WHAT IS CYBER INU?</h2>
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
              {PACK.map((p) => (
                <div key={p.id} className={'pack-model'}>
                  <div className={'cover'}>
                    <div className={'cover-avatar'} style={{ background: p.colors.primary }}>
                      {initials(p.name)}
                    </div>
                  </div>
                  <div className={'body'}>
                    <div className={'name'}>
                      {p.name}
                      <span className={'badge-open'}>Open</span>
                    </div>
                    <div className={'handle'}>{p.handle}</div>
                    <button
                      type={'button'}
                      className={'btn btn-ghost'}
                      style={{ width: '100%', minHeight: 32, fontSize: '0.75rem' }}
                      onClick={() => toggle(p.id)}
                    >
                      {isJoined(p.id) ? 'Joined' : 'Join pack'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type={'button'}
              className={'btn btn-ghost'}
              style={{ width: '100%', marginTop: '0.75rem' }}
              onClick={() => navigate('#/pack')}
            >
              View full pack
            </button>
          </div>

          <div className={'feed-filter'}>
            <button type={'button'} className={'btn ' + (filter === 'for-you' ? 'btn-cyan' : 'btn-ghost')} onClick={() => setFilter('for-you')}>
              For you
            </button>
            <button type={'button'} className={'btn ' + (filter === 'following' ? 'btn-cyan' : 'btn-ghost')} onClick={() => setFilter('following')}>
              Following{joinedList.length ? ` (${joinedList.length})` : ''}
            </button>
          </div>

          {(filter === 'following' ? FEED_POSTS.filter((post) => isJoined(post.authorId)) : FEED_POSTS).map((post) => {
            const author = packMember(post.authorId);
            return (
              <article key={post.id} className={'post-card'}>
                <div className={'post-header'}>
                  <div className={'post-avatar'} style={{ background: avatarColor(post.authorId) }}>
                    {initials(author.name)}
                  </div>
                  <div className={'post-meta'}>
                    <div className={'name'}>{author.name}</div>
                    <div className={'handle'}>{author.handle}</div>
                  </div>
                </div>
                <p className={'post-text'}>{post.text}</p>
                {post.skyline && <Skyline seed={post.id} />}
                <div className={'post-actions'}>
                  <button
                    type={'button'}
                    className={'action-btn ' + (likes[post.id] ? 'active' : '')}
                    onClick={() => setLikes((s) => ({ ...s, [post.id]: !s[post.id] }))}
                  >
                    {likes[post.id] ? 'Liked' : 'Like'} {post.likes + (likes[post.id] ? 1 : 0)}
                  </button>
                  <button
                    type={'button'}
                    className={'action-btn ' + (boosts[post.id] || post.boosted ? 'boosted' : '')}
                    onClick={() => setBoosts((s) => ({ ...s, [post.id]: !s[post.id] }))}
                  >
                    Boost
                  </button>
                  <button type={'button'} className={'action-btn'} onClick={() => navigate('#/raid')}>
                    Raid
                  </button>
                </div>
              </article>
            );
          })}

          {filter === 'following' && !joinedList.length && (
            <p className={'muted'}>Join pack members on The Pack tab to fill Following.</p>
          )}
        </main>

        <aside className={'col-side'}>
          <div className={'glass'}>
            <div className={'section-label'}>Countdown</div>
            <div className={'countdown-big'}>{countdown || '--:--'}</div>
            <div className={'muted'}>Next pack pulse</div>
          </div>
          <div className={'glass'}>
            <div className={'section-label'}>Dogs online</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', fontWeight: 700 }}>
              {12 + (joinedList.length || 0)}
            </div>
            <div className={'muted'}>Estimated pack activity</div>
          </div>
          <div className={'glass'}>
            <div className={'section-label'}>Official feed</div>
            <h2 className={'section-title'}>Cyber Inu on X</h2>
            <a className={'btn btn-cyan'} style={{ width: '100%', marginBottom: '0.5rem' }} href={BRAND.xUrl} target={'_blank'} rel={'noopener noreferrer'}>
              Open X
            </a>
            <div>
              <a href={BRAND.pumpUrl} target={'_blank'} rel={'noopener noreferrer'}>pump.fun</a>
            </div>
            <div>
              <a href={'https://solscan.io/token/' + BRAND.ca} target={'_blank'} rel={'noopener noreferrer'}>Solscan</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
