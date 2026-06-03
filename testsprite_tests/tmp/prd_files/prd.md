# FIFA 2026 Arena - Product Requirements Document

## Product Overview
FIFA 2026 Arena is a web-based football prediction platform for the 2026 FIFA World Cup. Users can predict match outcomes, climb a global leaderboard, and win prizes.

## Pages & Features

### 1. Home Page (/)
- Fixed navigation header with links to Home, Schedule, Predictions, Teams, Stadiums, Leaderboard
- Login and Join Now CTA buttons in header
- Hero section with headline "Predict Every Match. Shape the World Cup."
- "Start Predicting" primary CTA button
- "View Schedule" secondary CTA button
- Live scrolling ticker showing: Live Predictions count, Top Pick, Active Players, Prize Pool
- Featured Stars section with player prediction cards
- Smart Analytics panel (AI win probability, accuracy metrics)
- Elite Ranks mini-leaderboard preview
- Host Cities Guide section with city tags
- Floating "MATCH STARTING SOON" CTA (desktop only)
- Footer with Tournament and Legal links
- Mobile bottom navigation bar

### 2. Matches/Schedule Page (/matches)
- List of FIFA 2026 match schedule
- Match details including teams, date, time, venue

### 3. Dashboard/Predictions Page (/dashboard)
- User prediction management interface
- Submit and track predictions

### 4. Leaderboard Page (/leaderboard)
- Global rankings with points
- User standings and position

## Technical Requirements
- Framework: Next.js 16.2.7 (App Router)
- Language: TypeScript
- Styling: TailwindCSS v4
- No authentication system (Login/Join are placeholder buttons)
- Dark mode by default
- Responsive design (mobile and desktop)
- Dev server runs on http://localhost:3000
