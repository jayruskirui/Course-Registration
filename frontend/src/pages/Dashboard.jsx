import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import CourseModal from "../components/CourseModel";
import { apiRequest } from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Design");
  const [level, setLevel] = useState("Beginner");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await apiRequest("/courses");
      setCourses(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchDashboardData();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDuration("");
    setDescription("");
    setFile(null);
    setEditingCourseId(null);
  };

  const handleEdit = (course) => {
    setEditingCourseId(course.id);
    setTitle(course.title);
    setCategory(course.category || "Design");
    setLevel(course.level || "Beginner");
    setDuration(course.duration || "");
    setDescription(course.description || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete");
      }
      setStatus({ type: "success", message: "Course deleted." });
      fetchDashboardData();
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructor", user?.name || "Lecturer");
    formData.append("category", category);
    formData.append("level", level);
    formData.append("duration", duration);
    formData.append("description", description);
    if (file) formData.append("document", file);

    const token = localStorage.getItem("token");
    const url = editingCourseId
      ? `http://localhost:5000/api/courses/${editingCourseId}`
      : "http://localhost:5000/api/courses";
    const method = editingCourseId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Upload failed with status ${res.status}`);
      }

      setStatus({
        type: "success",
        message: editingCourseId ? "Course updated!" : "Course published!",
      });
      resetForm();
      fetchDashboardData();
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const isLecturer = user?.role === "lecturer";

  // Lecturer view calculations
  const lecturerCourses = courses.filter(
    (c) => c.instructor?.toLowerCase() === user?.name?.toLowerCase()
  );

  // Dynamic Student metrics calculations
  const inProgressCourses = courses.filter((c) => {
    const progress = Number(c.progress || 0);
    return progress > 0 && progress < 100;
  });

  const completedCourses = courses.filter((c) => Number(c.progress) === 100);

  const hoursLearned = courses.reduce((acc, c) => {
    const durationMatch = (c.duration || "").match(/\d+/);
    const totalHours = durationMatch ? parseInt(durationMatch[0], 10) : 0;
    const progress = Number(c.progress || 0);

    return acc + Math.round((totalHours * progress) / 100);
  }, 0);

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="font-sans text-xs text-sage">{todayFormatted}</p>
        <h1 className="mt-1 font-serif text-3xl text-ink sm:text-4xl">
          Welcome back, {user?.name || "User"}
        </h1>

        {isLecturer ? (
          /* ================= LECTURER VIEW ================= */
          <>
            <section className="mt-8 border border-line bg-white p-6 sm:p-8">
              <h2 className="font-serif text-xl text-ink">
                {editingCourseId ? "Edit Course" : "Upload New Course"}
              </h2>

              {status.message && (
                <div
                  className={`mt-4 border p-3 font-sans text-xs ${
                    status.type === "success"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                      : "border-red-500 bg-red-50 text-red-600"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <label className="flex flex-col gap-1">
                  <span className="font-sans text-xs text-ink/70">Course Title</span>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-line px-3 py-2 font-sans text-sm outline-none"
                  />
                </label>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <label className="flex flex-col gap-1">
                    <span className="font-sans text-xs text-ink/70">Category</span>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="border border-line px-3 py-2 font-sans text-sm"
                    >
                      <option value="Design">Design</option>
                      <option value="Data">Data</option>
                      <option value="Writing">Writing</option>
                      <option value="Business">Business</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="font-sans text-xs text-ink/70">Level</span>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="border border-line px-3 py-2 font-sans text-sm"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All levels">All levels</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="font-sans text-xs text-ink/70">Duration</span>
                    <input
                      type="text"
                      required
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="border border-line px-3 py-2 font-sans text-sm outline-none"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1">
                  <span className="font-sans text-xs text-ink/70">Description</span>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-line px-3 py-2 font-sans text-sm outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-sans text-xs text-ink/70">Course Document (PDF)</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="font-sans text-xs text-ink/70"
                  />
                </label>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-ink py-2.5 font-sans text-sm text-paper hover:bg-brass disabled:opacity-50"
                  >
                    {submitting ? "Processing..." : editingCourseId ? "Update Course" : "Publish Course"}
                  </button>
                  {editingCourseId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="border border-line px-4 font-sans text-sm text-ink/60 hover:text-ink"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </section>

            <h2 className="mt-12 font-serif text-xl text-ink">Your Published Courses</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {lecturerCourses.map((course) => (
                <div key={course.id || course.title} className="flex flex-col border border-line bg-white">
                  <CourseCard course={course} onAction={setSelectedCourse} />
                  <div className="flex border-t border-line">
                    <button
                      onClick={() => handleEdit(course)}
                      className="flex-1 border-r border-line py-2 font-sans text-xs text-ink hover:bg-paper"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="flex-1 py-2 font-sans text-xs text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* ================= STUDENT VIEW ================= */
          <>
            {/* Dynamic Metric Summary Tracker */}
            <div className="mt-8 grid grid-cols-3 divide-x divide-line border-y border-line">
              <div className="px-4 py-5 text-center sm:px-8 sm:text-left">
                <p className="font-serif text-3xl text-ink sm:text-4xl">
                  {inProgressCourses.length}
                </p>
                <p className="mt-1 font-sans text-xs text-ink/50 sm:text-sm">In progress</p>
              </div>
              <div className="px-4 py-5 text-center sm:px-8 sm:text-left">
                <p className="font-serif text-3xl text-ink sm:text-4xl">
                  {completedCourses.length}
                </p>
                <p className="mt-1 font-sans text-xs text-ink/50 sm:text-sm">Completed</p>
              </div>
              <div className="px-4 py-5 text-center sm:px-8 sm:text-left">
                <p className="font-serif text-3xl text-ink sm:text-4xl">
                  {hoursLearned}
                </p>
                <p className="mt-1 font-sans text-xs text-ink/50 sm:text-sm">Hours learned</p>
              </div>
            </div>

            {/* Courses List */}
            <div className="mt-12 flex items-center justify-between">
              <h2 className="font-serif text-xl text-ink">Continue learning</h2>
              <div className="ml-6 h-px flex-1 bg-line" />
            </div>

            {loading ? (
              <p className="mt-6 font-sans text-sm text-ink/60">Loading courses...</p>
            ) : courses.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id || course.title}
                    course={course}
                    onAction={setSelectedCourse}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-6 font-sans text-sm text-ink/50">
                You have no enrolled courses yet.
              </p>
            )}
          </>
        )}
      </main>

      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
}