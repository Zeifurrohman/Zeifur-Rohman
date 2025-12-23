import React from 'react';

interface VisualizerProps {
  volume: number; // 0 to 1
  isActive: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ volume, isActive }) => {
  // Create a dynamic visualizer based on volume
  // Volume usually hovers around 0.1-0.3 during speech
  const scale = isActive ? 1 + volume * 2 : 1;
  const opacity = isActive ? 0.6 + volume * 2 : 0.3;
  const glow = isActive ? `0 0 ${20 + volume * 100}px rgba(96, 165, 250, 0.6)` : 'none';

  return (
    <div className="relative flex items-center justify-center w-64 h-64">
        {/* Outer Ripple */}
        {isActive && (
            <div 
                className="absolute w-full h-full rounded-full border-2 border-blue-400 opacity-20 animate-wave"
            />
        )}
         {isActive && (
            <div 
                className="absolute w-full h-full rounded-full border-2 border-indigo-400 opacity-20 animate-wave"
                style={{ animationDelay: '1s' }}
            />
        )}

        {/* Core Circle */}
        <div 
            className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full transition-all duration-75 ease-linear shadow-2xl flex items-center justify-center"
            style={{
                transform: `scale(${scale})`,
                opacity: Math.min(1, opacity),
                boxShadow: glow
            }}
        >
            <div className="w-28 h-28 bg-slate-900 rounded-full flex items-center justify-center">
                 {/* Inner Activity Indicator */}
                 <div className={`w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 opacity-80 ${isActive ? 'animate-pulse' : ''}`}></div>
            </div>
        </div>
    </div>
  );
};

export default Visualizer;