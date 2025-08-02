import React from "react";
import { LuArrowRight, LuEye, LuShoppingCart, LuUpload } from "react-icons/lu";

const DesignItYourWay = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to turn your design into a product
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              step: "1",
              icon: LuUpload,
              title: "Upload Design",
              description:
                "Upload your artwork to create something new and personal",
            },
            {
              step: "2",
              icon: LuEye,
              title: "Preview on Product",
              description:
                "See exactly how your design will look on your chosen product",
            },
            {
              step: "3",
              icon: LuShoppingCart,
              title: "Place Order",
              description:
                "Complete your order and we'll print and ship your custom product",
            },
          ].map((step, index) => (
            <div key={index} className="text-center relative p-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-700 font-bold text-sm">
                    {step.step}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                {step.description}
              </p>
              {index < 2 && (
                <LuArrowRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-purple-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignItYourWay;
