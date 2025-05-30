export const Footer = () => {
    return (
        <footer className="page-footer">
      <section className="footer-links">
        <ul className="company-list">
          <h5 className="section-name">Company</h5>
          <li className="company-item"><a className="company-link" href="https://www.last.fm/about">About Last.fm</a></li>
          <li className="company-item"><a className="company-link" href="https://www.last.fm/about/contact">Contact Us</a></li>
          <li className="company-item"><a className="company-link" href="https://www.last.fm/about/jobs">Jobs</a></li>
        </ul>
        <ul className="help-list">
          <h5 className="section-name">Help</h5>
          <li className="help-item"><a className="help-link" href="https://www.last.fm/about/trackmymusic">Track My Musik</a></li>
          <li className="help-item"><a className="help-link" href="https://support.last.fm/">Community Support</a></li>
          <li className="help-item"><a className="help-link" href="https://www.last.fm/help/guidelines">Community Guidelines</a></li>
          <li className="help-item"><a className="help-link" href="https://www.last.fm/help/faq">Help</a></li>
        </ul>
        <ul className="goodies-list">
          <h5 className="section-name">Goodies</h5>
          <li className="goodies-item"><a className="goodies-link" href="https://www.last.fm/about/trackmymusic">Download Scrobbler</a></li>
          <li className="goodies-item"><a className="goodies-link" href="https://www.last.fm/api">Developer API</a></li>
          <li className="goodies-item"><a className="goodies-link" href="https://www.last.fm/music/+free-music-downloads">Free Musik Downloads</a></li>
          <li className="goodies-item"><a className="goodies-link" href="https://store.last.fm/">Merchandise</a></li>
        </ul>
        <ul className="account-list">
          <h5 className="section-name">Account</h5>
          <li className="account-item"><a className="account-link" href="https://www.last.fm/inbox">Inbox</a></li>
          <li className="account-item"><a className="account-link" href="https://www.last.fm/settings">Settings</a></li>
          <li className="account-item"><a className="account-link" href="https://www.last.fm/pro">Last.fm Pro</a></li>
          <li className="account-item"><a className="account-link" href="#">Logout</a></li>
        </ul>
        <ul className="follow-list">
          <h5 className="section-name">Follow Us</h5>
          <li className="follow-item"><a className="follow-link" href="https://www.facebook.com/lastfm">Facebook</a></li>
          <li className="follow-item"><a className="follow-link" href="https://x.com/lastfm">X</a></li>
          <li className="follow-item"><a className="follow-link" href="https://www.instagram.com/last_fm">Instagram</a></li>
          <li className="follow-item"><a className="follow-link" href="https://www.youtube.com/user/lastfm">YouTube</a></li>
        </ul>
      </section>
      <ul className="language-list">
        <li className="language current">English</li>
        <li className="language">Deutsch</li>
        <li className="language">Español</li>
        <li className="language">Français</li>
        <li className="language">Italiano</li>
        <li className="language">日本語</li>
        <li className="language">Polski</li>
        <li className="language">Português</li>
        <li className="language">Русский</li>
        <li className="language">Svenska</li>
        <li className="language">Türkçe</li>
        <li className="language">简体中文</li>
      </ul>
      <a className="audioscrobbler-link"><span>Audioscrobbler</span><img className="audioscrobbler-logo" src="/img/logo/footer_logo.png" alt="Audioscrobbler"/></a>
    </footer>
    );
}