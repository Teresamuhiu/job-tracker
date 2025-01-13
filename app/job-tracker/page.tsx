'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Job {
  id: string;
  company: string;
  position: string;
  status: string;
  date_applied: string;
  notes: string;
}

export default function JobTrackerPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [updatedNotes, setUpdatedNotes] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      const { data, error } = await supabase.from('jobs').select('*');
      if (error) console.error(error);
      else setJobs(data || []);
    }
    fetchJobs();
  }, []);

  const handleEdit = (job: Job) => {
    setEditJob(job);
    setUpdatedStatus(job.status);
    setUpdatedNotes(job.notes);
  };

  const handleSave = async () => {
    if (!editJob) return;

    const { data, error } = await supabase
      .from('jobs')
      .update({ status: updatedStatus, notes: updatedNotes })
      .eq('id', editJob.id)
      .select();

    if (error) {
      console.error('Error updating job:', error);
    } else if (data && data.length > 0) {
      setJobs(jobs.map((job) => (job.id === editJob.id ? data[0] : job)));
      alert('Job updated successfully!');
    }
    setEditJob(null);
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
                <p className="mb-2">Position: {job.position}</p>
                <div className="mb-4">
                  <label className="block mb-1">Status:</label>
                  <select
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Notes:</label>
                  <textarea
                    value={updatedNotes}
                    onChange={(e) => setUpdatedNotes(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <button onClick={handleSave} className="mr-2 bg-blue-600 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button onClick={() => setEditJob(null)} className="bg-gray-400 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-2">{job.company}</h2>
                <p className="mb-2">Position: {job.position}</p>
                <p className="mb-2">Status: {job.status}</p>
                <p className="mb-2">Date Applied: {new Date(job.date_applied).toLocaleDateString()}</p>
                <p className="mb-2">Notes: {job.notes}</p>
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
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
