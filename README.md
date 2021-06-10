# directory-crawler
The directory crawler library by Node.JS

## crawlingDir(depth, concurrency, ...dirPaths) : stream(dirent)
* depth - Number (0 ~ Infinity)
* concurrency - Number
* dirPaths - String Array
* return stream (Dirent)
    * name - String
    * path - String - absolute parent directory path
    * [Symbol(type)] - Symbol - file type

## install
```
npm install directory-crawler
```

## usage
```js
import crawlingDir from 'directory-crawler'

// 처음 파일시스템에 접근할때 좀더 시간이 오래걸리기 때문에 미리 한번 실행해준다
for await (const d of crawlingDir(Infinity, 1, './')) {}

let lasttime = process.hrtime.bigint()
// let count = 0
for await (const d of crawlingDir(Infinity, 1, './')) {
    // console.log(count +=1, d);
}
console.log(process.hrtime.bigint() - lasttime); // 10389167n


lasttime = process.hrtime.bigint()
// let count = 0
for await (const d of crawlingDir(Infinity, 100, './')) {
    // console.log(count +=1, d);
}
console.log(process.hrtime.bigint() - lasttime); // 8196625n
```

MIT License Copyright (c) 2021 HyunJae Lee