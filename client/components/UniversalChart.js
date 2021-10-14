import React from 'react';
import Plot from 'react-plotly.js';
import { isSameObject } from '../utils';

//* This is a universal bar chart that can be customized through it's props
//* any of the destructured props can be changed. ~ Brynn

//* Note: I included every attribute I could find useful,
//* if you are looking for more: https://plotly.com/javascript/reference/
export default function UniversalChart(props) {
  //* Properties that can be changed
  const {
    //* The classname of the plot (so you can css)
    className = 'default-chart',
    //* The title of the chart
    title,
    //* The data that will fill the xAxis
    keys,
    //* This is the dataset the chart will use
    dataset,
    //* Background color of outside of plot (the container)
    backgroundColor = 'rgb(30, 34, 45)',
    //* Background color inside the plot
    plotBackgroundColor = 'rgb(30, 34, 45)',
    //* If you would like the chart to resize automatically
    autosize = true,
    //* Types of barmode include 'group' 'stack' 'relative'
    barmode = 'default',
    //* Margins for the chart { l: 100, r: 20, t: 200, b: 70 }
    margin = {},
    //* Customize the legend { x: 0.029, y: 1.238, font: { size: 10 }, traceorder: 'reversed'}
    //* https://plotly.com/javascript/reference/layout/#layout-legend
    legend,
    //* Custom distance between bars on bar chart (default is 0.1)
    bargap,
    //* Customize the xAxis (Custom date formats: https://plotly.com/javascript/tick-formatting/)
    //* Ex. { range: [0, 20], domain: [0, 0.5], zeroline: false, showline: false, showticklabels: true, showgrid: true }
    xaxis,
    //* Customize the yAxis
    //* You can read about the axes here: https://plotly.com/javascript/axes/
    yaxis,
    //* Add custom annotations
    annotations = [],
    //* Customize the grid Ex: {rows: 2, columns: 2}
    grid,
    //* How far from the datapoint should the hover show
    hoverdistance = 20,
    //* Determines the mode of hover interactions. If "closest", a single hoverlabel will appear
    //* for the "closest" point within the `hoverdistance`.
    //* Type: enumerated , one of ( "x" | "y" | "closest" | false | "x unified" | "y unified" )
    hovermode = 'closest',
    //* Type: object containing one or more of the keys listed below.
    //* https://plotly.com/javascript/reference/#layout-hoverlabel
    hoverlabel,
    //* If you so desire you can 100% create your own layout without any
    //* of the filler attributes I have added or simply with just more
    fullLayout,
    //* A function that is called whenever a set is clicked
    whenClick = () => {},
    //* Function to be called when plot is double clicked
    onDoubleClick = () => {},
    //* Function to be called when you hover over a datapoint
    onHover = () => {},
    //* Function to be called when you stop hovering over a datapoint
    onUnhover = () => {},
    //* Function to be called when you click the legend
    onLegendClick = () => {},
    //* Function to be called when you double click the legend
    onLegendDoubleClick = () => {},
    //* Function called when selected
    onSelected = () => {},
    //* Function called when selecting
    onSelecting = () => {},
    //* Function called when deselected
    onDeselect = () => {},
    //* Customize the font https://plotly.com/javascript/reference/layout/#layout-font
    font = { color: '#d0d3db', size: 12 },
    //* Show legend
    showlegend = isSameObject({}, legend) ? false : true,
    //* gridColor
    gridcolor = 'rgba(67, 70, 81, 0.3)',
  } = props;
  //* Pass in your whole own custom layout object
  let { layout } = props;
  //* Default layout object
  if (!layout) {
    layout = {
      title: title,
      autosize: autosize,
      barmode: barmode,
      showlegend: showlegend,
      legend: legend,
      margin: margin,
      font: font,
      grid: grid,
      paper_bgcolor: backgroundColor,
      plot_bgcolor: plotBackgroundColor,
      bargap: bargap,
      annotations: annotations,
      hovermode: hovermode,
      hoverlabel: hoverlabel,
      hoverdistance: hoverdistance,
      xaxis: {
        gridcolor: gridcolor,
      },
      yaxis: {
        gridcolor: gridcolor,
      },
    };
    //* Include the custom axes if required. Best
    //* not to attach upon creation to avoid errors
    if (xaxis) layout.xaxis = { ...layout.xaxis, ...xaxis };
    if (yaxis) layout.yaxis = { ...layout.yaxis, ...yaxis };
  }
  //* The data to load into the chart
  let data = [];

  //* If the dataset was actually provided
  if (dataset) {
    //* For each dataset provided
    data = dataset.map(set => {
      //* values that can be passed into each dataset
      const {
        //* The type of set this will be, 'bar', 'line', 'pie', 'scatter', 'candlestick', 'etc'
        type,
        //* The name of the set (shows on hover and on legend)
        name,
        //* The text that is shown inside of the set
        text,
        //* The actual values we are using to render this set
        values,
        //* The orientation of the chart. 'h' -  or  'v' |
        orientation,
        //* The fill color of the set
        color,
        //* The outline color of the set (stroke color)
        outline,
        //* The width/thickness of the outline
        stroke,
        //* Domain { row: 0, column: 0 }
        domain,
        //* What is to be shown apon hovering
        //* Ex ('label+name') or (label+percent+name) for pie charts
        hoverinfo,
        //* The text info
        textinfo,
        //* where should the text be located Ex. 'inside', 'auto'
        textposition,
        //* Labels for a pie chart
        labels,
        //* Customize individual bar width
        barWidth,
        //* Customize individual bar base Ex. [-500,-600,-700] (where the bar's base is)
        base,
        //* Hover template Ex. '%{base}' (using prev example would show -500 next to hover text)
        hovertemplate,
        //* Used to set the type of line. Ex. 'solid' 'dashdot' 'dot' (https://plotly.com/javascript/reference/scatter/#scatter-line-dash)
        dash,
        //* Determine the type of line to render Ex. 'lines' 'lines+markers' 'markers'
        linemode,
        //* Should lines connect gaps or have blank spaces (true/false)
        connectgaps,
        //* Fill lines 'tozeroy' 'tonexty' 'toself'
        fill,
        //* The color of the fil
        fillcolor,
        //* Smoothing https://plotly.com/javascript/reference/#scatter-line-smoothing
        smoothing,
        //* If you so desire you can 100% create your own set without any
        //* of the filler attributes I have added or simply with just more
        fullSet,
        //* If you just want to add, update or change your own attributes
        //* you can use custom set, it will use the set below but also
        //* attach and override with the elements you put in this obj
        //* list of properties you can attach https://plotly.com/javascript/reference/
        customSet,
      } = set;
      //* If the set is already built out
      if (fullSet) return fullSet;
      //* Return the formatted data object for that set
      let setData = {
        name: name ? name : 'Default Set Name',
        type: type ? type : 'bar',
        text: text ? text : '',
        hoverinfo: hoverinfo ? hoverinfo : '',
        textinfo: textinfo ? textinfo : 'none',
        textposition: textposition ? textposition : 'auto',
        width: barWidth ? barWidth : [],
        base: base ? base : [],
        hovertemplate: hovertemplate ? hovertemplate : '',
        fill: fill ? fill : '',
        x: keys,
        y: values,
        labels: labels,
        mode: linemode ? linemode : '',
        connectgaps: connectgaps ? connectgaps : true,
        domain: domain ? domain : {},
        orientation: orientation ? orientation : 'v',
        marker: {
          color: color ? color : 'rgba(55,128,191,0.7)',
          line: {
            color: outline ? outline : 'rgba(55,128,191,1.0)',
            width: stroke ? stroke : 2,
            dash: dash ? dash : 'solid',
            smoothing: smoothing ? smoothing : 0,
          },
        },
      };
      if (fillcolor) setData = { ...setData, fillcolor: fillcolor };
      //* Combine custom set otherwise just return the created set
      return customSet ? { ...setData, ...customSet } : setData;
    });
  }

  //* Return JSX
  return (
    <>
      <Plot
        className={className}
        data={data}
        layout={fullLayout ? fullLayout : layout}
        useResizeHandler={true}
        onClick={data => whenClick(data)}
        onDoubleClick={data => onDoubleClick(data)}
        onHover={data => onHover(data)}
        onUnhover={data => onUnhover(data)}
        onLegendClick={data => onLegendClick(data)}
        onLegendDoubleClick={data => onLegendDoubleClick(data)}
        onSelected={data => onSelected(data)}
        onSelecting={data => onSelecting(data)}
        onDeselect={data => onDeselect(data)}
      />
    </>
  );
}
