import React, { useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import axios from "axios";
import { useState } from "react";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { singleId, singleItemDetails, setSingleItemDetails } =
    useGlobalContext();
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios.get(`${url}${singleId}`).then((response) => {
      setLoading(false);
      const data = response.data;
      const singleDetails =
        data.drinks &&
        data.drinks.map((item) => {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = item;
          setIngredients([
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ]);
          return {
            name,
            info,
            image,
            category,
            glass,
            instructions,
          };
        });
      setSingleItemDetails(singleDetails);
    });
  }, [singleId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="single">
      {singleItemDetails &&
        singleItemDetails.map((item) => {
          const { name, info, image, category, glass, instructions } = item;
          return (
            <section className="section cocktail-section">
              <Link to="/" className="btn btn-primary">
                back Home
              </Link>
              <h2 className="section-title">{name}</h2>
              <div className="drink">
                <img src={image} alt={name} />
                <div className="drink-info">
                  <p>
                    <span className="drink-data">name:</span>
                    {name}
                  </p>
                  <p>
                    <span className="drink-data">category:</span>
                    {category}
                  </p>
                  <p>
                    <span className="drink-data">name:</span>
                    {name}
                  </p>
                  <p>
                    <span className="drink-data">info:</span>
                    {info}
                  </p>
                  <p>
                    <span className="drink-data">glass:</span>
                    {glass}
                  </p>
                  <p>
                    <span className="drink-data">instructions:</span>
                    {instructions}
                  </p>
                  <p>
                    <span className="drink-data">ingredients:</span>
                    {ingredients.map((item, index) => {
                      return item ? <span key={index}>{item}</span> : null;
                    })}
                  </p>
                </div>
              </div>
            </section>
          );
        })}
    </section>
  );
};

export default SingleCocktail;
