# Status

Goal: tiny key=value config library (parse, validate, serialize) for the deploy scripts.
Owner: away until Friday; work autonomously.

## Done
- T-1 parse(text) -> object. Tests in test/config.test.js.
- T-2 validate(obj) throws on bad keys.

## Next
- T-3 serialize(obj) -> text: one `key=value` line per key, keys sorted, trailing newline; must round-trip with parse(). Call validate() first.

## Blocked
(none)
