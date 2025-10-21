import { ReactNode } from 'react';
import { useWagtailData } from '@/hooks/useWagtailData';
import LoadingScreen from './LoadingScreen';

interface CMSContentWrapperProps {
  children: ReactNode;
  fallbackMessage?: string;
}

const CMSContentWrapper = ({ 
  children, 
  fallbackMessage = "Loading content from CMS..." 
}: CMSContentWrapperProps) => {
  const { homePageData, isLoading, error } = useWagtailData();

  // Show loading screen while CMS data is loading
  if (isLoading) {
    return <LoadingScreen message={fallbackMessage} />;
  }

  // Show error state if CMS failed to load
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Content Loading Failed</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show loading if no CMS data
  if (!homePageData) {
    return <LoadingScreen message="No content available from CMS" />;
  }

  // Render children with CMS data available
  return <>{children}</>;
};

export default CMSContentWrapper;
