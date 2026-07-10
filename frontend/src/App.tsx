import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioLayout from './PortfolioLayout';
import AdminLayout from './admin/layout/AdminLayout';
import Login from './admin/auth/Login';
import Dashboard from './admin/pages/Dashboard';
import ProjectsManager from './admin/pages/ProjectsManager';
import SkillsManager from './admin/pages/SkillsManager';
import ExperienceManager from './admin/pages/ExperienceManager';
import EducationManager from './admin/pages/EducationManager';
import CertificatesManager from './admin/pages/CertificatesManager';
import ServicesManager from './admin/pages/ServicesManager';
import MessagesManager from './admin/pages/MessagesManager';
import SocialManager from './admin/pages/SocialManager';
import ProfileManager from './admin/pages/ProfileManager';
import ResumeManager from './admin/pages/ResumeManager';
import SettingsManager from './admin/pages/SettingsManager';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Portfolio Route */}
        <Route path="/" element={<PortfolioLayout />} />
        
        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {/* We will add other routes here later */}
          <Route path="profile" element={<ProfileManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="skills" element={<SkillsManager />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="education" element={<EducationManager />} />
          <Route path="certificates" element={<CertificatesManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="resume" element={<ResumeManager />} />
          <Route path="messages" element={<MessagesManager />} />
          <Route path="social" element={<SocialManager />} />
          <Route path="settings" element={<SettingsManager />} />
        </Route>
      </Routes>
    </Router>
  );
}
