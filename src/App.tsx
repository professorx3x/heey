import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DisclaimerPage from './pages/DisclaimerPage'
import ComplimentsPage from './pages/ComplimentsPage'
import MemoriesPage from './pages/MemoriesPage'
import CertificationsPage from './pages/CertificationsPage'
import FinalePage from './pages/FinalePage'
import ThingsIAdorePage from './pages/ThingsIAdorePage'
import JourneyPage from './pages/JourneyPage'
import SafePlacePage from './pages/SafePlacePage'
import ForeverEnergyPage from './pages/ForeverEnergyPage'
import EveryTimeYouSmilePage from './pages/EveryTimeYouSmilePage'
import ThisIsMeBeingHonestPage from './pages/ThisIsMeBeingHonestPage'
import BeingWithYouFeelsEasyPage from './pages/BeingWithYouFeelsEasyPage'
import IfIHadToChoosePage from './pages/IfIHadToChoosePage'
import NotPromisesPage from './pages/NotPromisesPage'
import MusicPlayer from './components/MusicPlayer'
import FloatingThoughts from './components/FloatingThoughts'
import { IdleAnimation } from './components/MicroAnimations'

function App() {
  return (
    <div className="w-full h-full relative pointer-events-auto">
      <MusicPlayer />
      <FloatingThoughts />
      <IdleAnimation delay={5000} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/compliments" element={<ComplimentsPage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/finale" element={<FinalePage />} />
        <Route path="/adore" element={<ThingsIAdorePage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/safe-place" element={<SafePlacePage />} />
        <Route path="/forever" element={<ForeverEnergyPage />} />
        <Route path="/smile" element={<EveryTimeYouSmilePage />} />
        <Route path="/honest" element={<ThisIsMeBeingHonestPage />} />
        <Route path="/easy" element={<BeingWithYouFeelsEasyPage />} />
        <Route path="/choose" element={<IfIHadToChoosePage />} />
        <Route path="/promises" element={<NotPromisesPage />} />
      </Routes>
    </div>
  )
}

export default App
