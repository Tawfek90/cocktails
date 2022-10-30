import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);
  const [singleId, setSingleId] = useState(0);
  const [singleItemDetails, setSingleItemDetails] = useState([]);
  const fetchData = useCallback(() => {
    setLoading(true);
    axios
      .get(`${url}${searchTerm}`)
      .then((response) => {
        setLoading(false);
        const data = response.data;
        const cocktailsItems = data.drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        if (cocktailsItems) {
          setCocktails(cocktailsItems);
        } else {
          setCocktails([]);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [searchTerm]);
  useEffect(() => {
    fetchData();
  }, [searchTerm, fetchData]);

  return (
    <AppContext.Provider
      value={{
        loading,
        setSearchTerm,
        cocktails,
        setSingleId,
        singleId,
        singleItemDetails,
        setSingleItemDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
