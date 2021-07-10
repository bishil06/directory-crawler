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

const lasttime = process.hrtime.bigint();

for await (const d of crawlingDirStream(Infinity, Infinity, '../')) {
  //   console.log(d);
}

console.log(process.hrtime.bigint() - lasttime);
```

## crawlingDir(depth, concurrency, dir): Promise(Array(Dirent))
* depth - Number (0 ~ Infinity)
* concurrency - Number
* dirPaths - String Array
* return Promise(Array(Dirent))
    * name - String
    * path - String - absolute parent directory path
    * [Symbol(type)] - Symbol - file type

## usage
```js
import { crawlingDir } from 'directory-crawler'

const lasttime = process.hrtime.bigint();

crawlingDir(Infinity, Infinity, '../').then((files) => {
  console.log(files.length);
  console.log(process.hrtime.bigint() - lasttime);
});
```
MIT License Copyright (c) 2021 HyunJae Lee