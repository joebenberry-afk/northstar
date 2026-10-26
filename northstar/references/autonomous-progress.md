# Autonomous progress

Load at session start when `docs/plan/STATUS.md` exists, whenever the owner is absent or the session is long, and when the work stalls.

The owner starts a session, you work for hours, they check in later. Your job: keep shipping verified increments, never sit stuck, never polish past acceptance.

## Session contract

- **Start:** read `STATUS.md`, answers in "Needs owner" first. Run the orientation check. State one verifiable target in one line.
- **During:** the momentum loop.
- **End** (or before context runs out): at least one evidence-backed state change, `STATUS.md` updated, "Needs owner" current, the next target written for the following session.

## Orientation check

At session start, every milestone checkpoint and after every compaction, name: **goal · active milestone · current task · next task.** If you can't, re-read `STATUS.md` and `ROADMAP.md` before doing anything else.

## Momentum loop

Pick the highest-value unblocked task → build (`build.md`) → verify (`verify.md`) → commit → update `STATUS.md` → repeat.

A loop ends in a commit or a `Blocked` entry, never in silence.

- **Value** = what it does for the next release + how much it unblocks the critical path + the risk it removes + the evidence it yields, weighed against effort and uncertainty. Code volume and convenience don't count.
- **One active task plus a ready queue** of 2–3 independent tasks, so a block becomes a switch, not a stall.
- **Heartbeat:** when the state really changes (task done or blocked, a surprise, a compaction), rewrite the one line at the top of `STATUS.md`:
  `release target | last verified value | critical-path blocker | deferred | active task | next action | evidence ref`
- **Progress** = a newly verified capability, a closed release gate, or a costly uncertainty rejected with evidence. Test runs, commits and edits on their own are not progress.

## Stuck ladder

Climb one rung at a time.

1. **Debug.** Reproduce → narrow down with discriminating tests → root cause → fix in the shared path → regression test. **Stop after two attempts in a row that produce no new evidence.** The limit is information, not a count. A fix without a confirmed root cause is labeled a workaround, with its limits.
2. **Shrink.** Cut the task to its smallest verifiable slice, or take the simplest option that meets acceptance.
3. **Park.** Mark it `Blocked` in `STATUS.md` with what was tried and why it failed. Log the outcome label in `DECISIONS.md`. Take the next task from the ready queue.
4. **Reshape.** If every must-have of the milestone is blocked, reshape the milestone (log why). Ask the owner only when nothing can continue without them.

**Safety-critical blockers are never deferred quietly.** Escalate to "Needs owner" or honestly shrink the release scope.

### Blocker outcome labels

Every blocker encounter logs exactly one in `DECISIONS.md`:

`fixed` · `contained` · `deferred` · `safe alternative` · `needs approval` · `truly blocking` · `inconclusive + next experiment`

Every label except `fixed` also leaves a `Blocked` entry. Two `inconclusive` labels in a row with no new evidence force a change of strategy.

## Triggers

| Signal | Action |
|---|---|
| Task passes acceptance | Stop. Verify, commit, next task |
| Task exceeds its appetite | Park it (rung 3), next task |
| Off the acceptance path for more than one attempt | Rabbit hole: write it on the ROADMAP parking list, return |
| No verified increment in 3 tasks | Re-anchor: re-read goals, re-pick the target, or reshape the milestone |
| Want to redesign the architecture | Needs new evidence or a changed requirement. Otherwise park the idea |
| A gate fires with no owner | Use the owner-absent column in SKILL.md §3 |

## Perfection traps

Each one means: park it, move on.

- refactoring code that already passes acceptance
- fixing a minor issue no requirement covers
- chasing a flaky external dependency past its appetite
- polishing docs or UI past the acceptance criteria
- rewriting work a prior session verified

## Decide, don't wait

Reversible choices (library, naming, internal structure) are made from the repo and known preferences, logged in `DECISIONS.md`, and acted on. Questions that can wait go on "Needs owner" with the assumption you went ahead with. Only the four gates stop work.

## Context running out

Before compaction or handoff: commit, update the heartbeat and item states, and write **exactly one** next action. A fresh agent must resume from `STATUS.md` without redoing discovery.
