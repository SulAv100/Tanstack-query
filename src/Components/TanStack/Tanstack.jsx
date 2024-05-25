import React from "react";
import "./Tanstack.css";
import { useQuery } from "react-query";

function Tanstack() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch(
        "http://universities.hipolabs.com/search?country=United+States"
      ).then((response) => response.json()),
  });

  if (error) return <div>Error has occured</div>;
  if (isLoading) return alert("Data is loading");

  return (
    <>
      <div className="fetch-data">
        {data?.map((item, index) => {
          return (
            <>
              <div className="single-data" key={index}>
                <span>{item.name}</span>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Tanstack;
