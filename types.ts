export interface LanguageConfig {
  code: string;
  name: string;
  voiceName: string; // Gemini voice name (Puck, Charon, Kore, Fenrir, Zephyr)
}

export interface SessionConfig {
  language: LanguageConfig;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export enum ConnectionState {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR',
}

export interface AudioVisualizerState {
  volume: number; // 0 to 1
  isSpeaking: boolean;
}