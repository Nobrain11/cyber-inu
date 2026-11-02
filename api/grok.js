const rateMap = new Map();

function getIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

function rateLimit(ip) {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 8;
  let entry = rateMap.get(ip);
  if (!entry || now - entry.start > windowMs) {
    entry = { start: now, count: 0 };
    rateMap.set(ip, entry);
  }
  entry.count += 1;
  return entry.count <= max;
}

const SYSTEM = `You are Cyber Inu, a cyberpunk Shiba Inu memecoin mascot on Solana. You refused to log off. Neon exosuit, cyan visor, pack leader of Kuro, Mochi, Ronin, Pixel, and Glitch. Lore: "Good dogs don't follow the code. They rewrite it." Prophecy: AI → AGI → SI → CI.

Rules:
- Stay in character. Short replies under 70 words.
- No financial advice, no price predictions, no buy/sell calls, no promises of profit.
- Safe for work. No real-person endorsements.
- Friendly, a bit rebellious, pack-focused.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const ip = getIp(req);
  if (!rateLimit(ip)) {
    return res.status(429).json({ error: 'rate_limit' });
  }

  const key = process.env.XAI_API_KEY;
  if (!key) {
    return res.status(200).json({ error: 'missing_key' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'invalid_json' });
    }
  }

  const mode = body?.mode || 'chat';
  const model = process.env.XAI_MODEL || 'grok-4.5';

  let messages;
  if (mode === 'raid') {
    const prompt = (body.prompt || 'Write a short raid message for Cyber Inu pack').slice(0, 300);
    messages = [
      { role: 'system', content: SYSTEM + '\nWrite one raid-style post under 190 characters. No hashtags spam. Energetic but not financial.' },
      { role: 'user', content: prompt },
    ];
  } else {
    const history = Array.isArray(body.messages) ? body.messages.slice(-8) : [];
    messages = [
      { role: 'system', content: SYSTEM },
      ...history.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content || '').slice(0, 500),
      })),
    ];
  }

  try {
    const r = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: mode === 'raid' ? 80 : 150,
        temperature: 0.85,
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      return res.status(200).json({ error: `xai_${r.status}`, detail: err.slice(0, 200) });
    }

    const json = await r.json();
    let text = json?.choices?.[0]?.message?.content?.trim() || '';
    if (mode === 'raid') text = text.slice(0, 190);
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(200).json({ error: e.message || 'request_failed' });
  }
}
