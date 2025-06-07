"use client";

import React from "react";

interface NutritionFact {
  calories: number;
  protein: number;
  cholesterol: number;
  lipid: number;
  sugar: number;
  carbs: number;
}

interface ProductNutritionFactsProps {
  nutritionFact: NutritionFact;
  className?: string;
}

export const ProductNutritionFacts = ({
  nutritionFact,
  className = "",
}: ProductNutritionFactsProps) => {
  const facts = [
    { label: "Calories", value: nutritionFact.calories, unit: "" },
    { label: "Protein", value: nutritionFact.protein, unit: "g" },
    { label: "Carbohydrates", value: nutritionFact.carbs, unit: "g" },
    { label: "Total Fat (Lipid)", value: nutritionFact.lipid, unit: "g" },
    { label: "Sugar", value: nutritionFact.sugar, unit: "g" },
    { label: "Cholesterol", value: nutritionFact.cholesterol, unit: "mg" },
  ];

  return (
    <div className={`w-full rounded-lg border border-gray-300 bg-white p-6 ${className}`}>
      <h3 className="mb-4 border-b-2 border-black pb-2 text-lg font-bold text-green-600">
        Nutrition Facts
      </h3>
      <div className="space-y-3">
        {facts.map((fact, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-200 pb-2"
          >
            <span className="font-medium">{fact.label}</span>
            <span className="font-bold">
              {fact.value}
              {fact.unit}
            </span>
          </div>
        ))}
      </div>
      <div className="text-muted-foreground mt-4 text-xs">
        * Percent Daily Values are based on a 2,000 calorie diet.
      </div>
    </div>
  );
};
