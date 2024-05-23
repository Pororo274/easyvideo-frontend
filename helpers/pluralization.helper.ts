interface Pluralization {
  default: string;
  first: string;
  specific: string;
}

const getCorrectPluralization = (
  count: number,
  pluralization: Pluralization
) => {
  if (count > 4) {
    return pluralization.default;
  }

  const last = count % 10;

  if (last === 1) return pluralization.first;
  return pluralization.specific;
};

export const getCorrectMinutsName = (minuts: number) => {
  return getCorrectPluralization(minuts, {
    default: "минут",
    first: "минуту",
    specific: "минуты",
  });
};

export const getCorrectDaysName = (days: number) => {
  return getCorrectPluralization(days, {
    default: "дней",
    first: "день",
    specific: "дня"
  });
}

