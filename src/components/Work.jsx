import { useEffect, useRef } from 'react';

const Work = () => {
  const sectionRef = useRef(null);
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    cardRefs.current.forEach((card) => { if (card) observer.observe(card); });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      emoji: '🌿',
      title: 'EcoMarket',
      subtitle: 'Full-stack e-commerce platform',
      description:
        'A production-ready marketplace built with Django REST Framework and React. Features eSewa & Khalti payment gateway integration, a Green Points loyalty system, multi-step seller onboarding, real-time order chat, and JWT-based authentication.',
      tech: ['Django', 'React', 'DRF', 'JWT', 'eSewa', 'Khalti', 'SQLite'],
      featured: true,
      accent: '#22c55e',
    },
    {
      emoji: '📦',
      title: 'Delivery Simulation',
      subtitle: 'Unity AI multi-agent system',
      description:
        'Multi-agent delivery simulation in Unity using C# with A* pathfinding, dynamic collision avoidance, and a live UI dashboard tracking each agent in real-time.',
      tech: ['Unity', 'C#', 'A*', 'Pathfinding', 'Raycast'],
      featured: true,
      accent: '#f59e0b',
    },
    {
      emoji: '☁️',
      title: 'Weather Now',
      subtitle: 'Real-time weather dashboard',
      description:
        'Weather application with PHP backend, MySQL-stored search history, and OpenWeather API integration. Supports live forecasts and location-based queries.',
      tech: ['PHP', 'JavaScript', 'MySQL', 'OpenWeather API'],
      featured: false,
      accent: '#38bdf8',
    },
    {
      emoji: '🚲',
      title: 'Bike Rental System',
      subtitle: 'Django booking platform',
      description:
        'Responsive web application built with Django templates and ORM for managing bike bookings, availability scheduling, and customer records.',
      tech: ['Django', 'HTML/CSS', 'Django ORM', 'SQLite'],
      featured: false,
      accent: '#fb923c',
    },
    {
      emoji: '🗣️',
      title: 'LangLearn',
      subtitle: 'Figma UI/UX prototype',
      description:
        'High-fidelity Figma prototype for a language learning app supporting English, Spanish, Hindi, and French. Uses auto-layout, interactive components, and full user flow prototyping.',
      tech: ['Figma', 'Auto Layout', 'Prototyping', 'UI Design'],
      featured: false,
      accent: '#a78bfa',
    },
  ];

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title fade-in" ref={sectionRef}>
          Projects
        </h2>

        {/* Featured row — large cards */}
        <div className="projects-featured">
          {featured.map((project, i) => (
            <div
              key={project.title}
              className="project-card project-card--featured"
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ '--card-accent': project.accent }}
            >
              <div className="project-card__header">
                <span className="project-emoji">{project.emoji}</span>
                <span className="project-badge">Featured</span>
              </div>
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__subtitle">{project.subtitle}</p>
              <p className="project-card__desc">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Regular grid */}
        <div className="projects-grid">
          {rest.map((project, i) => (
            <div
              key={project.title}
              className="project-card"
              ref={(el) => (cardRefs.current[featured.length + i] = el)}
              style={{ '--card-accent': project.accent }}
            >
              <div className="project-card__header">
                <span className="project-emoji">{project.emoji}</span>
              </div>
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__subtitle">{project.subtitle}</p>
              <p className="project-card__desc">{project.description}</p>
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
