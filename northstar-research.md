# Northstar — Research: what else a plan should consider

Two deep-research runs on 2026-10-25, each verifying claims with three adversarial votes.

| Run | Sources fetched | Claims verified | Confirmed | Refuted |
|---|---|---|---|---|
| `wf_462fca9a-8c7` (round 1) | 23 | 25 | 21 | 4 |
| `wf_3e02d50b-80c` (round 2, gaps) | 25 | 25 | 23 | 2 |

Evidence legend:
- **H** = multiple primary sources agree.
- **M** = a single primary practitioner source, no controlled study.
- **L** = opinion only, no data.
- **U** = not verified in either run. These are standard practice from general knowledge; recheck before the spec quotes them.

## Part A — Round 1: verified practices

| # | Practice | What | Why | When (and when overkill) | Where in Northstar | How | Ev |
|---|---|---|---|---|---|---|---|
| 1 | **Appetite before estimate** | Fixed time budget first, scope fits it (fixed time, variable scope) | Estimates start from a design and invite scope growth; appetite is a constraint | Any milestone with uncertainty. Skip for trivial fixes | `ROADMAP.md` milestone field `Appetite:`; `Unshaped ideas` parking list | Record appetite + problem before tasks. Over budget → cut scope, not extend time | M |
| 2 | **Premortem → actions** | "It failed. Why?" stories at inception | Counters overconfidence and the planning fallacy. **Weak evidence**: one study found unstructured premortems didn't change behaviour | Project mode, `+critical`, before irreversible milestones. Ceremony for small reversible work | Risk section of `ROADMAP.md` | 3–5 failure stories, include causes *you* control; each top cause must become a task, gate, or roadmap change. No plan change = not done | M |
| 3 | **Tracer bullet first; prototypes thrown away** | Thin end-to-end path kept as production code vs. a throwaway prototype answering one question | Fast feedback means less correction; stops agents shipping spike code | Tracer when requirements are moving (most projects). Prototype when one unknown blocks you | M1 = walking skeleton; spikes labelled `prototype: discard` or `tracer: keep` | M1 gate = "runs end to end through every layer" | M |
| 4 | **WIP limit** | Cap tasks/milestones/agent worktrees in flight | Lower WIP correlated with shorter lead time (8,000+ items, 5 teams) | Always for a solo dev running parallel agents. No proven optimal limit | Execution rules in `ROADMAP.md` | 1 active milestone, few parallel tasks; finish and verify before starting; tune by observed lead time | M |
| 5 | **Cone of uncertainty is not a law** | Estimate ranges "narrow 4x→1x" | Boehm's 1981 ranges were "determined subjectively" | Whenever sizing or forecasting | Estimation guidance; checkpoint step | Ranges only; re-estimate at each checkpoint; uncertainty shrinks only when risks are retired → riskiest first | M |
| 6 | **Supply chain in SLSA stages** | Build L1 provenance → L2 hosted build → L3 hardened | Counters tampering and "works on my machine" releases | L1 for anything published; L2 once others install it; L3 only when risk justifies. Overkill for private prototypes | NFR attached to the release milestone | First release: build only in CI with provenance | H |
| 7 | **Continuous dependency upgrades** | Small frequent updates, cooldown, security exempt; catch up one major at a time | Being behind makes the emergency CVE patch huge; cooldown blocks malicious releases | Every project with dependencies, from day 1 | Maintenance cadence; CI config; "upgrade debt" item for legacy projects | Renovate/Dependabot, min release age 3–14 days, security immediate, majors as separate PRs, CI-gated | M |
| 8 | **Context is a budget; memory on disk** | Context rot: recall drops as context grows. Long work uses notes files | Loading the whole plan into every session degrades the agent | All agent work, especially multi-session. Don't starve it either | `STATUS.md` = the "now" file; everything else referenced by path | Every session reads STATUS first, updates it last; tasks get minimal self-contained briefs | H |
| 9 | **Eval the skill itself, early** | 20–50 tasks from real failures; capability vs. regression suites | Evals get harder the longer you wait; step-checking is brittle | From v0 of Northstar | `northstar/evals/` beside the skill | Each real planning failure → eval case with a checkable outcome. Code graders first, rubric LLM judge only for qualitative properties, read transcripts | M |
| 10 | **Postmortem triggers set in advance** | Objective criteria for when to write one | Postmortems cost effort; pre-set triggers avoid both skipping and over-doing | Anything with users or data | Feedback section of `PROJECT.md`; outputs → roadmap + evals | Solo triggers: had to roll back, user found it before you did, any data loss, **agent claimed done but evidence was false**. Short blameless note; actions become tasks or eval cases | M |

## Part B — Round 2: verified practices (gap round)

| # | Practice | What | Why | When (and when overkill) | Where in Northstar | How | Ev |
|---|---|---|---|---|---|---|---|
| 11 | **Expand → migrate → contract** | Breaking changes in three phases: support both shapes, move all clients over, remove the old shape | Each phase can ship safely. Skipping contract "might leave you worse than you started" | Standard/Project: any incompatible change to a schema, file format, config key or public interface. Overkill for internal code with one caller changed in one commit | Three sub-steps under one milestone; the milestone isn't Verified until contract is done | Open the contract task at the same time as expand; old paths get deprecation notes pointing at that task | M |
| 12 | **Breaking-change checklist** | Google AIP-180 and Stripe agree: removing, renaming, retyping, or changing a default or its semantics is breaking. Adding is safe | A ready-made compatibility test | Any change touching a public API, serialized format, or schema with consumers | `+critical` review item; release gate on API-touching milestones | 5 questions: removed? renamed? retyped? default changed? semantics changed? Any yes → expand/contract or a major bump | H |
| 13 | **SemVer needs a declared public API** | SemVer means nothing until the API surface is written down. Before 1.0.0, anything may change | Version numbers that consumers can trust | Anything with external consumers (library, CLI flags, file formats, plugin API). Overkill for an app with no programmatic consumers | `Public API` section in `PROJECT.md`; release gate | List the API surface; tag each roadmap change major/minor/patch. Deprecation window: state one when deprecating. Google's 180 days is a reference for external APIs only | M |
| 14 | **Config out of code; secrets not in plain env vars** | 12-factor: config (including credentials) is separated from code, tested by "could you open-source it right now?". **Conflict:** 12-factor puts config in env vars, but OWASP advises against env vars for secrets (visible to all processes, leak into logs) | Leaked credentials | Every scope that touches credentials. For Quick it's one line: no secrets in code or history | Security gate before first push or release; `+critical` checklist | Secrets in mounted files or a secret store. Secret scanner (e.g. gitleaks) over the **full git history** | H |
| 15 | **Secret scan before commit** | Scanner in a pre-commit hook or the IDE, plus the same scan in CI | Catch secrets before they reach history | Standard/Project from the first commit. Multiple scanners only under `+critical` | M1 repo-setup task | One pre-commit hook + one CI step | M |
| 16 | **Tests before every trunk commit; revert if red** | DORA: CI = trunk-based development + fast automated tests on every commit, build kept green, revert if not fixed in minutes | Linked to higher delivery performance (correlational team survey data, 2016–17, untested on solo devs) | Standard/Project. The branch-count rules mean little solo; the useful part is tests on every push and stop-the-line | CI gate in M1; stop-the-line rule in `STATUS.md` | One CI workflow on every push; red trunk blocks new milestone work. "From day one" is Northstar's choice, not DORA's | M |
| 17 | **Own-file licensing via `reuse lint`** | Every file has copyright and an SPDX license identifier; mechanical check (pre-commit or GitHub Action) | License clarity for anything distributed | Project scope, anything distributed or open-sourced. Overkill for private throwaway code | CI or release gate "own-file licensing" | Add the reuse hook and fail the build. **Does not cover dependency licenses**: that needs a separate scanner (ScanCode, cargo-deny, license-checker) | H |
| 18 | **Accessibility basics early** | W3C WAI: building it in is "almost always significantly easier, less expensive" than retrofitting | Opinion only: archived 2012 page, no cost figures. Don't cite any "10x/100x" multiplier | Any UI work | UI milestone acceptance criteria | Short checklist: keyboard, contrast, labels | L |
| 19 | **Self-reported speed is not a metric (METR)** | 2025 RCT: 16 experienced OSS devs, 246 issues. With AI, 19% *slower* (CI +2% to +39%), yet they forecast a 24% speedup and afterwards believed 20%. METR now marks this out of date. Feb 2026 follow-up points toward speedup (about −18% returning devs, −4% new) but METR calls it very weak evidence (selection effects) | The perception gap is the robust finding | Always | Justifies I-3 evidence integrity and the feedback metrics | Measure elapsed time per milestone, reverts and rework, never "felt faster". Cite 2025 numbers only alongside the follow-up | H (2025) / M (2026) |

### Refuted — do not put in the spec as fact
- Round 1:
  - "Premortems reduce overconfidence" (1-2)
  - "Premortems bias toward external causes" (0-3)
  - "WIP limits trade lead time against throughput" (0-3)
  - "Todd Little's data disproves the cone" (1-2)
- Round 2:
  - "SemVer defines a minimum deprecation policy" (1-2)
  - "Stripe has kept compatibility with every version since 2011" (1-2)

### Citation fixes
- The Parallel Change article is by Danilo Sato, not Martin Fowler.
- Google's compatibility rules are in AIP-180, not AIP-185.

### Conflicts to resolve in the spec
- **Backlog.** Shape Up says no backlog; Scrum and Kanban keep one. → Northstar: a parking list of unshaped ideas, not a committed backlog.
- **Outcome vs. process grading.** Outcome-only grading vs. process checks for reward hacking. → Outcome graders by default, plus transcript checks for false "done" claims.
- **Update cadence.** Update often vs. supply-chain cooldown. → Update often with a short cooldown; security fixes exempt.
- **Secrets.** 12-factor env vars vs. OWASP's advice against them. → Keep config in env vars; secrets go in files or a secret store.

## Part C — Still unverified after both rounds (U)

No claims survived on these. Treat them as open, not unimportant.

| Practice | Working default until verified |
|---|---|
| Feature flags and flag debt | Only for risky user-facing rollouts; every flag gets a remove-by milestone |
| Observability minimums (OpenTelemetry, desktop crash reports) | Structured logs + crash capture before first release to others |
| Dependency license compliance (SPDX/OSI) | License scan of dependencies at the release gate |
| WCAG 2.2 specifics, cost of late i18n | Decide at charter: in scope, or an explicit non-goal |
| Tech-debt register (Fowler quadrant, Cunningham) | `ponytail:` corner-cut comments roll up into a debt list reviewed at checkpoints |
| Spec-driven tools (Spec Kit, OpenSpec, Kiro, Tessl): evidence they reduce agent drift | No independent evidence found in either round. Don't claim parity or superiority without the §8 eval |
| Agent approval gates, token/cost budgets (Anthropic/OpenAI guidance) | Spec §3's four gates; appetite may be stated in agent sessions |
| DORA four keys / SPACE for solo devs | Use observable solo metrics: time per milestone, revert count, rework, false-"done" rate |
| Mitchell, Russo & Pennington 1989 "30%" premortem figure | Don't cite it. Likely concerns the number of reasons generated, not forecast accuracy (unconfirmed) |

## Part D — Open questions

1. Do premortems with an explicit action step change later behaviour? (No evidence either way yet.)
2. Is there independent evidence that spec-driven tools reduce agent drift or rework? Northstar's own §8 comparison may be the first real data.
3. What are the minimum feature-flag and observability baselines for solo desktop or CLI projects?
4. How does each host (Claude Code, Codex, OpenCode, OMP) load skills, given that Northstar's self-activation depends on it?

## Sources
**Round 1**
- Shape Up ch. 3 — https://basecamp.com/shapeup/1.2-chapter-03
- Hunt & Thomas, tracer bullets — https://www.artima.com/articles/tracer-bullets-and-prototypes
- Premortem — https://en.wikipedia.org/wiki/Pre-mortem (secondary); UBC poster https://dlab.sauder.ubc.ca/sjdm/presentations/2021-Poster-Gandhi-Linnea-debiasing-premortem-selfserving~.pdf
- WIP study, Sjøberg ESEM 2018 — https://www.sintef.no/en/publications/publication/1637884/
- Cone of uncertainty — https://leanpub.com/read/leprechauns/leanpub-auto-chapter-2-the-cone-of-uncertainty (secondary)
- SLSA v1.2 — https://slsa.dev/spec/v1.2/build-track-basics
- Renovate upgrade practices — https://docs.renovatebot.com/upgrade-best-practices/
- Anthropic, context engineering — https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Chroma, context rot — https://research.trychroma.com/context-rot
- Anthropic, agent evals — https://anthropic.com/engineering/demystifying-evals-for-ai-agents
- Google SRE, postmortem culture — https://sre.google/sre-book/postmortem-culture/

**Round 2**
- Parallel Change (Sato) — https://martinfowler.com/bliki/ParallelChange.html
- SemVer 2.0.0 — https://semver.org/
- Google AIP-180 / AIP-185 — https://google.aip.dev/180 · https://google.aip.dev/185
- Stripe API versioning — https://stripe.com/blog/api-versioning · https://docs.stripe.com/api-versions
- 12-factor config — https://12factor.net/config
- OWASP Secrets Management — https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
- DORA trunk-based development — https://dora.dev/capabilities/trunk-based-development/
- REUSE — https://reuse.readthedocs.io/en/stable/man/reuse-lint.html · https://reuse.software/spec-3.3/
- W3C WAI business case (archived) — https://w3.org/WAI/business-case/archive/fin
- METR 2025 study — https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ · follow-up https://metr.org/blog/2026-02-24-uplift-update/
