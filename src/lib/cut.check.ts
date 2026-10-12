// Run: node --experimental-strip-types src/lib/cut.check.ts
import assert from 'node:assert/strict';
import { countWords, isoWeekLabel, splitAtCut } from './cut.ts';

assert.equal(countWords('# Title\n\nOne [two](https://x.y/z) three-four 5,000 TEU.'), 6);
assert.equal(countWords('a <!-- hidden words here --> b'), 2);
assert.equal(countWords('One two.\n\n![A ship at night](./x.jpg)\n\nThree.'), 3);

const paid = splitAtCut('one two three\n\n<!-- cut -->\n\nfour five six seven');
assert.deepEqual(
  [paid.members, paid.freeWords, paid.membersWords, paid.freeShare],
  [true, 3, 4, 43],
);
assert.ok(!paid.free.includes('four'), 'members text must not survive in the free part');

const free = splitAtCut('just a free issue');
assert.deepEqual([free.members, free.freeShare, free.membersWords], [false, 100, 0]);

assert.equal(isoWeekLabel(new Date('2026-10-06')), '2026.41');
assert.equal(isoWeekLabel(new Date('2027-01-01')), '2026.53'); // Friday: still 2026's last week
assert.equal(isoWeekLabel(new Date('2024-12-30')), '2025.01'); // Monday: already 2025

const mdx = splitAtCut('free\n\n{/* cut */}\n\npaid');
assert.deepEqual([mdx.members, mdx.totalWords], [true, 2], 'MDX marker, not counted as a word');
assert.equal(countWords('<p>Two <a href="https://x.y/a-b-c">words</a></p>'), 2, 'HTML tags');
const quoted = splitAtCut('Put `<!-- cut -->` on its own line.\n\n<!-- cut -->\n\npaid words');
assert.equal(quoted.freeWords, 5, 'a marker in inline code is not the cut');
console.log('cut.ts ok');
