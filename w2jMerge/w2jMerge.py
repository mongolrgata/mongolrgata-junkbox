__author__ = 'mongolrgata'

import binascii
import json
import re
import sys
import os


def merge(a, b, path=None):
    if path is None: path = []
    for key in b:
        if key in a:
            if isinstance(a[key], dict) and isinstance(b[key], dict):
                merge(a[key], b[key], path + [str(key)])
            elif a[key] == b[key]:
                pass  # same leaf value
            else:
                raise Exception('Conflict at %s' % '.'.join(path + [str(key)]))
        else:
            a[key] = b[key]
    return a


def main():
    dir1 = sys.argv[1]
    dir2 = sys.argv[2]

    file_names = [os.path.basename(f) for f in [os.path.join(dir2, f) for f in os.listdir(dir2)] if os.path.isfile(f)]

    for fn in file_names:
        fn1 = os.path.join(dir1, fn)
        fn2 = os.path.join(dir2, fn)

        with \
                open(fn1, 'rt', encoding='utf-8') as f1, \
                open(fn2, 'rt', encoding='utf-8') as f2:
            cont1 = f1.read()
            obj1 = json.loads(cont1)

            cont2 = f2.read()
            obj2 = json.loads(cont2)

        obj_res = merge(obj1, obj2)

        with open(fn1, 'wt', encoding='utf-8') as f_res:
            f_res.write(json.dumps(obj_res, ensure_ascii=False, indent=4, sort_keys=True))


if __name__ == '__main__':
    main()
