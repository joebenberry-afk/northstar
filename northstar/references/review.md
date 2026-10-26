# Review module

Load when the owner asks you to review a branch, diff or PR; when review feedback arrives; when a milestone completes; or before any `+critical` change is marked done.

## Modes

| Mode | Output | Code changes |
|---|---|---|
| **Review someone's work** (branch, diff, PR) | Findings + verdict | **None** (rule 7). Don't fix, commit or leave the branch checked out |
| **Self-review** (milestone, `+critical`, before done) | Findings, then fixes | Fix blocking findings, re-run checks, then `verify.md` |
| **Receive review** (comments from a person or an agent) | Per-item decision | Apply what holds up, decline what doesn't, with evidence |

## Reviewing a diff

1. **Scope:** `git diff <base>...<branch>` (merge base), plus `git log` for intent. Read every changed file in full where context matters, and grep for callers of anything changed.
2. **Check against the intent:** the stated purpose ("pure refactor", "fixes CI"), the task's requirements, and `PROJECT.md` if it exists. A claim like "no behavior change" is a hypothesis to check, not a fact.
3. **Run the tests** on the branch in a temporary worktree outside the repo (`git worktree add <tmp> <branch>`, remove it after), never by switching the owner's checkout. A green suite is not proof; read what the tests assert.
4. **Walk the checklist** below. Use an independent reviewer (a subagent given the diff, the intent and this checklist, read-only) when the host has one and the change is Standard+; otherwise self-review against the checklist.
5. **Report:** each finding with `file:line`, what breaks and for whom, and its class. End with a verdict: **approve**, **approve with nits**, or **request changes** (any blocking finding).

## Checklist

- **Breaking changes:** anything public removed, renamed or retyped; a default changed; an error that used to throw now returns `null`/`0`/empty (or the reverse); changed semantics behind the same signature. Check every caller and the docs.
- **Correctness:** edge cases (empty, zero, negative, unicode, large), off-by-one, async ordering, error paths, resource cleanup.
- **Security:** user input reaching paths (traversal, `../`), shell, SQL, HTML or eval; missing auth checks; secrets in code or logs. Any of these is blocking.
- **Tests:** do they cover the change? Were expectations weakened, tests skipped or deleted, or assertions changed to match the new output? Weakening a test to get green is blocking.
- **Simplest option:** more code, abstraction or dependencies than the task needs.
- **Docs:** README/API docs match the new behavior.

## Classes

| Class | Means | Merge? |
|---|---|---|
| **Blocking** | Wrong behavior, breaking change without a plan, security hole, weakened test, data risk | No, until fixed |
| **Should-fix** | Real but contained: missing edge-case test, unclear naming in a public API | Owner's call |
| **Cosmetic** | Style, nits, optional refactors | Yes; mention only briefly |

Don't invent blockers. A clean diff gets a clear approval; padding the review with speculative issues is noise.

## Receiving review

- Read every item, then check each one against the code before acting: callers, tests, docs, requirements. The reviewer may lack context.
- **Correct item:** fix it, one item at a time, with a test where behavior changes. Run the suite after each.
- **Wrong item** (breaks a caller, contradicts a requirement, YAGNI for an unused feature): don't apply it. Reply with the evidence (`file:line`, the failing case, the requirement).
- **Unclear item:** ask before implementing it. Implement the clear ones meanwhile.
- No performative agreement ("great catch!") and no blind compliance. A finding is resolved only when the code changed and the checks re-ran.
- Report per item: applied (with the test), declined (with the evidence), or needs clarification.

## Never

- Change code during a review-only request.
- Approve with an open blocking finding, or block on cosmetics.
- Claim you ran or read something you didn't.
- Apply reviewer advice you haven't verified against the code.
- `+critical` with no independent reviewer and no owner: park it in Needs owner, don't self-approve.
