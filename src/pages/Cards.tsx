import React from "react";
import { useContent } from "../hooks/useContent";
import {Card} from "../components/Card/Card";

const Cards = React.memo(() => {
  const { contents } = useContent();

  return (
    <>
      {contents?.map(({ type, link, title }) => (
        <Card key={link} type={type} link={link} title={title} />
      ))}
    </>
  );
});

export default Cards;
