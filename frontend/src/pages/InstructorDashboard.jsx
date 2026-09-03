import { useState } from "react";
import Navbar from "../components/Navbar";
import { apiRequest } from "../api";

export default function InstructorDashboard() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Design");
  const [level, setLevel] = useState("Beginner");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  async function handleCourseUpload(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await apiRequest("/courses", "POST", {
        title,
        instructor: user.name || "Lecturer",
        category,
        level,
        duration,
        description,
      });

      setStatus({ type: "success", message: "Course uploaded successfully!" });
      setTitle("");
      setDuration("");
      setDescription("");
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to upload course." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Lecturer Studio</h1>
        <p className="mt-2 font-sans text-sm text-ink/60">
          Create and publish new course materials for Fieldnote students.
        </p>

        {status.message && (
          <div
            className={`mt-6 border p-3 font-sans text-sm ${
              status.type === "success"
                ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                : "border-red-500 bg-red-50 text-red-600"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleCourseUpload} className="mt-8 border border-line bg-white p-6 sm:p-8">
          <h2 className="font-serif text-xl text-ink">Upload Course Details</h2>
          <div className="mt-6 flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <span className="font-sans text-sm text-ink/70">Course Title</span>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Advanced PostgreSQL Architecture"
                className="border border-line bg-transparent px-3 py-2.5 font-sans text-sm text-ink outline-none transition-colors focus:border-ink"
              />
            </label>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <label className="flex flex-col gap-2">
                <span className="font-sans text-sm text-ink/70">Category</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-line bg-transparent px-3 py-2.5 font-sans text-sm text-ink outline-none focus:border-ink"
                >
                  <option value="Design">Design</option>
                  <option value="Data">Data</option>
                  <option value="Writing">Writing</option>
                  <option value="Business">Business</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-sans text-sm text-ink/70">Level</span>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="border border-line bg-transparent px-3 py-2.5 font-sans text-sm text-ink outline-none focus:border-ink"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All levels">All levels</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-sans text-sm text-ink/70">Duration</span>
                <input
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 4h 30m"
                  className="border border-line bg-transparent px-3 py-2.5 font-sans text-sm text-ink outline-none focus:border-ink"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="font-sans text-sm text-ink/70">Course Description</span>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Overview of topics and key takeaways..."
                className="border border-line bg-transparent px-3 py-2.5 font-sans text-sm text-ink outline-none focus:border-ink"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-ink py-3 font-sans text-sm text-paper transition-colors hover:bg-brass disabled:opacity-50"
            >
              {loading ? "Publishing course..." : "Publish Course"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}