
import React from 'react';

interface InputFormProps {
  url: string;
  setUrl: (url: string) => void;
  keywords: string;
  setKeywords: (keywords: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
);

const InputForm: React.FC<InputFormProps> = ({ url, setUrl, keywords, setKeywords, handleSubmit, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-sky-300 mb-2">Website URL</label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., https://example-jobs.com"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
            required
          />
        </div>
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-sky-300 mb-2">Job Keywords</label>
          <input
            id="keywords"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., React Developer, UI/UX Designer"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="mt-8 w-full flex items-center justify-center bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-600/30"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Scavenging...
          </>
        ) : (
          <>
            <SearchIcon />
            Scrape for Jobs
          </>
        )}
      </button>
    </form>
  );
};

export default InputForm;
