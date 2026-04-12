# CalmCreate

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)  
![Status](https://img.shields.io/badge/status-active-success.svg)  
![Built with](https://img.shields.io/badge/Built%20with-React-blue)

> **Note:** This is a prototype application developed for academic purposes. Some features (e.g., posting, billing, and analytics) are simulated and not connected to live platform APIs.

CalmCreate is an AI-powered social media content application designed to help newcomer entrepreneurs in Canada create short-form content with clarity, confidence, and consistency. It guides users from idea to execution through structured, step-by-step support that reduces uncertainty and enables action.

---

## Table of contents

- [Overview](#overview)  
- [Problem](#problem)  
- [Solution](#solution)  
- [Target users](#target-users)  
- [Core workflow](#core-workflow)  
- [How to use the application](#how-to-use-the-application)  
- [Features](#features)  
- [Implementation status](#implementation-status)  
- [Development process](#development-process)  
- [Challenges and learnings](#challenges-and-learnings)  
- [Technology stack](#technology-stack)  
- [Installation and setup](#installation-and-setup)  
- [Known limitations](#known-limitations)  
- [Example output](#example-output)  
- [Screenshots](#screenshots)  
- [Future improvements](#future-improvements)  
- [License](#license)  
- [Team](#team)  

---

## Live application

[Open CalmCreate](https://279f5d98-0236-4142-b67d-ee60b61efbd9-00-3fbd5vj7e3yi7.janeway.replit.dev/)

---

## Video walkthrough (≤ 7 minutes)

[Watch the demo (≤ 7 minutes)]https://youtu.be/vAZzZGJAFCk

---

## Overview

CalmCreate addresses a key challenge in digital entrepreneurship: many individuals are motivated to build a business or personal brand but lack the direction and clarity needed to execute effectively. The application focuses on helping users move from uncertainty to consistent action in content creation.

---

## Problem

Newcomer entrepreneurs in Canada often face challenges that go beyond simply starting a business — they must navigate an unfamiliar digital and cultural environment.

Key challenges include:

- uncertainty about what content works in the Canadian market  
- cultural hesitation and fear of posting something inappropriate  
- not knowing how to film or structure content  
- inconsistent posting habits  
- overthinking content decisions  
- eventual lack of action despite strong intentions  

Without structure and feedback, users hesitate, second-guess their ideas, and often stop creating content altogether. The core issue is not effort — it is a lack of clarity and confidence.

---

## Solution

To address this gap, CalmCreate provides a guided, AI-assisted workflow that transforms simple inputs into clear, actionable steps.

The system:

- learns user preferences such as business type and comfort level  
- generates relevant content ideas aligned with user context  
- converts a single input into a complete, ready-to-film content workflow  
- provides captions, hashtags, and filming guidance  
- guides users through execution from start to finish  

### Core value proposition

CalmCreate is a **decision-support and execution system**, not just a content generator. It reduces uncertainty, minimizes overthinking, and enables users to take consistent action in an unfamiliar digital environment.

---

## Target users

CalmCreate is designed for:

- newcomer entrepreneurs in Canada  
- individuals building a business or personal brand  
- early-stage content creators  
- users with limited experience in social media or marketing  

---

## Core workflow

1. user signs in  
2. enters business type and content idea  
3. selects comfort level (face or faceless)  
4. selects posting format  
5. receives a structured content kit  
6. follows guided filming instructions  
7. uses camera guide for framing  
8. marks content as complete  
9. copies caption and opens platform  

---

## How to use the application

1. sign in to the application  
2. enter your business type and content idea  
3. choose your comfort level (on-camera or faceless)  
4. select a posting format  
5. review the generated content kit  
6. follow the filming steps provided  
7. copy the caption and post on your preferred platform  

---

## Features

### Content kit generation

Converts a single user input into a complete content workflow including:

- content idea  
- explanation of relevance  
- script or B-roll plan  
- caption  
- hashtags  
- filming checklist  

---

### Voice-to-content

Transforms user input into:

- a ready-to-use script, or  
- a structured B-roll shot plan  

---

### Platform-aware guidance

Adapts content based on platform requirements:

- TikTok  
- Instagram (reel, story, feed)  
- Facebook  

Adjustments include orientation, pacing, framing, and safe zones.

---

### Comfort-based creation

Supports both:

- on-camera content  
- faceless content  

---

### Camera guide

Provides visual framing support and positioning guidance.  
Camera access requires user permission and a compatible browser environment.

---

### Simulated posting workflow

Allows users to:

- copy captions  
- open target platforms  
- restart the workflow  

---

### Authentication and accounts

Supports:

- user sign-in  
- session management  
- profile access  

---

### Freemium model

- free plan: 1 post per day  
- premium plan: unlimited posts ($5.99/month)  

---

### Prompt recall

Stores recent inputs for 24 hours for reuse.

---

## Implementation status

### Implemented

- content generation workflow  
- platform-aware formatting  
- camera guide interface  
- authentication and sessions  
- usage tracking  
- prompt recall  
- simulated posting  

### Simulated

- platform publishing  
- billing and subscriptions  
- analytics  

### Planned

- real-time trend detection  
- scheduling automation  
- templates and content planning tools  
- advanced personalization  

---

## Development process

CalmCreate was developed using Replit alongside AI tools including ChatGPT, Copilot, and Gemini.

AI was used to:

- generate React components  
- implement workflow logic  
- debug system issues and conflicts  

For example, modifying prompt logic occasionally impacted unrelated features, requiring iterative testing and refinement.

---

## Challenges and learnings

### Challenges

- AI requires constant refinement and precise instructions  
- integration with external platforms is complex  
- feature updates can introduce instability  
- managing version control requires coordination  

### Key learnings

- simplicity improves usability  
- clear guidance reduces user friction  
- small changes can affect system behavior  
- continuous testing is essential  

---

## Technology stack

**Frontend:** React (Vite), JavaScript, HTML/CSS  
**Backend:** Node.js  
**Database:** PostgreSQL  
**Authentication:** OIDC (Replit environment)  
**Tools:** Replit, ChatGPT, GitHub  

---

## Installation and setup

```bash
git clone https://github.com/jamshedx7/CalmCreate.git
cd CalmCreate
npm install
npm run dev
```
---
## Known limitations

- Limited platform integration (manual posting required)
- Personalization is still improving
- AI may not fully capture cultural nuance
- Data privacy considerations as the platform scales
- Usage limits for free users
- No real-time trend detection
- Camera requires browser permission

---

## Example output

**Input:**  
“I’m overwhelmed with orders but grateful my business is growing.”

**Output includes:**
- Script or B-roll plan
- Caption
- Hashtags
- Filming steps

---

## Screenshots

### Landing page – introduction to CalmCreate
![Landing Page](screenshots/01-landing-page.png)

### Login and authentication
![Login and authentication](screenshots/02-login-auth.png)

### Onboarding – country selection
![Country selection](screenshots/03-onboarding-country.png)

### Onboarding – language preference
![Language preference](screenshots/04-onboarding-language.png)

### Onboarding – content comfort level (on/off camera)
![Content comfort level](screenshots/05-onboarding-comfort.png)

### Onboarding – target audience
![Target audience](screenshots/06-onboarding-target.png)

### Onboarding – posting frequency
![Posting frequency](screenshots/07-onboarding-frequency.png)

### AI-generated content kit
![AI-generated content kit](screenshots/08-content-kit.png)

### Filming guidance (camera positioning)
![Filming guidance](screenshots/09-camera-guide.png)

### Workflow from idea to completion
![Workflow](screenshots/10-workflow.png)

### Final output – ready-to-post content
![Final output](screenshots/11-final-output.png)

---

## Future improvements

- AI-assisted video editing
- Performance insights and analytics
- Direct platform integration
- Content templates and planning tools
- Geographic expansion

---

## License

This project is licensed under the MIT License.  
See the LICENSE file for details.

---

## Team

- Kadi
- Jamshed
- Feyre
- Mohit
- Marcy

---

## Final statement

CalmCreate bridges the gap between thinking and doing. By transforming uncertainty into structured action, it enables users to consistently create, build confidence, and grow their digital presence over time.

---
