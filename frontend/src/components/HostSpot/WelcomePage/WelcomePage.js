// import react-router-dom
import { useHistory } from 'react-router-dom';

// import css
import './WelcomePage.css';

//? WelcomePage component
const WelcomePage = () => {

  // invoke useHistory
  const history = useHistory();

  //? handleGoButton: navigate to Create Spot component
  const handleGoButton = () => {
    return history.push('/host/create-spot');
  };

  //? handleExitButton: navigate back to home
  const handleExitButton = () => {
    return history.push('/');
  }

  //! To fix: play pause button
  return (
    <main id="welcome-page">
      {/* //? Left aside */}
      <aside id="welcome-left-aside">
        {/* ExperStays logo */}
        <figure id="welcome-logo-container">
          <figure
            className="experstays-logo"
            style={{ zIndex: 1 }}
            onClick={handleExitButton}
          >
            <img
              src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1674187623/ExperStays/ExperStays_white_vjcxwq.png"
              alt="experstays-logo"
            />
          </figure>
        </figure>

        {/* welcome video */}
        <video
          id="welcome-video"
          src="https://a0.muscache.com/v/8b/04/8b0456c7-13f8-54bc-889a-7cf549f144a3/8b0456c713f854bc889a7cf549f144a3_4000k_1.mp4"
          alt="experstays-welcome"
          preload="auto"
          autoPlay
          muted
          loop
        />
      </aside>

      {/* //? Right section */}
      <section id="welcome-right-section">
        {/* welcome step */}
        <section className="welcome-right-text-content">
          <h1 id="right-section-title-head">
            Become a Host in 1 easy steps
          </h1>
          <h3 id="right-section-title-caption">
            Join us. We'll help you every step of the way.
          </h3>
        </section>
        <button className="welcome-button" id="right-section-exit-button" onClick={handleExitButton}>
          Exit
        </button>
        <section id="welcome-right-lower-section">
          <button className="welcome-button" id="right-section-enter-button" onClick={handleGoButton}>
            Let's go!
          </button>
        </section>
      </section>
    </main>
  );
};

// export component
export default WelcomePage;
