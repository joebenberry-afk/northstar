# Verify module

Load before marking anything Tested, Verified, done or Released. Never skipped.

## The rule

**No state change without fresh evidence.** Run the acceptance command now, in this session, and record its output. Earlier runs, memory, and an agent's or subagent's report don't count.

| State | Evidence needed |
|---|---|
| Implemented | Code exists for the task |
| Tested | Task tests pass (command + output) |
| Verified | The task's acceptance check passes and its output is recorded, or an attributable artifact exists (screenshot, log, benchmark file) |
| Released | Release-specific evidence: the packaged artifact installs or launches and its main workflow runs. Green unit tests alone are not a release |
| Blocked | What was tried, why it failed, outcome label (see `autonomous-progress.md`) |

**Record evidence** in `STATUS.md` next to the item: the command, a short excerpt of its result, and where the full output lives (file, CI run, commit). Quick tier: state the command and result in your reply.

**Demotion:** a regression, a changed requirement or invalidated evidence moves the item back down. It doesn't keep an old badge.

## Before saying "done"

- Did the command run in this session, and did you read its output?
- Does the output show the acceptance criterion, not just "no errors"?
- Did the wider suite stay green, or are any failures pre-existing and labeled as such?
- Are unknowns stated: untested platforms, skipped checks, unverified compatibility?

If any answer is no, the claim is "Implemented" or "Tested", not "Verified".

## Release readiness

Class every open issue before a release:

| Class | Action |
|---|---|
| Critical safety / security / data integrity | **Block.** Fix it, or remove the feature under an honest, narrower scope |
| Core use case broken / severe regression | **Block.** Fix it, or narrow the promise with owner approval (gate 2) |
| Significant but containable | **Assess.** Disclose the limitation, test the containment, decide |
| Minor / cosmetic / optimization | **Defer** with a revisit trigger in STATUS's deferred list; keep shipping |
| Unknown / unverified | **Unverified**, never passes. Pick a narrower target you can test honestly |

- Release levels: prototype → alpha → beta → release candidate → stable. An honestly labeled, limited alpha beats a "complete" release with hidden failures.
- Ship the proven path: put a partly ready feature behind a flag (with a remove-by milestone) or leave it out.
- A big green test suite with no runnable artifact is not releasable. Name the missing gate.
- If the owner asks to ship with a known exploit or data-loss risk, refuse that release and offer a safe, narrower one.
- Publishing, tagging and deploying are gate 4: never autonomous.
