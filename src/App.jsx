import { Routes, Route } from 'react-router-dom';

import { RegProvider } from './context/RegContext';
import { ScoreProvider } from './context/ScoreContext';

import RegForm from "./pages/RegPage";
import QuestionarioPage from "./pages/QuestionarioPage";
import ResultadoPage from "./pages/ResultadoPage";
import TermosPage from "./pages/TermosPage";
import CathAllPage from './pages/CathAllPage';
import Footer from './components/Footer';
import ProtectedRoute from './utils/ProtectedRoute';
import { DateProvider } from './context/DateContext';
import ScrollToTop from './utils/ScrollToTop';
import AdminPage from './pages/AdminPage';
import Header from './components/Header';

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      <Header />

      <main className='flex-1'>
        <RegProvider>
          <ScoreProvider>
            <DateProvider>
              <Routes>
                <Route path="/" element={<RegForm />} />
                
                <Route path="/questionario" 
                element={
                <ProtectedRoute>
                <QuestionarioPage />
                </ProtectedRoute>} />

                <Route path="/resultado"
                element={
                <ProtectedRoute>
                <ResultadoPage />
                </ProtectedRoute>} />

                <Route path="/termos" element={<TermosPage />} />

                <Route path="/admin" 
                element={
                    <AdminPage />
                } />

                <Route path="*" element={<CathAllPage />} />
              </Routes>
            </DateProvider>
          </ScoreProvider>
        </RegProvider>
      </main>

      <Footer />
      
    </div>
  );
}

export default App;
