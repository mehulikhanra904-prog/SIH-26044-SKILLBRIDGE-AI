import { ArrowRight, BrainCircuit, BriefcaseBusiness, Building2, CheckCircle2, GraduationCap, LineChart, Sparkles, Target, Waypoints } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Target, title: "Discover your skill gaps", text: "Understand the skills employers expect and see where you can improve." },
  { icon: Waypoints, title: "Build a clear career path", text: "Turn your goals into a practical roadmap with focused next steps." },
  { icon: BriefcaseBusiness, title: "Find relevant opportunities", text: "Explore jobs and internships that align with your skills and interests." },
  { icon: LineChart, title: "Make smarter decisions", text: "Use meaningful insights to track readiness and progress over time." },
];

function Landing() {
  return (
    <main className="landing-page">
      <div className="landing-orb landing-orb-one" />
      <div className="landing-orb landing-orb-two" />
      <header className="landing-nav">
        <Link className="landing-brand" to="/" aria-label="SkillBridge AI home">
          <span className="landing-brand-icon"><BrainCircuit size={23} /></span>
          <span>SkillBridge<span className="brand-accent"> AI</span></span>
        </Link>
        <nav className="landing-nav-links" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#ecosystem">Who it's for</a>
        </nav>
        <div className="landing-nav-actions">
          <Link className="landing-login-link" to="/login">Log in</Link>
          <Link className="landing-nav-cta" to="/register">Get started <ArrowRight size={16} /></Link>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <div className="landing-eyebrow"><Sparkles size={15} /> BRIDGING EDUCATION AND EMPLOYMENT</div>
          <h1>Turn your potential into <span>career readiness.</span></h1>
          <p className="landing-hero-description">
            A smarter connection between students, colleges, and industry.
            Discover skill gaps, build career roadmaps, and move toward opportunities
            with AI-powered guidance.
          </p>
          <div className="landing-hero-actions">
            <Link className="landing-primary-cta" to="/register">Start your journey <ArrowRight size={18} /></Link>
            <a className="landing-secondary-cta" href="#how-it-works">Explore the platform</a>
          </div>
          <div className="landing-trust-note"><CheckCircle2 size={16} /> One platform. Three perspectives. A stronger talent pipeline.</div>
        </div>

        <div className="landing-visual" aria-label="SkillBridge AI platform overview">
          <div className="landing-visual-glow" />
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="landing-dashboard-card">
            <div className="mock-topbar"><span className="mock-dot" /><span className="mock-dot" /><span className="mock-dot" /><span className="mock-top-label">CAREER OVERVIEW</span></div>
            <div className="mock-welcome">Your next step starts here.</div>
            <div className="mock-subtitle">A snapshot of your career journey</div>
            <div className="mock-metrics">
              <div><span className="mock-metric-icon"><Target size={17} /></span><strong>Skill insights</strong><small>Know what to learn next</small></div>
              <div><span className="mock-metric-icon purple"><LineChart size={17} /></span><strong>Career roadmap</strong><small>Make progress with a plan</small></div>
            </div>
            <div className="mock-roadmap-title">Your growth pathway <span>AI guided</span></div>
            <div className="mock-roadmap">
              <div className="mock-step done"><i><CheckCircle2 size={13} /></i><span><b>Assess your skills</b><small>Understand your starting point</small></span></div>
              <div className="mock-step"><i>2</i><span><b>Close skill gaps</b><small>Focus on high-impact skills</small></span></div>
              <div className="mock-step"><i>3</i><span><b>Explore opportunities</b><small>Connect learning to real roles</small></span></div>
            </div>
          </div>
          <div className="landing-float-card float-insight"><span><Sparkles size={16} /></span><div><b>AI-powered insights</b><small>Guidance that moves you forward</small></div></div>
          <div className="landing-float-card float-roles"><span><BriefcaseBusiness size={17} /></span><div><b>Opportunities</b><small>Skills meet industry needs</small></div></div>
        </div>
      </section>

      <section className="landing-audience-strip" id="ecosystem">
        <p>BUILT FOR THE COMPLETE CAREER ECOSYSTEM</p>
        <div><span><GraduationCap size={19} /> Students</span><span><Building2 size={19} /> Colleges</span><span><BriefcaseBusiness size={19} /> Companies</span></div>
      </section>

      <section className="landing-features" id="features">
        <div className="landing-section-heading">
          <span>YOUR CAREER, WITH DIRECTION</span>
          <h2>Everything you need to move <em>forward.</em></h2>
          <p>From understanding your strengths to finding your next opportunity, make every step count.</p>
        </div>
        <div className="landing-feature-grid">
          {features.map(({ icon: Icon, title, text }, index) => (
            <article className="landing-feature-card" key={title}>
              <div className={`landing-feature-icon feature-icon-${index}`}><Icon size={22} /></div>
              <h3>{title}</h3><p>{text}</p><span className="feature-arrow"><ArrowRight size={17} /></span>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-how" id="how-it-works">
        <div><span>LESS GUESSWORK. MORE GROWTH.</span><h2>Make your next move a <em>meaningful one.</em></h2></div>
        <p>SkillBridge AI brings learning, career planning, and industry opportunities into one connected experience—so the path from campus to career feels clearer.</p>
        <Link to="/register">Explore SkillBridge AI <ArrowRight size={17} /></Link>
      </section>

      <footer className="landing-footer">
        <Link className="landing-brand" to="/"><span className="landing-brand-icon"><BrainCircuit size={20} /></span><span>SkillBridge<span className="brand-accent"> AI</span></span></Link>
        <span>Connecting talent with opportunity.</span>
        <span>© {new Date().getFullYear()} SkillBridge AI</span>
      </footer>
    </main>
  );
}

export default Landing;
