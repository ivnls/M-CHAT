import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    //fazer o scroll para o topo da página
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;