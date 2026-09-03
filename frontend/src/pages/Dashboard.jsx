import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import CourseModal from "../components/CourseModel";
import { apiRequest } from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1. Retrieve stored user object from authentication
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }

    // 2. Fetch courses from backend API
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const data = await apiRequest("/courses");
        setCourses(data);
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // Format today's date dynamically
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const stats = [
    { label: "In progress", value: courses.length.toString() },
    { label: "Completed", value: "0" },
    { label: "Hours learned", value: "0" },
  ];

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="font-sans text-sm text-sage">{todayFormatted}</p>
        <h1 className="mt-1 font-serif text-3xl text-ink sm:text-4xl">
          Good to see you back, {user?.name || "Learner"}.
        </h1>

        <div className="mt-10 grid grid-cols-3 divide-x divide-line border-y border-line">
          {stats.map((stat) => (
            <div key={stat.label} className="px-4 py-5 text-center sm:px-8 sm:text-left">
              <p className="font-serif text-3xl text-ink sm:text-4xl">{stat.value}</p>
              <p className="mt-1 font-sans text-xs text-ink/50 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between">
          <h2 className="font-serif text-xl text-ink">Continue learning</h2>
          <div className="ml-6 h-px flex-1 bg-line" />
        </div>

        {loading ? (
          <div className="mt-8 text-center">
            <p className="font-sans text-sm text-ink/60">Loading your courses...</p>
          </div>
        ) : error ? (
          <div className="mt-8 text-center">
            <p className="font-serif text-lg text-red-600">{error}</p>
          </div>
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
          <div className="mt-8 text-center">
            <p className="font-serif text-lg text-ink">No enrolled courses yet.</p>
          </div>
        )}
      </main>

      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
}