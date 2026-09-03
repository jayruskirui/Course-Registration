import { useState } from "react";
import Navbar from "../../components/Navbar";
import CourseCard from "../../components/CourseCard";
import CourseModal from "../../components/CourseModel";

const stats = [
  { label: "In progress", value: "3" },
  { label: "Completed", value: "12" },
  { label: "Hours learned", value: "47" },
];

const inProgress = [
  {
    title: "Typography for the Web",
    instructor: "Elena Marsh",
    category: "Design",
    duration: "6h 20m",
    level: "Intermediate",
    progress: 62,
  },
  {
    title: "Applied Statistics",
    instructor: "Tomas Reyes",
    category: "Data",
    duration: "9h 05m",
    level: "Beginner",
    progress: 28,
  },
  {
    title: "Writing Clear Prose",
    instructor: "Anya Bloom",
    category: "Writing",
    duration: "4h 40m",
    level: "All levels",
    progress: 90,
  },
];

export default function Dashboard() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="font-sans text-sm text-sage">Wednesday, 3 September</p>
        <h1 className="mt-1 font-serif text-3xl text-ink sm:text-4xl">
          Good to see you back, Maya.
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
          <div className="h-px flex-1 bg-line ml-6" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {inProgress.map((course) => (
            <CourseCard
              key={course.title}
              course={course}
              onAction={setSelectedCourse}
            />
          ))}
        </div>
      </main>

      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
}
