"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  Compass,
  BookOpen,
  CheckCircle2,
  Shield,
  Heart,
  ArrowRight,
  Check,
  Smartphone,
  Sparkles,
  Leaf,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggleClient } from "@/components/layout/theme-toggle-client";
import { WaitlistForm } from "@/components/waitlist-form";

// Mock data for the interactive phone mockup
const MOCK_PRAYERS = [
  { name: "Fajr", time: "4:12 AM", active: false },
  { name: "Sunrise", time: "5:48 AM", active: false },
  { name: "Dhuhr", time: "12:58 PM", active: false },
  { name: "Asr", time: "4:32 PM", active: true },
  { name: "Maghrib", time: "7:46 PM", active: false, isNext: true },
  { name: "Isha", time: "9:12 PM", active: false },
];

export default function LandingPage() {
  const [previewTab, setPreviewTab] = useState<"home" | "times" | "qibla" | "track" | "daily">("home");
  const [trackingChecks, setTrackingChecks] = useState({
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: false,
    isha: false,
  });

  const toggleCheck = (prayer: keyof typeof trackingChecks) => {
    setTrackingChecks((prev) => ({
      ...prev,
      [prayer]: !prev[prayer],
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full max-w-7xl -translate-x-1/2 overflow-hidden px-4">
        <div className="absolute top-[-10%] left-[10%] h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px] dark:bg-primary/5" />
        <div className="absolute top-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-accent/20 blur-[100px] dark:bg-accent/5" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <span className="font-bold text-lg leading-none select-none">أ</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground select-none">
              Alif
            </span>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#preview" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              App Preview
            </a>
            <a href="#why-alif" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Why Alif
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggleClient />
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="font-medium">
                Enter App
              </Button>
            </Link>
            <a href="#waitlist">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 rounded-full transition-all">
                Join Waitlist
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-20 text-center sm:px-6 md:pt-24 md:pb-28">
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground dark:border-primary/10 select-none mb-6">
            <Sparkles className="size-3.5" />
            Introducing Alif companion
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Your Daily Companion for a{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-primary dark:to-emerald-400">
              More Mindful Deen.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed">
            Prayer times, qibla, reflection, and consistency—without the clutter. A beautiful sanctuary for your daily Islamic rituals.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#waitlist">
              <Button size="lg" className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-full text-base transition-all shadow-md hover:shadow-lg w-full sm:w-auto">
                Join the Waitlist
              </Button>
            </a>
            <a href="#preview">
              <Button variant="ghost" size="lg" className="h-12 border border-border bg-background hover:bg-accent font-medium px-8 rounded-full text-base transition-all w-full sm:w-auto">
                View App Preview
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-t border-border/40 bg-accent/20 py-20 dark:bg-card/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                The Noise vs. The Quiet
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Many modern Islamic apps have become cluttered, ad-heavy, and overwhelming. They pull your attention away when you seek connection.
              </p>
              
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive mt-0.5">
                    <span className="font-bold text-xs">✕</span>
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground">Ad banners and invasive popups interrupting reflection</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive mt-0.5">
                    <span className="font-bold text-xs">✕</span>
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground">Cluttered features that dilute your focus and daily habit</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive mt-0.5">
                    <span className="font-bold text-xs">✕</span>
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground">Invasive user tracking and data sharing algorithms</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="absolute -top-3 left-6 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                <Leaf className="size-3" />
                The Alif Philosophy
              </div>
              
              <h3 className="text-xl font-bold text-foreground">A Quiet Space for Reflection</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Alif is built by focusing entirely on simplicity and mindfulness. We designed a clean, calming sanctuary so you can focus on your spiritual goals without distractions.
              </p>

              <div className="mt-6 space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">100% Ad-Free, forever.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">Beautiful typography and generous spacing.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">Absolute privacy. Your data stays on your device.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Intentionally Minimal Features
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground font-medium">
              We design every component to make your daily connection calm, consistent, and distraction-free.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1: Prayer Times */}
            <Card className="border border-border/80 bg-card/50 transition-all hover:border-primary/20 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <Clock className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">Dynamic Prayer Times</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Accurate, dynamic calculations based on your coordinates via the browser Geolocation API. Smooth loading and manual fallback for peace of mind.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2: Qibla Direction */}
            <Card className="border border-border/80 bg-card/50 transition-all hover:border-primary/20 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <Compass className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">Qibla Direction</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Real-time Qibla calculations mapping your distance and degrees directly to Makkah. Features a beautiful visual compass.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3: Daily Reflection */}
            <Card className="border border-border/80 bg-card/50 transition-all hover:border-primary/20 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <BookOpen className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">Daily Reflection</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  A fresh, curated Qur'anic verse and mindful reminder every single day. Log your thoughts in a private local journal.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4: Prayer Tracking */}
            <Card className="border border-border/80 bg-card/50 transition-all hover:border-primary/20 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <CheckCircle2 className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">Prayer Tracking</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Log your prayers with a quick checklist. Build a visual weekly tracking record and maintain a mindful streak of consistency.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5: Privacy Guard */}
            <Card className="border border-border/80 bg-card/50 transition-all hover:border-primary/20 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <Shield className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">Absolute Privacy</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  No sign-ups, no databases, no tracking. Your logs, journal entries, and locations are stored locally on your device's browser.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6: Clean Design */}
            <Card className="border border-border/80 bg-card/50 transition-all hover:border-primary/20 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <Heart className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">Premium Experience</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Sleek dark mode, responsive mobile-first spacing, beautiful typography, and smooth transitions inspired by elite design systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Preview Section (Simulator) */}
      <section id="preview" className="border-y border-border/40 bg-accent/20 py-20 sm:py-28 dark:bg-card/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              See Alif in Action
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-sm sm:text-base text-muted-foreground font-medium">
              Interact with the tabs below to preview the mobile dashboard, calculators, trackers, and widgets.
            </p>
          </div>

          {/* Interactive tab selector */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {(["home", "times", "qibla", "track", "daily"] as const).map((tab) => {
              const label =
                tab === "home"
                  ? "Dashboard"
                  : tab === "times"
                  ? "Prayer Times"
                  : tab === "qibla"
                  ? "Qibla Compass"
                  : tab === "track"
                  ? "Habit Tracking"
                  : "Daily Reflection";

              return (
                <button
                  key={tab}
                  onClick={() => setPreviewTab(tab)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold tracking-tight transition-all uppercase ${
                    previewTab === tab
                      ? "bg-primary text-primary-foreground shadow-sm scale-105"
                      : "bg-background text-muted-foreground border border-border/80 hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Phone Emulator container */}
          <div className="mt-12 flex justify-center">
            <div className="relative h-[650px] w-full max-w-[340px] rounded-[48px] border-[10px] border-slate-900 bg-slate-950 p-3 shadow-2xl dark:border-slate-800">
              {/* Speaker / Notch */}
              <div className="absolute top-4 left-1/2 h-4 w-28 -translate-x-1/2 rounded-full bg-slate-900" />
              
              {/* Phone Content Screen */}
              <div className="h-full w-full overflow-hidden rounded-[38px] bg-background text-foreground flex flex-col relative border border-border/30">
                
                {/* Header info */}
                <div className="flex items-center justify-between px-5 pt-6 pb-2 text-[10px] font-bold text-muted-foreground/80 select-none">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <span className="size-2 rounded-full bg-muted-foreground/50" />
                    <span className="size-2 rounded-full bg-muted-foreground/50" />
                  </div>
                </div>

                {/* Simulated views based on active tab */}
                <div className="flex-1 overflow-y-auto px-4 pb-16 pt-2 select-none scrollbar-none">
                  {previewTab === "home" && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="mb-2">
                        <p className="text-xs text-muted-foreground">Good afternoon</p>
                        <h4 className="text-base font-bold text-foreground tracking-tight leading-none">As-salamu alaykum</h4>
                        <p className="text-[9px] text-muted-foreground">15 Ramadan 1447</p>
                      </div>

                      {/* Current card */}
                      <div className="rounded-xl border border-primary/20 bg-accent p-4">
                        <span className="rounded-full bg-primary/15 text-[8px] font-bold tracking-widest text-primary px-2 py-0.5 uppercase">
                          Now
                        </span>
                        <h5 className="text-xl font-bold mt-1 text-foreground leading-none">Asr</h5>
                        <p className="text-muted-foreground text-xs mt-1">4:32 PM</p>
                      </div>

                      {/* Next card */}
                      <div className="rounded-xl border border-border bg-card p-4 space-y-2">
                        <div className="flex justify-between items-baseline text-[9px] font-semibold text-muted-foreground">
                          <span>NEXT · MAGHRIB</span>
                          <span className="font-mono text-[10px]">3h 14m 12s</span>
                        </div>
                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "60%" }} />
                        </div>
                      </div>

                      {/* Verse of the day */}
                      <div className="rounded-xl border border-border bg-card p-4 space-y-1">
                        <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Verse of the day</p>
                        <p className="text-right font-serif text-sm font-semibold leading-relaxed font-arabic text-foreground">فَإِنَّ مَعَ الْعُسْرِ يُسْرًا</p>
                        <p className="text-[10px] font-medium text-foreground">"Indeed, with hardship comes ease."</p>
                        <p className="text-[8px] text-muted-foreground text-right mt-1">Ash-Sharh 94:6</p>
                      </div>
                    </div>
                  )}

                  {previewTab === "times" && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="mb-2">
                        <h4 className="text-base font-bold text-foreground">Prayer Times</h4>
                        <p className="text-[9px] text-muted-foreground">London, United Kingdom</p>
                      </div>

                      <div className="space-y-1.5">
                        {MOCK_PRAYERS.map((p) => (
                          <div
                            key={p.name}
                            className={`flex justify-between items-center px-4 py-2.5 rounded-lg border text-[11px] font-medium ${
                              p.active
                                ? "border-primary/30 bg-accent text-accent-foreground"
                                : "border-border/60 bg-card text-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              {p.active && <span className="size-1.5 rounded-full bg-primary" />}
                              <span>{p.name}</span>
                            </div>
                            <span className={p.active ? "text-accent-foreground" : "text-muted-foreground"}>
                              {p.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {previewTab === "qibla" && (
                    <div className="space-y-5 flex flex-col items-center animate-fadeIn text-center">
                      <div className="w-full text-left">
                        <h4 className="text-base font-bold text-foreground">Qibla</h4>
                        <p className="text-[9px] text-muted-foreground">Bearing to Kaaba</p>
                      </div>

                      {/* Mock Compass widget */}
                      <div className="relative flex size-36 items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-border bg-secondary/50" />
                        <div className="absolute inset-2 rounded-full border border-border/40" />
                        
                        <span className="absolute top-1 text-[8px] font-bold text-muted-foreground/60">N</span>
                        <span className="absolute right-1.5 text-[8px] font-bold text-muted-foreground/60">E</span>
                        <span className="absolute bottom-1 text-[8px] font-bold text-muted-foreground/60">S</span>
                        <span className="absolute left-1.5 text-[8px] font-bold text-muted-foreground/60">W</span>

                        <div
                          className="relative flex size-20 items-center justify-center transition-transform duration-500"
                          style={{ transform: "rotate(28deg)" }}
                        >
                          <div className="absolute h-14 w-0.5 rounded-full bg-primary/25" />
                          <div className="absolute top-1.5 h-7 w-1 rounded-full bg-primary" />
                          <div className="absolute bottom-1.5 h-5 w-0.5 rounded-full bg-muted-foreground/30" />
                          <div className="absolute size-2 rounded-full bg-primary" />
                        </div>
                      </div>

                      {/* Compass Details */}
                      <div className="w-full rounded-xl border border-border bg-card p-3 space-y-0.5">
                        <p className="text-[10px] text-muted-foreground">Qibla Direction</p>
                        <p className="text-lg font-bold tracking-tight text-foreground">118° · Southeast</p>
                        <p className="text-[9px] text-muted-foreground">~4,902 km to Makkah</p>
                      </div>
                    </div>
                  )}

                  {previewTab === "track" && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="text-base font-bold text-foreground">Tracking</h4>
                          <p className="text-[9px] text-muted-foreground">Build daily habits</p>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-accent text-[9px] font-bold text-primary px-2 py-0.5 border border-primary/10">
                          <Flame className="size-2.5 fill-primary" />
                          12 days
                        </div>
                      </div>

                      {/* Checklist */}
                      <div className="space-y-1.5">
                        {(["fajr", "dhuhr", "asr", "maghrib", "isha"] as const).map((p) => {
                          const label = p.charAt(0).toUpperCase() + p.slice(1);
                          return (
                            <button
                              key={p}
                              onClick={() => toggleCheck(p)}
                              className="w-full flex items-center justify-between px-3 py-2.5 border border-border/60 bg-card rounded-xl text-left text-[11px] font-medium transition-colors hover:bg-accent/40"
                            >
                              <span>{label}</span>
                              <div className={`size-4.5 rounded-md border flex items-center justify-center transition-colors ${
                                trackingChecks[p]
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : "border-border bg-background"
                              }`}>
                                {trackingChecks[p] && <Check className="size-3 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {previewTab === "daily" && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="mb-2">
                        <h4 className="text-base font-bold text-foreground">Daily content</h4>
                        <p className="text-[9px] text-muted-foreground">Nourishment for the heart</p>
                      </div>

                      {/* Reminder */}
                      <div className="rounded-xl border border-border bg-card p-4 space-y-1">
                        <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Today's Reminder</p>
                        <p className="text-[11px] font-semibold text-foreground leading-normal">
                          Take a moment before Dhuhr to pause and breathe. Focus on the quality of your connection.
                        </p>
                      </div>

                      {/* Journal input */}
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
                          Private reflection
                        </label>
                        <textarea
                          placeholder="What are you grateful for today?"
                          className="w-full h-16 rounded-xl border border-border bg-card p-2.5 text-[10px] text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Simulated Bottom Navigation */}
                <div className="absolute bottom-0 inset-x-0 h-14 border-t border-border/40 bg-background/90 backdrop-blur-md flex items-center justify-around px-2 pb-2 select-none z-10">
                  <div className="flex flex-col items-center gap-0.5 text-[8px] font-bold text-primary">
                    <span className="size-4 rounded bg-primary/10 flex items-center justify-center"><Smartphone className="size-2.5" /></span>
                    Home
                  </div>
                  <div className="flex flex-col items-center gap-0.5 text-[8px] font-bold text-muted-foreground">
                    <Clock className="size-4.5" />
                    Times
                  </div>
                  <div className="flex flex-col items-center gap-0.5 text-[8px] font-bold text-muted-foreground">
                    <Compass className="size-4.5" />
                    Qibla
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Alif Section */}
      <section id="why-alif" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Built on Quiet Integrity
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-base text-muted-foreground font-medium">
              A companion app designed to bring tranquility to your habits, built with absolute respect for your data.
            </p>
          </div>

          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-primary">
                <Leaf className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">Calming Simplicity</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                No complex layouts, settings fatigue, or flashing badges. Generous margins and beautiful fonts ensure a serene aesthetic.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-primary">
                <Shield className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">Absolute Privacy</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                We collect zero data. Your search requests, settings, log checks, and journal logs remain strictly client-side on your device.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-primary">
                <CheckCircle2 className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">Habit Consistency</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Keep an easy checkbox tracking streak. Watch your consistency grow with simple weekly indicators and history visualizers.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-primary">
                <Sparkles className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">Always Ad-Free</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                No subscription walls, sponsor slides, or tracking cookies. Alif is created to be a sincere companion for your mindfulness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="border-t border-border/40 bg-accent/20 py-20 sm:py-28 dark:bg-card/10">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Be Part of Alif's Journey
          </h2>
          <p className="mt-4 mx-auto max-w-lg text-sm sm:text-base text-muted-foreground font-medium">
            Join the waitlist to get early access to updates, widgets, offline tracking features, and desktop notifications.
          </p>

          <div className="mt-10 mx-auto max-w-md">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="font-bold text-xs select-none">أ</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-foreground select-none">
              Alif
            </span>
          </div>

          <p className="text-xs text-muted-foreground font-medium">
            © {new Date().getFullYear()} Alif. Distraction-free, local first, mindful companion.
          </p>

          <div className="flex items-center gap-6">
            <a href="#features" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#why-alif" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Philosophy
            </a>
            <Link href="/dashboard" className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5">
              Launch App <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
