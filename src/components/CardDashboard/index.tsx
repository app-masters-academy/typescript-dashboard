import React from "react";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardIcon from "../Card/CardIcon";
import CardFooter from "../Card/CardFooter";
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";

interface Props {
  classes: any;
  //Tipo do card
  color: "success" | "warning" | "info" | "primary" | "danger";
  icon: React.ReactElement;
  title: string;
  value: string;
  footerIcon: React.ReactElement;
  footerLabel: string;
}

interface State {}

class CardDashboard extends React.Component<Props, State> {
  render() {
    const {
      classes,
      color,
      icon,
      title,
      value,
      footerIcon,
      footerLabel,
    } = this.props;
    return (
      <Card>
        <CardHeader color={color} stats={true} icon={true}>
          <CardIcon color={color}>{icon}</CardIcon>
          <p className={classes.cardCategory}>{title}</p>
          <h3 className={classes.cardTitle}>{value}</h3>
        </CardHeader>
        <CardFooter stats={true}>
          <div className={classes.stats}>
            {footerIcon}
            {footerLabel}
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default CardDashboard;
