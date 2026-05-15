"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ContactFormInput } from "@/lib/validations/contact";

const initialState: ContactFormInput = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  message: "",
  region: undefined,
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormInput>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function updateField<K extends keyof ContactFormInput>(
    key: K,
    value: ContactFormInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-testid="contact-form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name *</Label>
          <Input
            id="firstName"
            name="firstName"
            required
            value={form.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            data-testid="contact-first-name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name *</Label>
          <Input
            id="lastName"
            name="lastName"
            required
            value={form.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            data-testid="contact-last-name"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            data-testid="contact-email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone ?? ""}
            onChange={(e) => updateField("phone", e.target.value)}
            data-testid="contact-phone"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            name="company"
            required
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            data-testid="contact-company"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job title</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={form.jobTitle ?? ""}
            onChange={(e) => updateField("jobTitle", e.target.value)}
            data-testid="contact-job-title"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="region">Region</Label>
        <select
          id="region"
          name="region"
          className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          value={form.region ?? ""}
          onChange={(e) =>
            updateField(
              "region",
              (e.target.value || undefined) as ContactFormInput["region"],
            )
          }
          data-testid="contact-region"
        >
          <option value="">Select region</option>
          <option value="north-america">North America</option>
          <option value="europe">Europe</option>
          <option value="apac">APAC</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">How can we help? *</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          data-testid="contact-message"
        />
      </div>

      {status === "success" && (
        <p
          className="rounded-lg border border-teal-500/30 bg-teal-500/10 px-4 py-3 text-sm text-teal-800 dark:text-teal-200"
          data-testid="contact-success"
          role="status"
        >
          Thanks — your message was sent. We&apos;ll be in touch shortly.
        </p>
      )}

      {status === "error" && errorMessage && (
        <p
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          data-testid="contact-error"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
        data-testid="contact-submit"
      >
        {status === "loading" ? (
          <Loader2 className="animate-spin" data-icon="inline-start" />
        ) : (
          <Send data-icon="inline-start" />
        )}
        {status === "loading" ? "Sending…" : "Submit inquiry"}
      </Button>
    </form>
  );
}
