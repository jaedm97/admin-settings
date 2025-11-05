# WPReactPanel — WP React Admin Settings Builder

Create a beautiful WordPress plugin settings page with React, ShadCDN UI, and TypeScript, easily and quickly.

## Documentation

Please read the complete documentation here - https://jaedpro.com/wp-react-panel/

## Notes

- All field values are automatically saved to WordPress options using `update_option()` with the field `id` as the option name
- The settings page uses WordPress REST API for saving settings
- Only users with the specified `capability` can access the settings page
- The React frontend is built from `wp-react-panel/build/` directory
- Make sure to build the React application before using this class

---

## Field Type Summary

| Type | Description | Multiple Values | Example Use Case |
|------|-------------|----------------|------------------|
| `text` | Single-line text input | No | Application name, message |
| `switch` | Toggle on/off | No | Enable/disable features |
| `number` | Numeric input | No | Maximum users, timeouts |
| `password` | Masked password input | No | API keys, secrets |
| `radio` | Single choice from options | No | Mode selection, format choice |
| `select` | Dropdown selection | Yes (with `multiple`) | Method selection, role selection |
| `checkbox` | Multiple selections | Yes | Feature toggles, requirements |
| `tags` | Multiple tag-like values | Yes | Email lists, IP addresses |
| `datetime` | Date/time picker | No | Schedules, maintenance windows |
