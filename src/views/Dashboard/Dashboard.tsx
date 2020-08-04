import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Tasks from "../../components/Tasks/Tasks";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-BR");

import { bugs, website, server } from "../../variables/general";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import CardDashboard from "../../components/CardDashboard";

interface Props {
  classes: any;
}

interface State {
  value: number;
  data: Response[];
}

interface Response {
  uid: number;
  uf: string;
  state: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  datetime: string | number | Date;
}

interface CardDash {
  type: "success" | "warning" | "info" | "primary" | "danger";
  title: string;
  value: string;
  icon: React.ReactElement;
  footerIcon: React.ReactElement;
  footerLabel: string;
}

const mockData: CardDash[] = [
  {
    type: "success",
    icon: <Store />,
    title: "Revenue",
    value: "$34,245",
    footerIcon: <DateRange />,
    footerLabel: "Last 24 Hours",
  },
  {
    type: "warning",
    icon: <Icon>content_copy</Icon>,
    title: "Used Space",
    value: "49/50",
    footerIcon: <Warning />,
    footerLabel: "Get more space",
  },
  {
    type: "danger",
    icon: <Icon>info_outline</Icon>,
    title: "Fixed Issues",
    value: "75",
    footerIcon: <LocalOffer />,
    footerLabel: "Tracked from Github",
  },
  {
    type: "info",
    icon:  <Accessibility />,
    title: "Followers",
    value: "+245",
    footerIcon: <Update />,
    footerLabel: "Just Updated",
  },
];

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
      data: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  componentDidMount = async () => {
    const response = (await fetch(
      "https://covid19-brazil-api.now.sh/api/report/v1"
    ).then((resp) => resp.json())) as { data: Response[] };
    this.setState({ data: response.data });
  };

  handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          {mockData.map((card) => (
            <GridItem xs={12} sm={6} md={3}>
              <CardDashboard
                classes={classes}
                color={card.type}
                icon={card.icon}
                title={card.title}
                value={card.value}
                footerIcon={card.footerIcon}
                footerLabel={card.footerLabel}
              />
            </GridItem>
          ))}
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart={true}>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart={true}>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart={true}>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={[
                    "UF",
                    "Estado",
                    "Casos",
                    "Mortes",
                    "Supeitas",
                    "Data",
                  ]}
                  tableData={this.state.data
                    .sort((a, b) => (a.uf > b.uf ? 1 : -1))
                    .map((item) => {
                      return [
                        item.uf,
                        item.state,
                        item.cases,
                        item.deaths,
                        item.suspects,
                        moment(item.datetime).fromNow(),
                      ];
                    })}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
