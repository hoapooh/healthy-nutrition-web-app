/**
 * Utility functions for handling product weights and pricing
 */

/**
 * Convert grams to display format (kg or g)
 * @param grams - weight in grams
 * @returns formatted weight string
 */
export const formatWeight = (grams: number): string => {
  if (grams >= 1000) {
    const kg = grams / 1000;
    return `${kg}kg`;
  }
  return `${grams}g`;
};

/**
 * Calculate price based on weight and price per kg
 * @param pricePerKg - base price per kilogram
 * @param weightInGrams - selected weight in grams
 * @returns calculated price for the selected weight
 */
export const calculatePriceByWeight = (
  pricePerKg: number,
  weightInGrams: number,
): number => {
  const weightInKg = weightInGrams / 1000;
  return pricePerKg * weightInKg;
};

/**
 * Get the default weight (1kg if available, otherwise the largest available weight)
 * @param availableWeights - array of available weights in grams
 * @returns default weight in grams
 */
export const getDefaultWeight = (availableWeights: number[]): number => {
  if (availableWeights.includes(1000)) {
    return 1000; // 1kg
  }
  return Math.max(...availableWeights);
};

/**
 * Validate if a weight is available for a product
 * @param weight - weight to validate in grams
 * @param availableWeights - array of available weights in grams
 * @returns true if weight is available
 */
export const isWeightAvailable = (
  weight: number,
  availableWeights: number[],
): boolean => {
  return availableWeights.includes(weight);
};
