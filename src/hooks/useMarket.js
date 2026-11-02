import { useState, useEffect, useCallback } from 'react';
import { BRAND } from '../config';

const DEX_URL = `https://api.dexscreener.com/latest/dex/tokens/${BRAND.ca}`;

export function useMarket() {
  const [data, setData] = useState({
    marketCap: null,
    priceChange24h: null,
    loading: true,
    error: null,
  });

  const fetchMarket = useCallback(async () => {
    try {
      const res = await fetch(DEX_URL);
      if (!res.ok) throw new Error('DexScreener unavailable');
      const json = await res.json();
      const pair = json?.pairs?.[0];
      if (pair) {
        setData({
          marketCap: pair.marketCap ?? pair.fdv ?? null,
          priceChange24h: pair.priceChange?.h24 ?? null,
          loading: false,
          error: null,
        });
      } else {
        setData((d) => ({ ...d, loading: false, error: 'No pair found' }));
      }
    } catch (e) {
      setData((d) => ({ ...d, loading: false, error: e.message }));
    }
  }, []);

  useEffect(() => {
    fetchMarket();
    const id = setInterval(fetchMarket, 30000);
    return () => clearInterval(id);
  }, [fetchMarket]);

  return data;
}
