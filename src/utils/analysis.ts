export const computeMetrics = (competitors: any) => {
    const metrics = ['traffic', 'engagement', 'growth'];
    const maxValues = metrics.reduce((acc: any, metric: any) => ({
        ...acc,
        [metric]: Math.max(...competitors.map((c: any) => c[metric]))
    }), {});

    return metrics.map(metric => ({
        metric,
        ...competitors.reduce((acc: any, competitor: any) => ({
            ...acc,
            [competitor.name]: (competitor[metric] / maxValues[metric]) * 100
        }), {})
    }));
};