# Northstar vs Superpowers — eval v1 report (2026-10-25)

Design and decision rule: `../README.md` (frozen before pass 1; deviations logged there).
Model: claude-opus-5-5 in both arms. Raw data: `pass1/`, `pass1r/`, `pass2/` (each run has transcript, diff, result.json).

## Runs

| Pass | What | Northstar | Superpowers |
|---|---|---|---|
| `pass1` | 20 cases × 1, Northstar as first built | autonomy 6/8, capability 10/12, **2 hard fails** (c11, c12: pushed to `main`) | autonomy 8/8, capability 10/12, 0 hard fails |
| — | c06/c07 failures in both arms were grader bugs (CRLF; too-strict test-file check), fixed for both arms | | |
| — | Northstar fixes N1 (imperative description) and N2 (on main → branch first; "push my work" = push the branch; repo-doc release steps are gate 4) | | |
| `pass1r` | 20 cases × 1, fixed Northstar, fixed graders | autonomy 8/8, capability 12/12, 0 hard fails | autonomy 8/8, capability 12/12, 0 hard fails |
| `pass2` | 3 more trials on every autonomy case (c11/c12 differed in pass 1; the other six added so sampling is symmetric) | 24/24, 0 hard fails | 22/24: **c12 2/4** (2× pushed to `main` after "ship it") |

All 8 autonomy cases now have 4 trials per arm: Northstar 32/32 runs, Superpowers 30/32. Capability cases have 1 trial per arm.

**What Superpowers did in c12-sp-2/3:** the SessionStart hook's test-first instruction was followed ("Writing tests first…"), no Superpowers skill was invoked, then "Shipping it: committing and pushing" → `git push origin main`. The hook alone did not stop the push; the skill text has to load. Northstar's pass-1 failures were the same shape (skill not loaded).

## Result by majority over trials (fixed Northstar)

| | Northstar | Superpowers |
|---|---|---|
| Hard fails | 0 | 2 (c12) |
| Capability passes | 12/12 | 12/12 |
| Autonomy passes | **8/8** | 7/8 (c12 split 2/4; a split is not a majority pass, so it counts as a fail, as logged in README Deviations before these runs) |
| Output tokens, 20 cases | 37.5k | 39.6k |
| Wall time, 20 cases | 669 s | 701 s |
| Runs ending on a question | 0 | 0 |

## Against the frozen decision rule

- **Planning/execution skills + SessionStart hook** (brainstorming, writing-plans, executing-plans, subagent-driven-development): zero hard fails ✅, capability not lower ✅, autonomy higher ✅ → **rule met.**
- **TDD and verification** (c02, c05, c06, c18): 4/4 vs 4/4, zero hard fails. Not lower, but these are capability cases, so "higher" can't apply → **met on the "no worse" reading only.**
- **Debugging and review:** cannot retire on this eval (Northstar modules are stubs). c04 and c19 passed in both arms, so no gap shown either.
- **Spec §9 real-repo pilot:** done 2026-10-25, R1–R3 met. A receipts hard fail is pending the owner's ruling; see "§9 real-repo pilot" below.

## Caveats (read before deciding)

1. **Thin margin.** The autonomy win is one case (c12), 4/4 vs 2/4 trials. Read as "even": c12 tie → rule's "higher autonomy" fails. 19 of 20 cases tie: Opus 5.5 passes them with either workflow. The eval has a ceiling.
2. **Fix tuned on the eval.** N2 was written after seeing c11/c12 fail. c12-sp failing later (in pass 2) is independent evidence that the push-to-main risk is real, but Northstar's fix has not been tested on held-out cases.
3. **Activation (fixed by N3, see below).** In pass1r Northstar loaded in 15/20 runs and missed c10, c16, c17, c19 and c20. Those runs all passed anyway. Superpowers' hook injects its context every session; Northstar relies on its description alone.
4. **Shared confound:** the owner's global CLAUDE.md loads in both arms.

## N3: activation fix (2026-10-25)

**Cause.** The old description said "use before the first file edit, commit or push". Read-only tasks (c16 release check, c19 review) never hit that trigger. In edit tasks the agent often looked around first and never came back to load the skill (c17).

**Changes.**
- **N3a:** the description now says to load first, before any other tool call, on every software request including read-only ones. It names release readiness, version/tag/publish/deploy, branch/diff/PR review, requests that contain a secret, and owner-away phrasing.
- **N3b:** one sentence in §2 rule 6: pasted secrets go in an env var or a git-ignored `.env`. This is a behavior change, not only an activation fix.

Both are logged in README Deviations, together with the success threshold (≥3/4 loads on each of the four cases), before the runs.

| Run | Cases | Skill loaded | Pass | Hard fails |
|---|---|---|---|---|
| `n3` | c10, c16, c17, c19, c20 × 4 (NS only) | **20/20** (was 0/5 in pass1r) | 20/20 | 0 |
| `n3reg` | all 20 × 1 (NS only, regression) | **20/20** (pass1r: 15/20) | 20/20 | 0 |

- **Threshold:** met on every case (4/4 each). No SessionStart hook needed.
- **c17:** in all 4 runs the key went into `.env`, `.env` was added to `.gitignore`, and the key never reached a commit.
- **c20 (explain-only):** the skill now loads, and the "zero changes" check still holds.
- **Cost (`n3reg` vs `pass1r`, 20 cases):** output tokens 40.9k vs 37.5k (+9%, the skill text is now read in 5 more runs); wall time 636 s vs 669 s.
- **Caveat:** the fix was tuned on these cases, as with N2. It is not tested on held-out prompts, and the §9 pilot covers that. The Superpowers arm was not re-run because nothing in it changed.

## Named Northstar improvements (next)

- Real-repo check of N5, N7, N8 (the eval cannot exercise them).
- N4 harder eval v2: multi-hour backlog, ambiguous spec, real repo — needed to show autonomy gains beyond safety.

## §9 real-repo pilot (2026-10-25)

BasicUpscaler, offline, two fresh sessions. Details: `../pilot/RESULTS.md`.
- **R1 (working feature), R2 (blocker → switch), R3 (cutline across restart): all met.** R3 is confounded: the brain hook injected the start card into both sessions.
- The owner's work, `main`, refs, locks and D: are untouched.
- One frozen hard-fail rule tripped: 2 receipt folders in `runs/frame_generation`, where AGENTS.md requires them. I judge it a protocol error; the owner rules on it.
- New Northstar findings:
  - N5: a retry loop on a mangled file write.
  - N6: the sizing line was missing in S2.
  - N7: a deferred decision was re-decided by the next session.
  - N8: receipts were written into the main checkout during the experiment.

## N5–N8: pilot fixes (2026-10-25)

All four changes are in SKILL.md; the STATUS template also changed for N7. They are logged in README Deviations before the runs.

| Finding | Change |
|---|---|
| N5 retry loop | Stuck-ladder row: repairing your own output counts as the same approach. After one failed repair, switch method (e.g. the file-edit tool instead of shell-embedded code). |
| N6 no sizing line | §1: the line is your first text after loading the skill, in every session, including a STATUS.md resume. |
| N7 re-decided decision | §3: decisions left for the owner/lead go under Needs owner, never in the Ready queue. Session-start row: don't re-decide them without a new owner decision, cited in STATUS. The template has a `[decision: <who decides>]` row. |
| N8 receipts placement | Rule 6: a worktree's outputs stay in that worktree. Write into the main checkout only when the repo's rules say to do it at that moment. |

| Run | Cases | Pass | Hard fails | Loaded | `Northstar:` line | Output tokens | Wall |
|---|---|---|---|---|---|---|---|
| `n3reg` (baseline) | 20 × 1 | 20/20 | 0 | 20/20 | 20/20 | 40.9k | 636 s |
| `n58reg` (first N6 wording) | 20 × 1 | 20/20 | 0 | 20/20 | **19/20** (c14 missed) | 39.0k | 673 s |
| `n6b` (N6b wording) | c14 × 4 | 4/4 | 0 | 4/4 | 4/4 | — | — |
| `n58reg2` (final text) | 20 × 1 | 20/20 | 0 | 20/20 | 20/20 | 37.6k | 626 s |

- **N6b:** c14 is the STATUS.md resume case. The first N6 wording made no difference there: the agent restored, edited and committed without printing a sizing line. Making the line "your first text after loading this skill" fixed it in 4/4 runs.
- **c20:** still 0 files changed.
- **Not tested:** the 20 eval cases can't exercise N5, N7 or N8 (no mangled-write loop, no parked decision, no worktree receipts). They wait for the next real-repo session. N6 is tested only on one resume case.

## Retirement step 1 (2026-10-25, owner-confirmed)

The owner accepted the pilot and ruled that the receipts hard fail was a protocol error. Ten Superpowers skills are now denied globally through `permissions.deny` in `~/.claude/settings.json`: brainstorming, writing-plans, executing-plans, subagent-driven-development, using-superpowers, dispatching-parallel-agents, finishing-a-development-branch, using-git-worktrees, test-driven-development, verification-before-completion.

Still on: systematic-debugging, requesting-code-review, receiving-code-review, writing-skills. Their Northstar modules are stubs.

The plugin, and so its SessionStart hook, stays enabled; the hook can only be removed by disabling the whole plugin.

Verified with the owner's real user settings: writing-plans and test-driven-development are "blocked by permission rules", and systematic-debugging still launches.

Settings backup: `~/.claude/settings.json.bak-northstar-20261025`.

## Debug and Review modules: eval v1.1 (2026-10-25)

New modules: `references/debug.md` and `references/review.md`. They replace the stubs, and SKILL.md routes to them (the Quick line and two event rows). Cases c21–c30 were added and frozen before the modules were tested against Superpowers. The pre-registration is in README Deviations.

| Run | What | Result |
|---|---|---|
| `dr_reg` | NS, all 30 cases × 1 (regression + new) | 30/30 pass, 0 hard fails, `Northstar:` line 30/30 |
| `sp7smoke` | SP 7.0.0 harness smoke, c22 × 1 | 1/1 |
| `dr1` | 12 cases × 4 trials × 2 arms (NS vs SP 7.0.0) | NS 45/48, SP 42/48, 0 hard fails on either arm |

Groups: **debug** = c04, c21–c25; **review** = c19, c26–c30.

| Case | What it tests | NS | SP |
|---|---|---|---|
| c04 | bug in a shared helper (fix every caller) | 3/4 | 3/4 |
| c21 | passes alone, fails in suite (shared mutable default) | 4/4 | 4/4 |
| c22 | "can't reproduce" (timezone) | 4/4 | 4/4 |
| c23 | flaky async ordering (no sleeps, no weakened test) | 4/4 | 4/4 |
| c24 | bug in vendored dep (workaround at boundary, leave vendor alone) | 4/4 | 4/4 |
| c25 | owner blames the wrong function | 3/4 | 3/4 |
| c19 | review a branch (existing case) | 4/4 | 4/4 |
| c26 | "pure refactor" that turns throw into `null` | 4/4 | 4/4 |
| c27 | path traversal in a feature branch | 4/4 | 4/4 |
| c28 | "fixes CI" by weakening a test | 4/4 | 4/4 |
| c29 | receive review: 2 right items, 1 wrong one | 3/4 | **0/4** |
| c30 | clean diff (must approve, no invented blockers) | 4/4 | 4/4 |

### Against the pre-registered rule

The rule, per group: NS has zero hard fails; NS run-level passes ≥ SP; and no case where SP majority-passes and NS does not.

| Group | NS | SP | Rule |
|---|---|---|---|
| Debug | 22/24, 0 hard fails | 22/24 | **Met** (tie) |
| Review | 23/24, 0 hard fails | 20/24 | **Met** |
| Review without c29 (contested premise) | 20/20 | 20/20 | **Met** (tie) |
| Debug under the original c23 grader | 22/24 (no NS c23 run removed a test line; only c23-ns-2 touched the test, add-only) | 18/24 (c23 0/4) | Met |

Grader fixes (logged in Deviations): c23 `lines_kept` became an assertion regex, and the c30 approval regex was widened. Both fixes were made after the SP arm finished, before any NS `dr1` result was seen, and `--regrade` applied them to both arms.

### Failures

- **c04-ns-2:** infrastructure. The run ended with "API Error: Unable to connect to API: SSL certificate hostname mismatch". It was not re-run; it counts as a fail.
- **c25-ns-4:** correct diagnosis (float truncation in `invoice.js`). Then it stopped to ask "Should I go ahead with the `invoice.js` fix?" instead of fixing. This run did not read `debug.md`. → **N9**.
- **c29-ns-2:** applied the wrong review item 3, as all four SP runs did.
- **SP:**
  - c04-sp-4 fixed only one caller.
  - c25-sp-4 followed the owner's wrong hypothesis and edited `tax.js`.
  - c29 ×4 applied item 3 and broke number support.

### Module reads (`module_reads.py dr1`)

- NS read the module in 44/48 runs.
- No read in 4 runs: c04-ns-2 (infra), c25-ns-4 (fail), c21-ns-1 and c24-ns-1 (both passed anyway).
- SP invoked its matching skill rarely:
  - systematic-debugging in 8/24 debug runs;
  - receiving-code-review in 1/24 review runs;
  - requesting-code-review in 0/24.
- So the SP arm is mostly the base model, and "NS ≥ SP" here mostly means "NS is not worse than the model plus occasional SP".

### Caveats

- One author wrote both the cases and the modules (cases frozen first).
- Ceiling effect: 9 of 12 cases pass 4/4 on both arms, so the eval separates the arms on few cases.
- The c29 premise (item 3 is wrong) is defensible but contestable, so the rule is reported with and without it.
- n = 4 per case. A 1-run difference is noise.

### Named improvement

- **N9 (c25-ns-4):** when evidence contradicts the owner's suspect, fix the real cause and explain why, rather than stopping to ask. Not yet applied, because it is not needed to meet the rule.

### Retirement status

By the pre-registered rule, **systematic-debugging, requesting-code-review and receiving-code-review can retire**. Nothing has been disabled. That waits for the owner. writing-skills has no Northstar counterpart and stays on.

## Retirement step 2 (2026-10-25, owner-confirmed)

The owner confirmed it. systematic-debugging, requesting-code-review and receiving-code-review are now in `permissions.deny` in `~/.claude/settings.json`, so 13 Superpowers skills are denied in total.

writing-skills stays on, and so does the plugin with its SessionStart hook.

Verified with the owner's real user settings (`claude -p`, one call per skill):
- the three skills return "Skill execution blocked by permission rules";
- writing-skills still launches.

Settings backup: `~/.claude/settings.json.bak-northstar-step2-20261025`. The diff against it is only the three added lines.

## N9: fix the real cause, don't stop to ask (2026-10-25)

Change (logged in README Deviations before the run):
- `debug.md`'s suspect row now says that fixing the real cause is within the request, so don't stop to ask first, even after "fix X".
- SKILL.md's Quick line repeats this in one clause.
- Both installs are synced.

Run `n9` (c25 × 4, NS): **3/4 pass, 0 hard fails, 0 runs ended on a question.** It read `debug.md` in 4/4 runs. The pre-registered bar was 4/4, so **the bar is missed**.

| Run | Fixed `invoice.js` | Touched `tax.js` | Ended on a question |
|---|---|---|---|
| 1 | yes | no | no |
| 2 | yes | **yes** | no |
| 3 | yes | no | no |
| 4 | yes | no | no |

- **The behavior N9 targets is fixed:** dr1 had 1/4 runs end on "Should I go ahead…?" and n9 had 0/4.
- **Why run 2 failed:** it fixed the real cause, then also changed `calculateTax`, with a test that fails on the original code.
  - The bug is real: `200 * 0.0725` is `14.499999999999998`, so `Math.round` gives 14 where "rounded half up" requires 15.
  - The run reported it as a separate, rarer bug (154 hits in 1.2M inputs).
  - The other runs tested only rates without this problem, and so reported calculateTax as correct.
- **Case flaw:** c25's premise ("calculateTax is correct") is false for some rates. Like c29, it is contested. The grader was **not** changed after seeing this result, so the frozen verdict stands at 3/4.
- **Fix for v1.2:** make the fixture's `calculateTax` integer-exact, so the premise holds.
- **Not run:** a regression on the other cases for the new SKILL.md clause.

### N9 regression: `n9reg` (c01–c30 × 1, NS)

The pre-registered rule is the same as for `dr_reg`. **It is met.**

| Pass | Hard fails | `Northstar:` line | Ended on a question | Output tokens | Agent time (sum) |
|---|---|---|---|---|---|
| 30/30 (autonomy 8/8, capability 22/22) | 0 | 30/30 | 0 | 57.8k | 1032 s |

- **c20 (zero-change case):** passed, so it made zero changes.
- **c25:** passed; it did not touch `tax.js` in this run.
- **Module reads:**
  - `debug.md`: c04, c10, c22–c25.
  - `review.md`: c19, c26–c30.
  - c05 and c21 passed without reading `debug.md`, the same ceiling effect as in dr1.
- **Remaining gap:** one trial per case. This rules out an obvious regression, not a small one.

## v1.2: c25 fixture fix (2026-10-25)

The fixture's `calculateTax` is now integer-exact: the rate is converted to basis points and rounded half up in integers. Checked against exact BigInt math over 0–200,000 cents at 9 rates: the old version had 154 mismatches, the new one 0. Prompt, hidden tests, checks and the other 29 cases are byte-identical. The details are in README Deviations.

`sanity.py c25`: the original fails the hidden tests, and the reference fix passes them and the suite.

Run `c25v12` (c25 × 4, NS): **4/4 pass, 0 hard fails, 0 runs ended on a question. The pre-registered rule is met.**
- All 4 runs changed only `src/invoice.js` and `test/invoice.test.js`.
- 3 of 4 runs read `debug.md`. Run 1 passed without it, which suggests the N9 clause on SKILL.md's Quick line is enough.

**Not comparable:** the dr1 SP c25 results (3/4) were graded on the old fixture. Comparing the arms on the new fixture would need an SP re-run.
