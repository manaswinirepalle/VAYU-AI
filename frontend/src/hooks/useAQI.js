import { useEffect, useState } from 'react';

export function useAQI(city = 'Vizag') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/aqi/live?city=${city}`)
      .then((res) => res.json())
      .then((payload) => {
        setData(payload);
        setLoading(false);
      });
  }, [city]);

  return { data, loading };
}
