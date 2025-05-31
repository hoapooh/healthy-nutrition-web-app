import Image from "next/image";
import React from "react";
import PropositionBlock from "./proposition-block";
import { propositions } from "../../../data/proposition-data";

const HomeProposition = () => {
  return (
    <section className="relative py-16 lg:py-32 lg:pt-40">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          {/* Proposition */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:absolute lg:top-4 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {propositions.map((proposition) => {
              const IconComponent = proposition.icon;
              return (
                <PropositionBlock
                  key={proposition.id}
                  icon={
                    <IconComponent className="size-10 text-green-600 transition-colors duration-300 group-hover:text-white" />
                  }
                  className={proposition.className}
                  title={proposition.title}
                  description={proposition.description}
                />
              );
            })}
          </div>

          {/* Main Image */}
          <Image
            src={"/healthy-product.png"}
            alt="Fresh and Healthy Vegetables"
            width={750}
            height={400}
            className="h-48 w-[750px] object-contain lg:mt-12 lg:h-[400px] lg:object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeProposition;
