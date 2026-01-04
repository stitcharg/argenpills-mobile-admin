# Argenpills Mobile Admin - Agent Documentation

This file contains architectural and technical information about the project, intended as a guide for AI agents and maintainers.

## Project Overview
Argenpills Mobile Admin is a management dashboard built with **React Admin 4**, **Vite**, and **Bun**. It manages content for the Argenpills mobile ecosystem, including pills, AI bot behaviors, facts (consejos), and training data.

## Technical Stack
- **Runtime:** Bun
- **Framework:** React Admin (v4+)
- **Build Tool:** Vite
- **Styling:** Material UI (@material-ui/core and @mui/material)

## Project Structure
- `/src/providers`: Contains custom Data Providers.
  - `dataprovider.jsx`: Main provider for pills, handles complex Form Data (images).
  - `factsprovider.jsx`: Standard REST-ish provider for "Consejos". Maps `Id` -> `id` and `text` -> `fact`.
  - `trainingprovider.jsx`: Provider for AI training rules.
  - `aibotprovider.jsx`: Provider for Telegram bot interaction history.
  - `aireviewsbotprovider.jsx`: Provider for AI-generated reviews based on bot interactions.
  - `combineproviders.jsx`: Aggregates all providers using `combineDataProviders`.
- `/src/components`: UI components organized by resource.
  - `/pills`: Management for "Pastillas" (pills). Holds complex logic for image uploads.
  - `/facts`: Management for "Consejos" (facts).
  - `/aibot`: History and training data management for the Telegram bot.
  - `/aireviewbot`: Management for AI-generated reviews.
- `/src/tools`: Utility functions.
  - `httpClient.tsx`: Custom fetch wrapper that automatically appends the `Authorization` Bearer token from local storage.

## Data Providers and Endpoints
The application uses multiple specialized data providers because the backend API endpoints vary in their response formats and authorization requirements.

### Mapping Summary
| Resource | Backend Path | Provider | Notes |
| :--- | :--- | :--- | :--- |
| `items` | `/items` | `apPillProvider` | Handles multi-part/form-data for images. |
| `facts` | `/facts` | `apFactsProvider` | Maps `text` to `fact` and `Id` to `id`. |
| `trainingdata` | `/trainingdata` | `apAiTrainingProvider` | Simple fetch-based REST provider. |
| `aibot` | `/aibothistory` | `apAiBotHistoryProvider` | Fetch history with optional date filtering. |
| `aireviewsbot` | `/aireviews` | `apAiBotReviewProvider` | AI review logs with date and post status filters. |

## Notable Implementation Details
- **Authentication**: JWT-based. The token is stored in `localStorage.getItem('token')`.
- **Facts (Consejos)**: Represented in the UI as `fact` but stored in the backend as `text`. The `used` field is numeric (0/1) in the API but boolean in the UI.
- **Image CDN**: Assets are served via a CDN defined in `VITE_CDN_IMAGES`.
- **Environment Variables**:
  - `VITE_ENDPOINT`: Base API URL.
  - `VITE_CDN_IMAGES`: CDN URL for images.
