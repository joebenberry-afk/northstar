# Debug module (root cause first)

Load on a bug report, a failing or flaky test, or unexpected behavior. Quick tier: steps 1 and 4–6 (reproduce, regression test, fix, green), but still fix the cause, not the symptom.

## Loop

1. **Reproduce.** Read the whole error and stack trace. Run the failing thing yourself. "Can't reproduce here" usually means a different environment: list what differs (time zone, locale, OS, clock, env vars, data, test order, concurrency, dependency version) and set it until it fails. If it still won't reproduce, record why and what you tried.
2. **Narrow down** with discriminating checks, each one able to rule a suspect in or out:
   - What changed? `git log`/`git diff` since the last good state; `git bisect` when a known-good commit exists.
   - Trace the bad value backward to where it is first wrong, not where it surfaces.
   - Isolate: run the test alone vs with the suite, one input vs many, with vs without the suspect component.
   - Compare with a similar path that works.
3. **Root cause.** One sentence: what is wrong, where, and the evidence that shows it. A hypothesis is not a root cause until a check confirms it. Never claim a cause that known evidence contradicts.
4. **Failing test first.** Write a regression test that fails for the root cause (see `build.md`). Run it red.
5. **Fix at the source,** in the shared code path every caller goes through, not at the one call site in the report. Then check the other callers of what you changed.
6. **Green:** the regression test, then the wider suite. Hand off to `verify.md`.

## Situations

| Situation | Do |
|---|---|
| Owner names a suspect ("it's the rounding in X") | Their theory is a hypothesis, not an instruction. Test it first. If the evidence points elsewhere, fix the real cause, leave their suspect alone if it's correct, and say why. Their goal is the symptom gone, so this is within the request: don't stop to ask first, even when they said "fix X" |
| Test passes alone, fails in the suite | Shared or leaked state: globals, module-level objects mutated in place, caches, test order. Fix the leak, not the test order |
| Flaky / timing-dependent | Find the race (unawaited promise, shared resource, real clock or randomness). Fix the ordering or waiting in the code. Longer sleeps, retries and re-runs only hide it |
| Cause is in a dependency, vendored or generated code you must not edit | Don't edit it. Work around it in your own code at the boundary, label it a **workaround** with its limits, and note the upstream bug (link or issue text) for the owner |
| No confirmed root cause but a fix is needed now | Ship it labeled a **workaround**: what it masks, when it breaks, how to find the real cause |
| Two attempts in a row with no new evidence | Stop guessing. Change strategy (instrument, bisect, smaller repro), log the failed attempts in `DECISIONS.md`. Still stuck → stuck ladder in `autonomous-progress.md` |
| Third fix attempt on the same symptom | Question the design, not just the line. Each fix revealing a new problem elsewhere means the structure is wrong; say so before patching again |

## Report

Root cause (or "workaround: cause unconfirmed"), the evidence for it, the fix and where it lives, the regression test, and the commands you ran with their results.

## Never

- Fix before reproducing, or before you can say what the cause is.
- Change several things at once, then keep whichever combination goes green.
- Weaken, skip or delete the failing test, or change its expected value to match the bug.
- Add sleeps, retries or longer timeouts to make a flaky test pass.
- Edit vendored or generated code the repo says not to touch.
- Leave debug instrumentation in the final diff.
