export const generateRandomChange = (baseValue, percentageChange = 0.01) => {
    // Random change between -1% and +1% (default)
    const change = (Math.random() * 2 - 1) * percentageChange * baseValue;
    // Return the new value rounded to 2 decimal places
    return parseFloat((baseValue + change).toFixed(2));
  };
  
  // Generates a new percentage with slight random variation around a base value
  export const generateRandomPercentage = (basePercentage) => {
    // Random percentage change up to ±2%
    const change = (Math.random() * 2 - 1) * 0.02;
    // Return updated percentage rounded to 2 decimal places
    return parseFloat((basePercentage + change).toFixed(2));
  };
  // Generates a new volume with up to ±5% variation by default
  export const generateRandomVolumeChange = (
    baseVolume,
    percentageChange = 0.05
  ) => {
    // Random volume change based on the provided percentage
    const change = (Math.random() * 2 - 1) * percentageChange * baseVolume;
    // Return updated volume rounded to the nearest integer
    return parseFloat((baseVolume + change).toFixed(0));
  };
  