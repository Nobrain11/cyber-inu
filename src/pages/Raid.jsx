import { useState } from 'react';
import { RAID_TEMPLATES, BRAND } from '../config';

function parseStatusId(url) {
  if (!url) return null;
  const m = url.match(/\/status\/(\d+)/);
  return m ? m[1] : null;
}

export default function Raid() {
  const [text, setText] = useState(RAID_TEMPLATES[0]);
  const [postUrl, setPostUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  const shuffle = () => {
    const next = RAID_TEMPLATES[Math.floor(Math.random() * RAID_TEMPLATES.length)];
    setText(next);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setNotice('Copied.');
      setTimeout(() => setNotice(''), 2000);
    } catch {
      setNotice('Copy failed.');
    }
  };

  const openOnX = () => {
    const id = parseStatusId(postUrl);
    let intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    if (id) intent += `&in_reply_to=${id}`;
    window.open(intent, '_blank', 'noopener,noreferrer');
  };

  const writeWithGrok = async () => {
    setLoading(true);
    setNotice('');
    try {
      const res = await fetch('/api/grok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'raid', prompt: text || 'Write a short raid message for Cyber Inu' }),
      });
      const data = await res.json();
      if (data.text) {
        setText(data.text.slice(0, 190));
      } else if (data.error) {
        setNotice(data.error === 'missing_key' ? 'Grok API not configured. Using templates.' : data.error);
      }
    } catch {
      setNotice('Could not reach Grok. Using templates.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={'page'}>
      <div className={'section-label'}>Marketing</div>
      <h2 className={'section-title'} style={{ fontSize: '1.4rem' }}>Raid generator</h2>
      <p className={'muted'} style={{ marginBottom: '1rem', marginTop: '-0.25rem' }}>
        Pick a template, edit, then copy or open on X. Optional: paste a post URL to reply.
      </p>

      {notice && <div className={'notice'}>{notice}</div>}

      <div className={'panel raid-form'}>
        <label className={'muted'} style={{ display: 'block', marginBottom: '0.35rem' }}>
          Optional post URL
        </label>
        <input
          type={'url'}
          placeholder={'https://x.com/user/status/123...'}
          value={postUrl}
          onChange={(e) => setPostUrl(e.target.value)}
        />

        <label className={'muted'} style={{ display: 'block', marginBottom: '0.35rem' }}>
          Templates
        </label>
        <div className={'template-list'}>
          {RAID_TEMPLATES.map((t, i) => (
            <button
              key={i}
              type={'button'}
              className={'template-chip'}
              onClick={() => setText(t)}
            >
              {t.slice(0, 60)}...
            </button>
          ))}
        </div>

        <label className={'muted'} style={{ display: 'block', marginBottom: '0.35rem' }}>
          Message
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 280))}
          maxLength={280}
        />
        <p className={'muted'} style={{ margin: '0 0 0.75rem' }}>
          {text.length}/280
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button type={'button'} className={'btn btn-ghost'} onClick={shuffle}>
            Shuffle
          </button>
          <button type={'button'} className={'btn btn-ghost'} onClick={copy}>
            Copy
          </button>
          <button type={'button'} className={'btn btn-primary'} onClick={openOnX}>
            Open on X
          </button>
          <button
            type={'button'}
            className={'btn btn-cyan'}
            onClick={writeWithGrok}
            disabled={loading}
          >
            {loading ? 'Writing...' : 'Write with Grok'}
          </button>
        </div>
      </div>
    </div>
  );
}
