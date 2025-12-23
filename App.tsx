import React, { useState } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import Visualizer from './components/Visualizer';
import ControlPanel from './components/ControlPanel';
import { LanguageConfig, SessionConfig, ConnectionState } from './types';
import { BookOpen, Sparkles } from 'lucide-react';

const LANGUAGES: LanguageConfig[] = [
  { code: 'es', name: 'Spanish', voiceName: 'Puck' },
  { code: 'fr', name: 'French', voiceName: 'Charon' },
  { code: 'de', name: 'German', voiceName: 'Fenrir' },
  { code: 'ja', name: 'Japanese', voiceName: 'Kore' },
  { code: 'en', name: 'English', voiceName: 'Zephyr' },
];

const App: React.FC = () => {
  const [config, setConfig] = useState<SessionConfig>({
    language: LANGUAGES[0], // Default Spanish
    level: 'Beginner',
  });

  const { 
    connectionState, 
    errorMessage, 
    startSession, 
    stopSession, 
    volume 
  } = useGeminiLive(config);

  const isActive = connectionState === ConnectionState.CONNECTED;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* Header */}
      <header className="fixed top-0 w-full p-6 flex justify-between items-center z-10 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">Zeist Language Practice AI</h1>
            <p className="text-xs text-blue-400 font-medium tracking-wide uppercase">Live Practice</p>
          </div>
        </div>
        <a 
            href="#"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors pointer-events-auto bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm"
        >
            <BookOpen size={16} />
            <span className="hidden sm:inline">Learning Guide</span>
        </a>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden px-4">
        
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl mix-blend-screen animate-pulse duration-[4s]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl mix-blend-screen animate-pulse duration-[5s]"></div>

        {/* Visualizer Area */}
        <div className="relative z-0 mb-12 transform transition-all duration-500">
           <Visualizer volume={volume} isActive={isActive} />
           
           {/* Status Text under visualizer */}
           <div className={`absolute -bottom-12 left-0 right-0 text-center transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <p className="text-blue-200 font-medium animate-pulse">
                {volume > 0.05 ? "AI is listening..." : "AI is speaking..."}
              </p>
           </div>
        </div>

        {/* Controls */}
        <div className="relative z-10 w-full max-w-md">
            <ControlPanel 
                connectionState={connectionState}
                onStart={startSession}
                onStop={stopSession}
                config={config}
                setConfig={setConfig}
                languages={LANGUAGES}
                errorMessage={errorMessage}
            />
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 w-full text-center text-slate-500 text-sm">
        <p>Powered by Gemini Live API &bull; WebRTC Audio Streaming</p>
      </footer>
    </div>
  );
};

export default App;