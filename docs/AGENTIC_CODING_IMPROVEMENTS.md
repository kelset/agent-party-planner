# Agentic Coding Improvements

This document outlines potential improvements to the **Agents Party** orchestration rules based on Simon Willison's "Agentic Engineering Patterns" guide.

---

## [Writing code is cheap now](https://simonwillison.net/guides/agentic-engineering-patterns/code-is-cheap/)

### recap

The fundamental shift in software engineering is that the cost of generating code has dropped to near zero. Instead of rationing our time and avoiding "unnecessary" scripts or tests, we should aggressively use agents to write them. However, while writing code is cheap, verifying that the code is *good* (correct, secure, maintainable) remains the bottleneck.

### what we could do in ours

* **Shift Focus to Verification:** Emphasize in `PARTY_ROLES.md` that the **Warrior** should freely generate implementations without hesitation, while the **Warlock** (Code Review) and **Ranger** (Telemetry) take on a heavier burden of verification.
* **Aggressive Branching:** Instruct the **GM** to allow the party to create multiple experimental branches ("cheap code") to try different approaches simultaneously, letting the **Wizard** evaluate the best outcome.

---

## [Hoard things you know how to do](https://simonwillison.net/guides/agentic-engineering-patterns/hoard-things-you-know-how-to-do/)

### recap

Engineers should use agents to automate tasks they already understand deeply. By feeding an agent a known working pattern or previous solution, you get a reliable result instantly without the manual labor.

### what we could do in ours

* **The Bag of Tricks:** In `THRONE_ROOM.md`, instruct the **Game Creator** to ask the user if they have existing code snippets, preferred patterns, or "hoarded knowledge" relevant to the quest.
* **Knowledge Injection:** Provide a mechanism for the user to inject a `knowledge-base.md` into the orchestration directory, which the **GM** explicitly passes to the **Wizard** and **Warrior**.

---

## [Anti-patterns: things to avoid](https://simonwillison.net/guides/agentic-engineering-patterns/anti-patterns/)

### recap

Willison warns against "vibe coding" (blindly accepting code without tests), giant context windows with irrelevant information (which confuse the agent), and letting agents loose without strict guardrails or sandboxes.

### what we could do in ours

* **Context Minimization:** Update the **GM**'s instructions in `GAME_MASTER_GUIDE.md` so that when it spawns a sub-agent, it *only* passes the specific chunk of the `journal.md` relevant to that agent, rather than the entire file.
* **Strict Guardrails:** Explicitly instruct the **Warlock** to look for security vulnerabilities and prompt injection risks in the Warrior's code.

---

## [Red/green TDD](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/)

### recap

This is one of the most reliable patterns. You instruct the agent to write a failing test first, verify that it fails (Red), and *only then* write the implementation to make it pass (Green). This grounds the agent in reality and prevents hallucinations.

### what we could do in ours

* **Mandatory TDD:** Modify the **Warrior**'s role in `PARTY_ROLES.md` to strictly enforce Red/Green TDD. The Warrior must commit the failing test first.
* **Enforcement:** Update the **Warlock** to automatically reject any implementation that is not accompanied by a corresponding test.

---

## [First run the tests](https://simonwillison.net/guides/agentic-engineering-patterns/first-run-the-tests/)

### recap

Before an agent changes anything in a new environment, it must run the existing test suite to establish a clean baseline. If the tests are already broken, the agent shouldn't start building new features.

### what we could do in ours

* **Phase 1 Update:** In `GAME_MASTER_GUIDE.md` (Phase 1: Recon), instruct the **Ranger** or **Healer** to run the existing test suite.
* **Halt on Red:** If the baseline test suite fails, the **GM** must halt the quest and spawn the **Healer** to fix the environment before the **Wizard** is allowed to write an attack plan.

---

## [Agentic manual testing](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/)

### recap

Using agents to automate what would normally be manual QA—such as writing Playwright/Puppeteer scripts to click through a UI, or taking screenshots and having a vision model verify the layout.

### what we could do in ours

* **Visual QA Role:** We could expand the **Ranger**'s responsibilities to include visual regression and automated UI testing, not just telemetry and performance.
* **Playwright Generation:** The **Wizard** can be instructed to explicitly include an "agentic manual test" step in their attack plans for frontend features.

---

## [Linear walkthroughs](https://simonwillison.net/guides/agentic-engineering-patterns/linear-walkthroughs/)

### recap

When faced with complex, undocumented code, you ask the agent to write a highly detailed, step-by-step "linear walkthrough" of what the code is doing. This serves as both documentation and a sanity check.

### what we could do in ours

* **Recon Artifacts:** When the **Ranger** does recon on a complex file, they can be instructed to generate a "Linear Walkthrough" artifact in the orchestration folder.
* **Review Tool:** The **Warlock** can request a linear walkthrough from the **Warrior** if a proposed pull request/code change is too dense to review at a glance.

---

## [Interactive explanations](https://simonwillison.net/guides/agentic-engineering-patterns/interactive-explanations/)

### recap

Going beyond text, agents can generate small interactive tools (like a single-file HTML/JS app) to visually explain a concept, map a database schema, or demonstrate an algorithm.

### what we could do in ours

* **Interactive Recaps:** Instead of just writing a markdown summary, the **Bard** in the Throne Room could be tasked with generating an `index.html` file that serves as an interactive, visual recap of the completed quest.
* **Data Visualization:** The **Ranger** could generate interactive charts for their telemetry data instead of raw numeric logs.
