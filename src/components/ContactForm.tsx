"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setState("submitting");
    setMessage(null);

    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Unable to submit form");
      }

      setState("success");
      setMessage("Thank you! We have received your message.");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-shadow glass space-y-4 rounded-2xl p-6 sm:p-7"
    >
      <div>
        <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
          Name
        </label>
        <input
          required
          name="name"
          className="mt-2 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 outline-none ring-1 ring-slate-800/80 transition focus:border-cyan-400 focus:ring-cyan-400/60"
          placeholder="Your full name"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            className="mt-2 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 outline-none ring-1 ring-slate-800/80 transition focus:border-cyan-400 focus:ring-cyan-400/60"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            Phone
          </label>
          <input
            name="phone"
            className="mt-2 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 outline-none ring-1 ring-slate-800/80 transition focus:border-cyan-400 focus:ring-cyan-400/60"
            placeholder="Optional"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
          Message
        </label>
        <textarea
          name="message"
          className="mt-2 min-h-[120px] w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 outline-none ring-1 ring-slate-800/80 transition focus:border-cyan-400 focus:ring-cyan-400/60"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "submitting" ? "Submitting..." : "Send Message"}
      </button>
      {message && (
        <p
          className={`text-sm ${
            state === "error" ? "text-red-400" : "text-emerald-300"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
