export const getFromMap = <T>(map: Map<string, T>, key: string): T => {
  if (!map.has(key)) {
    throw new Error(`Value not found in map: ${key}`);
  }

  return map.get(key) as T;
};
