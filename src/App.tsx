import { useEffect, useState, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, ProjectCategory, RootState } from './store'
import { setGalleryFilter, setQuoteSubmitted } from './store'
import heroImage from './assets/basement-coating.png'
import garageImage from './assets/workshop-floor.png'
import workshopImage from './assets/hero-coating.png'
import basementImage from './assets/garage-floor.png'

const services = [
  {
    icon: 'bi-house-door',
    title: 'Garage Floors',
    text: 'A seamless, easy-clean finish that stands up to hot tires, salt, oil, impact, and Chicago winters.',
  },
  {
    icon: 'bi-buildings',
    title: 'Commercial Spaces',
    text: 'Fast-curing, high-performance systems for shops, warehouses, showrooms, and service areas.',
  },
  {
    icon: 'bi-bricks',
    title: 'Basements & Walls',
    text: 'Moisture-resistant coatings that protect concrete surfaces and give utility spaces a refined finish.',
  },
]

const projects: Array<{
  category: Exclude<ProjectCategory, 'All'>
  title: string
  location: string
  image: string
}> = [
  { category: 'Garage', title: 'Flake Garage System', location: 'Naperville, IL', image: garageImage },
  { category: 'Commercial', title: 'Workshop Floor', location: 'Chicago, IL', image: workshopImage },
  { category: 'Basement', title: 'Basement Floor & Wall', location: 'Evanston, IL', image: basementImage },
]

const steps = [
  ['01', 'Free assessment', 'We inspect the concrete, discuss how you use the space, and provide a clear written quote.'],
  ['02', 'Surface preparation', 'Industrial diamond grinding opens the concrete and repairs cracks for a lasting bond.'],
  ['03', 'Polyurea system', 'We install the base coat, optional decorative flakes, and a UV-stable protective topcoat.'],
  ['04', 'Ready to use', 'Most projects are completed in one day, with light foot traffic typically possible the next day.'],
]

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { galleryFilter, quoteSubmitted } = useSelector((state: RootState) => state.ui)
  const [navOpen, setNavOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null)

  const filteredProjects = galleryFilter === 'All'
    ? projects
    : projects.filter((project) => project.category === galleryFilter)

  useEffect(() => {
    const closeNav = () => setNavOpen(false)
    window.addEventListener('hashchange', closeNav)
    return () => window.removeEventListener('hashchange', closeNav)
  }, [])

  const handleQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(setQuoteSubmitted(true))
    event.currentTarget.reset()
  }

  return (
    <div className="site-shell">
      <div className="topbar">
        <div className="container d-flex flex-wrap justify-content-center justify-content-md-between gap-2">
          <span><i className="bi bi-geo-alt me-2" />Serving Chicago & Chicagoland</span>
          <div className="d-flex gap-4">
            <a href="tel:+13125550148"><i className="bi bi-telephone me-2" />(312) 555-0148</a>
            <a className="d-none d-sm-inline" href="mailto:info@roseshieldcoatings.com">
              <i className="bi bi-envelope me-2" />info@roseshieldcoatings.com
            </a>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg sticky-top custom-nav" aria-label="Main navigation">
        <div className="container">
          <a className="navbar-brand" href="#home" aria-label="RoseShield Coatings home">
            <span className="brand-mark">R</span>
            <span>ROSE<span>SHIELD</span></span>
            <small>COATINGS</small>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            aria-expanded={navOpen}
            aria-label="Toggle navigation"
            onClick={() => setNavOpen(!navOpen)}
          >
            <i className={`bi ${navOpen ? 'bi-x-lg' : 'bi-list'}`} />
          </button>
          <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto align-items-lg-center">
              {['Services', 'Why Polyurea', 'Projects', 'Process', 'FAQ'].map((item) => (
                <li className="nav-item" key={item}>
                  <a className="nav-link" href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setNavOpen(false)}>
                    {item}
                  </a>
                </li>
              ))}
              <li className="nav-item ms-lg-3">
                <a className="btn btn-primary px-4" href="#quote" onClick={() => setNavOpen(false)}>Get a free quote</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <img src={heroImage} alt="Professional applying a polyurea coating to a garage floor" />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <div className="eyebrow"><span /> BUILT FOR CHICAGO. MADE TO LAST.</div>
            <h1>Concrete,<br />reimagined.</h1>
            <p>Premium polyurea floor and wall coatings installed with precision—beautiful enough for your home, tough enough for your business.</p>
            <div className="d-flex flex-wrap gap-3">
              <a href="#quote" className="btn btn-primary btn-lg">Get your free estimate <i className="bi bi-arrow-right ms-2" /></a>
              <a href="#projects" className="btn btn-outline-light btn-lg">See our work</a>
            </div>
            <div className="hero-trust">
              <div><strong>1 day</strong><span>Typical installation</span></div>
              <div><strong>4×</strong><span>Stronger than epoxy</span></div>
              <div><strong>15 yr</strong><span>Limited warranty</span></div>
            </div>
          </div>
          <a className="scroll-cue" href="#services"><span>Explore</span><i className="bi bi-arrow-down" /></a>
        </section>

        <section className="section-pad bg-light" id="services">
          <div className="container">
            <div className="row align-items-end mb-5">
              <div className="col-lg-7">
                <div className="section-kicker">WHAT WE COAT</div>
                <h2>Protection with a<br /><em>polished point of view.</em></h2>
              </div>
              <div className="col-lg-5">
                <p className="section-lead">From hardworking garages to high-traffic commercial floors, we tailor every system to the space beneath it.</p>
              </div>
            </div>
            <div className="row g-4">
              {services.map((service, index) => (
                <div className="col-md-4" key={service.title}>
                  <article className="service-card h-100">
                    <span className="card-number">0{index + 1}</span>
                    <i className={`bi ${service.icon} service-icon`} />
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <a href="#quote">Discuss your project <i className="bi bi-arrow-up-right" /></a>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="polyurea-section section-pad" id="why-polyurea">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-5">
                <div className="section-kicker light">WHY POLYUREA</div>
                <h2 className="text-white">The smarter<br />surface system.</h2>
                <p>Polyurea is flexible, fast-curing, and highly resistant to abrasion, chemicals, moisture, and temperature swings. Unlike traditional epoxy, it moves with the concrete instead of fighting it.</p>
                <a href="#quote" className="text-link-light">Find the right system <i className="bi bi-arrow-right" /></a>
              </div>
              <div className="col-lg-7">
                <div className="benefit-grid">
                  {[
                    ['bi-shield-check', 'Extreme durability', 'Resists impact, abrasion, salt, oil, and household chemicals.'],
                    ['bi-sun', 'UV stable', 'Topcoats resist yellowing and fading in sun-exposed spaces.'],
                    ['bi-droplet', 'Moisture resistant', 'A seamless surface that is hygienic and simple to clean.'],
                    ['bi-thermometer-snow', 'Chicago ready', 'Flexible performance through freeze-thaw temperature cycles.'],
                  ].map(([icon, title, text]) => (
                    <div className="benefit" key={title}>
                      <i className={`bi ${icon}`} />
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad" id="projects">
          <div className="container">
            <div className="d-lg-flex justify-content-between align-items-end mb-5">
              <div>
                <div className="section-kicker">SELECTED PROJECTS</div>
                <h2>Made to work.<br /><em>Designed to impress.</em></h2>
              </div>
              <div className="gallery-filters mt-4 mt-lg-0" role="group" aria-label="Project filters">
                {(['All', 'Garage', 'Commercial', 'Basement'] as ProjectCategory[]).map((filter) => (
                  <button
                    key={filter}
                    className={galleryFilter === filter ? 'active' : ''}
                    onClick={() => dispatch(setGalleryFilter(filter))}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="row g-4">
              {filteredProjects.map((project) => (
                <div className="col-lg-4 col-md-6" key={project.title}>
                  <button className="project-card" onClick={() => setSelectedProject(project)} aria-label={`View ${project.title}`}>
                    <img src={project.image} alt={project.title} />
                    <span className="project-shade" />
                    <span className="project-info">
                      <small>{project.category} • {project.location}</small>
                      <strong>{project.title}</strong>
                    </span>
                    <i className="bi bi-plus-lg" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="process-section section-pad" id="process">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="section-kicker">HOW IT WORKS</div>
                <h2>One simple<br /><em>process.</em></h2>
                <p className="section-lead">No guesswork, no vague timelines. Just careful preparation, proven materials, and a clean handoff.</p>
              </div>
              <div className="col-lg-7 offset-lg-1">
                {steps.map(([number, title, text]) => (
                  <div className="process-step" key={number}>
                    <span>{number}</span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="testimonial-section">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-4">
                <div className="rating">5.0 <span>★★★★★</span></div>
                <p>Built around responsive service, honest recommendations, and installations we are proud to put our name on.</p>
              </div>
              <div className="col-lg-7 offset-lg-1">
                <blockquote>“The crew transformed our garage in a day. The floor looks incredible, feels solid, and cleanup is finally effortless.”</blockquote>
                <cite>— Michael R., Glenview homeowner</cite>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-light" id="faq">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-4">
                <div className="section-kicker">GOOD TO KNOW</div>
                <h2>Your questions,<br /><em>answered.</em></h2>
                <p className="section-lead">Still deciding? We are happy to look at your space and explain the options—without pressure.</p>
              </div>
              <div className="col-lg-7 offset-lg-1">
                <div className="accordion accordion-flush" id="faqAccordion">
                  {[
                    ['How long does installation take?', 'Most residential garage floors are completed in one day. Larger spaces, extensive repairs, or wall systems may require additional time.'],
                    ['Is polyurea better than epoxy?', 'For many Chicago applications, yes. Polyurea cures faster, remains more flexible, handles temperature changes better, and resists UV discoloration when paired with the right topcoat.'],
                    ['Can you coat damaged concrete?', 'Usually. We repair cracks, spalling, and minor surface defects during preparation. We will flag structural or moisture concerns during the assessment.'],
                    ['How do I clean the finished surface?', 'Routine sweeping and occasional mopping with a mild, pH-neutral cleaner are typically all that is needed.'],
                  ].map(([question, answer], index) => (
                    <div className="accordion-item" key={question}>
                      <h3 className="accordion-header">
                        <button className={`accordion-button ${index ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq-${index}`}>
                          {question}
                        </button>
                      </h3>
                      <div id={`faq-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#faqAccordion">
                        <div className="accordion-body">{answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="quote-section" id="quote">
          <div className="container">
            <div className="row g-0 quote-wrap">
              <div className="col-lg-5 quote-copy">
                <div className="section-kicker light">FREE ESTIMATE</div>
                <h2>Let’s build a surface<br />that lasts.</h2>
                <p>Tell us a little about your project. We will get back to you within one business day to schedule a free on-site assessment.</p>
                <div className="contact-list">
                  <a href="tel:+13125550148"><i className="bi bi-telephone" /><span><small>CALL US</small>(312) 555-0148</span></a>
                  <a href="mailto:info@roseshieldcoatings.com"><i className="bi bi-envelope" /><span><small>EMAIL US</small>info@roseshieldcoatings.com</span></a>
                  <div><i className="bi bi-clock" /><span><small>HOURS</small>Mon–Sat, 7:00 AM–6:00 PM</span></div>
                </div>
              </div>
              <div className="col-lg-7 quote-form-panel">
                {quoteSubmitted ? (
                  <div className="success-message" role="status">
                    <i className="bi bi-check-circle" />
                    <h3>Thank you!</h3>
                    <p>Your project details are ready for our team. We’ll be in touch within one business day.</p>
                    <button className="btn btn-dark" onClick={() => dispatch(setQuoteSubmitted(false))}>Send another request</button>
                  </div>
                ) : (
                  <form onSubmit={handleQuote}>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label htmlFor="name">Your name</label>
                        <input id="name" className="form-control" type="text" placeholder="John Smith" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone">Phone number</label>
                        <input id="phone" className="form-control" type="tel" placeholder="(312) 555-0000" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email">Email address</label>
                        <input id="email" className="form-control" type="email" placeholder="john@example.com" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="zip">Project ZIP code</label>
                        <input id="zip" className="form-control" type="text" inputMode="numeric" pattern="[0-9]{5}" placeholder="60614" required />
                      </div>
                      <div className="col-12">
                        <label htmlFor="type">What would you like coated?</label>
                        <select id="type" className="form-select" defaultValue="" required>
                          <option value="" disabled>Select a project type</option>
                          <option>Garage floor</option>
                          <option>Basement floor or wall</option>
                          <option>Commercial / industrial space</option>
                          <option>Patio or other concrete</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label htmlFor="details">Tell us about your project <span>(optional)</span></label>
                        <textarea id="details" className="form-control" rows={3} placeholder="Approximate size, concrete condition, preferred timing..." />
                      </div>
                      <div className="col-12 d-flex flex-wrap align-items-center justify-content-between gap-3">
                        <small className="privacy-note"><i className="bi bi-lock me-2" />Your information stays private.</small>
                        <button className="btn btn-dark btn-lg" type="submit">Request my free estimate <i className="bi bi-arrow-right ms-2" /></button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <a className="navbar-brand footer-brand" href="#home">
                <span className="brand-mark">R</span>
                <span>ROSE<span>SHIELD</span></span>
                <small>COATINGS</small>
              </a>
              <p>Premium polyurea concrete floor and wall coatings for residential and commercial spaces throughout Chicagoland.</p>
            </div>
            <div className="col-6 col-lg-2">
              <h3>Explore</h3>
              <a href="#services">Services</a><a href="#projects">Projects</a><a href="#process">Process</a><a href="#faq">FAQ</a>
            </div>
            <div className="col-6 col-lg-2">
              <h3>Service area</h3>
              <span>Chicago</span><span>North Shore</span><span>Western Suburbs</span><span>South Suburbs</span>
            </div>
            <div className="col-lg-3">
              <h3>Stay connected</h3>
              <div className="social-links">
                <a href="#home" aria-label="Instagram"><i className="bi bi-instagram" /></a>
                <a href="#home" aria-label="Facebook"><i className="bi bi-facebook" /></a>
                <a href="#home" aria-label="Google"><i className="bi bi-google" /></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 RoseShield Coatings. All rights reserved.</span>
            <span>Licensed • Insured • Locally owned</span>
          </div>
        </div>
      </footer>

      <div className="mobile-callbar d-md-none">
        <a href="tel:+13125550148"><i className="bi bi-telephone-fill" /> Call now</a>
        <a href="#quote"><i className="bi bi-calculator" /> Free quote</a>
      </div>

      {selectedProject && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedProject.title} onClick={() => setSelectedProject(null)}>
          <button aria-label="Close gallery" onClick={() => setSelectedProject(null)}><i className="bi bi-x-lg" /></button>
          <img src={selectedProject.image} alt={selectedProject.title} onClick={(event) => event.stopPropagation()} />
          <div><strong>{selectedProject.title}</strong><span>{selectedProject.location}</span></div>
        </div>
      )}
    </div>
  )
}

export default App
