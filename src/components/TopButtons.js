import React from "react";

const TopButtons = ({setQuery}) => {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "Sydney",
    },
    {
      id: 3,
      title: "Tokyo",
    },
    {
      id: 4,
      title: "Toronto",
    },
    {
      id: 5,
      title: "Paris",
    },
  ];
  return (
    <div className=" sm:flex flex-col text-center sm:flex-row sm:items-center sm:justify-around my-6">
      {cities.map((city) => {
        return (
          <button onClick={()=>setQuery({q:city.title})} key={city.id} className="text-white text-2xl px-3 font-medium">
            {city.title}
          </button>
        );
      })}
    </div>
  );
};

export default TopButtons;
