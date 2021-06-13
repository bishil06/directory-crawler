# directory-crawler
The directory crawler library by Node.JS

## Notice
Currently, this library is under development and changes to the API may occur at any time. 

## install
```
npm install directory-crawler
```

## function crawlingDirStream(depth=Infinity, concurrency, ...dirPaths) : stream(dirent)
* depth - Number (0 ~ Infinity)
* concurrency - Number
* dirPaths - String Array
* return stream (Dirent)
    * name - String
    * path - String - absolute parent directory path
    * [Symbol(type)] - Symbol - file type


## usage
```js
import { crawlingDirStream } from 'directory-crawler'

// 처음 파일시스템에 접근할때 좀더 시간이 오래걸리기 때문에 미리 한번 실행해준다
for await (const d of crawlingDirStream(0, 1, './', '../')) {}

let lasttime = process.hrtime.bigint()
for await (const d of crawlingDirStream(Infinity, 1, './', '../')) {
}
console.log(process.hrtime.bigint() - lasttime); // 2879583000n


lasttime = process.hrtime.bigint()
// let count = 0
for await (const d of crawlingDirStream(Infinity, 10, './', '../')) {
    // console.log(count +=1, d);
}
console.log(process.hrtime.bigint() - lasttime); // 1222789700n
```

## crawlingDir(depth, dir): Promise(Array(Dirent))
* depth - Number (0 ~ Infinity)
* dirPaths - String Array
* return Promise(Array(Dirent))
    * name - String
    * path - String - absolute parent directory path
    * [Symbol(type)] - Symbol - file type

## usage
```js
import { crawlingDir } from 'directory-crawler'

let lasttime = process.hrtime.bigint()
crawlingDir(Infinity, '../').then((files) => {
    console.log(files);
    console.log(process.hrtime.bigint() - lasttime); // 463462000n
})
```
MIT License Copyright (c) 2021 HyunJae Lee