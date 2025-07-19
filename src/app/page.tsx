// src/app/page.tsx
import SplitHero from '@/components/landing/SplitHero';
import TechStarfieldWarp from '@/components/about/TechStarfieldWarp';
import Resume from '@/components/sections/Resume';
import Projects from '@/components/sections/Projects';
import CompetitiveProgramming from '@/components/sections/CompetitiveProgramming';
import Extracurricular from '@/components/sections/Extracurricular';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <SplitHero />
      
      {/* Replace the About section with the TechStarfieldWarp */}
      <section id="about">
        <TechStarfieldWarp />
      </section>
      
      <Resume />
      <Projects />
      <CompetitiveProgramming />
      <Extracurricular />
      <Contact />
    </main>
  );
}