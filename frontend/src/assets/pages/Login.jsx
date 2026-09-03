import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (isSignUp) {
      // Handle sign up logic
      console.log("Signing up:", { name, email, password });
    } else {
      // Handle sign in logic
      console.log("Signing in:", { email, password });
    }
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
          <h1 className="font-serif text-2xl text-ink">
            {isSignUp ? "Create an account" : "Welcome back"}
          </h1>
          <p className="mt-2 font-sans text-sm text-ink/60">
            {isSignUp
              ? "Sign up to start learning with Fieldnote."
              : "Sign in to pick up where you left off."}
          </p>

          <div className="mt-8 flex flex-col gap-5">
            {isSignUp && (
              <label className="flex flex-col gap-2">
                <span className="font-sans text-sm text-ink/70">Full Name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="border border-line bg-transparent px-3 py-2.5 font-sans text-sm text-ink outline-none transition-colors focus:border-ink"
                />
              </label>
            )}

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
              {isSignUp ? "Sign up" : "Sign in"}
            </button>
          </div>

          <p className="mt-6 font-sans text-sm text-ink/50">
            {isSignUp ? (
              <>
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="cursor-pointer text-brass hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                New here?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="cursor-pointer text-brass hover:underline"
                >
                  Create an account
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}