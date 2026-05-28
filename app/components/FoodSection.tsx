import React from "react";
import { FoodCard } from "./FoodCard";
type Props = {
  label: string;
};

export const FoodSection = ({ label }: Props) => {
  // const [isOpen, setIsOpen] = useState("");

  return (
    <div className="space-y-3 container pt-10">
      <div className="text-[30px] font-semibold text-center">{label}</div>
      <div className="grid grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <FoodCard
            key={index}
            image={"/fruit.jpg"}
            title="Blueberry"
            description="Blueberries are small, sweet, and slightly tart perennial berries native to North America."
            price="$10"
          />
        ))}
      </div>
    </div>
  );
};
