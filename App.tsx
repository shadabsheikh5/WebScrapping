
import React, { useState, useCallback } from 'react';
import { Job } from './types';
import fetchScrapedJobs from './services/geminiService';
import InputForm from './components/InputForm';
import JobCard from './components/JobCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('https://www.linkedin.com/jobs/');
  const [keywords, setKeywords] = useState<string>('Senior Frontend React Engineer');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setJobs([]);

    try {
      const fetchedJobs = await fetchScrapedJobs(url, keywords);
      setJobs(fetchedJobs);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, keywords]);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorMessage message={error} />;
    }
    if (hasSearched && jobs.length === 0) {
      return (
        <div className="text-center p-8 bg-slate-800/50 rounded-lg">
            <h3 className="text-lg font-medium text-slate-300">No Jobs Found</h3>
            <p className="mt-2 text-sm text-slate-400">The AI couldn't find any jobs matching your criteria. Try different keywords or another URL.</p>
        </div>
      );
    }
    if (jobs.length > 0) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      );
    }
    return (
        <div className="text-center p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-200">Welcome to AI Job Scavenger</h3>
            <p className="mt-2 text-slate-400">Enter a website URL and job keywords to begin your simulated job search.</p>
        </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
            AI Job Scavenger
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            Simulate scraping job data from any website using the power of AI. Enter a URL and keywords to get started.
          </p>
        </header>

        <main>
          <div className="mb-12">
            <InputForm
              url={url}
              setUrl={setUrl}
              keywords={keywords}
              setKeywords={setKeywords}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          
          <div className="results-section">
            {renderContent()}
          </div>
        </main>

        <footer className="text-center mt-16 py-6 border-t border-slate-800">
            <p className="text-sm text-slate-500">
                Powered by React, Tailwind CSS, and the Gemini API.
            </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
