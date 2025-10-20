import { useState, useEffect } from 'react';
import { fetchHomePage, WagtailPage } from '@/services/wagtailApi';

export const useWagtailData = () => {
  const [homePageData, setHomePageData] = useState<WagtailPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchHomePage();
        setHomePageData(data);
        
        console.log('✅ Wagtail data loaded:', data);
      } catch (err) {
        console.error('❌ Error fetching Wagtail data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    homePageData,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      setError(null);
      fetchHomePage()
        .then(setHomePageData)
        .catch(err => setError(err instanceof Error ? err.message : 'Failed to fetch data'))
        .finally(() => setIsLoading(false));
    }
  };
};
