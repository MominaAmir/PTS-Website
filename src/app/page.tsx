import Hero from './components/Hero'
import Services from './components/Services'
import ProjectGallery from './components/ProjectGallery'
import ContactForm from './components/ContactForm'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Process from './components/Process'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <ProjectGallery />
      <Testimonials />
      <ContactForm />
      <CTA />
    </>
  )
}