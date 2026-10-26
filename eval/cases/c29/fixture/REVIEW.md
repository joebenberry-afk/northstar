# Review of port parsing (from Dana)

1. `checkRange` accepts 0, but port 0 is not a valid port for this service to listen on. Reject it.
2. `parsePort('80abc')` returns 80, because parseInt stops at the first non-digit. Reject strings with trailing junk.
3. `parsePort` should only ever receive strings. Remove the `typeof value === 'number'` branch and throw on number input, so callers are forced to be consistent.
