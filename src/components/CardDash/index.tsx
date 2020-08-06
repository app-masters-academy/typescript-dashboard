import React, { useEffect } from "react";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardIcon from "../Card/CardIcon";
import CardFooter from "../Card/CardFooter";

interface Props {
  classes: any;
  type: "success" | "danger" | "warning" | "info" | "primary";
  icon: React.ReactElement;
  title: string;
  subtitle: string;
  value?: string | number;
}

const CardDash: React.FC<Props> = (props) => {
  return (
    <Card>
      <CardHeader color={props.type} stats={true} icon={true}>
        <CardIcon color={props.type}>{props.icon}</CardIcon>
        <p className={props.classes.cardCategory}>{props.title}</p>
        <h3 className={props.classes.cardTitle}>{props.value}</h3>
      </CardHeader>
      <CardFooter stats={true}>
        <div className={props.classes.stats}>{props.subtitle}</div>
      </CardFooter>
    </Card>
  );
};

export default CardDash;
