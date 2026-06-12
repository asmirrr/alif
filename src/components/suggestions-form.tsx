"use client";

import React, { useState } from "react";
import { Loader2, Check, AlertCircle, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface SuggestionsFormProps {
  className?: string;
}

export function SuggestionsForm({ className = "" }: SuggestionsFormProps) {
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateEmail = (emailStr: string) => {
    if (!emailStr) return true; // Optional field
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailStr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedSuggestion = suggestion.trim();
    if (!trimmedSuggestion) {
      setStatus("error");
      setErrorMessage("Please enter your suggestion.");
      return;
    }

    if (trimmedSuggestion.length > 500) {
      setStatus("error");
      setErrorMessage("Suggestion must be 500 characters or less.");
      return;
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail && !validateEmail(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const { error } = await supabase.from("suggestions").insert({
        email: trimmedEmail || null,
        suggestion: trimmedSuggestion,
      });

      if (error) {
        throw error;
      }

      setStatus("success");
      setEmail("");
      setSuggestion("");
    } catch (err: any) {
      console.error("Supabase suggestions error:", err);
      setStatus("error");
      setErrorMessage(
        err.message || "Something went wrong. Please try again later."
      );
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
        <h4 className="text-base font-bold text-foreground">Suggestion Submitted!</h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Thank you for your feedback. We read every suggestion to help make Alif better.
        </p>
        <Button
          onClick={() => setStatus("idle")}
          variant="ghost"
          size="sm"
          className="mt-4 text-xs font-semibold text-primary hover:underline hover:bg-transparent"
        >
          Submit another suggestion
        </Button>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex size-7 items-center justify-center rounded-lg bg-accent text-primary">
          <MessageSquare className="size-4" />
        </div>
        <h3 className="text-sm font-bold text-foreground tracking-tight">
          SUGGESTIONS
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Email Field (Optional) */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="suggestion-email"
            className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
          >
            Email Address <span className="text-muted-foreground/60 font-normal lowercase">(optional)</span>
          </label>
          <input
            id="suggestion-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            disabled={status === "loading"}
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-xs text-foreground placeholder:text-muted-foreground shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Suggestion Textarea */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-baseline">
            <label
              htmlFor="suggestion-text"
              className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
            >
              Suggestion <span className="text-destructive font-normal">*</span>
            </label>
            <span
              className={`text-[9px] tabular-nums font-semibold ${
                suggestion.length > 500 ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {suggestion.length}/500
            </span>
          </div>
          <textarea
            id="suggestion-text"
            required
            maxLength={500}
            placeholder="Help us improve. Share a feature request or general feedback..."
            value={suggestion}
            onChange={(e) => {
              setSuggestion(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            disabled={status === "loading"}
            aria-invalid={status === "error" ? "true" : "false"}
            aria-describedby={status === "error" ? "suggestion-error" : undefined}
            className={`min-h-[100px] w-full rounded-xl border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-50 disabled:cursor-not-allowed ${
              status === "error"
                ? "border-destructive focus:border-destructive focus:ring-destructive/15"
                : "border-border focus:border-primary"
            }`}
          />
        </div>

        {/* Error State Message */}
        {status === "error" && errorMessage && (
          <div
            id="suggestion-error"
            className="flex items-center gap-2 text-xs font-medium text-destructive animate-fadeIn"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle className="size-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={status === "loading" || !suggestion.trim()}
          className="h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full text-xs transition-all shadow-sm w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Feedback"
          )}
        </Button>
      </form>
    </div>
  );
}
