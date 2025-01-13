'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface FormState {
  company: string;
  position: string;
  status: string;
  date_applied: string;
  notes: string;
}

export default function AddJob() {
  const [form, setForm] = useState<FormState>({
    company: '',
    position: '',
    status: 'Applied',
    date_applied: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('jobs').insert([form]);
      if (error) throw error;

      alert('Job added successfully!');
      router.push('/job-tracker');
    } catch (error) {
      console.error(error);
      alert('Error adding job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Add a New Job</h2>
        <div className="mb-4">
          <label className="block font-bold mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Position</label>
          <input
            type="text"
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Date Applied</label>
          <input
            type="date"
            name="date_applied"
            value={form.date_applied}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Job'}
        </button>
      </form>
    </div>
  );
}
