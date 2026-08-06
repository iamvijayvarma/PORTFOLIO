import { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Splash } from './components/Splash';

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  // Disable scroll while splash curtain overlay is active
  useEffect(() => {
    if (!introFinished) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [introFinished]);

  // Triggered when splash reaches its exit morph phase (curtain lift start)
  const handleMorphStart = () => {
    const content = document.getElementById('portfolio-content');
    if (content) {
      content.classList.remove('initial-hide');
    }
  };

  // Triggered when splash completes its fade-out
  const handleSplashComplete = () => {
    setIntroFinished(true);
    // Ensure final state is 100% visible and scrollable
    const content = document.getElementById('portfolio-content');
    if (content) {
      content.classList.remove('initial-hide');
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-accent selection:text-black noise-bg">
      <CustomCursor />
      {/* 
        Static Underlay Page.
        Rendered underneath from frame one with initial-hide class (defined in index.html head) 
        to guarantee 0% opacity and 100% hidden state on the very first paint.
        Transition is triggered by removing the class when the splash morphs.
      */}
      <div
        id="portfolio-content"
        className="initial-hide transition-opacity duration-700 ease-in-out"
      >
        <BackgroundCanvas />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Achievements />
          <Contact />
        </main>

        <Footer />
      </div>

      {/* Splash curtain overlay sits on top using z-index: 999999 */}
      {!introFinished && (
        <Splash
          onMorphStart={handleMorphStart}
          onComplete={handleSplashComplete}
        />
      )}
    </div>
  );
}

export default App;
