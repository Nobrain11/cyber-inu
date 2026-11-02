import { useState, useEffect, useCallback } from 'react';
import { useHashRoute } from './hooks/useHashRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Feed from './pages/Feed';
import Raid from './pages/Raid';
import Pack from './pages/Pack';
import Leaderboard from './pages/Leaderboard';
import RaidList from './pages/RaidList';
import Ask from './pages/Ask';

function nextPulseCountdown() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(now.getHours() + 1, 0, 0, 0);
  if (next <= now) next.setHours(next.getHours() + 1);
  const diff = Math.max(0, next - now);
  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function App() {
  const { route, navigate } = useHashRoute();
  const [holders, setHolders] = useState(null);
  const [mentions, setMentions] = useState(null);
  const [countdown, setCountdown] = useState(nextPulseCountdown);

  useEffect(() => {
    const id = setInterval(() => setCountdown(nextPulseCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  const loadHolders = useCallback(async () => {
    try {
      const res = await fetch('/api/holders');
      if (!res.ok) throw new Error('fail');
      const data = await res.json();
      setHolders({ ...data, fromApi: !data.sample });
    } catch {
      setHolders({ sample: true, fromApi: false, top: [], count: null });
    }
  }, []);

  const loadMentions = useCallback(async () => {
    try {
      const res = await fetch('/api/mentions');
      if (!res.ok) throw new Error('fail');
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.mentions || [];
      setMentions(Object.assign(list, { fromApi: !data.sample }));
    } catch {
      setMentions(Object.assign([], { fromApi: false }));
    }
  }, []);

  useEffect(() => {
    loadHolders();
    loadMentions();
  }, [loadHolders, loadMentions]);

  return (
    <>
      <Header
        route={route}
        navigate={navigate}
        holdersCount={holders?.count}
        countdown={countdown}
      />
      <main className="app-shell">
        {route === 'feed' && (
          <Feed holders={holders} mentions={mentions} countdown={countdown} />
        )}
        {route === 'raid' && <Raid />}
        {route === 'pack' && <Pack />}
        {route === 'leaderboard' && <Leaderboard holders={holders} />}
        {route === 'raid-list' && <RaidList mentions={mentions} />}
        {route === 'ask' && <Ask />}
      </main>
      <Footer />
    </>
  );
}
