import { PACK } from '../data';
import { useLocalPack } from '../hooks/useLocalPack';

function initials(name) {
  if (!name) return '?';
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function xUrl(handle) {
  if (!handle) return 'https://x.com';
  return 'https://x.com/' + handle.replace(/^@/, '');
}

export default function ProfileModal({ memberId, onClose }) {
  const member = PACK.find((p) => p.id === memberId);
  const { isJoined, toggle } = useLocalPack();

  if (!member) return null;

  return (
    <div className={'profile-overlay'} onClick={onClose} role={'presentation'}>
      <div
        className={'profile-sheet'}
        onClick={(e) => e.stopPropagation()}
        role={'dialog'}
        aria-modal={'true'}
        aria-label={member.name + ' profile'}
      >
        <button type={'button'} className={'profile-close'} onClick={onClose} aria-label={'Close'}>
          ×
        </button>

        <div className={'profile-hero'} style={{ background: 'linear-gradient(145deg, ' + member.colors.primary + '33, ' + member.colors.secondary + '22)' }}>
          <div
            className={'profile-avatar'}
            style={{ background: member.colors.primary, boxShadow: '0 0 24px ' + member.colors.primary + '66' }}
          >
            {initials(member.name)}
          </div>
          <h2 className={'profile-name'}>{member.name}</h2>
          <a className={'profile-handle'} href={xUrl(member.handle)} target={'_blank'} rel={'noopener noreferrer'}>
            {member.handle}
          </a>
          <div className={'profile-district'}>{member.district}</div>
        </div>

        <div className={'profile-body'}>
          <p className={'profile-bio'}>{member.bio}</p>

          <div className={'profile-actions'}>
            <button
              type={'button'}
              className={'btn ' + (isJoined(member.id) ? 'btn-cyan' : 'btn-primary')}
              onClick={() => toggle(member.id)}
            >
              {isJoined(member.id) ? 'Joined pack' : 'Join pack'}
            </button>
            <a className={'btn btn-ghost'} href={xUrl(member.handle)} target={'_blank'} rel={'noopener noreferrer'}>
              Open on X
            </a>
          </div>

          <div className={'section-label'} style={{ marginTop: '1rem' }}>Recent signals</div>
          <div className={'profile-posts'}>
            {(member.posts || []).map((post) => (
              <div key={post.id} className={'profile-post'}>
                <p>{post.text}</p>
                <div className={'profile-post-meta'}>
                  <span>{post.likes} likes</span>
                  {post.boosted && <span className={'boosted-tag'}>Boosted</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
