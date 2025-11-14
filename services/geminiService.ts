
import { GoogleGenAI, Type } from "@google/genai";
import { Job } from '../types';

const fetchScrapedJobs = async (url: string, keywords: string): Promise<Job[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an AI-powered web scraper that extracts job postings. 
    Given the fictitious website URL '${url}' and the keywords '${keywords}', generate a realistic list of 5 job postings that could be found on that site.
    The job postings must be in a valid JSON array format. Do not include any introductory text, markdown formatting, or explanations.
    Each job object in the array must have a unique 'id' (a short random string), 'title', 'company', 'location', 'description' (2-3 sentences), an array of 'skills', and a fictitious 'applyLink'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "A unique identifier for the job posting." },
              title: { type: Type.STRING, description: "The title of the job." },
              company: { type: Type.STRING, description: "The name of the company hiring." },
              location: { type: Type.STRING, description: "The location of the job (e.g., City, State, or Remote)." },
              description: { type: Type.STRING, description: "A brief summary of the job role." },
              skills: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of key skills required for the job."
              },
              applyLink: { type: Type.STRING, description: "A fictional URL to apply for the job." }
            },
            required: ["id", "title", "company", "location", "description", "skills", "applyLink"]
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const jobsData: Job[] = JSON.parse(jsonText);
    return jobsData;

  } catch (error) {
    console.error("Error fetching job data from Gemini API:", error);
    throw new Error("Failed to scavenge job data. The AI might be busy or an error occurred.");
  }
};

export default fetchScrapedJobs;
