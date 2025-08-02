import React from "react";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="flex items-center justify-center mt-10">
      <hr className="w-full flex-1 border-t-2 border-gray-500" />
      <h1 className="mx-4 md:text-lg lg:text-3xl text-gray-700 font-semibold text-center items-center">
        {title}
      </h1>
      <hr className="w-full flex-1 border-t-2 border-gray-500" />
    </div>
  );
};

export default Header;
