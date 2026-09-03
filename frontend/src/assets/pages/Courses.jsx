import { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../../components/Navbar";
import CourseCard from "../../components/CourseCard";
import CourseModal from "../../components/CourseModel";

const categories = ["All", "Design", "Data", "Writing", "Business"];

const catalog = [
  { title: "Typography for the Web", instructor: "Elena Marsh", category: "Design", duration: "6h 20m", level: "Intermediate" },
  { title: "Applied Statistics", instructor: "Tomas Reyes", category: "Data", duration: "9h 05m", level: "Beginner" },
  { title: "Writing Clear Prose", instructor: "Anya Bloom", category: "Writing", duration: "4h 40m", level: "All levels" },
  { title: "Negotiation Fundamentals", instructor: "Priya Nair", category: "Business", duration: "5h 15m", level: "Beginner" },
  { title: "Data Visualization Principles", instructor: "Tomas Reyes", category: "Data", duration: "7h 50m", level: "Intermediate" },
  { title: "Layout & Grid Systems", instructor: "Elena Marsh", category: "Design", duration: "5h 30m", level: "Advanced" },
  { title: "The Editorial Voice", instructor: "Anya Bloom", category: "Writing", duration: "3h 55m", level: "Intermediate" },
  { title: "Reading Financial Statements", instructor: "Priya Nair", category: "Business", duration: "6h 10m", level: "Beginner" },
];

export default function Courses() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filtered = catalog.filter((course) => {
    const matchesCategory = active === "All" || course.category === active;
    const matchesQuery = course.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Courses</h1>
        <p className="mt-2 max-w-md font-sans text-sm text-ink/60">
          {catalog.length} courses, taught by people who still do the work.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 border-b border-line py-2 sm:max-w-xs sm:flex-1">
            <Search size={16} className="text-ink/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses"
              className="w-full bg-transparent font-sans text-sm text-ink outline-none placeholder:text-ink/40"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`border px-3.5 py-1.5 font-sans text-sm transition-colors ${
                  active === cat
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink/60 hover:border-ink hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <CourseCard
                key={course.title}
                course={course}
                onAction={setSelectedCourse}
              />
            ))}
          </div>
        ) : (
          <div className="mt-16 border-t border-line pt-10 text-center">
            <p className="font-serif text-lg text-ink">No courses match that search.</p>
            <p className="mt-1 font-sans text-sm text-ink/50">
              Try a different keyword or clear the category filter.
            </p>
          </div>
        )}
      </main>

      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
}
