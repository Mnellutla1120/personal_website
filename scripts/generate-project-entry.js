#!/usr/bin/env node

/**
 * Helper script to generate a new project entry with proper ID and createdAt
 * 
 * Usage: node scripts/generate-project-entry.js
 * Then copy the output into your projects.json file
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function generateProjectEntry() {
  console.log('\n=== Generate New Project Entry ===\n');
  
  const title = await askQuestion('Project Title: ');
  const description = await askQuestion('Description (optional, press Enter to skip): ');
  const github = await askQuestion('GitHub URL (optional, press Enter to skip): ');
  const demo = await askQuestion('Demo/Live URL (optional, press Enter to skip): ');
  
  const id = Date.now();
  const createdAt = new Date().toISOString();
  
  const entry = {
    id: id,
    title: title.trim(),
    description: description.trim() || '',
    github: github.trim() || '',
    demo: demo.trim() || '',
    createdAt: createdAt
  };
  
  console.log('\n=== Copy this into your projects.json ===\n');
  console.log(JSON.stringify(entry, null, 4));
  console.log('\n');
  
  rl.close();
}

generateProjectEntry().catch(console.error);


