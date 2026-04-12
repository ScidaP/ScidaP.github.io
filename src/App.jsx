import Navbar from './components/Navbar'
import Projects from './components/Projects'
import PrivacyPolicies from './components/PrivacyPolicies'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen" style={{ backgroundColor: '#F8F7F4' }}>
        <Navbar />
        <main>
          <Projects />
          <PrivacyPolicies />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
