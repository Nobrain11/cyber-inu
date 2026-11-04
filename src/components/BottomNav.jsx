export default function BottomNav({ route, navigate }) {
  const items = [
    { id: 'leaderboard', path: '#/leaderboard', label: 'Holders' },
    { id: 'feed', path: '#/', label: 'Feed' },
    { id: 'raid', path: '#/raid', label: 'Raid' },
  ];

  return (
    <nav className={'bottom-nav'} aria-label={'Primary'}>
      {items.map((item) => (
        <button
          key={item.id}
          type={'button'}
          className={'bottom-nav-item ' + (route === item.id ? 'active' : '')}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
