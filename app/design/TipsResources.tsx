import React from "react";
import { LuFileText, LuPalette } from "react-icons/lu";

const TipsResources = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-purple-50 to-purple-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Design Tips & Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert advice and free resources to make your designs stand out
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <LuPalette className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Color & Typography Tips
                </h3>
                <ul className="space-y-1 text-gray-600 text-sm md:text-base">
                  <li>• Use high contrast colors for better readability</li>
                  <li>• Choose fonts that are legible at small sizes</li>
                  <li>• Limit your color palette to 3-4 colors max</li>
                  <li>• Test your design on different backgrounds</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <LuFileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Design Guidlines
                </h3>
                <ul className="space-y-1 text-gray-600 text-sm md:text-base">
                  <li>
                    • PNG or SVG files work best for quality and transparency
                  </li>
                  <li>
                    • Ensure your design colors contrast well with the product
                  </li>
                  <li>
                    • Try to keep file sizes under 25 MB for faster uploads and
                    previews
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TipsResources;
