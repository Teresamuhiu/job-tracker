

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="text-center p-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Job Tracker</h2>
        <p className="text-gray-600 mb-6">
          Easily track and manage your job applications. Stay organized and productive!
        </p>
        <div className="space-x-4">
          <a
            href="/job-tracker"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500"
          >
            View Jobs
          </a>
          <a
            href="/job-tracker/add-job"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500"
          >
            Add Job
          </a>
        </div>
      </div>
     
    </div>
  );
}
