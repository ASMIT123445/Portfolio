import { useEffect, useRef } from 'react';

const stacks = [
  {
    category: 'Frontend',
    icon: '🖥️',
    items: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Figma'],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    items: ['Django', 'Django REST Framework', 'PHP', 'Python', 'JWT Auth'],
  },
  {
    category: 'Database',
    icon: '🗄️',
    items: ['SQLite', 'MySQL', 'Django ORM'],
  },
  {
    category: 'Payments & APIs',
    icon: '💳',
    items: ['eSewa', 'Khalti', 'OpenWeather API'],
  },
  {
    category: 'Tools & Platforms',
    icon: '🛠️',
    items: ['Git', 'GitHub', 'Unity (C#)', 'VS Code', 'Postman'],
  },
  {
    category: 'Concepts',
    icon: '💡',
    items: ['REST APIs', 'A* Pathfinding', 'Multi-agent AI', 'Clean Architecture', 'Responsive Design'],
  },
];

const TechStack = () => {
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stack">
      <div className="container">
        <h2 className="section-title fade-in" ref={titleRef}>
          Tech Stack
        </h2>
        <div className="stack-grid">
          {stacks.map((group, i) => (
            <div
              key={group.category}
              className="stack-card"
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div className="stack-card__head">
                <span className="stack-icon">{group.icon}</span>
                <h3 className="stack-category">{group.category}</h3>
              </div>
              <div className="stack-pills">
                {group.items.map((item) => (
                  <span key={item} className="stack-pill">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
