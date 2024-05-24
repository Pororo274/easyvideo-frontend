interface Pluralization {
  default: string;
  first: string;
  specific: string;
}

const getCorrectPluralization = (
  count: number,
  pluralization: Pluralization
) => {
  const twoLast = count % 100;

  if (twoLast > 4 && twoLast < 21) {
    return pluralization.default;
  }

  const last = count % 10;

  if (last === 1) return pluralization.first;
  if (last < 5) return pluralization.specific
  return pluralization.default;
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

export const getCorrectHoursName = (hours: number) => {
  return getCorrectPluralization(hours, {
    default: "часов",
    first: "час",
    specific: "часа"
  })
}

