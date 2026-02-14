import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for data attributes or element types
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const isButton = target.closest('button, a, [role="button"]');
      const isVideo = target.closest('video, [data-cursor="play"]');
      const isCard = target.closest('[data-cursor="view"]');
      const isDrag = target.closest('[data-cursor="drag"]');

      if (cursorType) {
        setIsHovering(true);
        setCursorText(cursorType.toUpperCase());
      } else if (isVideo) {
        setIsHovering(true);
        setCursorText('PLAY');
      } else if (isDrag) {
        setIsHovering(true);
        setCursorText('DRAG');
      } else if (isCard) {
        setIsHovering(true);
        setCursorText('VIEW');
      } else if (isButton) {
        setIsHovering(true);
        setCursorText('');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Don't render on mobile
  if (typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      {/* Trailing outline cursor only */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] rounded-full border-2 border-primary/60 transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? (cursorText ? '80px' : '50px') : '36px',
          height: isHovering ? (cursorText ? '80px' : '50px') : '36px',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : 1})`,
          backgroundColor: cursorText ? 'hsl(var(--primary) / 0.15)' : 'transparent',
          borderColor: isHovering ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.5)',
        }}
      >
        {cursorText && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary tracking-wider">
            {cursorText}
          </span>
        )}
      </div>

      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
