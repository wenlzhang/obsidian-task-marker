"""Wiring test for the shared privacy guard: python3 .githooks/test_privacy_guard.py"""
import os
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOOKS = ROOT / ".githooks"


def harness():
    found = os.environ.get("AGENT_HARNESS_DIR") or subprocess.run(
        ["git", "config", "--get", "agent.harnessDir"], cwd=ROOT, capture_output=True, text=True).stdout.strip()
    return Path(found) if found else None


class PrivacyGuardWiring(unittest.TestCase):
    def test_hooks_call_the_wrapper(self):
        for name in ("pre-commit", "commit-msg", "pre-push"):
            path = HOOKS / name
            self.assertTrue(os.access(path, os.X_OK), name)
            self.assertIn('privacy-guard" %s' % name, path.read_text(), name)

    def test_wrapper_matches_the_shared_core(self):
        core = harness()
        self.assertIsNotNone(core, "set AGENT_HARNESS_DIR or git config agent.harnessDir")
        self.assertEqual((HOOKS / "privacy-guard").read_bytes(),
                         (core / "scripts/privacy_guard/wrapper.sh").read_bytes())

    def test_doctor_passes(self):
        result = subprocess.run([str(HOOKS / "privacy-guard"), "doctor"], cwd=ROOT, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)


if __name__ == "__main__":
    unittest.main()
