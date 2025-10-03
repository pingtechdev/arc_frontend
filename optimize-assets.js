#!/usr/bin/env node

/**
 * Asset Optimization Script for ARC Nexus Forge
 * This script helps optimize images and assets for web deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ASSETS_DIR = 'src/assets';
const OPTIMIZED_DIR = 'src/assets/optimized';

// File size limits (in MB)
const LIMITS = {
  images: 0.5,      // 500KB
  videos: 5,         // 5MB
  logos: 0.1,        // 100KB
  gallery: 1,        // 1MB
};

// Optimization recommendations
const RECOMMENDATIONS = {
  // Convert these formats
  convert: {
    '.heic': '.webp',
    '.png': '.webp',
    '.jpg': '.webp',
    '.jpeg': '.webp'
  },
  
  // Resize dimensions
  resize: {
    'gallery': { maxWidth: 1200, quality: 85 },
    'sponsors': { maxWidth: 200, quality: 90 },
    'hero': { maxWidth: 1920, quality: 85 },
    'organizers': { maxWidth: 300, quality: 90 },
    'arc': { maxWidth: 200, quality: 95 }
  }
};

function analyzeAssets() {
  console.log('🔍 Analyzing assets...\n');
  
  const assets = [];
  
  function scanDirectory(dir, relativePath = '') {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const relativeItemPath = path.join(relativePath, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        scanDirectory(fullPath, relativeItemPath);
      } else {
        const sizeMB = stats.size / (1024 * 1024);
        const ext = path.extname(item).toLowerCase();
        
        assets.push({
          name: item,
          path: relativeItemPath,
          size: sizeMB,
          extension: ext,
          category: getCategory(relativePath)
        });
      }
    });
  }
  
  scanDirectory(ASSETS_DIR);
  
  // Sort by size (largest first)
  assets.sort((a, b) => b.size - a.size);
  
  console.log('📊 Asset Analysis Results:\n');
  console.log('Large Files (>1MB):');
  assets.filter(asset => asset.size > 1).forEach(asset => {
    console.log(`  ⚠️  ${asset.path} - ${asset.size.toFixed(2)}MB`);
  });
  
  console.log('\nMedium Files (0.5-1MB):');
  assets.filter(asset => asset.size > 0.5 && asset.size <= 1).forEach(asset => {
    console.log(`  ⚡ ${asset.path} - ${asset.size.toFixed(2)}MB`);
  });
  
  console.log('\nOptimization Needed:');
  assets.forEach(asset => {
    const needsOptimization = shouldOptimize(asset);
    if (needsOptimization) {
      console.log(`  🔧 ${asset.path} - ${asset.size.toFixed(2)}MB (${needsOptimization})`);
    }
  });
  
  return assets;
}

function getCategory(relativePath) {
  if (relativePath.includes('gallery')) return 'gallery';
  if (relativePath.includes('sponsors')) return 'sponsors';
  if (relativePath.includes('hero')) return 'hero';
  if (relativePath.includes('organizers')) return 'organizers';
  if (relativePath.includes('arc')) return 'arc';
  return 'other';
}

function shouldOptimize(asset) {
  const { size, extension, category } = asset;
  
  // Check file size limits
  if (size > LIMITS[category] || size > LIMITS.images) {
    return 'File too large';
  }
  
  // Check if format needs conversion
  if (RECOMMENDATIONS.convert[extension]) {
    return `Convert ${extension} to ${RECOMMENDATIONS.convert[extension]}`;
  }
  
  // Check for problematic formats
  if (['.heic', '.tiff', '.bmp'].includes(extension)) {
    return 'Convert to web-compatible format';
  }
  
  return null;
}

function generateOptimizationCommands(assets) {
  console.log('\n🛠️  Optimization Commands:\n');
  
  // Create optimized directory
  console.log('# Create optimized directory:');
  console.log('mkdir -p src/assets/optimized/{gallery,sponsors,hero,organizers,arc}\n');
  
  // Image optimization commands
  const imageAssets = assets.filter(asset => 
    ['.jpg', '.jpeg', '.png', '.heic'].includes(asset.extension)
  );
  
  if (imageAssets.length > 0) {
    console.log('# Install optimization tools:');
    console.log('npm install -g sharp-cli imagemin-cli\n');
    
    console.log('# Optimize images:');
    imageAssets.forEach(asset => {
      const { path: assetPath, category } = asset;
      const config = RECOMMENDATIONS.resize[category];
      
      if (config) {
        console.log(`# ${assetPath}`);
        console.log(`sharp-cli resize ${config.maxWidth} --format webp --quality ${config.quality} src/assets/${assetPath} src/assets/optimized/${assetPath.replace(/\.[^.]+$/, '.webp')}`);
      }
    });
  }
  
  // Video optimization
  const videoAssets = assets.filter(asset => 
    ['.mp4', '.mov', '.avi'].includes(asset.extension)
  );
  
  if (videoAssets.length > 0) {
    console.log('\n# Video optimization (install ffmpeg first):');
    videoAssets.forEach(asset => {
      console.log(`# ${asset.path}`);
      console.log(`ffmpeg -i src/assets/${asset.path} -c:v libx264 -crf 28 -c:a aac -b:a 128k src/assets/optimized/${asset.path}`);
    });
  }
}

function generateLazyLoadingImplementation() {
  console.log('\n📝 Lazy Loading Implementation:\n');
  
  console.log('// Update your components to use OptimizedImage:');
  console.log(`
import OptimizedImage from '@/components/OptimizedImage';

// In your gallery component:
<OptimizedImage
  src="/assets/optimized/gallery/image.webp"
  alt="Gallery image"
  width={400}
  height={300}
  className="rounded-lg"
/>

// For hero images (priority loading):
<OptimizedImage
  src="/assets/optimized/hero/hero-image.webp"
  alt="Hero image"
  width={1920}
  height={1080}
  priority={true}
  className="w-full h-full object-cover"
/>
`);
}

function main() {
  console.log('🚀 ARC Nexus Forge - Asset Optimization Tool\n');
  
  try {
    const assets = analyzeAssets();
    generateOptimizationCommands(assets);
    generateLazyLoadingImplementation();
    
    console.log('\n✅ Analysis complete!');
    console.log('\nNext steps:');
    console.log('1. Run the optimization commands above');
    console.log('2. Update your components to use OptimizedImage');
    console.log('3. Test the optimized assets');
    console.log('4. Deploy with confidence! 🎉');
    
  } catch (error) {
    console.error('❌ Error analyzing assets:', error.message);
  }
}

// Run the analysis
main();

export { analyzeAssets, generateOptimizationCommands };
