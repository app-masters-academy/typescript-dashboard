import React from "react";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardIcon from "../Card/CardIcon";
import CardFooter from "../Card/CardFooter";

interface Props {
  color: "success" | "warning" | "danger" | "info" | "primary";
  classes: any;
  title: string;
  value: string | number;
  icon: React.ReactElement;
  footer: string;
  footerIcon: React.ReactElement;
}

class CardDash extends React.Component<Props, {}> {
  render() {
    const { classes, color, title, value, icon, footer, footerIcon } = this.props;
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
            {footer}
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default CardDash;
