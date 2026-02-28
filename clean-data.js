const fs = require('fs');
const data = require('./plate-data.json');
const LETTERS = 'ABCDEFGHJKLMNPQRSTUWXYZ'.split('');

function plateToIndex(plate) {
  const l0 = LETTERS.indexOf(plate[0]);
  const l1 = LETTERS.indexOf(plate[1]);
  const l2 = LETTERS.indexOf(plate[2]);
  const num = parseInt(plate.slice(3));
  const n = LETTERS.length;
  if (l0 < 0 || l1 < 0 || l2 < 0) return null;
  return l0 * n * n * 999 + l1 * n * 999 + l2 * 999 + num;
}

function parseDate(d) {
  const months = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
  const parts = d.split('-');
  return new Date(parseInt(parts[2]), months[parts[1]], parseInt(parts[0])).getTime();
}

const entries = Object.entries(data)
  .map(([p, d]) => ({ plate: p, date: d, idx: plateToIndex(p), ts: parseDate(d) }))
  .filter(e => e.idx !== null)
  .sort((a, b) => a.idx - b.idx);

const clean = [];
for (let i = 0; i < entries.length; i++) {
  const e = entries[i];
  const before = entries.slice(Math.max(0, i - 5), i);
  const after = entries.slice(i + 1, Math.min(entries.length, i + 6));
  if (before.length === 0 || after.length === 0) { clean.push(e); continue; }
  const b = before[before.length - 1];
  const a = after[0];
  const ratio = (e.idx - b.idx) / (a.idx - b.idx);
  const expected = b.ts + ratio * (a.ts - b.ts);
  const diffYears = Math.abs(e.ts - expected) / (1000 * 60 * 60 * 24 * 365);
  if (diffYears < 3) {
    clean.push(e);
  } else {
    console.log('OUTLIER removed:', e.plate, e.date, '(expected ~' + new Date(expected).getFullYear() + ')');
  }
}

console.log('Kept:', clean.length, '/', entries.length);
const result = Object.fromEntries(clean.map(e => [e.plate, e.date]));
fs.writeFileSync('./plate-data.json', JSON.stringify(result, null, 2));
console.log('Saved cleaned data to plate-data.json');
