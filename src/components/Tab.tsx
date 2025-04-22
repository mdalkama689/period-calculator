"use client";

import { useState } from "react";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GrPowerReset } from "react-icons/gr";

export default function Tab() {
  const [lastPeriodStart, setLastPeriodStart] = useState<Date | undefined>();
  const [cycleLength, setCycleLength] = useState<number | null>(null);
  const [periodDuration, setPeriodDuration] = useState<number | null>(null);

  const [nextPeriod, setNextPeriod] = useState<string | null>(null);
  const [ovulationDay, setOvulationDay] = useState<string | null>(null);
  const [fertileWindow, setFertileWindow] = useState<string | null>(null);

  const [open, setOpen] = useState(false);

  const calculateCycleInfo = () => {
    if (!lastPeriodStart || !cycleLength || !periodDuration) {
      return toast.error("All fields are required!");
    }

    const nextPeriodStart = addDays(lastPeriodStart, cycleLength);
    const ovulation = addDays(lastPeriodStart, cycleLength - 14);
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);

    setNextPeriod(format(nextPeriodStart, "PPP"));
    setOvulationDay(format(ovulation, "PPP"));
    setFertileWindow(
      `${format(fertileStart, "PPP")} to ${format(fertileEnd, "PPP")}`
    );
  };

  const reset = () => {
    setLastPeriodStart(undefined);
    setCycleLength(null);
    setPeriodDuration(null);
    setNextPeriod(null);
    setOvulationDay(null);
    setFertileWindow(null);
  };

  return (
    <div className="min-h-screen bg-black text-white py-6 px-4 flex items-center justify-center">
      <Card className="w-full max-w-md md:max-w-lg bg-zinc-900 border border-zinc-700 shadow-xl rounded-2xl">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-xl font-bold text-white">
            Menstrual Cycle Tracker & Fertility Predictor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-2">
            <Label className="text-white">Last Period Start Date</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal bg-zinc-800 border-zinc-600 text-white"
                  onClick={() => setOpen(true)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {lastPeriodStart
                    ? format(lastPeriodStart, "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-zinc-900 text-white border border-zinc-700">
                <Calendar
                  mode="single"
                  selected={lastPeriodStart}
                  onSelect={(date) => {
                    setLastPeriodStart(date);
                    setOpen(false);
                  }}
                  initialFocus
                  className="bg-zinc-900 text-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Average Cycle Length (days)</Label>
            <Select
              value={cycleLength?.toString() || ""}
              onValueChange={(val) => setCycleLength(Number(val))}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select cycle length" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  <SelectLabel>Select cycle length</SelectLabel>
                  {[...Array(21)].map((_, i) => {
                    const val = 21 + i;
                    return (
                      <SelectItem key={val} value={val.toString()}>
                        {val} days
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Period Duration (days)</Label>
            <Select
              value={periodDuration?.toString() || ""}
              onValueChange={(val) => setPeriodDuration(Number(val))}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select period duration" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  <SelectLabel>Select duration</SelectLabel>
                  {[...Array(10)].map((_, i) => {
                    const val = 1 + i;
                    return (
                      <SelectItem key={val} value={val.toString()}>
                        {val} days
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center items-center gap-3">
            <Button
              className="w-[90%] bg-pink-600 hover:bg-pink-700 cursor-pointer"
              onClick={calculateCycleInfo}
            >
              Predict
            </Button>
            <GrPowerReset
              onClick={reset}
              className="w-fit text-white font-bold text-2xl cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>

      {(nextPeriod || ovulationDay || fertileWindow) && (
        <div className="bg-zinc-900 text-white p-4 mt-6 md:ml-10 rounded-lg border border-zinc-700 w-full md:max-w-sm text-center space-y-2">
          <p className="text-xl font-semibold text-pink-400">
            Your Cycle Prediction
          </p>
          {nextPeriod && (
            <p className="text-base">
              <strong>Next Period Start:</strong>{" "}
              <span className="text-pink-400 font-medium">{nextPeriod}</span>
            </p>
          )}
          {ovulationDay && (
            <p className="text-base">
              <strong>Ovulation Day:</strong>{" "}
              <span className="text-pink-400 font-medium">{ovulationDay}</span>
            </p>
          )}
          {fertileWindow && (
            <p className="text-base">
              <strong>Fertile Window:</strong>{" "}
              <span className="text-pink-400 font-medium">{fertileWindow}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}