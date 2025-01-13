export default function JobCard({ job }: { job: any }) {
  return (
    <div className="p-4 bg-white rounded shadow hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold">{job.company}</h3>
      <p className="text-gray-700">Position: {job.position}</p>
      <p>Status: <span className="font-medium">{job.status}</span></p>
      <p>Date Applied: {job.date_applied || 'N/A'}</p>
      <p>Notes: {job.notes || 'No notes'}</p>
    </div>
  );
}
