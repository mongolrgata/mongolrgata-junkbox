__author__ = 'mongolrgata'

import json
import os
import sys


def distance(a, b):
    """
    :param a:
    :type a: str
    :param b:
    :type b: str
    :return:
    :rtype: int
    """
    n, m = len(a), len(b)
    if n > m:
        # Make sure n <= m, to use O(min(n,m)) space
        a, b = b, a
        n, m = m, n

    current_row = range(n + 1)  # Keep current and previous row, not entire matrix
    for i in range(1, m + 1):
        previous_row, current_row = current_row, [i] + [0] * n
        for j in range(1, n + 1):
            add, delete, change = previous_row[j] + 1, current_row[j - 1] + 1, previous_row[j - 1]
            if a[j - 1] != b[i - 1]:
                change += 1
            current_row[j] = min(add, delete, change)

    return current_row[n]


def essence(obj):
    """
    :param obj:
    :return:
    :rtype: list[str]
    """
    result = [None] * len(obj)

    for key, item in obj.items():
        result[int(key, 16)] = item['data']['en']['line']

    return result


def diff(file_left, file_right):
    with \
            open(file_left, 'rt', encoding='utf-8') as json_file_left, \
            open(file_right, 'rt', encoding='utf-8') as json_file_right:
        json_object_left = json.loads(json_file_left.read())
        json_object_right = json.loads(json_file_right.read())

    essence_left = essence(json_object_left)
    essence_right = essence(json_object_right)

    n, m = len(essence_left), len(essence_right)

    pairs = []

    for i in range(n):
        print(i)

        for j in range(m):
            pairs.append(
                (distance(essence_left[i], essence_right[j]), i, j)
            )

    pairs.sort()

    best_pairs = []
    used_keys_left = set()
    used_keys_right = set()

    for _, key_left, key_right in pairs:
        if not (key_left in used_keys_left or key_right in used_keys_right):
            best_pairs.append(
                (key_left, key_right)
            )
            used_keys_left.add(key_left)
            used_keys_right.add(key_right)

    for key in set(range(0, n)) - used_keys_left:
        best_pairs.append(
            (key, None)
        )

    for key in set(range(0, m)) - used_keys_right:
        best_pairs.append(
            (None, key)
        )

    best_pairs.sort(key=lambda x: x[0] if x[0] is not None else float('inf'))

    result = []

    for key_left, key_right in best_pairs:
        result.append({
            'left': {
                'id': format(key_left, 'x').zfill(4) if key_left is not None else '',
                'line': essence_left[key_left] if key_left is not None else ''
            },
            'right': {
                'id': format(key_right, 'x').zfill(4) if key_right is not None else '',
                'line': essence_right[key_right] if key_right is not None else ''
            }
        })

    with open(os.path.basename(file_left) + '.diff', 'wt', encoding='utf-8') as file_diff:
        file_diff.write(json.dumps(result, ensure_ascii=False, indent=4, sort_keys=True))


def main():
    diff(sys.argv[1], sys.argv[2])


if __name__ == '__main__':
    main()
