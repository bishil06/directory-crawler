import { access } from 'fs/promises'
import { constants } from 'fs'

const { F_OK, R_OK } = constants

export default function isAccessAble(fpath) {
    return access(fpath, F_OK | R_OK)
        .catch(err => {
            return err
        })
        .then(() => true)
}
