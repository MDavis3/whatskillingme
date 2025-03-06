# Backup Directory

This directory contains information about components, screens, and types that have been temporarily commented out or removed from the active codebase during the simplification of the WhatsKillingMe app.

## Purpose

The WhatsKillingMe app has been simplified to focus on the core functionality of logging activities and getting lifespan impact calculations. This directory serves as a reference for the original, more complex version of the app, which included features like:

- Onboarding flow
- User profiles
- Questionnaires
- Challenges
- Detailed analytics
- Milestones
- Health condition tracking

## Contents

- `UNUSED_COMPONENTS.md`: Lists all the components, screens, types, and utilities that are not used in the simplified version of the app.

## Reincorporating Features

If you want to reincorporate any of these features in the future, refer to the `UNUSED_COMPONENTS.md` file for guidance on how to do so. The original code has been preserved in the codebase but commented out in the relevant files.

## Simplified App Structure

The simplified app consists of the following main components:

1. **HomeScreen**: Displays a list of log entries and total impact
2. **AddLogScreen**: Allows users to add new log entries
3. **LogDetailsScreen**: Shows detailed information about a log entry
4. **SettingsScreen**: Provides app information and data management options

The app uses the following services:
- **storageService.ts**: Handles local storage of log entries
- **llmService.ts**: Analyzes log entries using the Gemini API

## Future Development

This backup directory serves as a reference for future development. As the app evolves, you may want to reincorporate some of the more advanced features that were removed during simplification. 