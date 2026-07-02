const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'lib', 'data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// Reset metrics
content = content.replace(/points: \d+/g, 'points: 0');
content = content.replace(/weekPoints: \d+/g, 'weekPoints: 0');
content = content.replace(/business: "[^"]+"/g, 'business: "--"');
content = content.replace(/referrals: \d+/g, 'referrals: 0');
content = content.replace(/meetings: \d+/g, 'meetings: 0');
content = content.replace(/visitors: \d+/g, 'visitors: 0');
content = content.replace(/induction: \d+/g, 'induction: 0');
content = content.replace(/winRate: "[^"]+"/g, 'winRate: "0%"');
content = content.replace(/tyfcb: \d+/g, 'tyfcb: 0');
content = content.replace(/oneToOnes: \d+/g, 'oneToOnes: 0');
content = content.replace(/attendance: \d+/g, 'attendance: 0');

// Fix dates
content = content.replace(/June 24/g, 'July 1st');
content = content.replace(/July 22/g, 'July 29th');

fs.writeFileSync(dataPath, content, 'utf8');
console.log('Data reset complete.');
