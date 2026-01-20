"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
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
        const errorData = await response.json();
        throw new Error(errorData.error || "Unable to submit form");
      }

      setState("success");
      form.reset();
      // Optional: alert or redirect if messages are removed
      alert("Thank you! Your message has been sent.");
    } catch (error: any) {
      console.error(error);
      setState("error");
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setState("idle");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card relative overflow-hidden bg-white px-5 py-8 shadow-2xl sm:p-10"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500" />

      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Full Name
          </label>
          <input
            required
            name="name"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none"
            placeholder="e.g. Rahul Sharma"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none"
              placeholder="rahul@example.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Your Message
          </label>
          <textarea
            name="message"
            rows={4}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none resize-none"
            placeholder="How can we help you today?"
          />
        </div>

        <button
          type="submit"
          disabled={state === "submitting"}
          className="group relative w-full overflow-hidden rounded-xl bg-slate-900 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-600 active:scale-[0.98] disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {state === "submitting" ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                </svg>
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
