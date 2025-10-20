# Quiz Master - Web3Bridge Cohort XIII Pre-Qualification Exercise

A modern, interactive quiz game built with React, TypeScript, and Tailwind CSS. Features a beautiful UI, timer-based questions, score tracking, and a persistent leaderboard.

## 🎯 Features

- **Dynamic Questions**: Questions loaded from JSON file with robust error handling
- **Timer System**: 30-second countdown for each question
- **Real-time Feedback**: Instant visual feedback on answer correctness
- **Score Tracking**: Track your progress throughout the quiz
- **Leaderboard**: Save and view top 10 high scores (stored in localStorage)
- **Responsive Design**: Beautiful UI that works on all devices
- **Smooth Animations**: Engaging transitions and celebratory effects
- **Error Handling**: Graceful handling of missing or invalid data
- **Progress Tracking**: Visual progress bar and question counter

## 🚀 Live Demo

[View Live Demo](https://your-demo-link-here.vercel.app)

## 🛠️ Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **shadcn/ui** - Component library
- **Lucide React** - Icons
- **React Router** - Navigation

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quiz-master.git
cd quiz-master
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🎮 How to Play

1. **Start**: Click "Start Quiz" on the home screen
2. **Answer**: Select your answer from the four options provided
3. **Timer**: Each question has a 30-second timer
4. **Feedback**: Get instant feedback on your answer
5. **Progress**: Track your score and progress throughout the quiz
6. **Results**: View your final score and percentage
7. **Leaderboard**: Save your score and compete with others

## 📁 Project Structure

```
src/
├── components/
│   └── quiz/
│       ├── QuizHome.tsx       # Home screen
│       ├── QuizGame.tsx       # Main quiz interface
│       ├── Question.tsx       # Question display component
│       ├── Results.tsx        # Results screen
│       ├── Leaderboard.tsx    # Leaderboard display
│       └── Timer.tsx          # Timer component
├── hooks/
│   └── useQuiz.ts            # Quiz logic hook
├── types/
│   └── quiz.ts               # TypeScript interfaces
├── data/
│   └── questions.json        # Quiz questions
└── pages/
    └── Index.tsx             # Main page component
```

## 🎨 Customization

### Adding Questions

Edit `src/data/questions.json`:

```json
{
  "id": 1,
  "question": "Your question here?",
  "options": [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4"
  ],
  "correctAnswer": 0,
  "category": "Category Name",
  "difficulty": "easy"
}
```

### Changing Timer Duration

Edit `QUESTION_TIME` in `src/hooks/useQuiz.ts`:

```typescript
const QUESTION_TIME = 30; // seconds
```

### Styling

The app uses Tailwind CSS with custom design tokens defined in:
- `src/index.css` - CSS variables and design system
- `tailwind.config.ts` - Tailwind configuration

## 🧪 Testing

Run tests:
```bash
npm test
```

## 🏗️ Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🚀 Deployment

### GitHub Pages

1. Update `vite.config.ts` with your repository name
2. Run: `npm run build`
3. Deploy the `dist` folder to GitHub Pages

### Vercel

1. Connect your GitHub repository to Vercel
2. Deploy automatically on push

### Netlify

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

## 🔒 Error Handling

The app includes comprehensive error handling:

- **Missing Questions**: Validates questions.json structure
- **Invalid Data**: Filters out malformed questions
- **Timer Expiry**: Auto-submits when time runs out
- **Network Issues**: Graceful fallbacks for data loading

## 🤝 Git Workflow

This project follows professional git practices:

- Feature branches for new features
- Pull requests for code review
- Semantic commit messages
- Clean commit history

## 📝 Additional Features Implemented

✅ TypeScript for type safety  
✅ Timer for each question  
✅ Leaderboard with localStorage  
✅ Responsive design  
✅ Error handling  
✅ Progress tracking  
✅ Smooth animations  
✅ Professional UI/UX  

## 👤 Author

Created by [Your Name] for Web3Bridge Cohort XIII Pre-Qualification Exercise

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- Web3Bridge for the opportunity
- shadcn/ui for beautiful components
- The React community for excellent documentation
