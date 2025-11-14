
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="relative flex justify-center items-center">
        <div className="absolute w-24 h-24 rounded-full animate-ping bg-sky-500 opacity-30"></div>
        <div className="absolute w-16 h-16 rounded-full animate-ping bg-sky-400 opacity-50 delay-150"></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <p className="mt-6 text-lg font-semibold text-slate-300">Scavenging the web for jobs...</p>
      <p className="text-sm text-slate-400">The AI is analyzing the page content.</p>
    </div>
  );
};

export default Loader;
