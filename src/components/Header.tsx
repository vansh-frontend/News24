import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="header-component">
      <div className="header-left">
        <span className="profile-name">vansh frontend</span>
      </div>
      <div className="header-right">
        <a className="header-link" href="https://github.com/vansh-frontend" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a className="header-link" href="https://linkedin.com/in/vanshdhalor" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  );
};

export default Header;
