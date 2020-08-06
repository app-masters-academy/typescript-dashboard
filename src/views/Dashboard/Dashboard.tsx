import React, { useState, useEffect } from "react";
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

import { bugs, website, server } from "../../variables/general";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import CustomInput from "../../components/CustomInput/CustomInput";
import { InputLabel } from "@material-ui/core";
import Success from "../../components/Typography/Success";
import moment from "moment";
import CardDash from "../../components/CardDash";

interface Props {
  classes: any;
}

interface State {
  value: number;
  query: string;
  creatingMessage: boolean;
  messageSuccess: boolean;
  messageFailed: boolean;
  data: DataResponse[];
  currentInfo: DataResponse;
}

interface DataResponse {
  uid: number;
  uf: string;
  state: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  datetime: string | Date;
}

const Dashboard: React.FC<Props> = ({ classes }) => {
  const [data, setData] = useState<State>({
    creatingMessage: true,
    messageFailed: false,
    messageSuccess: false,
    currentInfo: {
      uid: 0,
      uf: "",
      state: "",
      cases: 0,
      deaths: 0,
      suspects: 0,
      refuses: 0,
      datetime: "",
    },
    query: "",
    value: 0,
    data: [],
  });

  useEffect(() => {
    const getData = async () => {
      const response = (await fetch(
        "https://covid19-brazil-api.now.sh/api/report/v1"
      ).then((res) => res.json())) as { data: DataResponse[] };
      setData({ ...data, data: response.data, currentInfo: response.data[0] });
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    const response = (await fetch(
      `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${data.query}`
    ).then((res) => res.json())) as DataResponse;
    setData({ ...data, currentInfo: response });
  };

  return (
    <div>
      <div className={classes.cardChangeStateWrapper}>
        <Card className={classes.cardChangeState}>
          <GridContainer>
            <h4 className={classes.selectedState}>Alterar estado (sigla)</h4>
            <GridItem xs={12}>
              <CustomInput
                labelText="Nome"
                id="name"
                color="success"
                inputProps={{
                  value: data.query,
                  onChange: (e: any) =>
                    setData({ ...data, query: e.target.value }),
                }}
                formControlProps={{
                  fullWidth: true,
                }}
              />
            </GridItem>
          </GridContainer>
          <Button color="primary" onClick={() => handleSubmit()}>
            Buscar
          </Button>
        </Card>
        <div style={{ paddingLeft: 20 }}>
          <h4>{data.currentInfo.state}</h4>
        </div>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <CardDash
            classes={classes}
            icon={<Store />}
            title="Cases"
            subtitle="Last 24 Hours"
            value={data.currentInfo.cases}
            type="success"
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <CardDash
            classes={classes}
            icon={<Icon>content_copy</Icon>}
            title="Deaths"
            subtitle="Get more space"
            value={data.currentInfo.deaths}
            type="danger"
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <CardDash
            classes={classes}
            icon={<Icon>info_outline</Icon>}
            title="Suspects"
            subtitle="Tracked from Github"
            value={data.currentInfo.suspects}
            type="warning"
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <CardDash
            classes={classes}
            icon={<Accessibility />}
            title="Refuses"
            subtitle="Just Updated"
            value={data.currentInfo.refuses}
            type="info"
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart={true}>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={{
                  labels: data.data.map((item) => item.uf),
                  series: [data.data.map((item) => item.deaths)],
                }}
                type="Line"
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Número de mortes por estado</h4>
            </CardBody>
            <CardFooter chart={true}>
              <div className={classes.stats}>
                <AccessTime /> updated{" "}
                {data.data.length > 0 &&
                  moment(data.data[0].datetime).fromNow()}
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
                tableHead={["UF", "Estado", "Casos", "Mortes", "Suspeitas"]}
                tableData={data.data.map((item) => {
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
                <h4 className={classes.cardTitleWhite}>Mensagens Positivas</h4>
                {!data.creatingMessage && (
                  <Button
                    color="transparent"
                    variant="outlined"
                    onClick={() => setData({ ...data, creatingMessage: true })}
                  >
                    Enviar Mensagem
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardBody>
              {!data.creatingMessage ? (
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
            {data.creatingMessage && (
              <CardFooter>
                <Button
                  color="danger"
                  onClick={() => setData({ ...data, creatingMessage: false })}
                >
                  Cancelar
                </Button>
                <Button color="success">Enviar Mensagem</Button>
              </CardFooter>
            )}
            {data.messageFailed && (
              <CardFooter>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                    Falha ao enviar mensagem
                  </Danger>
                </div>
              </CardFooter>
            )}
            {data.messageSuccess && (
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
};

export default withStyles(dashboardStyle)(Dashboard);
