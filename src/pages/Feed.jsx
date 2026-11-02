import { useState, useEffect } from 'react';
import { BRAND, SAMPLE_MENTIONS, SAMPLE_HOLDERS } from '../config';
import { PACK, FEED_POSTS } from '../data';
import { useLocalPack } from '../hooks/useLocalPack';
import Skyline from '../components/Skyline';

function avatarColor(id) {
  const p = PACK.find((x) => x.id === id);
  return p?.colors?.primary || '#3ee8ff';
}

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Feed({ holders, mentions, countdown }) {
  const { isJoined, toggle, joinedList } = useLocalPack();
  const [likes, setLikes] = useState({});
  const [boosts, setBoosts] = useState({});
  const [filter, setFilter] = useState('for-you');

  const holderList = holders?.top?.length ? holders.top : SAMPLE_HOLDERS;
  const mentionList = mentions?.length ? mentions : SAMPLE_MENTIONS;
  const apiNotice = !holders?.fromApi || !mentions?.fromApi;

  const posts = FEED_POSTS.filter((p) => {
    if (filter === 'pack') {
      return joinedList.some((j) => j.id === p.authorId);
    }
    return true;
  });

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBoost = (id) => {
    setBoosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="page">
      {apiNotice && (
        <div className="notice">
          Showing sample data. Connect Helius / X API keys on the server for live holders and
          mentions.
        </div>
      )}

      <div className="grid-2">
        <div>
          <h2 style={{ marginBottom: '0.5rem' }}>Top holders</h2>
          <div className="holders-strip">
            {holderList.slice(0, 8).map((h) => (
              <div key={h.owner || h.rank} className="holder-chip">
                <span className="rank">#{h.rank}</span>
                <span className="muted">
                  {(h.owner || '').slice(0, 4)}…{(h.owner || '').slice(-4)}
                </span>
                <span>{h.pct?.toFixed?.(2) ?? h.pct}%</span>
              </div>
            ))}
          </div>

          <h2 style={{ marginBottom: '0.5rem' }}>Live from X</h2>
          {mentionList.slice(0, 4).map((m) => (
            <div key={m.id} className="post-card" style={{ marginBottom: '0.75rem' }}>
              <div className="post-header">
                <div
                  className="post-avatar"
                  style={{ background: '#3ee8ff' }}
                >
                  {(m.name || m.handle || '?')[0].toUpperCase()}
                </div>
                <div className="post-meta">
                  <div className="name">{m.name || m.handle}</div>
                  <div className="handle">@{m.handle}</div>
                </div>
              </div>
              <p className="post-text">{m.text}</p>
              <a
                className="btn btn-cyan"
                href={`https://twitter.com/intent/tweet?in_reply_to=${m.id}&text=${encodeURIComponent(
                  'Pack up. $CYBERINU'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.85rem', minHeight: 36 }}
              >
                Raid this post
              </a>
            </div>
          ))}

          <div className="panel" style={{ margin: '1rem 0' }}>
            <h3>Lore</h3>
            <p style={{ margin: '0.35rem 0', lineHeight: 1.55 }}>{BRAND.lore}</p>
            <p className="muted" style={{ margin: 0 }}>
              {BRAND.tagline} · Prophecy: {BRAND.prophecy}
            </p>
          </div>

          <h2 style={{ marginBottom: '0.5rem' }}>The pack</h2>
          <div className="pack-strip">
            {PACK.map((p) => (
              <div key={p.id} className="pack-card">
                <div
                  className="avatar"
                  style={{ background: p.colors.primary }}
                >
                  {initials(p.name)}
                </div>
                <div className="name">{p.name}</div>
                <div className="district">{p.district}</div>
                <button
                  type="button"
                  className={`toggle ${isJoined(p.id) ? 'on' : ''}`}
                  onClick={() => toggle(p.id)}
                >
                  {isJoined(p.id) ? 'Joined' : 'Join'}
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <button
              type="button"
              className={`btn ${filter === 'for-you' ? 'btn-cyan' : 'btn-ghost'}`}
              onClick={() => setFilter('for-you')}
              style={{ minHeight: 36, fontSize: '0.85rem' }}
            >
              For you
            </button>
            <button
              type="button"
              className={`btn ${filter === 'pack' ? 'btn-cyan' : 'btn-ghost'}`}
              onClick={() => setFilter('pack')}
              style={{ minHeight: 36, fontSize: '0.85rem' }}
            >
              In your pack
            </button>
          </div>

          {posts.length === 0 && (
            <p className="muted">Join some pack members to see their posts here.</p>
          )}

          {posts.map((post) => {
            const author = PACK.find((p) => p.id === post.authorId) || {
              name: 'Unknown',
              handle: '@?',
              colors: { primary: '#3ee8ff' },
            };
            const liked = likes[post.id];
            const boosted = boosts[post.id] || post.boosted;
            return (
              <article key={post.id} className="post-card">
                <div className="post-header">
                  <div
                    className="post-avatar"
                    style={{ background: author.colors.primary }}
                  >
                    {initials(author.name)}
                  </div>
                  <div className="post-meta">
                    <div className="name">{author.name}</div>
                    <div className="handle">{author.handle}</div>
                  </div>
                </div>
                <p className="post-text">{post.text}</p>
                <Skyline color={author.colors.primary} seed={post.id.charCodeAt(2) || 1} />
                <div className="post-actions">
                  <button
                    type="button"
                    className={`action-btn ${liked ? 'active' : ''}`}
                    onClick={() => toggleLike(post.id)}
                  >
                    {liked ? 'Liked' : 'Like'} · {(post.likes || 0) + (liked ? 1 : 0)}
                  </button>
                  <button
                    type="button"
                    className={`action-btn ${boosted ? 'boosted' : ''}`}
                    onClick={() => toggleBoost(post.id)}
                  >
                    {boosted ? 'Boosted' : 'Boost'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="sidebar">
          <div className="panel">
            <h3>Countdown</h3>
            <div className="countdown">{countdown || '—'}</div>
            <p className="muted" style={{ margin: '0.35rem 0 0' }}>
              Next pack pulse
            </p>
          </div>
          <div className="panel">
            <h3>Dogs online</h3>
            <p style={{ margin: 0, fontFamily: 'var(--font-head)', fontSize: '1.25rem', color: 'var(--cyan)' }}>
              {12 + (joinedList.length || 0) * 3}
            </p>
            <p className="muted" style={{ margin: '0.25rem 0 0' }}>
              Estimated pack activity
            </p>
          </div>
          <div className="panel">
            <h3>Links</h3>
            <p style={{ margin: '0.25rem 0' }}>
              <a href={BRAND.xUrl} target="_blank" rel="noopener noreferrer">
                Official X
              </a>
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              <a href={BRAND.pumpUrl} target="_blank" rel="noopener noreferrer">
                pump.fun
              </a>
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              <a
                href={`https://solscan.io/token/${BRAND.ca}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Solscan
              </a>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
