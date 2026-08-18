/**
 * Date & Time calculation engine
 * Accurate date arithmetic, age calculations, unix timestamps, and timezones
 */

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthdayDays: number;
  dayOfWeekBorn: string;
}

export function calculateAge(birthDateInput: string | Date, targetDateInput: string | Date = new Date()): AgeResult {
  const birth = new Date(birthDateInput);
  const target = new Date(targetDateInput);

  if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
    throw new Error("Invalid date provided");
  }

  if (birth > target) {
    throw new Error("Birth date cannot be in the future relative to the target date");
  }

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    // Get days in previous month of target
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = target.getTime() - birth.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  // Next birthday calculation
  const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < target) {
    nextBirthday.setFullYear(target.getFullYear() + 1);
  }
  const nextBirthdayDiffMs = nextBirthday.getTime() - target.getTime();
  const nextBirthdayDays = Math.ceil(nextBirthdayDiffMs / (1000 * 60 * 60 * 24));

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeekBorn = daysOfWeek[birth.getDay()];

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalHours,
    totalMinutes,
    nextBirthdayDays,
    dayOfWeekBorn,
  };
}

export interface DateDifferenceResult {
  totalDays: number;
  businessDays: number;
  weekendDays: number;
  weeks: number;
  months: number;
  years: number;
  summary: string;
}

export function calculateDateDifference(
  startDateInput: string | Date,
  endDateInput: string | Date,
  includeEndDay: boolean = false
): DateDifferenceResult {
  const start = new Date(startDateInput);
  const end = new Date(endDateInput);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Please enter valid dates");
  }

  const isReverse = start > end;
  const early = isReverse ? end : start;
  const late = isReverse ? start : end;

  let totalDays = Math.floor((late.getTime() - early.getTime()) / (1000 * 60 * 60 * 24));
  if (includeEndDay) {
    totalDays += 1;
  }

  let businessDays = 0;
  let weekendDays = 0;

  const cur = new Date(early);
  const loopEndDays = totalDays;

  for (let i = 0; i < loopEndDays; i++) {
    const day = cur.getDay();
    if (day === 0 || day === 6) {
      weekendDays++;
    } else {
      businessDays++;
    }
    cur.setDate(cur.getDate() + 1);
  }

  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  return {
    totalDays: isReverse ? -totalDays : totalDays,
    businessDays: isReverse ? -businessDays : businessDays,
    weekendDays,
    weeks,
    months: parseFloat((totalDays / 30.4375).toFixed(2)),
    years: parseFloat((totalDays / 365.25).toFixed(2)),
    summary: `${totalDays} days (${businessDays} business days, ${weekendDays} weekend days)`,
  };
}

export interface UnixTimestampInfo {
  seconds: number;
  milliseconds: number;
  isoUTC: string;
  rfc2822: string;
  localString: string;
  relativeTime: string;
}

export function parseUnixTimestamp(input: number | string): UnixTimestampInfo {
  let num = typeof input === "string" ? parseInt(input.trim(), 10) : input;
  if (isNaN(num)) throw new Error("Invalid timestamp");

  // Determine if seconds or milliseconds (10 digits is seconds, 13 digits is ms)
  const isSeconds = num < 100000000000;
  const ms = isSeconds ? num * 1000 : num;
  const sec = isSeconds ? num : Math.floor(num / 1000);

  const d = new Date(ms);
  if (isNaN(d.getTime())) throw new Error("Timestamp out of valid date range");

  return {
    seconds: sec,
    milliseconds: ms,
    isoUTC: d.toISOString(),
    rfc2822: d.toUTCString(),
    localString: d.toLocaleString(),
    relativeTime: getRelativeTimeString(d),
  };
}

function getRelativeTimeString(date: Date): string {
  const diffSec = Math.round((date.getTime() - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];
  const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];
  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(diffSec));
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  return rtf.format(Math.round(diffSec / divisor), units[unitIndex]);
}
