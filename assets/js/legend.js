var legendWidth = 500,
    legendHeight = 500,
    boxmargin = 4,
    lineheight = 14,
    keyheight = 10,
    keywidth = 70,
    boxwidth = 2 * keywidth,
    formatPercent = d3.format(",.0f");
    
var margin = { "left": 20, "top": 10 };

var nineshadesofgold = [ '#1114d1','#d482ed','#42f5f5','#727520', '#d10a0a','#04bd0a','#507520','#7b119c', '#204675','#170b29','#ebd807','#000000' ];

var title = ['Key'],
    titleheight = title.length*lineheight + boxmargin;
    
var x = d3.scale.linear()
    .domain([1, 12]);
    
var quantize = d3.scale.quantize()
    .domain([1, 12])
    .range(nineshadesofgold);
    
var ranges = quantize.range().length;

// return quantize thresholds for the key    
var qrange = function(max, num) {
    var a = [];
    for (var i=0; i<num; i++) {
        a.push(i*max/num);
    }
    return a;
}
   
var svg2 = d3.select("#legend").append("svg")
    .attr("width", legendWidth)
    .attr("height", legendHeight);
    
// make legend 
var legend = svg2.append("g")
    .attr("transform", "translate ("+margin.left+","+margin.top+")")
    .attr("class", "legend");
    
legend.selectAll("text")
    .data(title)
    .enter().append("text")
    .attr("class", "legend-title")
    .attr("y", function(d, i) { return (i+1)*lineheight-2; })
    .text(function(d) { return d; })

// make legend box 
var lb = legend.append("rect")
    .attr("transform", "translate (0,"+titleheight+")")
    .attr("class", "legend-box")
    .attr("width", boxwidth)
    .attr("height", ranges*lineheight+2*boxmargin+lineheight-keyheight);

// make quantized key legend items
var li = legend.append("g")
    .attr("transform", "translate (8,"+(titleheight+boxmargin)+")")
    .attr("class", "legend-items");

li.selectAll("rect")
    .data(quantize.range().map(function(color) {
      var d = quantize.invertExtent(color);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    }))
    .enter().append("rect")
    .attr("y", function(d, i) { return i*lineheight+lineheight-keyheight; })
    .attr("width", keywidth)
    .attr("height", keyheight)
    .style("fill", function(d) { return quantize(d[0]); });
    
li.selectAll("text")
    .data(qrange(quantize.domain()[1], ranges))
    .enter().append("text")
    .attr("x", 72)
    .attr("y", function(d, i) { return (i+1)*lineheight-2; })
    .text(function(d) { return "Cat" +" "+ (d); });