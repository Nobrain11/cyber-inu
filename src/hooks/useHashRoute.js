import { useState, useEffect } from 'react';

const ROUTES = {
  '#/': 'feed',
  '#/raid': 'raid',
  '#/pack': 'pack',
  '#/leaderboard': 'leaderboard',
  '#/raid-list': 'raid-list',
  '#/ask': 'ask',
};

export function useHashRoute() {
  const getRoute = () => {
    const hash = window.location.hash || '#/';
    return ROUTES[hash] || 'feed';
  };

  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHash);
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (path) => {
    window.location.hash = path.startsWith('#') ? path : `#${path}`;
  };

  return { route, navigate };
}
