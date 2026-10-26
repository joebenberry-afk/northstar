# Build module (test-first)

Load when implementing a task with defined behavior.

## Loop

1. **Acceptance check → first failing test.** Turn the task's acceptance criterion into a test. Run it and see it fail for the right reason. A test that never failed proves nothing.
2. **Green:** the smallest change that passes it. Reuse existing code before writing new code; no new dependency for a few lines.
3. **Refactor** only while green, and only inside the task. Refactoring code that already passes acceptance is a perfection trap.
4. **Run the wider suite.** New failures are yours. Failures that were already red before your change are reported as pre-existing.
5. Hand off to `verify.md` before changing the task's state.

## Variants

| Situation | Instead |
|---|---|
| Brownfield: changing behavior you didn't write | First write characterization tests that lock in current behavior, then change it |
| `prototype: discard` spike | Skip tests; the spike answers a question and is thrown away |
| `tracer: keep` spike | Production code: tests before it counts as Implemented |
| `+research` (performance, quality, ML) | A benchmark or baseline harness replaces the unit test. Set the baseline and the decision rule before running |
| UI | An end-to-end or interaction check, plus accessibility basics: keyboard, contrast, labels |
| No test framework yet | M1 adds the smallest one that runs in CI. Don't block a Quick fix on it |

## Never

- Delete, skip or weaken a legitimate failing test to get green.
- Write implementation before the failing test, except in a `discard` spike.
- Mock the thing under test.
- Gold-plate: anything beyond acceptance goes to the parking list with a requirement ID, or not at all.
- Optimize without a baseline. If an "optimization" makes the measured result worse, restore the baseline and log the rejected change in `DECISIONS.md`.
