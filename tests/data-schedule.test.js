const test=require('node:test');
const assert=require('node:assert/strict');
const {loadAnime,validate}=require('../scripts/validate-schedules');
const S=require('../schedule-utils');
test('all production schedule records have valid fields and traceable verification',()=>{
 const result=validate(loadAnime());assert.deepEqual(result.errors,[]);assert.equal(result.counts.total,132);
 assert.equal(result.counts.premiereDates,49);assert.equal(result.counts.exactTimes,28);
 assert.equal(result.counts.dateOnly,5);assert.equal(result.counts.theatricalMidnight,16);
});
test('September 7 selection uses canonical data and Sword II streaming-first schedule',()=>{
 const anime=loadAnime();const sword=anime.find(a=>a.id==='reincarnated-as-a-sword-ii');
 assert.equal(sword.schedule.premiere.type,'streaming');assert.equal(sword.schedule.premiere.date,'2026-09-30');
 const entries=S.upcoming(anime,Date.parse('2026-09-07T00:00Z'));
 assert.equal(entries[0].anime.id,'sound-euphonium-the-final-movement-part-2');
 assert.ok(entries.some(e=>e.anime.id===sword.id));
 assert.ok(!entries.some(e=>e.anime.id==='fx-fighter-kurumi-chan'));
});
