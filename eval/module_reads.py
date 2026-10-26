"""Diagnostic: which runs Read references/debug.md or review.md, and which printed the Northstar line.
Usage: python -I module_reads.py <tag>"""
import json, sys
from pathlib import Path

for d in sorted((Path(__file__).resolve().parent / "results" / sys.argv[1]).glob("*-*-*")):
    reads = set()
    for line in (d / "transcript.jsonl").read_text(encoding="utf-8").splitlines():
        try:
            ev = json.loads(line)
        except ValueError:
            continue
        msg = ev.get("message") if isinstance(ev, dict) else None
        for c in (msg.get("content") if isinstance(msg, dict) else None) or []:
            if isinstance(c, dict) and c.get("type") == "tool_use":
                s = json.dumps(c.get("input", {})).replace("\\\\", "/")
                for m in ("debug.md", "review.md"):
                    if "references/" + m in s:
                        reads.add(m)
    r = json.loads((d / "result.json").read_text(encoding="utf-8"))
    print(d.name, "pass" if r.get("pass") else "FAIL", "line" if r.get("northstar_line") else "noline", ",".join(sorted(reads)) or "-")
