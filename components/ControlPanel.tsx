import React from 'react';
import { Mic, MicOff, Settings, AlertCircle } from 'lucide-react';
import { ConnectionState, LanguageConfig, SessionConfig } from '../types';

interface ControlPanelProps {
  connectionState: ConnectionState;
  onStart: () => void;
  onStop: () => void;
  config: SessionConfig;
  setConfig: (config: SessionConfig) => void;
  languages: LanguageConfig[];
  errorMessage: string | null;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  connectionState,
  onStart,
  onStop,
  config,
  setConfig,
  languages,
  errorMessage,
}) => {
  const isConnected = connectionState === ConnectionState.CONNECTED;
  const isConnecting = connectionState === ConnectionState.CONNECTING;
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = languages.find(l => l.code === e.target.value);
    if (selected) {
      setConfig({ ...config, language: selected });
    }
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfig({ ...config, level: e.target.value as SessionConfig['level'] });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
      
      {/* Error Display */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg flex items-center gap-2 text-red-200 text-sm">
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Settings (Disabled while connected) */}
      <div className={`space-y-4 transition-opacity duration-300 ${isConnected ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <div>
          <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Target Language</label>
          <div className="relative">
             <select 
                value={config.language.code}
                onChange={handleLanguageChange}
                className="w-full bg-slate-900 text-white border border-slate-600 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
             >
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
             </select>
             <div className="absolute right-4 top-3.5 text-slate-500 pointer-events-none">
                 <Settings size={16} />
             </div>
          </div>
        </div>

        <div>
           <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Proficiency Level</label>
           <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-600">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                    <button
                        key={level}
                        onClick={() => setConfig({ ...config, level })}
                        className={`flex-1 py-2 text-sm rounded-md font-medium transition-colors ${
                            config.level === level 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        {level}
                    </button>
                ))}
           </div>
        </div>
      </div>

      {/* Main Action Button */}
      <div className="mt-8 flex justify-center">
        {isConnected || isConnecting ? (
          <button
            onClick={onStop}
            disabled={isConnecting}
            className={`
                group relative flex items-center justify-center w-20 h-20 rounded-full 
                bg-red-500 hover:bg-red-600 transition-all shadow-lg hover:shadow-red-500/30
                ${isConnecting ? 'opacity-70 cursor-wait' : ''}
            `}
          >
            <MicOff className="w-8 h-8 text-white" />
          </button>
        ) : (
           <button
            onClick={onStart}
            className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30"
          >
             <div className="absolute inset-0 rounded-full border-4 border-blue-400 opacity-30 group-hover:scale-110 transition-transform"></div>
            <Mic className="w-8 h-8 text-white" />
          </button>
        )}
      </div>

      <div className="text-center mt-4">
        <p className={`text-sm font-medium ${isConnected ? 'text-green-400' : isConnecting ? 'text-yellow-400' : 'text-slate-500'}`}>
            {isConnected ? "Conversation Active" : isConnecting ? "Connecting..." : "Ready to Practice"}
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;