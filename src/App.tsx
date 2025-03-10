import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { HomePage } from './pages/home';
import { AdminLoginPage } from './pages/admin/login';
import { AdminDashboardPage } from './pages/admin/dashboard';
import { ExamPage } from './pages/exam';
import { ExamResultPage } from './pages/exam-result';
import { ExamReviewPage } from './pages/exam-review';
import { Layout } from './components/layout';
import { CreateExamPage } from './pages/admin/create-exam';
import { ManageTestsPage } from './pages/admin/manage-tests';
import { AboutPage } from './pages/about';
import { ContactPage } from './pages/contact';
import { ThemeProvider } from './lib/theme-context';
import { LanguageProvider } from './lib/language-context';
import { AuthProvider } from './lib/auth-context';
import { ProtectedRoute } from './components/protected-route';
import { EditExamPage } from './pages/admin/edit-exam';
import { ExamsPage } from './pages/exams';
import { StreamExamsPage } from './pages/exams/stream-exams';

function App() {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').catch((error) => {
          console.error('Service worker registration failed:', error);
        });
      });
    }

    // Request notification permission
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <Routes>
              <Route element={<Layout />}>
                {/* Public Routes */}
                <Route index element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/exams" element={<ExamsPage />} />
                <Route path="/exams/:stream" element={<StreamExamsPage />} />
                <Route path="/exam/:examId" element={<ExamPage />} />
                <Route path="/exam/:examId/result" element={<ExamResultPage />} />
                <Route path="/exam/:examId/review" element={<ExamReviewPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/admin/create-exam" element={<CreateExamPage />} />
                  <Route path="/admin/edit-exam/:id" element={<EditExamPage />} />
                  <Route path="/admin/manage-tests" element={<ManageTestsPage />} />
                  <Route path="/admin/manage-tests/:category" element={<ManageTestsPage />} />
                </Route>

                {/* Catch all unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;