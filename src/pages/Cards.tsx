import React from "react";
import { useContent } from "../hooks/useContent";
import {Card} from "../components/Card/Card";

const Cards = () => {
  const { contents } = useContent();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
     
      {
         contents.map(({type,link , title}) => (
            <Card type={type} link={link}  title={title}/>
         ))
      }
     
    </div>
  );
};

export default Cards;
