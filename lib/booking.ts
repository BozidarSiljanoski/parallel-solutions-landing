/** Discovery-call scheduling (30-minute slots, weekdays, business hours). */

export const SLOT_QUERY_PARAM = "slot";
export const SLOT_DURATION_MINUTES = 30;

const BOOKING = {
  startHour: 9,
  endHour: 17,
  daysAhead: 14,
  slotMinutes: SLOT_DURATION_MINUTES,
} as const;

export function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

export function getBookingDays(): Date[] {
  const days: Date[] = [];
  const cursor = startOfDay(new Date());

  while (days.length < BOOKING.daysAhead) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

export function getSlotsForDay(day: Date): { iso: string; label: string }[] {
  const now = new Date();
  const slots: { iso: string; label: string }[] = [];

  for (let hour = BOOKING.startHour; hour < BOOKING.endHour; hour++) {
    for (const minute of [0, 30]) {
      const slotStart = new Date(day);
      slotStart.setHours(hour, minute, 0, 0);

      if (slotStart <= now) continue;

      const iso = slotStart.toISOString();
      slots.push({ iso, label: formatSlotTime(slotStart) });
    }
  }

  return slots;
}

export function isoToDatetimeLocal(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function datetimeLocalToIso(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

export function formatSlotForEmail(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export function formatDayLabel(day: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(day);
}

export function isBookableSlot(iso: string): boolean {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime()) || date <= new Date()) return false;

  const day = date.getDay();
  if (day === 0 || day === 6) return false;

  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (hours < BOOKING.startHour || hours >= BOOKING.endHour) return false;
  if (minutes !== 0 && minutes !== 30) return false;

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + BOOKING.daysAhead);
  return date <= maxDate;
}

export function buildContactUrlWithSlot(iso: string): string {
  return `/contact?${SLOT_QUERY_PARAM}=${encodeURIComponent(iso)}`;
}

function formatSlotTime(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}
