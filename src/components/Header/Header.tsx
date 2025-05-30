import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header className="page-header">
      <nav className="page-navigation">
        <div className="navigation-logo">
          <a href="index.html"><img src="/img/logo/logo.png" alt="last.fm"/></a>
        </div>
        <ul className="navigation-list">
          <li className="navigation-item"><Link className="navigation-link search-link" to="/search"><img src="img/icons/search.svg"/><span className="visually-hidden">Поиск</span></Link></li>
          <li className="navigation-item"><Link className="navigation-link" to="/">Home</Link></li>
          <li className="navigation-item"><a className="navigation-link" href="#">Live</a></li>
          <li className="navigation-item"><Link className="navigation-link" to="/music">Music</Link></li>
          <li className="navigation-item"><a className="navigation-link" href="#">Charts</a></li>
          <li className="navigation-item"><a className="navigation-link" href="#">Events</a></li>
          <li className="navigation-item"><a className="navigation-link" href="#">Features</a></li>
        </ul>
      </nav>
    </header>
    );
}