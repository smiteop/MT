import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryList } from "../features/country/CountryAction";
import { selectCountryList } from "../features/country/CountrySelector";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountryList);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [datafilter, setDatafilter] = useState(countries);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCountries, setVisibleCountries] = useState(
    datafilter.slice(0, 10)
  );

  const goToNextFlag = () => {
    if (currentIndex < countries.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousFlag = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const dotIndexes = [
    currentIndex - 1 >= 0 ? currentIndex - 1 : null,
    currentIndex,
    currentIndex + 1 < countries.length ? currentIndex + 1 : null,
  ];

  const loadMore = () => {
    const nextIndex = visibleCountries.length;
    const newCountries = datafilter.slice(nextIndex, nextIndex + 10);
    setVisibleCountries([...visibleCountries, ...newCountries]);
  };

  useEffect(() => {
    if (selectedRegion === "All") {
      setDatafilter(countries);
    } else {
      setDatafilter(
        countries.filter((country) => country.region === selectedRegion)
      );
    }
  }, [selectedRegion, countries]);
  useEffect(() => {
    dispatch(getCountryList({ fields: "name,region,flag" }));
  }, []);
  useEffect(() => {
    setVisibleCountries(datafilter.slice(0, 10));
  }, [datafilter]);
  return (
    <div>
      <header className="region-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "1057px",
          }}
        >
          <div>Countries</div>
          <div style={{ display: "flex", gap: "10px" }}>
            <span onClick={() => setSelectedRegion("Asia")}>Asia</span>
            <span onClick={() => setSelectedRegion("Europe")}>Europe</span>
            <span onClick={() => setSelectedRegion("All")}>All</span>
          </div>
        </div>
      </header>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <h2>Welcome</h2>
      </div>
      <div className="country-info">
        <div className="initial-row">
          <div className="slider">
            <div className="slider-content">
              <h3>{datafilter[currentIndex]?.name}</h3>
              <img
                src={datafilter[currentIndex]?.flag}
                alt={datafilter[currentIndex]?.name}
              />
            </div>

            <div className="slider-navigation">
              <button className="slider-button prev" onClick={goToPreviousFlag}>
                P
              </button>

              <div className="dots">
                {dotIndexes.map(
                  (index, idx) =>
                    index !== null && (
                      <span
                        key={idx}
                        className={`dot ${
                          index === currentIndex ? "active" : ""
                        }`}
                        onClick={() => setCurrentIndex(index)}
                      ></span>
                    )
                )}
              </div>

              <button className="slider-button next" onClick={goToNextFlag}>
                N
              </button>
            </div>
          </div>

          <div className="next-flag">
            <img
              src={datafilter[currentIndex + 1]?.flag}
              alt={datafilter[currentIndex + 1]?.name}
            />
            {console.log(datafilter, "sdaads")}
          </div>
        </div>

        <div className="cards">
          {visibleCountries.map((country, index) => (
            <div key={index} className="card">
              <img
                src={country.flag}
                alt={country.name}
                className="card-flag"
              />
              <h3>{country.name}</h3>
              <p>Region: {country.region}</p>
            </div>
          ))}
        </div>

        {visibleCountries.length < datafilter.length && (
          <button className="load-more" onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
