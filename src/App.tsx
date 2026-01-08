import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { withRouterNavigation } from './components/wrappers/WithRouterNavigation';
import { LoginPage } from './components/pages/LoginPage';
import { OTPPage } from './components/pages/OTPPage';
import { ProfileVerificationPage } from './components/pages/ProfileVerificationPage';
import { NIDUploadPage } from './components/pages/NIDUploadPage';
import { Dashboard } from './components/pages/Dashboard';
import { NotificationPage } from './components/pages/NotificationPage';
import { FoodPreferencePage } from './components/pages/FoodPreferencePage';
import { EventSchedulePage } from './components/pages/EventSchedulePage';
import { VenueInfoPage } from './components/pages/VenueInfoPage';
import { TransportPage } from './components/pages/TransportPage';
import { HotelPage } from './components/pages/HotelPage';
import { SafetyPage } from './components/pages/SafetyPage';
import { AIPhotoboothPage } from './components/pages/AIPhotoboothPage';
import { WebGamePage } from './components/pages/WebGamePage';
import { QuizPage } from './components/pages/QuizPage';
import { FeedbackPage } from './components/pages/FeedbackPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { PhotographyCompetitionPage } from './components/pages/PhotographyCompetitionPage';
import { PhotoUploadPage } from './components/pages/PhotoUploadPage';
import { MySubmissionsPage } from './components/pages/MySubmissionsPage';
import { PhotoLeaderboardPage } from './components/pages/PhotoLeaderboardPage';
import { SquadChallenge } from './components/pages/squad/SquadChallenge';
import { SocialFramesPage } from './components/pages/SocialFramesPage';

// Wrap components that still use old navigation props
const WrappedFoodPreferencePage = withRouterNavigation(FoodPreferencePage);
const WrappedEventSchedulePage = withRouterNavigation(EventSchedulePage);
const WrappedVenueInfoPage = withRouterNavigation(VenueInfoPage);
const WrappedTransportPage = withRouterNavigation(TransportPage);
const WrappedHotelPage = withRouterNavigation(HotelPage);
const WrappedSafetyPage = withRouterNavigation(SafetyPage);
const WrappedAIPhotoboothPage = withRouterNavigation(AIPhotoboothPage);
const WrappedFeedbackPage = withRouterNavigation(FeedbackPage);
const WrappedGalleryPage = withRouterNavigation(GalleryPage);
const WrappedPhotographyCompetitionPage = withRouterNavigation(PhotographyCompetitionPage);
const WrappedPhotoUploadPage = withRouterNavigation(PhotoUploadPage);
const WrappedMySubmissionsPage = withRouterNavigation(MySubmissionsPage);
const WrappedPhotoLeaderboardPage = withRouterNavigation(PhotoLeaderboardPage);
const WrappedSquadChallenge = withRouterNavigation(SquadChallenge);
const WrappedSocialFramesPage = withRouterNavigation(SocialFramesPage);

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-slate-900">
          <Routes>
            {/* Authentication Flow */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/profile" element={<ProfileVerificationPage />} />
            <Route path="/nid" element={<NIDUploadPage />} />
            
            {/* Main Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Dashboard Pages */}
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/schedule" element={<WrappedEventSchedulePage />} />
            <Route path="/venue" element={<WrappedVenueInfoPage />} />
            <Route path="/transport" element={<WrappedTransportPage />} />
            <Route path="/hotel" element={<WrappedHotelPage />} />
            <Route path="/safety" element={<WrappedSafetyPage />} />
            <Route path="/food" element={<WrappedFoodPreferencePage />} />
            
            {/* Interactive Features */}
            <Route path="/photobooth" element={<WrappedAIPhotoboothPage />} />
            <Route path="/game" element={<WebGamePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/feedback" element={<WrappedFeedbackPage />} />
            <Route path="/gallery" element={<WrappedGalleryPage />} />
            <Route path="/frames" element={<WrappedSocialFramesPage />} />
            
            {/* Photography Competition */}
            <Route path="/photography-competition" element={<WrappedPhotographyCompetitionPage />} />
            <Route path="/photo-upload" element={<WrappedPhotoUploadPage />} />
            <Route path="/photo-submissions" element={<WrappedMySubmissionsPage />} />
            <Route path="/photo-leaderboard" element={<WrappedPhotoLeaderboardPage />} />
            
            {/* GP Squad Challenge */}
            <Route path="/squad" element={<WrappedSquadChallenge />} />
            
            {/* Catch all - redirect to login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}