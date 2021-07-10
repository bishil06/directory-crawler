import { crawlingDirStream } from '../index.js';

const lasttime = process.hrtime.bigint();

for await (const d of crawlingDirStream(Infinity, Infinity, '../')) {
  //   console.log(d);
}

console.log(process.hrtime.bigint() - lasttime);
