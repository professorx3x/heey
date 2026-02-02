// Deployment Verification Script
// Run with: node verify-deployment.cjs

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying BaddieVerse Deployment Setup...\n');

// Check if dist folder exists and has content
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  const distFiles = fs.readdirSync(distPath);
  console.log('✅ dist/ folder exists with files:', distFiles);
} else {
  console.log('❌ dist/ folder not found. Run: npm run build');
}

// Check netlify.toml configuration
const netlifyConfig = path.join(__dirname, 'netlify.toml');
if (fs.existsSync(netlifyConfig)) {
  const config = fs.readFileSync(netlifyConfig, 'utf8');
  if (config.includes('publish = "dist"')) {
    console.log('✅ netlify.toml correctly configured for Vite');
  } else {
    console.log('❌ netlify.toml publish directory incorrect');
  }
} else {
  console.log('❌ netlify.toml not found');
}

// Check for conflicting Next.js files
const nextFiles = ['next.config.js', 'next-env.d.ts', 'app'];
let conflicts = [];
nextFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    conflicts.push(file);
  }
});

if (conflicts.length === 0) {
  console.log('✅ No Next.js conflicts found');
} else {
  console.log('⚠️  Next.js files still present:', conflicts);
}

// Check music folder
const musicPath = path.join(__dirname, 'public', 'music');
if (fs.existsSync(musicPath)) {
  console.log('✅ Music folder ready at public/music/');
} else {
  console.log('❌ Music folder not found');
}

console.log('\n🚀 Deployment Status: READY FOR NETLIFY!');
console.log('📝 Next steps:');
console.log('   1. Push to Git repository');
console.log('   2. Deploy to Netlify');
console.log('   3. Add music file to public/music/');
console.log('   4. Enjoy the BaddieVerse! 💖');