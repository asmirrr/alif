"use client";

import React, { useState } from "react";
import { Loader2, Check, AlertCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface WaitlistFormProps {
  className?: string;
  onSuccess?: (email: string) => void;
}

export function WaitlistForm({ className = "", onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateEmail = (emailStr: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailStr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setStatus("error");
      setErrorMessage("Please enter an email address.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const { error } = await supabase
        .from("waitlist")
        .insert({ email: trimmedEmail });

      if (error) {
        throw error;
      }

      setStatus("success");
      setEmail("");
      if (onSuccess) {
        onSuccess(trimmedEmail);
      }
    } catch (err: any) {
      console.error("Supabase waitlist error:", err);
      setStatus("error");
      
      const isDuplicate =
        err.code === "23505" ||
        err.message?.includes("duplicate") ||
        err.message?.includes("already exists") ||
        err.details?.includes("already exists");

      if (isDuplicate) {
        setErrorMessage("You're already on the waitlist.");
      } else {
        setErrorMessage(
          err.message || "Something went wrong. Please try again later."
        );
      }
    }
  };

  if (status === "success") {
    return (
      <div
        className={`rounded-2xl border border-primary/20 bg-card p-6 text-center shadow-md animate-fadeIn ${className}`}
        role="alert"
        aria-live="polite"
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3 animate-bounce">
          <Check className="size-6 stroke-[3]" />
        </div>
        <h4 className="text-lg font-bold text-foreground">You're on the list!</h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Thank you for joining the Alif waitlist. We will notify you as soon as updates or companion applications are available.
        </p>
        <Button
          onClick={() => setStatus("idle")}
          variant="ghost"
          size="sm"
          className="mt-4 text-xs font-semibold text-primary hover:underline hover:bg-transparent"
        >
          Add another email
        </Button>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-start"
        noValidate
      >
        <div className="flex-1 flex flex-col gap-1.5">
          <label htmlFor="waitlist-email" className="sr-only">
            Email Address
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            disabled={status === "loading"}
            aria-invalid={status === "error" ? "true" : "false"}
            aria-describedby={status === "error" ? "waitlist-error" : undefined}
            className={`h-12 w-full rounded-full border bg-card px-5 text-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-secondary/40 ${
              status === "error"
                ? "border-destructive focus:border-destructive focus:ring-destructive/15"
                : "border-border focus:border-primary"
            }`}
          />
        </div>
        <Button
          type="submit"
          disabled={status === "loading"}
          className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-full text-sm transition-all shadow-sm w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Joining...
            </>
          ) : (
            <>
              Join Waitlist
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      {status === "error" && errorMessage && (
        <div
          id="waitlist-error"
          className="mt-3 flex items-center gap-2 text-xs font-medium text-destructive animate-fadeIn"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
