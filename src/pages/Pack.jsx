import { useState } from 'react';
import { PACK } from '../data';
import { useLocalPack } from '../hooks/useLocalPack';
import ProfileModal from '../components/ProfileModal';

function initials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function xUrl(handle) {
  if (!handle) return 'https://x.com';
  return 'https://x.com/' + handle.replace(/^@/, '');
}

export default function Pack() {
  const { isJoined, toggle, joinedList } = useLocalPack();
  const [profileId, setProfileId] = useState(null);

  return (
    <div className={'page'}>
      <div className={'section-label'}>Characters</div>
      <h2 className={'section-title'} style={{ fontSize: '1.4rem' }}>The pack</h2>
      <p className={'muted'} style={{ marginBottom: '1rem', marginTop: '-0.25rem' }}>
        Six original characters. Tap a card to open their profile.
        {joinedList.length > 0 ? ` · ${joinedList.length} joined` : ''}
      </p>

      <div className={'pack-grid'}>
        {PACK.map((p) => (
          <div
            key={p.id}
            className={'pack-full'}
            onClick={() => setProfileId(p.id)}
            role={'button'}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setProfileId(p.id)}
            style={{ cursor: 'pointer' }}
          >
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
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }} onClick={(e) => e.stopPropagation()}>
              <button
                type={'button'}
                className={'toggle ' + (isJoined(p.id) ? 'on' : '')}
                onClick={() => toggle(p.id)}
              >
                {isJoined(p.id) ? 'Joined' : 'Join pack'}
              </button>
              <a
                className={'btn btn-ghost'}
                style={{ minHeight: 34, fontSize: '0.75rem', padding: '0.3rem 0.85rem' }}
                href={xUrl(p.handle)}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                Open on X
              </a>
              <button
                type={'button'}
                className={'btn btn-cyan'}
                style={{ minHeight: 34, fontSize: '0.75rem', padding: '0.3rem 0.85rem' }}
                onClick={() => setProfileId(p.id)}
              >
                View profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {profileId && <ProfileModal memberId={profileId} onClose={() => setProfileId(null)} />}
    </div>
  );
}
