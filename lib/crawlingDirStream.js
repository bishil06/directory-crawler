import { join } from "path/posix"
import { PassThrough } from "stream"

import createDirStream from './createDirStream.js' 

export default function crawlingDirStream(depth=Infinity, concurrency, ...dirPaths) {
    const crawStream = new PassThrough({ objectMode: true })

    crawStream.setMaxListeners(concurrency+1)
    let maxListeners = crawStream.getMaxListeners() -1

    let running = 0
    let startCount = 0
    let endCount = 0
    let dirs = []

    async function addDirStream(dirPath, inner) {
        const dstream = await createDirStream(dirPath)
        if (dstream instanceof Error) {
            console.error(dirPath, dstream)
            onEnd()
        }

        if (inner > 0) {
            dstream.on('data', dirent => {
                if (dirent.isDirectory()) {
                    const innerPath = join(dirPath, dirent.name)
                    dirs.push([innerPath, inner-1])
                    runCrawling()
                }
            })
        }

        dstream.on('error', (err) => {
            crawStream.emit('error', err)
            dstream.emit('end')
        })

        dstream.on('end', () => onEnd())

        function onEnd () {
            endCount += 1;
            running -= 1;

            if (startCount === endCount && dirs.length === 0) {
                return onComplete()
            }

            runCrawling()
        }

        dstream.pipe(crawStream, { end: false })
    }

    function onComplete() {
        crawStream.end()
    }

    dirPaths.forEach(dirPath => {
        dirs.push([dirPath, depth])
    })

    function runCrawling() {
        while(running < maxListeners && dirs.length) {
            running += 1
            startCount += 1;
    
            const [nextPath, innerDepth] = dirs.shift()
            addDirStream(nextPath, innerDepth)
        }
    }

    runCrawling()

    return crawStream
}
