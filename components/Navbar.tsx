import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/">
        <h1 className="text-xl font-bold">Job Tracker</h1>
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/job-tracker" className="hover:underline">
            View Jobs
          </Link>
          <Link href="/job-tracker/add-job" className="hover:underline">
            Add Job
          </Link>
        </div>
      </nav>
    </header>
  );
}
