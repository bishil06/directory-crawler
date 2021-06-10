import { opendir } from "fs/promises"
import { resolve } from "path/posix"
import { Readable } from "stream"

import isAccessAble from './isAccessAble.js'

async function *addPathInDirent(dirPath, dir) {
    try {
        for await (const dirent of dir) {
            dirent.path = resolve(dirPath, dirent.name)
            yield dirent
        }
    }
    catch (err) {
        throw err
    }
}

export default function createDirStream(dirPath) {
    return isAccessAble(dirPath).then(accessAble => {
        if (accessAble) {
            return opendir(dirPath).then(dir => Readable.from(addPathInDirent(dirPath, dir)))
        }
        return accessAble
    })
}