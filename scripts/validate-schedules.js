// Validate the effective production dataset, including additive data files.
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const S=require('../schedule-utils');
function loadAnime() {
  const context={window:{}};
  vm.createContext(context);
  const root=path.join(__dirname,'..');
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8').split('<script src="schedule-utils.js')[0];
  for(const match of html.matchAll(/<script src="(data\/[^"?]+\.js)(?:\?[^" ]*)?"/g))
    vm.runInContext(fs.readFileSync(path.join(root,match[1]),'utf8'),context,{filename:match[1]});
  return context.window.animeData;
}
function validate(anime) {
  const errors=[], counts={total:anime.length,premiereDates:0,exactTimes:0,dateOnly:0,theatricalMidnight:0,broadcastOnly:0};
  for(const a of anime) {
    const s=a.schedule;if(!s)continue;
    const fail=reason=>errors.push(`${a.id}: ${reason}`);
    if(!S.dateParts(s.verifiedAt))fail('invalid schedule verification date');
    if(!/^https:\/\//.test(s.source||''))fail('missing HTTPS official source');
    const source=a.verification?.sources?.find(source=>source.url===s.source);
    if(!source || !source.supports?.some(field=>field==='release'||field.startsWith('release-')))fail('schedule source absent from existing release verification sources');
    if(source && source.verifiedAt!==s.verifiedAt)fail('source-level verification date must match schedule');
    for(const event of ['premiere','broadcast']) if(s[event] && !S.normalizePremiere(s[event]))fail(`invalid ${event}`);
    if(s.premiere) {
      counts.premiereDates++;
      if(s.premiere.type==='theatrical')counts.theatricalMidnight++;
      else if(s.premiere.time===null)counts.dateOnly++;
      else counts.exactTimes++;
      if(s.broadcast && S.normalizePremiere(s.premiere)?.sortTime>S.normalizePremiere(s.broadcast)?.sortTime)fail('premiere occurs after broadcast');
    }else if(s.broadcast)counts.broadcastOnly++;
    else fail('empty schedule');
  }
  return {valid:!errors.length,counts,errors};
}
if(require.main===module){const result=validate(loadAnime());console.log(JSON.stringify(result,null,2));process.exitCode=result.valid?0:1;}
module.exports={loadAnime,validate};
