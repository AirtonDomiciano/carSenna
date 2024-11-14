export const series = (input: {
  receitaValues: number[];
  lucroValues: number[];
}): any /* echarts.SeriesOption[] */ => {
  return [
    {
      name: 'Receita',
      type: 'line',
      data: input.receitaValues,
      z: 0,
      smooth: true,
      lineStyle: {
        color: '#4318FF',
        width: 3,
        shadowBlur: 10,
        shadowOffsetY: 13,
        shadowColor: 'rgba(67, 24, 255, 0.1)',
      },
      itemStyle: {
        color: '#4318FF',
      },
    },
    {
      name: 'Lucro',
      type: 'line',
      data: input.lucroValues,
      z: 1,
      smooth: true,
      lineStyle: {
        color: '#7551FF',
        width: 3,
      },
      itemStyle: {
        color: '#7551FF',
      },
    },
  ];
};
