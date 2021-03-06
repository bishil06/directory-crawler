import { access } from 'fs/promises';
import { constants } from 'fs';

const { F_OK, R_OK, X_OK } = constants;

export default function isAccessAble(fpath) {
  // eslint-disable-next-line no-bitwise
  return access(fpath, F_OK | R_OK | X_OK)
    .catch((err) => {
      return err;
    })
    .then(() => true);
}
