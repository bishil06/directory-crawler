import { crawlingDir } from '../index.js';

const lasttime = process.hrtime.bigint();

crawlingDir(Infinity, Infinity, '../').then((files) => {
  console.log(files.length);
  console.log(process.hrtime.bigint() - lasttime);
});
