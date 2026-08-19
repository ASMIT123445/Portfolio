import { useEffect, useRef } from 'react';

const projects = [
  {
    image: '/src/assets/ecomarket.png',
    title: 'EcoMarket',
    subtitle: 'Full-stack e-commerce platform',
    description: 'Production-ready marketplace with Django REST & React, eSewa/Khalti payments, Green Points loyalty system, and JWT auth.',
    tech: ['Django', 'React', 'DRF', 'JWT', 'eSewa', 'Khalti'],
    accent: '#22c55e',
  },
  {
    image: '/src/assets/deliverySimulation.png',
    title: 'Delivery Simulation',
    subtitle: 'Unity AI multi-agent system',
    description: 'Multi-agent delivery simulation in Unity with A* pathfinding, dynamic collision avoidance, and a real-time UI dashboard.',
    tech: ['Unity', 'C#', 'A*', 'Pathfinding', 'Raycast'],
    accent: '#f59e0b',
  },
  {
    image: '/src/assets/weatherNow.png',
    title: 'Weather Now',
    subtitle: 'Real-time weather dashboard',
    description: 'Weather app with PHP backend, MySQL search history, and OpenWeather API for live forecasts and location-based queries.',
    tech: ['PHP', 'JavaScript', 'MySQL', 'OpenWeather API'],
    accent: '#38bdf8',
  },
  {
    image: '/src/assets/bikeRental.png',
    title: 'Bike Rental System',
    subtitle: 'Django booking platform',
    description: 'Web app built with Django templates and ORM for managing bike bookings, availability scheduling, and customer records.',
    tech: ['Django', 'HTML/CSS', 'Django ORM', 'SQLite'],
    accent: '#fb923c',
  },
  {
    image: '/src/assets/langLearn.png',
    title: 'LangLearn',
    subtitle: 'Figma UI/UX prototype',
    description: 'High-fidelity Figma prototype for a language learning app with auto-layout, interactive components, and full user flow.',
    tech: ['Figma', 'Auto Layout', 'Prototyping', 'UI Design'],
    accent: '#a78bfa',
  },
];

const Work = () => {
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    cardRefs.current.forEach((card) => { if (card) observer.observe(card); });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title fade-in" ref={titleRef}>Projects</h2>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="project-card"
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ '--card-accent': project.accent }}
            >
              {/* project screenshot */}
              <div className="project-card__image">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="project-card__image-fallback">{project.title}</span>
              </div>

              {/* text content */}
              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__subtitle">{project.subtitle}</p>
                <p className="project-card__desc">{project.description}</p>
              </div>

              {/* tech pills */}
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
