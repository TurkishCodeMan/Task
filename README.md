# Real-Time News Tracker

A modern web and mobile application for tracking real-time news from various sources. Built with React, TypeScript, D3.js, and Ionic Capacitor.

## Features

- Real-time news updates from multiple sources
- Push notifications for new articles
- Interactive visualization of news publication times
- Source filtering and search functionality
- Responsive design for web and mobile
- Cross-platform mobile app support (iOS & Android)

## Technologies Used

- Frontend:
  - React.js with TypeScript
  - D3.js for data visualization
  - Custom CSS (no frameworks)
  - NewsAPI for real-time news data

- Mobile:
  - Ionic Capacitor.js
  - Native push notifications
  - Platform-specific optimizations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Xcode (for iOS development)
- Android Studio (for Android development)
- NewsAPI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/news-tracker.git
cd news-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your NewsAPI key:
```
REACT_APP_NEWS_API_KEY=your_api_key_here
REACT_APP_NEWS_API_BASE_URL=https://newsapi.org/v2
```

4. Start the development server:
```bash
npm start
```

### Building Mobile Apps

1. Build the web app:
```bash
npm run build
```

2. Add mobile platforms:
```bash
npx cap add ios
npx cap add android
```

3. Sync the web build with mobile platforms:
```bash
npx cap sync
```

4. Open native IDEs:
```bash
npx cap open ios     # For iOS
npx cap open android # For Android
```

## Project Structure

```
news-tracker/
├── src/
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── services/      # API and notification services
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   └── styles/        # CSS styles
├── ios/              # iOS platform files
├── android/          # Android platform files
└── public/           # Static assets
```

## Design Decisions

- **Custom CSS**: Implemented without frameworks for better control and optimization
- **TypeScript**: Used for type safety and better development experience
- **D3.js**: Chosen for complex data visualization requirements
- **Ionic Capacitor**: Selected for cross-platform mobile development
- **Component Structure**: Modular design for better maintainability

## Known Limitations

- NewsAPI free tier has request limits
- Push notifications require proper setup of APNS/FCM
- Real-time updates depend on API refresh rate

## Future Improvements

- Add user authentication
- Implement offline support
- Add more visualization options
- Enhance push notification customization
- Add unit and integration tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
