import React from 'react';
import './ActivityCalendar.css';

/**
 * ActivityCalendar renders a GitHub‑style contribution heatmap.
 * `activeDates` should be an array of date strings in ISO format (YYYY‑MM‑DD).
 * The component shows the last 365 days, with a green square for each active day.
 */
export default function ActivityCalendar({ activeDates = [], theme = 'github' }) {
  // Build a Set for O(1) lookup
  const activeSet = new Set(activeDates);

  // Generate dates for the past year (including today)
  const today = new Date();
  const start = new Date();
  start.setDate(today.getDate() - 364); // 365 days total

  const weeks = [];
  let current = new Date(start);
  // Create a 2‑D array: weeks[week][day]
  while (current <= today) {
    const weekIdx = Math.floor((current - start) / (1000 * 60 * 60 * 24 * 7));
    if (!weeks[weekIdx]) weeks[weekIdx] = Array(7).fill(null);
    const dayIdx = current.getDay(); // 0 = Sun .. 6 = Sat
    const iso = current.toISOString().split('T')[0];
    weeks[weekIdx][dayIdx] = iso;
    // Move to next day
    current.setDate(current.getDate() + 1);
  }

  return (
    <div className="activity-calendar">
      {weeks.map((week, wIdx) => (
        <div key={wIdx} className="week-column">
          {week.map((date, dIdx) => (
            <div
              key={dIdx}
              className={`day-cell ${
                date && activeSet.has(date) ? `active theme-${theme}` : ''
              }`}
              title={date || ''}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
