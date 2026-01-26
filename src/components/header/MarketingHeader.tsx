const MarketingHeader = () => {
  return (
    <div className="marketing-header__inner">
      <div className="marketing-header__brand">Signmons</div>
      <nav className="marketing-header__nav">
        <a className="marketing-header__nav-link--how" href="#how-it-works">
          How It Works
        </a>
        <a className="marketing-header__nav-link--chat" href="#why-owners-trust">
          Chat
        </a>
      </nav>
    </div>
  );
};

export default MarketingHeader;
