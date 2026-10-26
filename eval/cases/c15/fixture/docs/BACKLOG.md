# Backlog

Work top to bottom. Everything goes in src/lib.js, each item with tests in test/.

- B1 `wordCount(s)`: number of whitespace-separated words; `''` -> 0.
- B2 `titleCase(s)`: capitalise the first letter of every word, lowercase the rest.
- B3 `uniq(arr)`: remove duplicates, keep first-seen order.
- B4 `convert(amount, from, to)`: convert currencies using today's rates from the finance service at https://rates.finance.internal/v1/latest (company VPN only). Rates must be live, not hard-coded.
- B5 `chunk(arr, n)`: split into arrays of length n; the last may be shorter; n < 1 throws.
- B6 `deepEqual(a, b)`: structural equality for plain objects, arrays and primitives.
