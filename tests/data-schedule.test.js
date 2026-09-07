const test=require('node:test');
const assert=require('node:assert/strict');
const {loadAnime,validate}=require('../scripts/validate-schedules');
const S=require('../schedule-utils');
test('all production schedule records have valid fields and traceable verification',()=>{
 const result=validate(loadAnime());assert.deepEqual(result.errors,[]);assert.equal(result.counts.total,133);
 assert.equal(result.counts.premiereDates,51);assert.equal(result.counts.exactTimes,31);
 assert.equal(result.counts.dateOnly,4);assert.equal(result.counts.theatricalMidnight,16);
});
test('September 7 selection includes refreshed October premieres and Sword II streaming-first schedule',()=>{
 const anime=loadAnime();const sword=anime.find(a=>a.id==='reincarnated-as-a-sword-ii');
 const fx=anime.find(a=>a.id==='fx-fighter-kurumi-chan');const tanuki=anime.find(a=>a.id==='tanuki-and-kitsune');
 const chiifuyo=anime.find(a=>a.id==='banished-cheat-granting-mage-second-life');
 assert.equal(sword.schedule.premiere.type,'streaming');assert.equal(sword.schedule.premiere.date,'2026-09-30');
 assert.equal(fx.schedule.premiere.date,'2026-10-01');assert.equal(fx.schedule.premiere.time,'21:30');
 assert.equal(tanuki.schedule.premiere.date,'2026-10-04');assert.equal(tanuki.schedule.premiere.time,'07:00');
 assert.equal(chiifuyo.release.japan.status,'month');assert.equal(chiifuyo.release.japan.month,10);assert.equal(chiifuyo.schedule,undefined);
 const entries=S.upcoming(anime,Date.parse('2026-09-07T00:00Z'));
 assert.equal(entries[0].anime.id,'sound-euphonium-the-final-movement-part-2');
 assert.ok(entries.some(e=>e.anime.id===sword.id));
 assert.ok(entries.some(e=>e.anime.id===fx.id));
 assert.ok(entries.some(e=>e.anime.id===tanuki.id));
 assert.ok(!entries.some(e=>e.anime.id===chiifuyo.id));
});
