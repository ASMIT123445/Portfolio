import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Connect = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const titleRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.08 }
    );
    [titleRef, cardRef].forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setStatus({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }
    setSending(true);
    setStatus(null);
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { from_name: name, from_email: email, message },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setSending(false);
      setStatus({ type: 'success', text: "✓ Message sent! I'll get back to you soon." });
      setFormData({ name: '', email: '', message: '' });
    }).catch(() => {
      setSending(false);
      setStatus({ type: 'error', text: '✗ Failed to send. Please try again.' });
    });
  };

  return (
    <section id="connect">
      <div className="container">
        <h2 className="section-title fade-in" ref={titleRef}>Contact</h2>

        <div className="contact-card fade-in" ref={cardRef}>

          {/* Left — contact info */}
          <div className="contact-info">
            <h3 className="contact-heading">Get in Touch</h3>

            <div className="contact-item">
              <span className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              <div>
                <p className="contact-label">EMAIL</p>
                <p className="contact-value">asmitpradhan321@gmail.com</p>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              <div>
                <p className="contact-label">PHONE</p>
                <p className="contact-value">+977 9804360258</p>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <div>
                <p className="contact-label">ADDRESS</p>
                <p className="contact-value">Imadol, Lalitpur</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              id="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn contact-submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send Message'}
            </button>
            {status && (
              <p className={`contact-status ${status.type}`}>{status.text}</p>
            )}
          </form>

        </div>
      </div>
    </section>
  );
};

export default Connect;
