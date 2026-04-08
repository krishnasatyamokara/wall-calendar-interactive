# Wall Calendar Interactive

A polished, interactive React component inspired by physical wall calendars. This project demonstrates high-quality frontend engineering with a focus on UX, animations, and responsive design.

## ✨ Features

- **Wall Calendar Aesthetic**: A visual hierarchy that pairs beautiful monthly hero imagery with a clean date grid.
- **Day Range Selector**: Intuitive start and end date selection with clear visual feedback for the selected range.
- **Integrated Notes Section**:
  - Add notes to specific dates or the general month.
  - **Expandable Cards**: Click to reveal full content and metadata.
  - **In-place Editing**: Modify your notes directly within the card.
  - **Persistence**: Notes are saved to `localStorage`.
- **Tactile Animations**:
  - "Sticky note" feel with subtle tilts and shadow lifts on hover.
  - Smooth "flipping" transitions between months.
  - Staggered entrance animations for a premium feel.
- **Fully Responsive**: Flawless transition from side-by-side desktop panels to a stacked mobile layout.

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.0
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Motion](https://motion.dev/) (formerly Framer Motion)
- **Date Utilities**: [date-fns](https://date-fns.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Design Choices

- **Typography**: Paired *Playfair Display* for its elegant, editorial feel with *Inter* for maximum legibility in functional areas.
- **Color Palette**: Used a warm "off-white" (`#fdfcfb`) for the background to mimic high-quality paper, contrasted with a deep "ink" black (`#1a1a1a`).
- **UX Details**: Added a "Today" button for quick navigation and a "hanging hole" decorative element to reinforce the wall calendar metaphor.

## 📄 License

This project is licensed under the Apache-2.0 License.
