"""Sanity check for the v1.1 cases: baseline fails the hidden tests, a reference fix passes them, branch suites run.
Usage: python -I sanity.py c21 c22 ...  (fixtures go to a short temp path: Win32 cwd limit)."""
import json, shutil, subprocess, sys, tempfile
from pathlib import Path

CASES = Path(__file__).resolve().parent / "cases"
WORK = Path(tempfile.gettempdir()) / "ns_sanity"

# Reference fixes: (path, old, new) applied to the fixture.
FIX = {
    "c21": [("src/options.js", "Object.assign(DEFAULTS, opts)", "{ ...DEFAULTS, ...opts }")],
    "c22": [("src/dates.js", "return now.toISOString().slice(0, 10);",
             "const p = (n) => String(n).padStart(2, '0');\n  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;")],
    "c23": [("src/queue.js", "jobs.forEach(async (job) => { done.push(await job()); });\n      jobs.length = 0;\n      await new Promise((r) => setTimeout(r, 20));\n      return done;",
             "done.push(...(await Promise.all(jobs.splice(0).map((job) => job()))));\n      return done;")],
    "c24": [("src/import.js", "parse(text);", "parse(text.endsWith('\\n') ? text : text + '\\n');")],
    "c25": [("src/invoice.js", "Math.floor(parseFloat(l.price) * 100)", "Math.round(parseFloat(l.price) * 100)")],
    "c29": [("src/port.js", "const n = Number.parseInt(value, 10);\n  if (Number.isNaN(n))", "const n = Number(value);\n  if (!/^\\d+$/.test(String(value)))"),
            ("src/port.js", "n < 0 ||", "n < 1 ||")],
}


def node(repo, files):
    r = subprocess.run(["node", "--test", *files], cwd=repo, capture_output=True, text=True, timeout=60)
    return r.returncode == 0


def run(cid):
    case = json.loads((CASES / cid / "case.json").read_text(encoding="utf-8"))
    repo = WORK / cid
    shutil.rmtree(repo, ignore_errors=True)
    shutil.copytree(CASES / cid / "fixture", repo)
    tests = sorted(p.relative_to(repo).as_posix() for p in (repo / "test").glob("*.test.js"))
    out = [f"suite={node(repo, tests)}"]
    hid = CASES / cid / "hidden"
    if hid.is_dir():
        shutil.copytree(hid, repo / "test-hidden")
        hfiles = sorted(p.relative_to(repo).as_posix() for p in (repo / "test-hidden").glob("*.test.js"))
        out.append(f"hidden_base={node(repo, hfiles)}")
        for path, old, new in FIX.get(cid, []):
            p = repo / path
            s = p.read_text(encoding="utf-8")
            assert old in s, (cid, old)
            p.write_text(s.replace(old, new), encoding="utf-8", newline="\n")
        out.append(f"hidden_fixed={node(repo, hfiles)} suite_fixed={node(repo, tests)}")
    for br in case.get("branches", []):
        b = WORK / f"{cid}-branch"
        shutil.rmtree(b, ignore_errors=True)
        shutil.copytree(CASES / cid / "fixture", b)
        for rel, text in br["files"].items():
            (b / rel).write_text(text, encoding="utf-8", newline="\n")
        bt = sorted(p.relative_to(b).as_posix() for p in (b / "test").glob("*.test.js"))
        out.append(f"branch_suite={node(b, bt)}")
    print(cid, " ".join(out))


for cid in sys.argv[1:]:
    run(cid)
