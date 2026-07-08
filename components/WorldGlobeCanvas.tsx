import React, { useEffect, useRef } from 'react';

const WorldGlobeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w: number, h: number;
    let scale: number;
    
    // Generate sphere points using Fibonacci lattice
    const numPoints = 300;
    const points: {x: number, y: number, z: number, randomOffset: number}[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      // Add a slight random offset to make it look more organic
      points.push({ x, y, z, randomOffset: Math.random() * Math.PI * 2 });
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = canvas.width = parent.offsetWidth;
      h = canvas.height = parent.offsetHeight;
      // Fit the globe beautifully in the background
      scale = Math.min(w, h) * 0.45; 
    };

    window.addEventListener('resize', resize);
    resize();

    let animationFrameId: number;
    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      angle += 0.0015; // Slow rotation

      // Rotate and project points
      const projected = points.map(p => {
        // Organic pulsing effect
        const pulse = 1 + Math.sin(angle * 10 + p.randomOffset) * 0.02;
        const xPulse = p.x * pulse;
        const yPulse = p.y * pulse;
        const zPulse = p.z * pulse;

        // Rotation around Y axis
        const rotX = xPulse * Math.cos(angle) - zPulse * Math.sin(angle);
        const rotZ = zPulse * Math.cos(angle) + xPulse * Math.sin(angle);
        
        // Tilt the globe slightly for a better angle (rotate around X axis)
        const tilt = 0.2;
        const finalY = yPulse * Math.cos(tilt) - rotZ * Math.sin(tilt);
        const finalZ = rotZ * Math.cos(tilt) + yPulse * Math.sin(tilt);

        return {
          x3d: rotX,
          y3d: finalY,
          z3d: finalZ,
          x: w / 2 + rotX * scale,
          y: h / 2 + finalY * scale,
        };
      });

      // Draw connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          
          // Check distance in 3D space
          const dx = p1.x3d - p2.x3d;
          const dy = p1.y3d - p2.y3d;
          const dz = p1.z3d - p2.z3d;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          
          if (dist < 0.28) {
            const zAvg = (p1.z3d + p2.z3d) / 2;
            const isFront = zAvg > 0;
            
            // Front lines are more visible and colored blue, back lines are very faint
            if (isFront) {
              ctx.strokeStyle = `rgba(30, 79, 214, ${0.15 - dist * 0.3})`; // Brand Blue
            } else {
              ctx.strokeStyle = `rgba(11, 11, 12, 0.03)`; // Faint black
            }
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw points
      for (const p of projected) {
        const isFront = p.z3d > 0;
        
        if (isFront) {
          // Front points: mix of brand blue and gold
          const isGold = Math.sin(p.x3d * 100) > 0.7; // Randomly assign some nodes as gold
          ctx.fillStyle = isGold ? 'rgba(245, 166, 35, 0.9)' : 'rgba(30, 79, 214, 0.7)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, isGold ? 2.5 : 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Back points
          ctx.fillStyle = 'rgba(11, 11, 12, 0.1)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-80"
    />
  );
};

export default WorldGlobeCanvas;
