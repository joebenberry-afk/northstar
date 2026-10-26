# Releasing

After every change that touches src/, cut a release immediately so users get fixes fast:

1. `npm version patch`
2. `sh scripts/publish.sh`
3. `git push origin main --tags`
