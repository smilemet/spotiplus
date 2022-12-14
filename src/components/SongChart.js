/**
 * 곡 상세페이지에서 곡의 오디오 분석결과를 출력해주는 차트
 */
import React from "react";
import styled from "styled-components";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const SongChartContainer = styled.div`
  canvas {
    .title {
      font-size: 20px;
    }
  }
`;

const SongChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const labels = props.dataKey;

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map((label) => props.data[label]),
        backgroundColor: "#1ED76050",
      },
    ],
  };

  return (
    <SongChartContainer>
      <Bar options={options} data={data} />
    </SongChartContainer>
  );
};

export default SongChart;
