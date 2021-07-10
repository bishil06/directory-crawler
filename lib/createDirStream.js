import { opendir } from 'fs/promises';
import { resolve } from 'path/posix';
import { Readable } from 'stream';

import isAccessAble from './isAccessAble.js';

async function* addPathInDirent(dirPath, dir) {
  // eslint-disable-next-line no-restricted-syntax
  for await (const dirent of dir) {
    dirent.path = resolve(dirPath, dirent.name);
    yield dirent;
  }
}

export default function createDirStream(dirPath) {
  return isAccessAble(dirPath)
    .then((accessAble) => {
      if (accessAble === true) {
        return opendir(dirPath).then((dir) =>
          Readable.from(addPathInDirent(dirPath, dir))
        );
      }
      return accessAble;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}
