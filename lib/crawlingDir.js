import { join, resolve as pathResolve } from 'path'
import { readdir } from 'fs';
import isAccessAble from './isAccessAble.js'

export default function crawlingDir(depth, dir) {
    let result = [];

    let startCount = 0
    let endCount = 0
    let running = 0;

    return new Promise((resolve, reject) => {
        function recur(depth, dir) {
            if (depth < 0) return;
            
            onStart()

            isAccessAble(dir).then(() => {
                readdir(dir, {withFileTypes: true}, (err, dirents) => {
                    // console.log(dir);
                    if (err) {
                        onError()
                        return reject(err);
                    }
                    
                    dirents.forEach(d => {
                        if (d.isDirectory()) {
                            recur(depth-1, join(dir, d.name))
                        }
                        d.path = pathResolve(dir, d.name)

                        result.push(d)
                    })
        
                    onEnd()
        
                    if (startCount === endCount && running === 0) {
                        return resolve(result)
                    }
                });
            }).catch(err => {
                onError()
                console.error(err)
            })
        }

        function onStart() {
            running+=1;
            startCount += 1
        }

        function onEnd() {
            running -= 1
            endCount += 1
        }

        function onError() {
            onEnd()
        }

        recur(depth, dir);
    })
}