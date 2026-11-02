const CA = '7u4JmWrWG41kYkKpyqbuYJR4uZhE7oLCUMCGfNkNCFWq';
const MAX_PAGES = 10;
const PAGE_SIZE = 1000;

const SAMPLE_HOLDERS = [
  { rank: 1, owner: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', amount: 42000000, pct: 4.2 },
  { rank: 2, owner: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM', amount: 31500000, pct: 3.15 },
  { rank: 3, owner: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1', amount: 28000000, pct: 2.8 },
  { rank: 4, owner: 'GThUX1Atko4tqfNTdgSHbT1jN3drt7be5sWRvpHwudB', amount: 21000000, pct: 2.1 },
  { rank: 5, owner: '3x2c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c', amount: 18500000, pct: 1.85 },
];

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const key = process.env.HELIUS_API_KEY;
  if (!key) {
    return res.status(200).json({
      sample: true,
      count: SAMPLE_HOLDERS.length * 40,
      top: SAMPLE_HOLDERS,
    });
  }

  try {
    const exclude = new Set(
      (process.env.EXCLUDE_WALLETS || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    );

    const byOwner = new Map();
    let page = 1;
    let cursor = undefined;

    while (page <= MAX_PAGES) {
      const body = {
        jsonrpc: '2.0',
        id: 'holders',
        method: 'getTokenAccounts',
        params: {
          page,
          limit: PAGE_SIZE,
          displayOptions: { showZeroBalance: false },
          mint: CA,
        },
      };
      if (cursor) body.params.cursor = cursor;

      const r = await fetch(`https://mainnet.helius-rpc.com/?api-key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!r.ok) break;
      const json = await r.json();
      const accounts = json?.result?.token_accounts || json?.result?.accounts || [];
      if (!accounts.length) break;

      for (const acc of accounts) {
        const owner = acc.owner || acc.address;
        const amount = Number(acc.amount ?? acc.tokenAmount?.amount ?? 0);
        if (!owner || amount <= 0 || exclude.has(owner)) continue;
        byOwner.set(owner, (byOwner.get(owner) || 0) + amount);
      }

      cursor = json?.result?.cursor;
      if (!cursor && accounts.length < PAGE_SIZE) break;
      page += 1;
    }

    const entries = [...byOwner.entries()].sort((a, b) => b[1] - a[1]);
    const total = entries.reduce((s, [, v]) => s + v, 0) || 1;
    const top = entries.slice(0, 20).map(([owner, amount], i) => ({
      rank: i + 1,
      owner,
      amount,
      pct: (amount / total) * 100,
    }));

    return res.status(200).json({
      sample: false,
      count: entries.length,
      top,
    });
  } catch (e) {
    return res.status(200).json({
      sample: true,
      error: e.message,
      count: SAMPLE_HOLDERS.length * 40,
      top: SAMPLE_HOLDERS,
    });
  }
}
