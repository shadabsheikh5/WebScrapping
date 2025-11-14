
import React from 'react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zm-1 2v1h2V4a1 1 0 00-2 0z" clipRule="evenodd" />
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);


const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-sky-500/20 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h3 className="text-xl font-bold text-sky-400 mb-2 md:mb-0">{job.title}</h3>
        <a 
          href={job.applyLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex-shrink-0"
        >
          Apply Now
        </a>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400 mb-4">
          <div className="flex items-center gap-2">
            <BriefcaseIcon />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <LocationIcon />
            <span>{job.location}</span>
          </div>
      </div>
      <p className="text-slate-300 text-sm mb-5">{job.description}</p>
      <div className="border-t border-slate-700 pt-4">
        <h4 className="text-sm font-semibold text-slate-200 mb-3">Key Skills</h4>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <span key={index} className="bg-slate-700 text-sky-300 text-xs font-mono font-medium px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
