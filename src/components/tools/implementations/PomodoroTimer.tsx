"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ShareButton } from "@/components/tools/ShareButton";
import { RotateCcw, Play, Pause, SkipForward, Timer, Bell } from "lucide-react";

export function PomodoroTimer() {
  type Mode = "focus" | "shortBreak" | "longBreak";

  const [mode, setMode] = useState<Mode>("focus");
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  const durations: Record<Mode, number> = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  // Play audio chime using Web Audio API (zero external assets needed)
  const playChime = () => {
    try {
      if (typeof window !== "undefined") {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5

          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.8);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      playChime();
      setIsRunning(false);
      if (mode === "focus") {
        const nextCount = completedCycles + 1;
        setCompletedCycles(nextCount);
        if (nextCount % 4 === 0) {
          setMode("longBreak");
          setTimeLeft(durations.longBreak);
        } else {
          setMode("shortBreak");
          setTimeLeft(durations.shortBreak);
        }
      } else {
        setMode("focus");
        setTimeLeft(durations.focus);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, completedCycles]);

  const switchMode = (newMode: Mode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(durations[newMode]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(durations[mode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      <Card className="max-w-xl mx-auto text-center border-border shadow-lg">
        <CardHeader className="pb-2">
          {/* Mode Selector Tabs */}
          <div className="flex justify-center gap-2 p-1.5 rounded-xl bg-muted/60 max-w-sm mx-auto">
            <Button
              type="button"
              variant={mode === "focus" ? "primary" : "ghost"}
              size="sm"
              onClick={() => switchMode("focus")}
              className="text-xs flex-1"
            >
              Focus (25m)
            </Button>
            <Button
              type="button"
              variant={mode === "shortBreak" ? "primary" : "ghost"}
              size="sm"
              onClick={() => switchMode("shortBreak")}
              className="text-xs flex-1"
            >
              Short (5m)
            </Button>
            <Button
              type="button"
              variant={mode === "longBreak" ? "primary" : "ghost"}
              size="sm"
              onClick={() => switchMode("longBreak")}
              className="text-xs flex-1"
            >
              Long (15m)
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 py-6">
          {/* Large Countdown Display */}
          <div className="space-y-1">
            <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-foreground select-none">
              {formattedTime}
            </div>
            <div className="text-xs uppercase font-semibold text-muted-foreground tracking-widest">
              {mode === "focus" ? "Deep Focus Sprint" : mode === "shortBreak" ? "Short Rest Break" : "Long Rest Break"}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <Button
              type="button"
              variant={isRunning ? "secondary" : "primary"}
              size="lg"
              onClick={() => setIsRunning(!isRunning)}
              className="px-8 text-base font-bold gap-2"
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isRunning ? "Pause" : "Start"}</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleReset}
              title="Reset Timer"
              className="h-12 w-12 rounded-lg"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(0);
              }}
              title="Skip Interval"
              className="h-12 w-12 rounded-lg"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          {/* Cycles Stats */}
          <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-primary" />
              <span>Completed Sprints: <strong className="text-foreground">{completedCycles}</strong></span>
            </div>
            <div className="flex items-center gap-1">
              <Bell className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Web Audio Chime Active</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end pt-2 max-w-xl mx-auto">
        <ShareButton title="Pomodoro Focus Timer – NexusTools" />
      </div>
    </div>
  );
}
