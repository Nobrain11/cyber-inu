export default function Skyline({ color = '#3ee8ff', seed = 1 }) {
  const buildings = [];
  let x = 0;
  const s = seed * 17;
  for (let i = 0; i < 12; i++) {
    const w = 18 + ((s + i * 7) % 22);
    const h = 25 + ((s + i * 13) % 45);
    buildings.push({ x, w, h, glow: (s + i) % 3 === 0 });
    x += w + 4;
  }

  return (
    <svg className="skyline" viewBox="0 0 320 80" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`g${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0e22" />
          <stop offset="100%" stopColor="#151a3a" />
        </linearGradient>
      </defs>
      <rect width="320" height="80" fill={`url(#g${seed})`} />
      {buildings.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={80 - b.h}
            width={b.w}
            height={b.h}
            fill="#1a2148"
            stroke={b.glow ? color : 'rgba(62,232,255,0.15)'}
            strokeWidth={b.glow ? 1.5 : 0.5}
          />
          {b.glow && (
            <rect
              x={b.x + 4}
              y={80 - b.h + 6}
              width={b.w - 8}
              height={4}
              fill={color}
              opacity={0.7}
            />
          )}
        </g>
      ))}
      <line x1="0" y1="78" x2="320" y2="78" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
