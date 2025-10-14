# 🚀 Wagtail CMS Integration Guide

## Overview

Your React app is now integrated with Wagtail CMS! You can manage all content through the admin panel and it will automatically appear in your React app.

## 📋 Quick Start

### 1. Configure Environment Variables

Create or update `.env.local` in the `arc-nexus-forge` folder:

```env
VITE_WAGTAIL_API_URL=http://localhost:8000/api/v2
```

### 2. Test the API Connection

Open your browser and visit:
```
http://localhost:8000/api/v2/pages/
```

You should see JSON data with your pages! If you see an empty array `[]`, make sure you've:
- Created and **published** pages in the Wagtail admin
- The Django server is running

### 3. Use CMS Content in Components

#### Option A: Use the New CMS-Powered Component

Replace `HeroSection` with `CMSHeroSection` in your `Index.tsx`:

```tsx
// In src/pages/Index.tsx
import CMSHeroSection from '@/components/CMSHeroSection'; // Add this
// import HeroSection from '@/components/HeroSection';     // Comment out old one

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <CMSHeroSection />  {/* Use CMS version */}
      <AboutSection />
      {/* ... rest of your components */}
    </div>
  );
};
```

#### Option B: Fetch Data Manually

```tsx
import { fetchHomePage } from '@/services/wagtailApi';
import { useEffect, useState } from 'react';

function MyComponent() {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetchHomePage().then(data => {
      setPageData(data);
    }).catch(error => {
      console.error('Failed to load CMS content:', error);
    });
  }, []);

  if (!pageData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{pageData.hero_title}</h1>
      <p>{pageData.hero_subtitle}</p>
    </div>
  );
}
```

## 🔌 Available API Methods

All methods are in `src/services/wagtailApi.ts`:

### Fetch Pages

```typescript
import { 
  fetchPages, 
  fetchPageById, 
  fetchPageBySlug,
  fetchHomePage,
  fetchPagesByType 
} from '@/services/wagtailApi';

// Get all pages
const allPages = await fetchPages();

// Get specific page by ID
const page = await fetchPageById(3);

// Get page by slug
const aboutPage = await fetchPageBySlug('about');

// Get home page
const homePage = await fetchHomePage();

// Get all events pages
const events = await fetchPagesByType('arc_cms.EventsPage');
```

### Fetch Images

```typescript
import { fetchImages } from '@/services/wagtailApi';

const images = await fetchImages();
console.log(images.items); // Array of images
```

## 📊 API Response Structure

### Page Response Example

```json
{
  "id": 3,
  "meta": {
    "type": "arc_cms.HomePage",
    "detail_url": "http://localhost:8000/api/v2/pages/3/",
    "slug": "home",
    "show_in_menus": true
  },
  "title": "ARC Home",
  "hero_title": "Welcome to ARC Lebanon",
  "hero_subtitle": "Building a Better Tomorrow",
  "hero_background": {
    "url": "http://localhost:8000/media/images/hero.jpg",
    "width": 1920,
    "height": 1080
  },
  "body": [
    {
      "type": "hero",
      "value": {
        "title": "Our Mission",
        "subtitle": "Making a difference",
        "description": "<p>We are dedicated to...</p>"
      }
    }
  ]
}
```

## 🎨 Rendering StreamField Content

StreamField blocks need special handling:

```tsx
function renderStreamField(blocks: any[]) {
  return blocks.map((block, index) => {
    switch(block.type) {
      case 'hero':
        return <HeroBlock key={index} data={block.value} />;
      
      case 'about':
        return <AboutBlock key={index} data={block.value} />;
      
      case 'rich_text':
        return (
          <div 
            key={index} 
            dangerouslySetInnerHTML={{ __html: block.value }} 
          />
        );
      
      default:
        return null;
    }
  });
}

// Usage
<div>
  {renderStreamField(pageData.body)}
</div>
```

## 🔄 Real-Time Updates

To see changes immediately:

1. **Edit content in Wagtail admin**: `http://localhost:8000/cms/`
2. **Click "Publish"** (not just "Save draft")
3. **Refresh your React app**: `http://localhost:5173/`

The content should update instantly!

## 🧪 Testing Your Integration

### Test 1: Check API Response

```bash
# In your browser or terminal
curl http://localhost:8000/api/v2/pages/
```

Expected: JSON array with your pages

### Test 2: Check React Console

Open browser DevTools (F12) → Console:

```javascript
fetch('http://localhost:8000/api/v2/pages/')
  .then(r => r.json())
  .then(data => console.log(data))
```

You should see your pages data!

### Test 3: Use React Component

Add this test component to see API data:

```tsx
// src/components/CMSTest.tsx
import { useEffect, useState } from 'react';
import { fetchPages } from '@/services/wagtailApi';

export default function CMSTest() {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    fetchPages().then(response => {
      setPages(response.items);
    });
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">CMS Pages:</h2>
      <ul>
        {pages.map(page => (
          <li key={page.id} className="mb-2">
            {page.title} ({page.meta.type})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 🔥 Common Issues & Solutions

### Issue: "Failed to fetch"

**Solution:**
1. Make sure Django server is running: `python manage.py runserver`
2. Check CORS settings in `arc_backend/arc_core/settings.py`
3. Verify API URL in `.env.local`

### Issue: "Empty array []"

**Solution:**
1. Go to Wagtail admin: `http://localhost:8000/cms/`
2. Make sure you **published** pages (not just saved as draft)
3. Check site configuration is set up (run `python manage.py setup_site`)

### Issue: "Network error" or CORS

**Solution:**
Add to `arc_backend/arc_core/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8080',  # Your React port
]
```

### Issue: Images not loading

**Solution:**
1. Check `MEDIA_URL` in settings.py
2. Verify Django is serving media files
3. Use full URL from API response: `data.hero_background.url`

## 📱 Example: Events Page

```tsx
// src/pages/EventsPage.tsx
import { useEffect, useState } from 'react';
import { fetchPagesByType } from '@/services/wagtailApi';

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchPagesByType('arc_cms.EventsPage').then(pages => {
      if (pages.length > 0) {
        // Get the first EventsPage
        const eventsPage = pages[0];
        // Extract events from body StreamField
        const eventBlocks = eventsPage.body?.filter(
          block => block.type === 'events'
        ) || [];
        setEvents(eventBlocks);
      }
    });
  }, []);

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((block, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            {block.value?.map((event: any, i: number) => (
              <div key={i}>
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-gray-600">{event.date}</p>
                <p className="mt-2">{event.location}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🎯 Next Steps

1. ✅ Configure environment variables
2. ✅ Test API connection in browser
3. ✅ Try `CMSHeroSection` component
4. ✅ Create content in Wagtail admin
5. ✅ Publish and see it in React!

## 📚 Additional Resources

- [Wagtail API Docs](https://docs.wagtail.org/en/stable/advanced_topics/api/)
- [React Query for better data fetching](https://tanstack.com/query/latest)
- [SWR for real-time updates](https://swr.vercel.app/)

---

**Need Help?** Check the main guide: `arc_backend/WAGTAIL_CMS_GUIDE.md`

