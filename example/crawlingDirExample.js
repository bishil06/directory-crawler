import { crawlingDir } from '../index.js'

let lasttime = process.hrtime.bigint()
crawlingDir(Infinity, '../').then((files) => {
    console.log(files);
    console.log(process.hrtime.bigint() - lasttime);
})
