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
import CheckIcon from "@material-ui/icons/Check";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Tasks from "../../components/Tasks/Tasks";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import Button from "../../components/CustomButtons/Button";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import moment from "moment";
import axios from "axios";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import CustomInput from "../../components/CustomInput/CustomInput";
import { InputLabel } from "@material-ui/core";
import Success from "../../components/Typography/Success";
import CardDash from "../../components/CardDash";

interface Props {
  classes: any;
}

interface Response {
  country: string;
  cases: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  updated_at: string | Date;
}

interface ResponseList {
  uid: number;
  uf: string;
  state: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  datetime: string | Date;
}

interface State {
  data: Response;
  dataList: ResponseList[];
  creatingMessage: boolean;
  messageSuccess: boolean;
  messageFailed: boolean;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: {
        country: "",
        cases: 0,
        confirmed: 0,
        deaths: 0,
        recovered: 0,
        updated_at: "",
      },
      dataList: [],
      creatingMessage: false,
      messageSuccess: true,
      messageFailed: true,
    };
  }

  componentDidMount = async () => {
    const response = (await fetch(
      "https://covid19-brazil-api.now.sh/api/report/v1/brazil/"
    ).then((resp) => resp.json())) as {
      data: Response;
    };
    const responseList = await axios.get<{ data: ResponseList[] }>(
      "https://covid19-brazil-api.now.sh/api/report/v1"
    );
    this.setState({ data: response.data, dataList: responseList.data.data });
  };

  render() {
    const { classes } = this.props;
    const { creatingMessage, messageFailed, messageSuccess } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <CardDash
              classes={classes}
              color={"success"}
              title={"Recovered"}
              value={this.state.data.recovered}
              icon={<Store />}
              footer={"Last 24 Hours"}
              footerIcon={<DateRange />}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <CardDash
              classes={classes}
              color={"warning"}
              title={"Cases"}
              value={this.state.data.cases}
              icon={<Icon>content_copy</Icon>}
              footer={"Get more space"}
              footerIcon={
                <Danger>
                  <Warning />
                </Danger>
              }
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <CardDash
              classes={classes}
              color={"info"}
              title={"Confirmed"}
              value={this.state.data.confirmed}
              icon={<Icon>info_outline</Icon>}
              footer={"Tracked from Github"}
              footerIcon={<LocalOffer />}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <CardDash
              classes={classes}
              color={"danger"}
              title={"Deaths"}
              value={this.state.data.deaths}
              icon={<Accessibility />}
              footer={"Just Updated"}
              footerIcon={<Update />}
            />
          </GridItem>
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
          {/* <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  ),
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  ),
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  ),
                },
              ]}
            />
          </GridItem> */}
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>
                  Número de casos por estado
                </h4>
                <p className={classes.cardCategoryWhite}>
                  {this.state.dataList.length > 0
                    ? `Data da ultima atualização ${moment(
                        this.state.dataList[0].datetime
                      ).format("DD/MM/YYYY")}`
                    : ""}
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["UF", "Estado", "Casos", "Mortes", "Suspeitas"]}
                  tableData={this.state.dataList
                    .sort((a, b) => (a.state > b.state ? 1 : -1))
                    .map((item) => {
                      return [
                        item.uf,
                        item.state,
                        item.cases,
                        item.deaths,
                        item.suspects,
                      ];
                    })}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="success">
                <div className={classes.messages}>
                  <h4 className={classes.cardTitleWhite}>
                    Mensagens Positivas
                  </h4>
                  {!creatingMessage && (
                    <Button
                      color="transparent"
                      variant="outlined"
                      onClick={() => this.setState({ creatingMessage: true })}
                    >
                      Enviar Mensagem
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardBody>
                {!creatingMessage ? (
                  <React.Fragment>
                    <h5 className={classes.cardTitle}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras ac est pulvinar, tempor turpis id, vehicula magna.
                    </h5>
                    <p className={classes.cardCategory}>Jane Doe</p>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <GridContainer>
                      <GridItem xs={12}>
                        <CustomInput
                          labelText="Nome"
                          id="name"
                          color="success"
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12}>
                        <CustomInput
                          labelText="Mensagem"
                          id="message"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            multiline: true,
                            rows: 5,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </React.Fragment>
                )}
              </CardBody>
              {creatingMessage && (
                <CardFooter>
                  <Button
                    color="danger"
                    onClick={() => this.setState({ creatingMessage: false })}
                  >
                    Cancelar
                  </Button>
                  <Button color="success">Enviar Mensagem</Button>
                </CardFooter>
              )}
              {messageFailed && (
                <CardFooter>
                  <div className={classes.stats}>
                    <Danger>
                      <Warning />
                      Falha ao enviar mensagem
                    </Danger>
                  </div>
                </CardFooter>
              )}
              {messageSuccess && (
                <CardFooter>
                  <div className={classes.stats}>
                    <Success>
                      <CheckIcon />
                      Mensagem enviada com sucesso
                    </Success>
                  </div>
                </CardFooter>
              )}
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
