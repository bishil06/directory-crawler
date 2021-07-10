import { join } from 'path/posix';
import { PassThrough } from 'stream';

import PQueue from 'p-queue';

import createDirStream from './createDirStream.js';

export default function crawlingDirStream(
  depth = Infinity,
  concurrency,
  ...dirPaths
) {
  const q = new PQueue({ concurrency });
  const dest = new PassThrough({ objectMode: true });

  dest.setMaxListeners(concurrency + 1);

  async function pipingDirStream(dirPath, innerDepth) {
    const dirStream = await createDirStream(dirPath);

    return new Promise((resolve, reject) => {
      if (dirStream instanceof Error) {
        reject(dirStream);
      }

      if (innerDepth > 0) {
        dirStream.on('data', (d) => {
          if (d.isDirectory()) {
            const innerDirPath = join(dirPath, d.name);
            q.add(() => pipingDirStream(innerDirPath, innerDepth - 1));
          }
        });
      }

      dirStream.pipe(dest, { end: false });
      dirStream.on('end', () => resolve());
      dirStream.on('error', (err) => reject(err));
    });
  }

  dirPaths.forEach((d) => {
    q.add(() => pipingDirStream(d, depth));
  });

  q.onIdle().then(() => dest.end());

  return dest;
}
