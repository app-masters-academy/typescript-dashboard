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
import { InputLabel, FormControl, Select, MenuItem } from "@material-ui/core";
import Success from "../../components/Typography/Success";
import CardDash from "../../components/CardDash";

interface Props {
  classes: any;
}

interface Response {
  country: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
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
  selectedState: string;
  dataList: ResponseList[];
  dataDateList: ResponseList[][];
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
        suspects: 0,
        deaths: 0,
        refuses: 0,
        updated_at: "",
      },
      selectedState: "MG",
      dataList: [],
      dataDateList: [[]],
      creatingMessage: false,
      messageSuccess: true,
      messageFailed: true,
    };
  }

  componentDidMount = async () => {
    const response = (await fetch(
      "https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/mg"
    ).then((resp) => resp.json())) as Response;
    const responseList = await axios.get<{ data: ResponseList[] }>(
      "https://covid19-brazil-api.now.sh/api/report/v1"
    );

    const listDate: ResponseList[][] = [];

    const listOfDates = [
      "20200801",
      "20200802",
      "20200803",
      "20200804",
      "20200805",
      "20200806",
      "20200807",
      "20200808",
    ];
    for (var i = 0; i < listOfDates.length; i++) {
      const responseList = await axios.get<{ data: ResponseList[] }>(
        `https://covid19-brazil-api.now.sh/api/report/v1/brazil/${
          listOfDates[i]
        }`
      );
      listDate.push(responseList.data.data);
    }
    console.log(listDate);

    this.setState({
      data: response,
      dataDateList: listDate,
      dataList: responseList.data.data,
    });
  };

  handleChangeState = async (value: string) => {
    const response = (await fetch(
      `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${value}`
    ).then((resp) => resp.json())) as Response;

    this.setState({ data: response, selectedState: value });
  };

  render() {
    const { classes } = this.props;
    const { creatingMessage, messageFailed, messageSuccess } = this.state;
    return (
      <div>
        <GridContainer>
          <div style={{ padding: 20 }}>
            <form>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="states-simple">Estados</InputLabel>
                <Select
                  value={this.state.selectedState}
                  onChange={(e) => this.handleChangeState(e.target.value)}
                  style={{ width: 200 }}
                  inputProps={{
                    name: "states",
                    id: "states-simple",
                  }}
                >
                  <MenuItem value="MG">
                    <em>Minas Gerais</em>
                  </MenuItem>
                  <MenuItem value={"RJ"}>Rio de Janeiro</MenuItem>
                  <MenuItem value={"SP"}>São Paulo</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <CardDash
              classes={classes}
              color={"success"}
              title={"Refuses"}
              value={this.state.data.refuses}
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
              title={"Suspects"}
              value={this.state.data.suspects}
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
          <GridItem xs={12} sm={12} md={6}>
            <Card chart={true}>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels:
                      this.state.dataDateList.length > 0
                        ? this.state.dataDateList.map((item) => {
                            return moment(
                              item.length > 0 ? item[0].datetime : undefined
                            ).format("DD/MM/YYYY");
                          })
                        : undefined,
                    series: [
                      this.state.dataDateList.map((item) => {
                        return item.length > 0
                          ? item
                              .map((item) => {
                                return item.deaths;
                              })
                              .reduce((a, b) => a + b)
                          : undefined;
                      }),
                    ],
                  }}
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
          <GridItem xs={12} sm={12} md={6}>
            <Card chart={true}>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: this.state.dataList.map((item) => {
                      return item.uf;
                    }),
                    series: [
                      this.state.dataList.map((item) => {
                        return item.deaths;
                      }),
                    ],
                  }}
                  type="Bar"
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
          {/* <GridItem xs={12} sm={12} md={4}>
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
          </GridItem> */}
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
