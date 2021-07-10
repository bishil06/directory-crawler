import { join } from 'path/posix';
import { readdir } from 'fs/promises';

import PQueue from 'p-queue';

import isAccessAble from './isAccessAble.js';

export default function crawlingDir(depth, concurrency, dir) {
  let result = [];

  const q = new PQueue({ concurrency });

  return new Promise((resolve) => {
    function recur(innerDepth, dir) {
      if (innerDepth < 0) return;

      return isAccessAble(dir)
        .then(() => readdir(dir, { withFileTypes: true }))
        .then((dirents) => {
          for (const dirent of dirents) {
            const innerPath = join(dir, dirent.name);
            dirent.path = innerPath;
            if (dirent.isDirectory()) {
              q.add(() => recur(innerDepth - 1, innerPath));
            }
            result.push(dirent);
          }
        })
        .catch((err) => console.error(err));
    }

    q.add(() => recur(depth, dir));

    q.onIdle().then(() => resolve(result));
  });
}
