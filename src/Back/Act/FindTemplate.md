# Requirements for the Template Path Resolution Action

## Overview

This document outlines the final requirements for implementing the `Fl64_Tmpl_Back_Act_FindTemplate` action, responsible
for locating a template file in the TeqFW system based on hierarchical rules and localization settings.

## Functional Requirements

### 1. **Input Parameters**

The action must accept the following parameters:

- **`pkg`** (`string`) – The name of the npm package (e.g., `@vendor/pkg`). If empty, the template is searched within
  the application itself.
- **`type`** (`string`) – The type of the template (e.g., `email`, `web`, `text`).
- **`name`** (`string`) – The template name, including relative path and extension (e.g., `welcome.html`).
- **`localeUser`** (`string`, optional) – The user's preferred locale (e.g., `en-US`).
- **`localeApp`** (`string`, optional) – The application's default locale (e.g., `en`).
- **`localePkg`** (`string`, optional) – The plugin's default locale (e.g., `en`).

### 2. **Processing Localization**

The system must:

- Process three levels of localization: **user locale**, **application default locale**, and **plugin default locale**.
- Convert complex locales (e.g., `en-US`) into a fallback simple locale (`en`).
- Ensure all locale variants are unique to avoid redundant checks.

### 3. **Search Order and Resolution**

The system must search for the template in the following order:

#### If `pkg` is **empty** (search within the application):

1. `./tmpl/{type}/{localeUser}/{name}`
2. `./tmpl/{type}/{localeUser.split('-')[0]}/{name}` *(fallback to base locale)*
3. `./tmpl/{type}/{localeApp}/{name}`
4. `./tmpl/{type}/{localeApp.split('-')[0]}/{name}`
5. `./tmpl/{type}/{localePkg}/{name}`
6. `./tmpl/{type}/{localePkg.split('-')[0]}/{name}`
7. `./tmpl/{type}/{name}` *(final fallback without locale)*

#### If `pkg` is **set** (search within a plugin):

1. `./tmpl/adapt/{pkg}/{type}/{localeUser}/{name}`
2. `./tmpl/adapt/{pkg}/{type}/{localeUser.split('-')[0]}/{name}`
3. `./tmpl/adapt/{pkg}/{type}/{localeApp}/{name}`
4. `./tmpl/adapt/{pkg}/{type}/{localeApp.split('-')[0]}/{name}`
5. `./tmpl/adapt/{pkg}/{type}/{localePkg}/{name}`
6. `./tmpl/adapt/{pkg}/{type}/{localePkg.split('-')[0]}/{name}`
7. `./tmpl/adapt/{pkg}/{type}/{name}` *(no locale fallback)*
8. `./node_modules/{pkg}/tmpl/{type}/{localeUser}/{name}`
9. `./node_modules/{pkg}/tmpl/{type}/{localeUser.split('-')[0]}/{name}`
10. `./node_modules/{pkg}/tmpl/{type}/{localeApp}/{name}`
11. `./node_modules/{pkg}/tmpl/{type}/{localeApp.split('-')[0]}/{name}`
12. `./node_modules/{pkg}/tmpl/{type}/{localePkg}/{name}`
13. `./node_modules/{pkg}/tmpl/{type}/{localePkg.split('-')[0]}/{name}`
14. `./node_modules/{pkg}/tmpl/{type}/{name}` *(final fallback)*

### 4. **Output**

The action must return an object with the fully qualified path (`fqn`) of the found template or `undefined` if no
template is found.

```json
{
  "fqn": "./tmpl/email/en/welcome.html"
}
```

If no template is found:

```json
{
  "fqn": undefined
}
```

### 5. **Logging and Error Handling**

- Log an **INFO** message if a template is found.
- Log a **WARN** message if no template is found, including the searched locales and package name.
- No exceptions should be thrown if a template is not found.
- The function must have a **single return point**.

## Non-Functional Requirements

- The action must follow **TeqFW coding standards**.
- JSDoc comments must be provided for all functions and parameters.
- The implementation must be **efficient**, avoiding redundant filesystem checks.
- The function must be **pure**, without modifying external states.

---

### **Conclusion**

This document ensures that the `Fl64_Tmpl_Back_Act_FindTemplate` action follows a structured, efficient, and
maintainable approach for template resolution in TeqFW applications and plugins.

