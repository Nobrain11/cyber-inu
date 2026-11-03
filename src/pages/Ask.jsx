import { useState, useRef, useEffect } from 'react';

const SYSTEM_GREETING =
  "Visor online. I'm Cyber Inu — the dog that refused to log off. Ask about the pack, the districts, or the prophecy. No price talk, no financial advice. What's the signal?";

export default function Ask() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: SYSTEM_GREETING },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch('/api/grok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'chat',
          messages: next.slice(-8).map((m) => ({ role: m.role, content: m.content.slice(0, 500) })),
        }),
      });
      const data = await res.json();
      if (data.text) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              data.error === 'missing_key'
                ? 'Grok key offline. Pack still online though — try the lore on Feed or a raid template.'
                : 'Signal dropped. Try again in a moment.',
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection noise. Visor still glowing — retry the signal.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={'page'}>
      <div className={'section-label'}>AI</div>
      <h2 className={'section-title'} style={{ fontSize: '1.4rem' }}>Ask Inu</h2>
      <p className={'muted'} style={{ marginBottom: '1rem', marginTop: '-0.25rem' }}>
        Chat with Cyber Inu. Replies stay in character. No financial advice.
      </p>

      <div className={'chat-wrap'}>
        <div className={'chat-messages'}>
          {messages.map((m, i) => (
            <div key={i} className={'msg ' + (m.role === 'user' ? 'user' : 'bot')}>
              {m.content}
            </div>
          ))}
          {loading && <div className={'msg bot muted'}>Processing signal...</div>}
          <div ref={bottomRef} />
        </div>
        <div className={'chat-input-row'}>
          <input
            type={'text'}
            placeholder={'Ask the pack leader...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            disabled={loading}
          />
          <button type={'button'} className={'btn btn-primary'} onClick={send} disabled={loading || !input.trim()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
