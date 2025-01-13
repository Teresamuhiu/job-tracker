'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import FormInput from '@/components/FormInput';


export default function AddJob() {
  const [form, setForm] = useState({
    company: '',
    position: '',
    status: 'Applied',
    date_applied: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!form.company || !form.position) {
      alert('Company and Position are required fields!');
      setLoading(false);
      return;
    }

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
    <div className="min-h-screen flex flex-col justify-between">
      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Add a New Job</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg">
          <FormInput
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
          />
          <FormInput
            label="Position"
            name="position"
            value={form.position}
            onChange={handleChange}
          />
          <FormInput
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
          />
          <FormInput
            label="Date Applied"
            name="date_applied"
            type="date"
            value={form.date_applied}
            onChange={handleChange}
          />
          <FormInput
            label="Notes"
            name="notes"
            type="textarea"
            value={form.notes}
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-500"
          >
            {loading ? 'Adding...' : 'Add Job'}
          </button>
        </form>
      </div>
    </div>
  );
}
