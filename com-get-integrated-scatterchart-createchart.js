function createchart(data, labels, width, height, offset) {

    'use strict';

    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    // setup x
    var xValue = function (d) {
        return d.Metric1;
    },
    xScale = d3.scale.linear().range([0, width]),
    xMap = function (d) {
        return xScale(xValue(d));
    },
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    // setup y
    var yValue = function (d) {
        return d.Metric2;
    },
    yScale = d3.scale.linear().range([height, 0]),
    yMap = function (d) {
        return yScale(yValue(d));
    },
    yAxis = d3.svg.axis().scale(yScale).orient("left");

    // setup fill color
    var cValue = function (d) {
        return d.Dim1;
    },
    color = d3.scale.category10();

  	var svg = document.getElementById("scattergraph");
  	//Make sure we haven't already created the graph area
    if (!svg) {
      // add the graph canvas to the body of the webpage
      svg = d3.select("#qv-extension").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr('id', 'scattergraph');

      var tooltip = document.getElementById("tt");
      // Check to see if the tooltip has already been created
      if (!tooltip) {
        // add the tooltip area to the webpage
        tooltip = d3.select("#qv-extension").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .attr('id', 'tt');
      }
  
      // don't want dots overlapping axis, so add in buffer to data domain
      xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
      yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);
  
      // x-axis
      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text(labels[0]);
  
      // y-axis
      svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(labels[1]);
  
      // draw dots
      svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function (d) {
          return color(cValue(d));
      })
      .on("mouseover", function (d) {
          tooltip.html( d.Tooltip );
          var tt_height = tt.offsetHeight;
          var tt_width = tt.offsetWidth;
          var tt_left = ((d3.event.pageX - offset.left) + 5);
          var tt_top = ((d3.event.pageY - offset.top) - 28);
  
          if ((tt_top + tt_height) > height) {
              tt_top = height - tt_height;
          }
  
          if ((tt_left + tt_width) > width) {
              tt_left = width - tt_width;
          }
  
          tooltip.style("left", tt_left + "px");
          tooltip.style("top", tt_top + "px");
          tooltip.transition()
          .duration(200)
          .style("opacity", .9);
      })
      .on("mouseout", function (d) {
          tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });
  
      // Create legend
      var legend = svg.selectAll(".legend")
          .data(color.domain())
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function (d, i) {
              return "translate(0," + i * 20 + ")";
          });
  
      // Draw legend rectangles
      legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);
  
      // Draw legend text
      legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function (d) {
          return d;
      });
    }
};
