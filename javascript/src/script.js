/**
 * @param {number} limit
 * @returns {number[]}
 */
var getPrimes = function (limit) {
    var sieve = new Array(limit + 1).fill(0);
    var result = [];

    for (let i = 2; i < sieve.length; ++i) {
        if (!sieve[i]) {
            result.push(i);
            for (let j = i * i; j < sieve.length; j += i) {
                sieve[j] = 1;
            }
        }
    }

    return result;
};
