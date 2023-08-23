import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDate } from "../context/dateContext";


const Searchbar = () => {

  const [contextDate, setContextDate] = useDate()
  
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSearch = () => {
    navigate("/hotels/search", {
      state: {
        destination,
        date,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  
  return (
    <>
      <div className="mt-12 md:mt-16 rounded-full flex w-full shadow-lg shadow-grey-500/50">
        <form className="flex w-full px-4" onSubmit={handleSubmit}>
          <div className="col px-3 py-2 w-[33%] border-r-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              className="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
              style={{ display: "inline" }}
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            <span className="ml-2 md:text-md text-sm text-red-400">
              Location
            </span>
            <input
              className="block w-[90%] ring-0 ring-inset-0 focus:ring-0 md:text-md text-sm mx-auto border-0 "
              type="text"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
            />
          </div>
          <div className="col px-2 py-1 w-[33%] border-r-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              className="bi bi-calendar-check-fill"
              viewBox="0 0 16 16"
              style={{ display: "inline" }}
            >
              <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
            </svg>
            <span
              onClick={() => {
                setOpenDate((prevState) => !prevState);
              }}
              className="ml-2 md:text-md text-sm text-red-400 cursor-pointer"
            >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                className="absolute"
                editableDateInputs={true}
                onChange={(item) => {setDate([item.selection]); setContextDate(item.selection)}}
                moveRangeOnFirstSelection={false}
                ranges={date}
              />
            )}
          </div>
          <div className="col px-2 py-1 w-[33%] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              className="bi bi-people-fill"
              viewBox="0 0 16 16"
              style={{ display: "inline" }}
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
            <span className="ml-2 md:text-md text-sm text-red-400">Guests</span>
            <input
              className="input block w-[90%] md:text-md text-sm mx-auto border-none focus:outline-none"
              type="number"
              placeholder="People"
            />
          </div>
          <button
            type="submit"
            className="rounded-full px-3 py-1 bg-amber-500 hover:bg-amber-600 self-center"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default Searchbar;
