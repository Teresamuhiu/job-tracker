// Define the Job interface
interface Job {
    id: string;
    company: string;
    position: string;
    status: string;
    date_applied?: string; // Optional field
    notes?: string; // Optional field
  }
  
  // Define the JobCard component
  export default function JobCard({ job }: { job: Job }) {
    return (
      <div className="p-4 bg-white rounded shadow hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold text-blue-600">{job.company}</h3>
        <p className="text-gray-700">Position: {job.position}</p>
        <p>
          Status: <span className="font-medium">{job.status}</span>
        </p>
        <p>
          Date Applied:{' '}
          {job.date_applied
            ? new Date(job.date_applied).toLocaleDateString()
            : 'N/A'}
        </p>
        <p>Notes: {job.notes || 'No notes'}</p>
      </div>
    );
  }
  