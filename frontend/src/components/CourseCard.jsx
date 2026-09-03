import { Clock } from "lucide-react";

/**
 * course: {
 *   title, instructor, category, duration, level,
 *   progress?: number (0-100, only shown when provided)
 * }
 */
export default function CourseCard({ course, onAction }) {
  const { title, instructor, category, duration, level, progress } = course;

  return (
    <article className="group flex flex-col border border-line bg-white transition-colors hover:border-ink">
      <div className="flex items-start justify-between border-b border-line px-5 py-3">
        <span className="font-sans text-xs text-sage">{category}</span>
        <span className="font-sans text-xs text-ink/50">{level}</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 py-5">
        <h3 className="font-serif text-lg leading-snug text-ink">{title}</h3>
        <p className="font-sans text-sm text-ink/60">by {instructor}</p>

        <div className="mt-auto flex items-center gap-1.5 pt-2 font-sans text-xs text-ink/50">
          <Clock size={13} />
          <span>{duration}</span>
        </div>

        {typeof progress === "number" && (
          <div className="pt-1">
            <div className="h-1 w-full bg-line">
              <div
                className="h-1 bg-brass"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1.5 font-sans text-xs text-ink/50">
              {progress}% complete
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => onAction?.(course)}
        className="border-t border-line px-5 py-3 text-left font-sans text-sm text-ink transition-colors group-hover:bg-ink group-hover:text-paper"
      >
        {typeof progress === "number" ? "Continue" : "View course"}
      </button>
    </article>
  );
}
