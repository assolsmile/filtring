import React from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import {Bar} from 'react-chartjs-2';

const options = {
  legend: {
    position: 'bottom',
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'rgb(204, 204, 204)',
          borderDash: [3, 3],
        },
        ticks: {
          fontColor: 'rgb(204, 204, 204)',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          color: 'rgb(204, 204, 204)',
          borderDash: [3, 3],
        },
        ticks: {
          fontColor: 'rgb(204, 204, 204)',
        },
      },
    ],
  },
};

const ChartBar = props => {
  const {chart} = props;
  const dataset = {
    labels: chart.labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        borderWidth: 1,
        hoverBackgroundColor: '#FF6384',
        hoverBorderColor: '#FF6384',
        data: chart.data,
      },
    ]
  };

  return (
    <Col md={12} lg={12} xl={6}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Something</h5>
          </div>
          <Bar data={dataset} options={options}/>
        </CardBody>
      </Card>
    </Col>
  );
}

export default ChartBar;
