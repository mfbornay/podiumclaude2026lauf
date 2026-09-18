import { describe, it, expect } from "@jest/globals";
import {
  QUESTIONS, calcPoints, habitPoints,
  localDate, parseDay, addDays, daysBetween, calcStreak,
} from "./habits";

describe("puntuación", () => {
  it("suma los puntos de los hábitos marcados", () => {
    expect(calcPoints({ gym: true, running: true })).toBe(18);
  });

  it("cuenta los hábitos que el trigger antiguo se dejaba fuera", () => {
    expect(calcPoints({ no_alcohol: true, sin_movil: true, vitamina_d: true })).toBe(4);
  });

  it("aplica los puntos personalizados del grupo", () => {
    expect(calcPoints({ gym: true }, { gym: 20 })).toBe(20);
    expect(habitPoints("gym", { gym: 20 })).toBe(20);
    expect(habitPoints("gym")).toBe(10);
  });

  it("ignora hábitos que no existen", () => {
    expect(calcPoints({ sleep8: true, noalc: true })).toBe(0);
    expect(habitPoints("cumple")).toBe(0);
  });

  it("no tiene ids duplicados", () => {
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
  });
});

describe("fechas", () => {
  it("usa el día natural español, no el UTC", () => {
    // 23:30 UTC del 15 de junio ya es 16 de junio en España
    expect(localDate(new Date("2026-06-15T23:30:00Z"))).toBe("2026-06-16");
    // y en invierno (UTC+1) también
    expect(localDate(new Date("2026-01-15T23:30:00Z"))).toBe("2026-01-16");
  });

  it("no desplaza el día al interpretar un YYYY-MM-DD", () => {
    const d = parseDay("2026-01-01");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(0);
    expect(d.getDate()).toBe(1);
  });

  it("suma y resta días cruzando meses y cambios de hora", () => {
    expect(addDays("2026-02-28", 1)).toBe("2026-03-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
    expect(addDays("2026-03-28", 2)).toBe("2026-03-30"); // cambio de hora en España
    expect(daysBetween("2026-03-01", "2026-03-08")).toBe(7);
  });
});

describe("racha", () => {
  const hoy = "2026-06-10";

  it("cuenta los días consecutivos incluyendo hoy", () => {
    const dias = ["2026-06-10", "2026-06-09", "2026-06-08"];
    expect(calcStreak(dias, hoy)).toEqual({ days: 3, pendingToday: false });
  });

  it("mantiene viva la racha cuando hoy todavía no se ha apuntado", () => {
    const dias = ["2026-06-09", "2026-06-08", "2026-06-07"];
    expect(calcStreak(dias, hoy)).toEqual({ days: 3, pendingToday: true });
  });

  it("se rompe si ni hoy ni ayer hay deporte", () => {
    expect(calcStreak(["2026-06-08", "2026-06-07"], hoy)).toEqual({ days: 0, pendingToday: false });
  });

  it("no cuenta días sueltos con huecos", () => {
    const dias = ["2026-06-10", "2026-06-09", "2026-06-06", "2026-06-05"];
    expect(calcStreak(dias, hoy).days).toBe(2);
  });

  it("sin registros, la racha es cero", () => {
    expect(calcStreak([], hoy)).toEqual({ days: 0, pendingToday: false });
  });
});
