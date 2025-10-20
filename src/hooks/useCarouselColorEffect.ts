import { useEffect } from 'react';

export const useCarouselColorEffect = (containerRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateColors = () => {
      const containerRect = container.getBoundingClientRect();
      const cards = container.querySelectorAll('.logo-card');
      
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        
        // Calculate distance from center (0 = center, 1 = edge)
        const distanceFromCenter = Math.abs(cardCenter - containerCenter) / (containerRect.width / 2);
        
        // Only show color when near edges (> 0.6 from center)
        const colorIntensity = Math.max(0, (distanceFromCenter - 0.6) / 0.4);
        
        const logoText = card.querySelector('.logo-text') as HTMLElement;
        if (logoText) {
          if (colorIntensity > 0) {
            logoText.style.filter = `grayscale(${(1 - colorIntensity) * 100}%)`;
            logoText.style.opacity = '1';
          } else {
            logoText.style.filter = 'grayscale(100%)';
            logoText.style.opacity = '0.6';
          }
        }
      });
    };

    const animationFrame = setInterval(updateColors, 50);
    
    return () => clearInterval(animationFrame);
  }, [containerRef]);
};
