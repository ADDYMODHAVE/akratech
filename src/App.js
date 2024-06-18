import axios from "axios";
import "./App.css";
import Card from "./Card";
import Progressbar from "./Progressbar";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
let firsttime = true;

function App() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const onRefreshHandler = () => {
    axios.get("https://randomuser.me/api/?results=50").then((res) => {
      const data = res.data;
      localStorage.setItem("indexed_db", JSON.stringify(data));
      setItems(data.results);
      setLoading(false);
    });
  };
  useEffect(() => {
    const storedData = localStorage.getItem("indexed_db");
    if (storedData) {
      setItems(JSON.parse(storedData).results);
      setLoading(false);
    } else {
      onRefreshHandler();
    }
  }, []);
  const ondeletHandler = (id) => {
    const updatedItems = items.filter((it, index) => index !== id);
    setItems(updatedItems);
    localStorage.setItem("indexed_db", JSON.stringify({ results: updatedItems }));
  };

  return (
    <>
      <Button variant="contained" onClick={onRefreshHandler}>
        REFRESH
      </Button>
      <div className="text-center fw-bold fs-5">{items.length}</div>
      {loading ? (
        <Progressbar />
      ) : (
        <div className="container text-center">
          <div className="row">
            {items.map((it, index) => (
              <div className="col" key={it.cell}>
                <Card name={`${it.name.first} ${it.name.last}`} image={it.picture.large} btn={ondeletHandler.bind(this, index)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
