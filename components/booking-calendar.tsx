"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DayPicker } from "react-day-picker";
import { Clock } from "lucide-react";

import {
  buildContactUrlWithSlot,
  getSlotsForDay,
  isWeekday,
} from "@/lib/booking";

import "react-day-picker/style.css";

export function BookingCalendar() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();

  const slots = useMemo(
    () => (selectedDay ? getSlotsForDay(selectedDay) : []),
    [selectedDay],
  );

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const maxDay = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 14);
    return d;
  }, [today]);

  return (
    <Wrapper
      className="rounded-xl border border-border bg-card p-4 shadow-sm md:p-6"
      data-testid="booking-calendar"
    >
      <Wrapper className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-center">
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={setSelectedDay}
          disabled={[
            { before: today },
            { after: maxDay },
            (date) => !isWeekday(date),
          ]}
        />

        <Wrapper className="min-w-[200px] flex-1 lg:max-w-xs">
          <p className="mb-3 text-sm font-medium text-foreground">
            {selectedDay
              ? "Available 30-minute slots"
              : "Select a weekday to see times"}
          </p>
          <Wrapper
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2"
            data-testid="booking-slots"
          >
            {!selectedDay ? (
              <p className="col-span-full text-sm text-muted-foreground">
                Click a date on the calendar.
              </p>
            ) : slots.length === 0 ? (
              <p className="col-span-full text-sm text-muted-foreground">
                No slots left this day. Try another date.
              </p>
            ) : (
              slots.map((slot) => (
                <button
                  key={slot.iso}
                  type="button"
                  onClick={() => router.push(buildContactUrlWithSlot(slot.iso))}
                  className="flex items-center justify-center gap-1 rounded-lg border border-border px-2 py-2 text-sm font-medium transition-colors hover:border-brand hover:bg-brand-muted"
                  data-testid="booking-slot"
                >
                  <Clock className="size-3.5 opacity-60" />
                  {slot.label}
                </button>
              ))
            )}
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}

function Wrapper({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
