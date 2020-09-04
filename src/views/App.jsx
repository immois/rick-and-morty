import React, { useState, useEffect } from "react";
import Axios from "axios";

import logo from "../images/logito.png";
import Card from "../components/Card";
import Loader from "../components/Loader";

import "./styles/App.css";

const App = () => {
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    info: {},
    results: [],
  });

  const { info, results } = data;

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await Axios.get(
        `https://rickandmortyapi.com/api/character/?page=${pageNum}`
      );
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const evaluateBtn = () => {
    let btnNext = document.getElementById("btnNex");
    let btnPrev = document.getElementById("btnPre");

    if (pageNum === 1) {
      btnPrev.classList.add("is-active");
    } else if (pageNum === info.pages) {
      btnNext.classList.add("is-active");
    } else {
      btnPrev.classList.remove("is-active");
      btnNext.classList.remove("is-active");
    }
  };

  useEffect(() => {
    fetchData();
    evaluateBtn();
  }, [pageNum]);

  const prevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const nextPage = () => {
    if (pageNum < info.pages) {
      setPageNum(pageNum + 1);
    }
  };

  return (
    <>
      <div className="hero">
        <img src={logo} alt="logo" />
      </div>
      <nav className="navbar">
        <h1>Characters {info.count}</h1>
        <div className="navbar__rigth">
          <span>
            Pagina {pageNum} de {info.pages}
          </span>
          <div>
            <button
              className="btn"
              id="btnPre"
              type="button"
              onClick={prevPage}
            >
              Back
            </button>
            <button
              className="btn"
              id="btnNex"
              type="button"
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </nav>
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <div className="characters">
            {results.map((character) => (
              <Card key={character.id} {...character} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
