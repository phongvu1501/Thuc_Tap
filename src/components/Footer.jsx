import React, { useEffect, useState } from 'react';

function Footer() {
  const [lastVisit, setLastVisit] = useState(null);

  useEffect(() => {
    const prev = localStorage.getItem('lastVisit');
    setLastVisit(prev);

    const now = new Date().toLocaleString();
    localStorage.setItem('lastVisit', now);
  }, []);

  return (
    <footer style={{ marginTop: '50px', fontStyle: 'italic' }}>
      {lastVisit
        ? `⏰ Lần truy cập trước: ${lastVisit}`
        : 'Chào mừng bạn lần đầu đến với trang này!'}
    </footer>
  );
}

export default Footer;
