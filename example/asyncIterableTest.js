import crawlingDir from '../index.js'

// 처음 파일시스템에 접근할때 좀더 시간이 오래걸리기 때문에 미리 한번 실행해준다
for await (const d of crawlingDir(0, 1, './', '../')) {}

let lasttime = process.hrtime.bigint()
for await (const d of crawlingDir(Infinity, 1, './', '../')) {
}
console.log(process.hrtime.bigint() - lasttime); // 5432459n -> 0.05432459s


lasttime = process.hrtime.bigint()
// let count = 0
for await (const d of crawlingDir(Infinity, 100, './', '../')) {
    // console.log(count +=1, d);
}
console.log(process.hrtime.bigint() - lasttime); // 4184458n -> 0.04184458s
