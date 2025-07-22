
import { useEffect, useRef } from "react";

const GraphPattern = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100, active: false });
  const animationRef = useRef<number>(0);
  const gridRef = useRef<{ cols: number; rows: number; size: number; points: { x: number; y: number }[] }>({
    cols: 0,
    rows: 0,
    size: 30, // Grid cell size
    points: []
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make sure pixel ratio is handled correctly for sharp rendering
    const setupCanvas = () => {
      canvas.width = window.innerWidth; // Use full window width
      canvas.height = canvas.parentElement?.clientHeight || 500;
    };

    const resizeCanvas = () => {
      setupCanvas();
      initGrid();
    };

    const initGrid = () => {
      const gridSize = 30; // Size of each grid cell
      
      // Calculate grid dimensions
      const cols = Math.floor(canvas.width / gridSize);
      const rows = Math.floor(canvas.height / gridSize);
      
      const points = [];
      
      // Create a perfect grid of points
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          points.push({
            x: i * gridSize,
            y: j * gridSize
          });
        }
      }
      
      gridRef.current = {
        cols,
        rows,
        size: gridSize,
        points
      };
    };

    const drawScene = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const { points } = gridRef.current;
      const dotColor = 'rgba(100, 100, 100, 1)'; // Darker dots and lines
      
      // Draw all points
      ctx.fillStyle = dotColor;
      const dotRadius = 0.8; // Smaller radius for cleaner dots
      
      for (const point of points) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw slope field lines if mouse is active
      if (mouseRef.current.active) {
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;
        
        // Match line style with dots exactly
        ctx.strokeStyle = dotColor;
        ctx.lineWidth = 1.2;
        
        for (const point of points) {
          const dx = mouseX - point.x;
          const dy = mouseY - point.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Reduced interaction radius
          if (dist < 100) {
            // Calculate line length based on distance (closer = longer)
            const lineLength = Math.min(10, 15 * (1 - dist / 100));
            
            // Calculate angle from point to mouse
            const angle = Math.atan2(dy, dx);
            
            // Draw line in the direction of the mouse
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(
              point.x + Math.cos(angle) * lineLength,
              point.y + Math.sin(angle) * lineLength
            );
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(drawScene);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    
    const handleMouseEnter = () => {
      mouseRef.current.active = true;
    };

    // Fix for touch devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
          active: true
        };
        e.preventDefault(); // Prevent scrolling while interacting
      }
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
          active: true
        };
      }
    };
    
    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);
    
    resizeCanvas();
    drawScene();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto"
      aria-hidden="true"
    />
  );
};

export default GraphPattern;