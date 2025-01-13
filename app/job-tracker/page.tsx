'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function JobTrackerPage() {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null); // Stores the job being edited
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [updatedNotes, setUpdatedNotes] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      const { data, error } = await supabase.from('jobs').select('*');
      if (error) console.error(error);
      else setJobs(data);
    }
    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    setEditJob(job);
    setUpdatedStatus(job.status);
    setUpdatedNotes(job.notes);
  };

  const handleSave = async () => {
    const { data, error } = await supabase
      .from('jobs')
      .update({ status: updatedStatus, notes: updatedNotes })
      .eq('id', editJob.id)
      .select(); // Ensure it returns the updated data
    
    if (error) {
      console.error("Update Error:", error);
    } else if (data && data.length > 0) {
      setJobs(jobs.map((job) => (job.id === editJob.id ? data[0] : job))); // Update the job list
      setEditJob(null);
    } else {
      console.warn("Update successful, but no data returned.");
    }
  };
  
  

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Job Applications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            {editJob?.id === job.id ? (
              <>
                <h2 className="text-xl font-bold mb-2">{job.company}</h2>
                <p className="mb-2 text-gray-600">Position: {job.position}</p>
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700">Status:</label>
                  <select
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700">Notes:</label>
                  <textarea
                    value={updatedNotes}
                    onChange={(e) => setUpdatedNotes(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                    rows={4}
                  ></textarea>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditJob(null)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-2 text-blue-600">{job.company}</h2>
                <p className="mb-2 text-gray-600">Position: {job.position}</p>
                <p className="mb-2 text-gray-600">Status: {job.status}</p>
                <p className="mb-2 text-gray-600">
                  Date Applied: {new Date(job.date_applied).toLocaleDateString()}
                </p>
                <p className="mb-4 text-gray-600">Notes: {job.notes}</p>
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
