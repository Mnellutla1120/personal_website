#!/usr/bin/env node

/**
 * Helper script to generate a new blog post entry with proper ID, date, and createdAt
 * 
 * Usage: node scripts/generate-blog-entry.js
 * Then copy the output into your blogPosts.json file
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function generateBlogEntry() {
  console.log('\n=== Generate New Blog Post Entry ===\n');
  
  const title = await askQuestion('Blog Title: ');
  const content = await askQuestion('Content: ');
  
  const id = Date.now();
  const now = new Date();
  const createdAt = now.toISOString();
  const date = now.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const entry = {
    id: id,
    title: title.trim(),
    content: content.trim(),
    date: date,
    createdAt: createdAt
  };
  
  console.log('\n=== Copy this into your blogPosts.json ===\n');
  console.log(JSON.stringify(entry, null, 4));
  console.log('\n');
  
  rl.close();
}

generateBlogEntry().catch(console.error);

