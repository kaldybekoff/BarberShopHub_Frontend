# Repository Audit — BarberHub

**Date:** April 13, 2025

**Lecture group:** 01-N (10:30 - 12:20)

**Score: 8.5 / 10**

---

## 1. README quality — 8/10

Has the basics: what the project is, how to run it, what stack we use, and a link to the live deploy. Someone cloning this for the first time would get it running but wouldn't immediately know what the app actually does.

---

## 2. Folder structure — 9/10

`src/` is split by role (user, barbershop, admin) for pages, and into shared vs role-specific for components. API calls, context, routes, hooks, mock data, and constants each have their own folder.
---

## 3. File naming — 9/10

Pages and components use PascalCase, API files use camelCase, config files follow standard names. 

---

## 4. Essential files — 8/10

| File | Present |
|------|---------|
| `.gitignore` | Yes |
| `package.json` | Yes |
| `README.md` | Yes |
| `LICENSE` | Yes |
| `.env.example` | No — backend isn't integrated yet |

---

## 5. Commit history — 8,5/10

Most commits are scoped to a specific page or feature, so the history is readable. One commit has just `"."` as the message, which gives nothing. Everything else is fine.

---

## Summary

The repo is in decent shape. Structure is clean, naming is consistent, and the history mostly makes sense.

**Final score: 8.5 / 10**
