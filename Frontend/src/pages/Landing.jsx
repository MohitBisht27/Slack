import Hero from "../components/LandingPage/Hero";
import Process from "../components/LandingPage/Process";
import About from "../components/LandingPage/About";
import Service from "../components/LandingPage/Service";
import Testimonial from "../components/LandingPage/Testimonial";
import Contact from "../components/LandingPage/Contact";
function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Process />
      <About />
      <Service />
      <Testimonial />
      <Contact />
    </div>
  );
}

export default Landing;
