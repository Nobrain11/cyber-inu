const SAMPLE_MENTIONS = [
  {
    id: '1',
    name: 'Neon Pack',
    handle: 'neonpacksol',
    created: new Date(Date.now() - 3600000).toISOString(),
    text: 'The visor is glowing. $CYBERINU pack is assembling. Who’s ready to rewrite the code?',
    url: 'https://x.com/neonpacksol/status/1',
  },
  {
    id: '2',
    name: 'District Runner',
    handle: 'districtrunner',
    created: new Date(Date.now() - 7200000).toISOString(),
    text: 'Cyber Inu lore hits different. Prophecy sequence is clean. Pack up.',
    url: 'https://x.com/districtrunner/status/2',
  },
  {
    id: '3',
    name: 'Glitch Howl',
    handle: 'glitchhowl',
    created: new Date(Date.now() - 10800000).toISOString(),
    text: 'Found a new signal on Solana. $CYBERINU. The dog that refused to log off.',
    url: 'https://x.com/glitchhowl/status/3',
  },
];

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=60');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const token = process.env.X_BEARER_TOKEN;
  if (!token) {
    return res.status(200).json({ sample: true, mentions: SAMPLE_MENTIONS });
  }

  try {
    const query = encodeURIComponent('($CYBERINU OR "Cyber Inu" OR CyberInu) -is:retweet lang:en');
    const url = `https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=20&tweet.fields=created_at,author_id,text&expansions=author_id&user.fields=name,username`;

    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!r.ok) {
      const err = await r.text();
      return res.status(200).json({
        sample: true,
        error: `X API ${r.status}`,
        mentions: SAMPLE_MENTIONS,
      });
    }

    const json = await r.json();
    const users = new Map((json.includes?.users || []).map((u) => [u.id, u]));
    const mentions = (json.data || []).map((t) => {
      const u = users.get(t.author_id) || {};
      return {
        id: t.id,
        name: u.name || 'Unknown',
        handle: u.username || 'unknown',
        created: t.created_at,
        text: t.text,
        url: `https://x.com/${u.username || 'i'}/status/${t.id}`,
      };
    });

    return res.status(200).json({ sample: false, mentions });
  } catch (e) {
    return res.status(200).json({
      sample: true,
      error: e.message,
      mentions: SAMPLE_MENTIONS,
    });
  }
}
