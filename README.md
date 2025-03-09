# @flancer64/teq-agave-tmpl

## Description

`@flancer64/teq-agave-tmpl` is a plugin for **Tequila Framework (TeqFW)** that enables server-side rendering (SSR) and
text-based content generation (HTML, JSON, XML, YAML, etc.) using **Mustache**.

The plugin manages templates stored in teq-plugins and teq-applications, dynamically selecting the most suitable
versions based on the user's locale. It supports structured template organization, partials, and overrides, allowing
applications to use built-in plugin templates or replace them with custom ones.

## Features

- **Server-side rendering (SSR)** of Mustache templates.
- **Locale-aware template selection**, adapting to the user's language preferences.
- **Structured template management**, with templates stored at the plugin and application levels.
- **Dynamic template handling**, supporting partials and application-level overrides.

This plugin provides a flexible solution for generating localized content, making it an essential tool for rendering web
pages, email templates, and other structured text formats within **TeqFW**.

## Integration

- `Fl64_Paypal_Back_Api_Adapter`: implement this interface in an application.