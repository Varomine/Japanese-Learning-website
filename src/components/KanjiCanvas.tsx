import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Trash2, Eye, EyeOff } from 'lucide-react';

interface KanjiCanvasProps {
  kanjiChar: string;
}

interface Point {
  x: number;
  y: number;
}

export const KanjiCanvas: React.FC<KanjiCanvasProps> = ({ kanjiChar }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [showGuide, setShowGuide] = useState(true);

  // Brush settings
  const brushColor = '#00e5ff'; // Cyan neon
  const brushWidth = 8;

  // Redraw everything whenever strokes or showGuide or kanjiChar changes
  useEffect(() => {
    redrawCanvas();
  }, [strokes, showGuide, kanjiChar]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coord = getCoordinates(e);
    if (!coord) return;

    setIsDrawing(true);
    setCurrentStroke([coord]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coord = getCoordinates(e);
    if (!coord) return;

    setCurrentStroke((prev) => [...prev, coord]);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Draw the temporary line immediately for low-latency visual response
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const lastPoint = currentStroke[currentStroke.length - 1];
    if (lastPoint) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(coord.x, coord.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentStroke.length > 0) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw guide grid lines
    ctx.strokeStyle = 'rgba(142, 45, 226, 0.15)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    // Horizontal center line
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Vertical center line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Draw background character guide (faint kanji)
    if (showGuide) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.font = '220px "Noto Sans JP", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(kanjiChar, canvas.width / 2, canvas.height / 2 + 10);
    }

    // Draw finished strokes
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    strokes.forEach((stroke) => {
      if (stroke.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    });
  };

  const undo = () => {
    setStrokes((prev) => prev.slice(0, -1));
  };

  const clearCanvas = () => {
    setStrokes([]);
    setCurrentStroke([]);
  };

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="kanji-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button className="btn" onClick={undo} title="Undo last stroke">
          <RotateCcw size={16} />
          Undo
        </button>
        <button className="btn" onClick={clearCanvas} title="Clear canvas">
          <Trash2 size={16} />
          Clear
        </button>
        <button 
          className="btn" 
          onClick={() => setShowGuide(!showGuide)} 
          title={showGuide ? 'Hide guide' : 'Show guide'}
        >
          {showGuide ? <EyeOff size={16} /> : <Eye size={16} />}
          Guide
        </button>
      </div>
    </div>
  );
};
