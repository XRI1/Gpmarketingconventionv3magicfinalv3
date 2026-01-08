# GP Marketing Convention 2025 - Routing Documentation

This application now uses **react-router-dom** for client-side routing.

## Routes

### Authentication Flow
- `/` - Login page (Employee ID entry)
- `/otp` - OTP verification
- `/profile` - Profile verification with photo capture
- `/nid` - NID/Passport upload

### Main Application
- `/dashboard` - Main dashboard with all features

### Event Information
- `/schedule` - Event schedule
- `/venue` - Venue information with zone details
- `/transport` - Flight & bus information
- `/hotel` - Hotel rooms and facilities
- `/safety` - Safety marshalls and emergency contacts
- `/food` - Food preferences (if needed)

### Interactive Features
- `/photobooth` - AR Photobooth
- `/game` - Web game with leaderboard
- `/quiz` - Quiz & learning module
- `/gallery` - AI Gallery
- `/frames` - Social Frames (photo upload with branded frames)
- `/feedback` - Feedback form

### Photography Competition
- `/photography-competition` - Main competition page
- `/photo-upload` - Upload photos
- `/photo-submissions` - View submitted photos
- `/photo-leaderboard` - Competition leaderboard

### GP Squad Challenge
- `/squad` - Squad challenge main page (includes team chat, games, etc.)

### Notifications
- `/notifications` - View all notifications

## State Management

The application uses React Context API for global state management:

### AppContext
Located in `/contexts/AppContext.tsx`

**State:**
- `employeeId` - User's employee ID
- `userName` - User's full name
- `userPoints` - User's accumulated points

**Methods:**
- `setEmployeeId(id: string)` - Set employee ID
- `setUserName(name: string)` - Set user name
- `setUserPoints(points: number | ((prev: number) => number))` - Update points

### Usage Example

```tsx
import { useAppContext } from '../../contexts/AppContext';

function MyComponent() {
  const { userName, userPoints, setUserPoints } = useAppContext();
  
  // Update points
  const addPoints = (newPoints: number) => {
    setUserPoints(prev => prev + newPoints);
  };
  
  return <div>Welcome {userName}, you have {userPoints} points</div>;
}
```

## Navigation Hooks

### usePageNavigation
Located in `/hooks/usePageNavigation.ts`

**Methods:**
- `goBack()` - Navigate back one page
- `goHome()` - Navigate to dashboard
- `goTo(path: string)` - Navigate to specific path
- `navigate` - Direct access to react-router's navigate function

### Usage Example

```tsx
import { usePageNavigation } from '../../hooks/usePageNavigation';

function MyPage() {
  const { goBack, goHome, goTo } = usePageNavigation();
  
  return (
    <div>
      <button onClick={goBack}>Back</button>
      <button onClick={goHome}>Home</button>
      <button onClick={() => goTo('/schedule')}>View Schedule</button>
    </div>
  );
}
```

## Higher-Order Component (HOC)

### withRouterNavigation
Located in `/components/wrappers/WithRouterNavigation.tsx`

This HOC wraps components that still use the old callback-based navigation props (`onBack`, `onHome`, `onNavigate`, `onPointsEarned`) and automatically provides them with the new router-based implementations.

**Usage:**
```tsx
import { withRouterNavigation } from './components/wrappers/WithRouterNavigation';

const WrappedComponent = withRouterNavigation(MyOldComponent);
```

## Migration Notes

### Before (Old State-based Navigation)
```tsx
// App.tsx
const [currentPage, setCurrentPage] = useState<Page>('login');
const navigate = (page: Page) => setCurrentPage(page);

// Usage in component
<Dashboard onNavigate={navigate} />
```

### After (React Router)
```tsx
// App.tsx
<Route path="/dashboard" element={<Dashboard />} />

// Usage in component
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/schedule')}>Schedule</button>;
}
```

## Browser Features

With react-router-dom, the application now supports:
- ✅ Browser back/forward buttons
- ✅ Bookmarkable URLs
- ✅ Direct URL access (e.g., `/dashboard`, `/schedule`)
- ✅ URL sharing
- ✅ Browser history

## Development Tips

1. **Always use the `usePageNavigation` hook** for common navigation patterns
2. **Use `useAppContext`** to access and update global state
3. **Navigation paths** should always start with `/`
4. The `withRouterNavigation` HOC is used for **backward compatibility** - new components should use hooks directly
5. **Scroll to top** is automatically handled when navigating between pages
