import plateDataRaw from "../../plate-data.json";

export interface PlateEntry {
  plate: string;
  date: Date;
  dateStr: string;
}

const monthMap: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseDate(str: string): Date {
  const [day, mon, year] = str.split("-");
  return new Date(parseInt(year), monthMap[mon], parseInt(day));
}

export function getAllPlates(): PlateEntry[] {
  const entries = Object.entries(plateDataRaw as Record<string, string>).map(
    ([plate, dateStr]) => ({
      plate,
      date: parseDate(dateStr),
      dateStr,
    })
  );
  entries.sort((a, b) => a.date.getTime() - b.date.getTime());
  return entries;
}

// Filter to only AAA-ZZZ format plates (3 letters + 3 digits) in the sequential range
export function getSequentialPlates(): PlateEntry[] {
  return getAllPlates().filter((e) => {
    const letters = e.plate.slice(0, 3);
    // Exclude special/older plates that don't follow the AAA sequential pattern
    return /^[A-Z]{3}\d{3}$/.test(e.plate) && letters >= "AAA" && e.date.getFullYear() >= 2001;
  });
}

export function formatDate(date: Date): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Key milestones: when each first letter started
export function getMilestones(): PlateEntry[] {
  const sequential = getSequentialPlates();
  const seen = new Set<string>();
  const milestones: PlateEntry[] = [];

  for (const entry of sequential) {
    const firstLetter = entry.plate[0];
    if (!seen.has(firstLetter)) {
      seen.add(firstLetter);
      milestones.push(entry);
    }
  }

  return milestones;
}
