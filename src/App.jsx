import About from './components/About.jsx';
import Capabilities from './components/Capabilities.jsx';
import Contact from './components/Contact.jsx';
import ExperienceTimeline from './components/ExperienceTimeline.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Navigation from './components/Navigation.jsx';
import SelectedWork from './components/SelectedWork.jsx';
import { useReveal } from './hooks/useReveal.js';
import { useTheme } from './hooks/useTheme.js';

export default function App() {
  const { theme, preference, setPreference, toggle } = useTheme();
  useReveal();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation theme={theme} onToggleTheme={toggle} preference={preference} onSetPreference={setPreference} />
      <main id="main">
        <Hero />
        <SelectedWork />
        <Capabilities />
        <ExperienceTimeline />
        <About />
        <Contact />
      </main>
      <Footer preference={preference} onSetPreference={setPreference} />
    </>
  );
}
