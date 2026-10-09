# Admin Section

> **Educational purpose only.** This documentation describes a vulnerability in the OWASP Juice Shop, an intentionally vulnerable training application. It is provided for educational and defensive purposes and was reproduced on a local instance only.

**Category:** Broken Access Control
**OWASP mapping:** A01:2021 Broken Access Control
**Difficulty:** 1 star
**Video:** _TODO: add Loom link (max 5 minutes)_

## Table of Contents

- [Overview](#overview)
- [Why it is dangerous](#why-it-is-dangerous)
- [Reproduction](#reproduction)
- [Root cause](#root-cause)
- [Mitigation](#mitigation)
- [References](#references)

## Overview

The Juice Shop has an administration section that is not linked anywhere in the normal navigation. The route exists in the client side application and can be discovered by reading the JavaScript bundle. Reaching it is a matter of knowing the hidden path and holding a session the client accepts as administrator, rather than the server enforcing authorization on every request. This is a classic Broken Access Control finding combined with security through obscurity.

## Why it is dangerous

The administration section exposes sensitive functionality: the list of registered users and their data, and all customer feedback. An attacker who reaches it can read customer information and manage content that should be restricted to staff. The deeper problem is the pattern: when access control lives in the frontend and sensitive routes are merely hidden, anyone who inspects the shipped JavaScript or replays API calls can bypass it. The wider impact is disclosure of personal data, unauthorised administrative actions, and a false sense of security for the operator who believes the area is protected because it is not visible in the menu. In a real application this can mean a reportable data breach and manipulation of production data.

## Reproduction

**Preconditions:**

- Local instance running on `http://localhost:3000`
- An administrator session. The administration route is gated by a client side guard that checks the token role, so log in as administrator first using the [Login Admin](../login-admin/index.md) SQL injection, then continue here.

### Step 1: Discover the hidden route

The administration route is defined in the client side application code that is shipped to every visitor. Search the JavaScript bundle for the route path.

1. Open the browser developer tools, go to the **Sources** tab, open the main application bundle (for example `main.js`), and search for `administration`. The route path is defined there.

2. Alternatively, pull the bundle and grep for it from the terminal:

   ```bash
   curl -s http://localhost:3000/main.js | grep -o "administration"
   ```

   The match confirms that the client defines a route named `administration`.

![TODO caption: administration route found in the JS bundle](./img/admin-route-in-bundle.png)

### Step 2: Navigate to the administration section

1. With the administrator session active, open the hidden route directly in the browser:

   ```text
   http://localhost:3000/#/administration
   ```

2. The administration section loads and displays the registered users and the customer feedback.

![TODO caption: administration section showing users and feedback](./img/admin-section-open.png)

**Result:** The administration section is reached and its data is visible. The challenge is marked solved and the success notification appears.

## Root cause

Access to the administration area is controlled on the client side only. The route is defined in the Angular routing (`frontend/src/app/app.routing.ts`) with a client side guard (`frontend/src/app/admin-guard/admin.guard.ts`) that inspects the decoded token role in the browser. Hiding the route from the navigation and relying on a frontend guard is not a security control: the routing table is shipped to the client and the guard runs in code the attacker fully controls. Any sensitive endpoint that trusts the frontend to have performed the check, rather than verifying the caller's role server side on every request, is exposed.

## Mitigation

Enforce authorization on the server for every sensitive route and API endpoint, based on the authenticated user's role, and never rely on hidden routes or client side guards as the protection. Client side guards are only a user experience convenience.

Vulnerable (endpoint trusts that the frontend blocked non admins):

```js
app.get('/api/admin/users', (req, res) => {
  res.json(getAllUsers())
})
```

Secure (server verifies the role before serving):

```js
function requireAdmin (req, res, next) {
  if (req.user?.role !== 'admin') return res.sendStatus(403)
  next()
}

app.get('/api/admin/users', requireAdmin, (req, res) => {
  res.json(getAllUsers())
})
```

**Key takeaways:**

- Enforce access control server side on every request, deny by default, and check the authenticated user's role.
- Do not treat hidden routes or client side guards as security. Anything shipped to the browser is visible and controllable by the attacker.

## References

- OWASP Juice Shop project: https://owasp.org/www-project-juice-shop/
- OWASP Top 10 A01:2021 Broken Access Control: https://owasp.org/Top10/A01_2021-Broken_Access_Control/
- OWASP Authorization Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html