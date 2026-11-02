export const BRAND = {
  name: 'Cyber Inu',
  ticker: '$CYBERINU',
  ca: '7u4JmWrWG41kYkKpyqbuYJR4uZhE7oLCUMCGfNkNCFWq',
  xUrl: 'https://x.com/OfficialCyInu',
  pumpUrl: 'https://pump.fun/coin/7u4JmWrWG41kYkKpyqbuYJR4uZhE7oLCUMCGfNkNCFWq',
  logo: '/logo.svg',
  tagline: "Good dogs don't follow the code. They rewrite it.",
  prophecy: 'AI → AGI → SI → CI',
  lore: 'A Shiba who refused to log off. Neon exosuit, cyan visor, and a stubborn refusal to leave the network. The pack follows the light.',
};

export const COLORS = {
  base: '#0d1026',
  panel: '#151a3a',
  orange: '#ff7a2f',
  cyan: '#3ee8ff',
  text: '#e8ecff',
  muted: '#8b93b8',
};

export const TABS = [
  { id: 'feed', path: '#/', label: 'Feed' },
  { id: 'raid', path: '#/raid', label: 'Raid generator' },
  { id: 'pack', path: '#/pack', label: 'The pack' },
  { id: 'leaderboard', path: '#/leaderboard', label: 'Top holders' },
  { id: 'raid-list', path: '#/raid-list', label: 'Raid list' },
  { id: 'ask', path: '#/ask', label: 'Ask Inu' },
];

export const RAID_TEMPLATES = [
  'Just found $CYBERINU — the dog that rewrote the code. Pack is forming. Who’s still online?',
  'Cyber Inu didn’t log off. Neither should you. Neon pack assembling on Solana.',
  'AI → AGI → SI → CI. The prophecy is running. $CYBERINU is the signal.',
  'Good dogs don’t follow the code. They rewrite it. Join the pack.',
  'Visor glowing. Pack howling. $CYBERINU is live. Don’t miss the raid.',
  'From the neon districts to the chain — Cyber Inu is rewriting the narrative.',
];

export const SAMPLE_HOLDERS = [
  { rank: 1, owner: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', amount: 42000000, pct: 4.2 },
  { rank: 2, owner: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM', amount: 31500000, pct: 3.15 },
  { rank: 3, owner: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1', amount: 28000000, pct: 2.8 },
  { rank: 4, owner: 'GThUX1Atko4tqfNTdgSHbT1jN3drt7be5sWRvpHwudB', amount: 21000000, pct: 2.1 },
  { rank: 5, owner: '3x2c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c', amount: 18500000, pct: 1.85 },
];

export const SAMPLE_MENTIONS = [
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
