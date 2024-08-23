interface Major {
  level1Code?: number | null
  level1Name?: string | null
  level2Code?: number | null
  level2Name?: string | null
  level3Code?: number | null
  level3Name?: string | null
}

export function checkMajarSelected(major: Major): boolean {
  return major.level1Code !== null && major.level2Code !== null && major.level3Code !== null;
}
