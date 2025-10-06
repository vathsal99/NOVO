import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
 
const FloatingActionButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [position, setPosition] = useState({ y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
 
  // Check if we're currently on the BuddySafe page
  const isOnBuddySafe = location.pathname === '/buddysafe';
 
  // Initialize position on component mount
  useEffect(() => {
    // Set initial position to 70% from top
    setPosition({ y: window.innerHeight * 0.7 });
   
    const handleResize = () => {
      // Maintain relative position on resize
      if (buttonRef.current) {
        const buttonHeight = buttonRef.current.offsetHeight;
        const maxY = window.innerHeight - buttonHeight - 10;
        setPosition(prev => ({
          y: Math.min(prev.y, maxY)
        }));
      }
    };
   
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  const handleMouseDown = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDragStartY(e.clientY - rect.top);
      setIsDragging(true);  // Start with dragging true
      setHasMoved(false);   // Reset hasMoved on mousedown
      e.preventDefault();
    }
  };
 
  const handleTouchStart = (e: React.TouchEvent) => {
    if (buttonRef.current) {
      const touch = e.touches[0];
      const rect = buttonRef.current.getBoundingClientRect();
      setDragStartY(touch.clientY - rect.top);
      setIsDragging(true);
      setHasMoved(false);
      e.preventDefault();
    }
  };
 
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !buttonRef.current) return;
   
    // Set hasMoved to true as soon as we detect movement
    if (!hasMoved) {
      setHasMoved(true);
    }
   
    const buttonHeight = buttonRef.current.offsetHeight;
    const newY = e.clientY - dragStartY;
   
    // Constrain vertically within viewport with 10px padding from top/bottom
    const maxY = window.innerHeight - buttonHeight - 10;
    const constrainedY = Math.max(10, Math.min(newY, maxY));
   
    setPosition({ y: constrainedY });
  };
 
  const handleMouseUp = (e: MouseEvent) => {
    if (hasMoved) {
      e.preventDefault();
    }
   
    // Reset the dragging state
    setIsDragging(false);
   
    // Use a small timeout to prevent click after drag
    setTimeout(() => {
      setHasMoved(false);
    }, 0);
  };
 
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove as any, { passive: false });
      document.addEventListener('touchend', handleTouchEnd as any);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove as any);
      document.removeEventListener('touchend', handleTouchEnd as any);
    }
 
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove as any);
      document.removeEventListener('touchend', handleTouchEnd as any);
    };
  }, [isDragging, dragStartY, hasMoved]);
 
  const handleClick = (e: React.MouseEvent) => {
    // Only navigate if we didn't just finish dragging
    if (hasMoved) {
      e.preventDefault();
      return;
    }
   
    if (isOnBuddySafe) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/buddysafe');
    }
  };
 
  // Handle touch events for mobile
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !buttonRef.current) return;
   
    const touch = e.touches[0];
    if (!touch) return;
   
    // Set hasMoved to true as soon as we detect movement
    if (!hasMoved) {
      setHasMoved(true);
    }
   
    const buttonHeight = buttonRef.current.offsetHeight;
    const newY = touch.clientY - dragStartY;
   
    // Constrain vertically within viewport with 10px padding from top/bottom
    const maxY = window.innerHeight - buttonHeight - 10;
    const constrainedY = Math.max(10, Math.min(newY, maxY));
   
    setPosition({ y: constrainedY });
    e.preventDefault();
  };
 
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (hasMoved) {
      e.preventDefault();
      setIsDragging(false);
      return;
    }
   
    e.preventDefault();
    if (isOnBuddySafe) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/buddysafe');
    }
   
    // Reset the dragging state
    setIsDragging(false);
  };
 
  // Always show the button, but change its text based on the current page
  const buttonText = isOnBuddySafe ? 'Need Help?' : 'Get Help!';
 
  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      className={`fixed right-6 z-50 flex flex-col items-center bg-transparent border-none shadow-none p-0 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        top: `${position.y}px`,
        transform: isDragging ? 'scale(1.05)' : 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
      aria-label="Get Help"
    >
      <div className="flex flex-col items-center">
        <img
          src="/images/buddysafeicon.png.jpg"
          alt="Get Help"
          className="w-16 h-16 object-contain"
        />
        <span className="text-sm font-medium text-blue-600 mt-1 bg-white px-2 py-1 rounded-md shadow-sm">{buttonText}</span>
      </div>
    </button>
  );
};
 
export default FloatingActionButton;
 
