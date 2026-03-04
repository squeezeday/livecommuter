export default function Info() {
  return (
    <>
      <h1>Värmlivetrafiken</h1>
      <p>
        Kraftigt inspirerat av{' '}
        <a href="https://sl-map.gunnar.se" target="_blank">
          sl-map.gunnar.se
        </a>{' '}
        vill jag även visa realtidstrafiken i Värmland.
      </p>
      <h3>Hur funkar det?</h3>
      <p>
        Från Trafiklab kan vem som helst fritt hämta{' '}
        <a
          href="https://trafiklab.se/api/gtfs-datasets/gtfs-sweden/"
          target="_blank"
        >
          nära-realtidsdata
        </a>{' '}
        som en enkel node js-server läser in c:a varannan sekund, mappar ihop
        med mer{' '}
        <a
          href="https://www.trafiklab.se/api/gtfs-datasets/gtfs-sweden/static-specification/"
          target="_blank"
        >
          statisk trafikinformation
        </a>{' '}
        och lägger på minnet.
      </p>
      <p>
        Webbapplikationen hämtar i sin tur från servern med samma intervall.
      </p>
      <p>
        Ladda hem koden från{' '}
        <a href="https://github.com/squeezeday/livecommuter">Github</a> och
        spinn upp en app för din region*.
      </p>
      <p>* Se Trafiklab.se för tillgängliga operatörer.</p>
      <nav>
        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="https://www.svanstrom.nu">
              <i className="fa fa-globe"></i> svanstrom.nu
            </a>
          </li>
          <li className="nav-item ">
            <a
              className="nav-link"
              href="https://www.linkedin.com/in/michaelsvanstrom"
            >
              <span className="fa-stack fa-lg">
                <i className="fa fa-brands fa-linkedin fa-stack-1x"></i>
              </span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="https://github.com/squeezeday">
              <span className="fa-stack fa-lg">
                <i className="fa fa-brands fa-github fa-stack-1x"></i>
              </span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="mailto:michael@svanstrom.nu">
              <span className="fa-stack fa-lg">
                <i className="fa fa-envelope fa-stack-1x"></i>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
