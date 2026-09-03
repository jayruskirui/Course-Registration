import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left: editorial statement */}
      <div className="flex flex-col justify-between bg-ink px-8 py-10 text-paper sm:px-12 sm:py-14 md:w-1/2 md:px-16">
        <span className="font-serif text-xl italic">Fieldnote</span>

        <div className="max-w-md">
          <p className="font-serif text-3xl leading-tight sm:text-4xl">
            Learning worth keeping notes on.
          </p>
          <div className="mt-6 h-px w-16 bg-brass" />
          <p className="mt-6 font-sans text-sm text-paper/60">
            Courses taught by people who still practice what they teach.
          </p>
        </div>

        <p className="font-sans text-xs text-paper/40">
          © {new Date().getFullYear()} Fieldnote
        </p>
      </div>

      {/* Right: form */}
      <div className="flex flex-1 items-center justify-center px-6 py-14 sm:px-12">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h1 className="font-serif text-2xl text-ink">Welcome back</h1>
          <p className="mt-2 font-sans text-sm text-ink/60">
            Sign in to pick up where you left off.
          </p>

          <div className="mt-8 flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <span className="font-sans text-sm text-ink/70">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="border border-line bg-transparent px-3 py-2.5 font-sans text-sm text-ink outline-none transition-colors focus:border-ink"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-sans text-sm text-ink/70">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border border-line bg-transparent px-3 py-2.5 font-sans text-sm text-ink outline-none transition-colors focus:border-ink"
              />
            </label>

            <button
              type="submit"
              className="mt-2 bg-ink py-3 font-sans text-sm text-paper transition-colors hover:bg-brass"
            >
              Sign in
            </button>
          </div>

          <p className="mt-6 font-sans text-sm text-ink/50">
            New here?{" "}
            <span className="cursor-pointer text-brass">Create an account</span>
          </p>
        </form>
      </div>
    </div>
  );
}
