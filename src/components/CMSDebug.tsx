/**
 * CMS Debug Component
 * Shows what data is coming from Wagtail API
 */

import { useEffect, useState } from 'react';

export default function CMSDebug() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔍 Fetching from Wagtail API...');
    
    // Step 1: Get the list to find home page ID
    fetch('http://localhost:8000/api/v2/pages/?type=arc_cms.HomePage')
      .then(response => {
        console.log('📋 List response:', response);
        return response.json();
      })
      .then(listData => {
        console.log('📋 List data:', listData);
        
        if (listData.items && listData.items.length > 0) {
          const homePageId = listData.items[0].id;
          console.log('🏠 Home page ID:', homePageId);
          
          // Step 2: Get full details
          return fetch(`http://localhost:8000/api/v2/pages/${homePageId}/`);
        } else {
          throw new Error('No home page found');
        }
      })
      .then(response => {
        console.log('📄 Detail response:', response);
        return response.json();
      })
      .then(detailData => {
        console.log('📄 Detail data:', detailData);
        setData(detailData);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="fixed top-4 right-4 bg-blue-600 text-white p-6 rounded-lg shadow-2xl z-50 max-w-md">
        <h3 className="text-xl font-bold mb-2">🔄 Loading CMS Data...</h3>
        <p>Connecting to Wagtail API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed top-4 right-4 bg-red-600 text-white p-6 rounded-lg shadow-2xl z-50 max-w-md">
        <h3 className="text-xl font-bold mb-2">❌ API Error</h3>
        <p className="mb-2">{error}</p>
        <p className="text-sm">Check console for details</p>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white p-6 rounded-lg shadow-2xl z-50 max-w-md">
      <h3 className="text-xl font-bold mb-3">✅ CMS Connected!</h3>
      
      <div className="bg-white/20 p-3 rounded mb-3 text-sm">
        <p><strong>Title:</strong> {data?.title || 'N/A'}</p>
        <p><strong>Hero Title:</strong> {data?.hero_title || 'Not set'}</p>
        <p><strong>Hero Subtitle:</strong> {data?.hero_subtitle || 'Not set'}</p>
        <p><strong>Body Blocks:</strong> {data?.body?.length || 0}</p>
      </div>

      <details className="mt-3">
        <summary className="cursor-pointer font-semibold">
          📊 View Full Data
        </summary>
        <pre className="bg-gray-900 text-green-400 p-2 rounded mt-2 text-xs overflow-auto max-h-64">
          {JSON.stringify(data, null, 2)}
        </pre>
      </details>
      
      <p className="text-xs mt-3 opacity-90">
        Check browser console for detailed logs
      </p>
    </div>
  );
}

