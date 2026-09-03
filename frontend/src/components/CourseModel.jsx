import { useEffect } from "react";
import { X, Play } from "lucide-react";

const lessonsByCategory = {
  Design: ["Setting up your workspace", "Core principles", "Building your first project"],
  Data: ["Getting the data in", "Exploring and cleaning", "Drawing conclusions"],
  Writing: ["Finding your angle", "Drafting without fear", "Editing for clarity"],
  Business: ["Framing the problem", "Working through a case", "Applying it this week"],
};

export default function CourseModal({ course, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!course) return null;

  const {
    title = "Untitled Course",
    instructor = "Unknown Instructor",
    category = "General",
    duration = "Self-paced",
    level = "All levels",
    progress,
    description,
  } = course;

  const lessons = lessonsByCategory[category] || [
    "Introduction",
    "Core concepts",
    "Putting it into practice",
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/50 px-4 py-8"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-full w-full max-w-lg overflow-y-auto border border-line bg-paper"
      >
        <div className="flex items-start justify-between border-b border-line px-6 py-4">
          <div>
            <span className="font-sans text-xs text-sage">{category}</span>
            <h2 className="mt-1 font-serif text-2xl text-ink">{title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-ink/50 transition-colors hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>

        <button className="group relative flex aspect-video w-full items-center justify-center bg-ink">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-paper/40 transition-colors group-hover:border-brass group-hover:bg-brass">
            <Play size={20} className="ml-0.5 text-paper" fill="currentColor" />
          </span>
          <span className="absolute bottom-3 left-4 font-sans text-xs text-paper/60">
            Preview · Lesson 1
          </span>
        </button>

        <div className="px-6 py-5">
          <div className="flex flex-wrap gap-x-6 gap-y-1 font-sans text-sm text-ink/60">
            <span>Taught by {instructor}</span>
            <span>{duration}</span>
            <span>{level}</span>
          </div>

          {typeof progress === "number" && (
            <div className="mt-4">
              <div className="h-1 w-full bg-line">
                <div className="h-1 bg-brass" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-1.5 font-sans text-xs text-ink/50">
                {progress}% complete — resuming at lesson{" "}
                {Math.min(3, Math.ceil((progress / 100) * lessons.length) + 1)}
              </p>
            </div>
          )}

          <p className="mt-5 font-sans text-sm leading-relaxed text-ink/70">
            {description ||
              `This preview covers what to expect from ${title.toLowerCase()}: how the course is structured, the pace it moves at, and the kind of work you'll be doing between lessons.`}
          </p>

          <div className="mt-5 border-t border-line pt-4">
            <p className="font-sans text-xs text-ink/50">In this course</p>
            <ul className="mt-2 flex flex-col gap-2">
              {lessons.map((lesson, i) => (
                <li
                  key={lesson}
                  className="flex items-center gap-3 font-sans text-sm text-ink/80"
                >
                  <span className="font-serif text-ink/30">{i + 1}</span>
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex border-t border-line">
          <button
            onClick={onClose}
            className="flex-1 border-r border-line py-3 font-sans text-sm text-ink/60 transition-colors hover:text-ink"
          >
            Close
          </button>
          <button className="flex-1 bg-ink py-3 font-sans text-sm text-paper transition-colors hover:bg-brass">
            {typeof progress === "number" ? "Resume course" : "Enroll now"}
          </button>
        </div>
      </div>
    </div>
  );
}