const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const S = require('../schedule-utils');
const p = (date, time, type = 'tv') => ({type, date, time, timezone:'Asia/Tokyo', displayTime:type === 'theatrical' ? null : time});
const item = (id, premiere, broadcast) => ({id, schedule:{premiere, ...(broadcast && {broadcast})}});
for (const [time, expected] of [
  ['23:30','2026-10-03T14:30:00.000Z'], ['00:00','2026-10-02T15:00:00.000Z'],
  ['24:00','2026-10-03T15:00:00.000Z'], ['25:30','2026-10-03T16:30:00.000Z'], ['26:00','2026-10-03T17:00:00.000Z']
]) test(`normalize ${time} JST`, () => {
  const source = p('2026-10-03', time);
  assert.equal(new Date(S.normalizePremiere(source).timestamp).toISOString(), expected);
  assert.equal(source.displayTime, time);
  assert.equal(source.date, '2026-10-03');
});
test('late night rolls across year and leap-day boundaries', () => {
  assert.equal(new Date(S.normalizePremiere(p('2026-12-31','25:30')).timestamp).toISOString(), '2026-12-31T16:30:00.000Z');
  const leap = S.normalizePremiere(p('2028-02-29','25:30'));
  assert.equal(S.civilDay(leap.timestamp,'Asia/Tokyo'),Date.UTC(2028,2,1));
});
test('date-only never fabricates an instant, remains today until source midnight', () => {
  const premiere = p('2026-10-03',null), timing=S.normalizePremiere(premiere);
  assert.equal(timing.timestamp,null); assert.equal(timing.exactTime,false);
  assert.deepEqual(S.countdown(timing,Date.parse('2026-10-02T16:00Z')),{kind:'today',days:0});
  assert.equal(S.upcoming([item('a',premiere)],Date.parse('2026-10-03T14:59:59Z')).length,1);
  assert.equal(S.upcoming([item('a',premiere)],Date.parse('2026-10-03T15:00Z')).length,0);
});
test('theatrical midnight is a calculation boundary with day-level presentation', () => {
  const timing=S.normalizePremiere(p('2026-10-03','00:00','theatrical'));
  assert.equal(timing.timestamp,Date.parse('2026-10-02T15:00Z'));
  assert.equal(timing.exactTime,false);
  assert.equal(S.countdown(timing,timing.timestamp-1000).kind,'days');
  assert.equal(S.normalizePremiere({...p('2026-10-03','00:00','theatrical'),displayTime:'00:00'}),null);
});
test('streaming-first selection ignores later TV broadcast', () => {
  const anime=item('sword',p('2026-09-30','24:30','streaming'),p('2026-10-07','24:00'));
  assert.equal(S.upcoming([anime],Date.parse('2026-09-30T15:00Z'))[0].timing.timestamp,Date.parse('2026-09-30T15:30Z'));
  assert.equal(S.upcoming([anime],Date.parse('2026-09-30T15:30Z')).length,0);
});
test('30-day exact boundary is inclusive; a later minute is excluded', () => {
  const now=Date.parse('2026-09-03T14:30Z');
  assert.deepEqual(S.upcoming([item('outside',p('2026-10-03','23:31')),item('edge',p('2026-10-03','23:30'))],now).map(e=>e.anime.id),['edge']);
  assert.equal(S.upcoming([item('edge',p('2026-10-03','23:30'))],now,29).length,0);
});
test('date-only window uses 30 source-calendar dates', () => {
  const now=Date.parse('2026-09-02T20:00Z');
  assert.deepEqual(S.upcoming([item('out',p('2026-10-04',null)),item('edge',p('2026-10-03',null))],now).map(e=>e.anime.id),['edge']);
});
test('actual normalized instants determine order; premiere time expiry is exclusive', () => {
  const data=[item('late',p('2026-10-03','25:30')),item('early',p('2026-10-04','00:30'))];
  assert.deepEqual(S.upcoming(data,Date.parse('2026-10-03T15:00Z')).map(e=>e.anime.id),['early','late']);
  assert.deepEqual(S.upcoming(data,Date.parse('2026-10-03T15:30Z')).map(e=>e.anime.id),['late']);
  assert.equal(S.countdown(S.normalizePremiere(data[1].schedule.premiere),Date.parse('2026-10-03T15:30Z')).kind,'passed');
});
test('countdown switches days, hours, seconds without negative values', () => {
  const t=S.normalizePremiere(p('2026-10-03','23:30'));
  assert.deepEqual(S.countdown(t,t.timestamp-3*S.DAY),{kind:'days',days:3});
  assert.equal(S.countdown(t,t.timestamp-18*3600000).kind,'hours');
  assert.deepEqual(S.countdown(t,t.timestamp-123000),{kind:'clock',today:true,hours:0,minutes:2,seconds:3});
  assert.equal(S.countdown(t,t.timestamp).kind,'passed');
});
test('reject invalid, incomplete and ambiguous schedules', () => {
  for(const value of [null,p('2026-10',null),p('2026-02-29','23:30'),p('2026-10-03',undefined),p('2026-10-03','24:60'),p('2026-10-03','50:00'),{...p('2026-10-03','23:30'),timezone:'Invalid/Zone'}, {...p('2026-10-03',null),displayTime:'23:30'},p('2026-10-03','12:00','other')]) assert.equal(S.normalizePremiere(value),null);
  for(const date of ['2026-03-08','2026-11-01']) assert.equal(S.normalizePremiere({...p(date,date.includes('03-')?'02:30':'01:30'),timezone:'America/New_York'}),null);
  assert.deepEqual(S.upcoming([{id:'year',year:2026},{id:'month',release:{month:10}},item('broadcast-only',null,p('2026-10-03','23:30'))]),[]);
});
test('countdown is identical in viewers across multiple timezones', () => {
  const script=`const S=require('./schedule-utils'); console.log(S.normalizePremiere(${JSON.stringify(p('2026-10-03','25:30'))}).timestamp)`;
  const values=['Asia/Seoul','Asia/Tokyo','America/Los_Angeles','Europe/London','UTC'].map(TZ=>execFileSync(process.execPath,['-e',script],{cwd:require('node:path').join(__dirname,'..'),env:{...process.env,TZ},encoding:'utf8'}).trim());
  assert.equal(new Set(values).size,1);
});
for (const total of [0,1,2,3,22]) test(`unique cover-flow slots and looping with ${total} items`,()=>{
  for(let index=-total*3-2;index<total*3+2;index++) {
    const slots=S.slots(index,total);
    assert.equal(slots.length,Math.min(total,3));
    assert.equal(new Set(slots.map(s=>s.index)).size,slots.length);
    if(total) assert.equal(slots.find(s=>s.position==='center').index,S.wrapIndex(index,total));
  }
  if(total) {assert.equal(S.wrapIndex(total,total),0);assert.equal(S.wrapIndex(-1,total),total-1);}
});
test('source date label preserves the official calendar day',()=>{
  for(const lang of ['ko','ja','en']) {
    const label=S.dateLabel(p('2026-10-03','25:30'),lang);
    assert.ok(label.includes('2026')); assert.ok(label.includes('3'));
  }
});
test('localized presentation keeps Japanese source notation only in Japanese',()=>{
  const source={...p('2026-10-02','25:23'),displayTime:'深夜1時23分'};
  const timing=S.normalizePremiere(source);
  assert.deepEqual(S.presentation(timing,'ja'),{date:'2026年10月2日',time:'深夜1時23分',timezone:'日本標準時'});
  assert.deepEqual(S.presentation(timing,'ko'),{date:'2026년 10월 3일',time:'01:23',timezone:'일본 표준시'});
  assert.deepEqual(S.presentation(timing,'en'),{date:'Oct 3, 2026',time:'01:23',timezone:'JST'});
});
test('Korean and English presentation normalize 24+ clocks to the following civil day',()=>{
  for(const [date,time,koDate,clock] of [
    ['2026-09-30','24:00','2026년 10월 1일','00:00'],
    ['2026-10-03','24:55','2026년 10월 4일','00:55'],
    ['2026-10-17','26:00','2026년 10월 18일','02:00']
  ]) {
    const timing=S.normalizePremiere(p(date,time));
    assert.deepEqual(S.presentation(timing,'ko'),{date:koDate,time:clock,timezone:'일본 표준시'});
    assert.equal(S.presentation(timing,'en').time,clock);
  }
});
