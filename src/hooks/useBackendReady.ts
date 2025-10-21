import { useState, useEffect } from 'react';
import BackendHealthService from '@/services/backendHealth';

export const useBackendReady = () => {
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const healthService = BackendHealthService.getInstance();
        
        // Wait for backend to be ready with retries
        const status = await healthService.waitForBackend(15, 2000); // 15 attempts, 2 second delay
        
        if (status.isReady && status.isHealthy) {
          setIsBackendReady(true);
          console.log('✅ Backend is ready, showing content');
        } else {
          setError(status.error || 'Backend is not responding');
          console.warn('⚠️ Backend not ready, will retry...');
          setRetryCount(prev => prev + 1);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to check backend status';
        setError(errorMessage);
        console.error('❌ Backend check failed:', err);
        setRetryCount(prev => prev + 1);
      } finally {
        setIsLoading(false);
      }
    };

    checkBackend();
  }, [retryCount]);

  const retry = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
  };

  return {
    isBackendReady,
    isLoading,
    error,
    retry,
    retryCount,
  };
};
