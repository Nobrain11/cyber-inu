export const PACK = [
  {
    id: 'cyber-inu',
    name: 'Cyber Inu',
    handle: '@OfficialCyInu',
    district: 'Core Node',
    colors: { primary: '#3ee8ff', secondary: '#ff7a2f' },
    bio: 'The original. Refused to log off. Neon exosuit, cyan visor, pack leader.',
    posts: [
      { id: 'ci1', text: 'Still online. Still rewriting. Pack status: active.', likes: 128, boosted: false },
      { id: 'ci2', text: 'Prophecy sequence holds. AI → AGI → SI → CI. Keep the signal clean.', likes: 96, boosted: true },
    ],
  },
  {
    id: 'kuro',
    name: 'Kuro',
    handle: '@KuroDistrict',
    district: 'Shadow Grid',
    colors: { primary: '#a78bfa', secondary: '#3ee8ff' },
    bio: 'Silent runner of the Shadow Grid. Tracks the dark lanes so the pack stays safe.',
    posts: [
      { id: 'k1', text: 'Shadow Grid clear. No hostile packets. Move.', likes: 54, boosted: false },
      { id: 'k2', text: 'Night shift complete. Core Node still glowing.', likes: 41, boosted: false },
    ],
  },
  {
    id: 'mochi',
    name: 'Mochi',
    handle: '@MochiByte',
    district: 'Soft Sector',
    colors: { primary: '#f9a8d4', secondary: '#ff7a2f' },
    bio: 'Keeps the pack fed and the morale high. Soft Sector energy, hard loyalty.',
    posts: [
      { id: 'm1', text: 'Soft Sector bakery is open. Come get your signal boost.', likes: 87, boosted: true },
      { id: 'm2', text: 'Pack that eats together stays online together.', likes: 62, boosted: false },
    ],
  },
  {
    id: 'ronin',
    name: 'Ronin',
    handle: '@RoninCircuit',
    district: 'Blade Row',
    colors: { primary: '#f87171', secondary: '#3ee8ff' },
    bio: 'Lone wolf who still answers the pack call. Blade Row enforcer.',
    posts: [
      { id: 'r1', text: 'Blade Row holds. Anyone needing escort through the noise, ping me.', likes: 73, boosted: false },
      { id: 'r2', text: 'Code is temporary. Loyalty is permanent. Pack first.', likes: 59, boosted: true },
    ],
  },
  {
    id: 'pixel',
    name: 'Pixel',
    handle: '@PixelForge',
    district: 'Render Bay',
    colors: { primary: '#34d399', secondary: '#ff7a2f' },
    bio: 'Builds the neon skyline one frame at a time. Render Bay architect.',
    posts: [
      { id: 'p1', text: 'New skyline drop live. Check the feed for the glow.', likes: 91, boosted: false },
      { id: 'p2', text: 'Every district needs a canvas. Render Bay delivers.', likes: 48, boosted: false },
    ],
  },
  {
    id: 'glitch',
    name: 'Glitch',
    handle: '@GlitchSignal',
    district: 'Error Zone',
    colors: { primary: '#fbbf24', secondary: '#3ee8ff' },
    bio: 'Embraces the noise. Turns broken packets into new signals. Error Zone native.',
    posts: [
      { id: 'g1', text: 'Error Zone report: noise levels high, opportunity higher. Pack adapt.', likes: 66, boosted: true },
      { id: 'g2', text: 'Glitches aren’t bugs. They’re unplanned features. Stay strange.', likes: 55, boosted: false },
    ],
  },
];

export const FEED_POSTS = [
  {
    id: 'fp1',
    authorId: 'cyber-inu',
    text: 'Visor online. Pack assembling. The network never sleeps and neither do we.',
    likes: 214,
    boosted: false,
  },
  {
    id: 'fp2',
    authorId: 'pixel',
    text: 'Dropped a new neon skyline for the Core Node. Scroll the feed and feel the glow.',
    likes: 143,
    boosted: true,
  },
  {
    id: 'fp3',
    authorId: 'mochi',
    text: 'Soft Sector check-in: morale high, snacks higher. Who’s joining the next raid?',
    likes: 98,
    boosted: false,
  },
  {
    id: 'fp4',
    authorId: 'kuro',
    text: 'Shadow Grid quiet tonight. Good window for clean signals. Stay sharp.',
    likes: 76,
    boosted: false,
  },
  {
    id: 'fp5',
    authorId: 'ronin',
    text: 'Blade Row is ready. If the noise comes, the pack answers together.',
    likes: 112,
    boosted: true,
  },
  {
    id: 'fp6',
    authorId: 'glitch',
    text: 'Error Zone just spit out a new pattern. Looks like the prophecy sequence. Interesting.',
    likes: 89,
    boosted: false,
  },
];
