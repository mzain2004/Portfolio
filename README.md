# 🛡️ Cyber Security & Cloud Engineering Portfolio

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-mzain.me-success)](https://mzain.me)
[![Deployment Status](https://github.com/mzain2004/Portfolio/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/mzain2004/Portfolio/actions)

Welcome to the **Cyber Security & Cloud Engineering Portfolio** of **Muhammad Zain**. This project is a modern, high-performance web portfolio built to showcase security expertise, cloud architecture skills, and software engineering projects.

It features a unique "Hacker Mode", a dynamic content management system (CMS), and real-time GitHub integration.

## ✨ Key Features

*   **🎨 Glassmorphism Design**: A sleek, modern UI with frosted glass effects and smooth transitions.
*   **🕵️ Hacker Mode**: A toggleable theme that transforms the UI into a classic terminal green/black aesthetic.
*   **📊 Dynamic Data Store**: All content (experience, certifications, skills) is managed via `data.js`, acting as a lightweight database.
*   **🛠️ Admin Command Center**: A built-in CMS (`admin.html`) to manage portfolio content without editing code.
*   **🐙 GitHub Integration**: Automatically fetches repositories, languages, and stats using the GitHub API.
*   **📱 Fully Responsive**: Optimized for all devices, from mobile phones to 4K desktops.
*   **⚡ Performance Optimized**: Uses Vanilla JS and optimized assets for lightning-fast load times.

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/mzain2004/Portfolio.git
cd Portfolio
```

### 2. Resume Setup (CRITICAL) 📄
The download button is pre-configured to look for a specific file. **You must add your resume file for the link to work.**

1.  Export your resume as a **PDF**.
2.  Rename the file to `resume.pdf`.
3.  Place it in the **root directory** (same folder as `index.html`).

*Note: The button will download the file as `Muhammad_Zain_Resume.pdf` automatically.*

### 3. Run Locally
Simply open `index.html` in your browser. No build process or server installation is required for the main site!

## ⚙️ Configuration

### Manual Configuration
You can edit the `data.js` file directly to update your personal information:

```javascript
const portfolioData = {
    githubUsername: "mzain2004", // Change to your GitHub username
    // ... update skills, experience, and certifications here
};
```

### Using the Admin Command Center 🎛️
The `admin.html` file is a powerful tool to manage your portfolio content.

1.  **Generate a GitHub Token**:
    *   Go to GitHub Settings -> Developer Settings -> Personal Access Tokens (Classic).
    *   Generate a new token with `repo` scope (to allow updating `data.js`).
2.  **Access the Admin Panel**:
    *   Open `admin.html` in your browser.
    *   Enter your Personal Access Token (PAT).
3.  **Manage Content**:
    *   Use the dashboard to update stats, add job roles, or manage certifications.
    *   Click **"Save Changes"** to commit updates directly to your GitHub repository!

**Note:** The token is stored locally in your browser's `localStorage` and is used only to communicate directly with the GitHub API.

## 📦 Deployment

### GitHub Pages (Recommended)
1.  Go to your repository settings on GitHub.
2.  Navigate to the "Pages" section.
3.  Select `main` branch as the source.
4.  (Optional) Add your custom domain in the "Custom domain" field (current: `mzain.me`).

## 🛠️ Technologies Used

*   **Frontend**: HTML5, Tailwind CSS (via CDN), Vanilla JavaScript.
*   **Libraries**:
    *   [Particles.js](https://vincentgarreau.com/particles.js/) - Background animations.
    *   [Vanilla-Tilt.js](https://micku7zu.github.io/vanilla-tilt.js/) - 3D hover effects.
    *   [Chart.js](https://www.chartjs.org/) - Skill radar chart.
    *   [FontAwesome](https://fontawesome.com/) - Icons.
*   **Font**: Inter & Space Grotesk (Google Fonts).

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---
<p align="center">
  Built with ❤️ and ☕ by <a href="https://github.com/mzain2004">Muhammad Zain</a>
</p>
