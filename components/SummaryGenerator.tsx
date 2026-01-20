
import React, { useState } from 'react';
import { generateSummary, generateAudio } from '../services/geminiService';
import { SparklesIcon, SpeakerWaveIcon, DocumentTextIcon } from './Icons';

const SummaryGenerator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'audio'>('summary');

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError('Por favor, introduce texto para resumir.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSummary('');
    setAudioUrl(null);
    setActiveTab('summary');

    try {
      const generatedSummary = await generateSummary(inputText);
      setSummary(generatedSummary);
      
      const audioBase64 = await generateAudio(generatedSummary);
      const audioBlob = new Blob([Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0))], { type: 'audio/mpeg' });
      setAudioUrl(URL.createObjectURL(audioBlob));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // FIX: Replaced <style jsx> with Tailwind CSS classes to resolve TypeScript error.
  const tabButtonBaseClasses = "flex items-center gap-2 py-2 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400 border-b-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-700";
  const tabActiveClasses = "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400";
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-4 sticky top-8">
      <div className="flex items-center gap-3">
        <SparklesIcon className="h-8 w-8 text-indigo-500" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Asistente de IA</h2>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Pega el contenido de la presentación a continuación para generar un resumen y una versión en audio.
      </p>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={8}
        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Pega el texto de la presentación aquí..."
        disabled={isLoading}
      />

      <button
        onClick={handleGenerate}
        disabled={isLoading || !inputText}
        className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generando...
          </>
        ) : (
          <>
            <SparklesIcon className="h-5 w-5"/>
            Generar Resumen y Audio
          </>
        )}
      </button>

      {error && <p className="text-sm text-red-500">{error}</p>}
      
      {(summary || audioUrl) && !isLoading && (
        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                 <button onClick={() => setActiveTab('summary')} className={`${tabButtonBaseClasses} ${activeTab === 'summary' ? tabActiveClasses : ''}`}><DocumentTextIcon className="h-5 w-5"/> Resumen</button>
                 <button onClick={() => setActiveTab('audio')} className={`${tabButtonBaseClasses} ${activeTab === 'audio' ? tabActiveClasses : ''}`}><SpeakerWaveIcon className="h-5 w-5"/> Audio</button>
            </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-b-md">
                 {activeTab === 'summary' && summary && (
                    <p className="text-sm whitespace-pre-wrap">{summary}</p>
                 )}
                 {activeTab === 'audio' && audioUrl && (
                     <audio controls src={audioUrl} className="w-full">
                         Tu navegador no soporta el elemento de audio.
                     </audio>
                 )}
            </div>
        </div>
      )}
    </div>
  );
};

export default SummaryGenerator;
