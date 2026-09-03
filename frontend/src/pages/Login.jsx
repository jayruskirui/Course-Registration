import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const endpoint = isSignUp ? "/auth/register" : "/auth/login";
    const payload = isSignUp
      ? { name, email, password, role }
      : { email, password };

    try {
      const data = await apiRequest(endpoint, "POST", payload);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === "lecturer") {
        navigate("/instructor");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
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

      <div className="flex flex-1 items-center justify-center px-6 py-14 sm:px-12">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h1 className="font-serif text-2xl text-ink">
            {isSignUp ? "Create an account" : "Welcome back"}
          </h1>
          <p className="mt-2 font-sans text-sm text-ink/60">
            {isSignUp
              ? "Sign up to start teaching or learning on Fieldnote."
              : "Sign in to pick up where you left off."}
          </p>

          {error && (
            <div className="mt-4 border border-red-500 bg-red-50 p-2 font-sans text-xs text-red-600">
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-5">
            {isSignUp && (
              <>
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-sm text-ink/70">I am joining as a:</span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole("student")}
                      className={`border py-2 font-sans text-xs transition-colors ${
                        role === "student"
                          ? "border-ink bg-ink text-paper"
                          : "border-line text-ink/70 hover:border-ink"
                      }`}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("lecturer")}
                      className={`border py-2 font-sans text-xs transition-colors ${
                        role === "lecturer"
                          ? "border-ink bg-ink text-paper"
                          : "border-line text-ink/70 hover:border-ink"
                      }`}
                    >
                      Lecturer
                    </button>
                  </div>
                </div>

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
              </>
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
              {isSignUp ? `Sign up as ${role}` : "Sign in"}
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