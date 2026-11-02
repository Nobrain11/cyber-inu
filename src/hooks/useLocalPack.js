import { useState, useEffect, useCallback } from 'react';
import { PACK } from '../data';

const KEY = 'cyberinu_joined_pack';

export function useLocalPack() {
  const [joined, setJoined] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(joined));
    } catch {}
  }, [joined]);

  const toggle = useCallback((id) => {
    setJoined((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const isJoined = useCallback((id) => !!joined[id], [joined]);

  const joinedList = PACK.filter((p) => joined[p.id]);

  return { joined, toggle, isJoined, joinedList };
}
