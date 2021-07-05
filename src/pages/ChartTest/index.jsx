import React, { useEffect } from "react";
import * as d3 from "d3";


const coordinateAxis=()=>[{year:'2012', value:20},{year:'2014', value:30},{year:'2016', value:40},{year:'2018', value:50},{year:'2020', value:60}]








const Dthree = () => {





  const generate=()=>{
   const svg = d3.select(".d3-chart");
    const margin = 200; //adjust svg display region
    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;

    //define our scales for the x-axis and y-axis.
const xScale = d3.scaleBand().range ([0, width]).padding(0.4);
const yScale = d3.scaleLinear().range ([height, 0]);


const g = svg.append("g")
           .attr("transform", "translate(" + 100 + "," + 100 + ")");

//data loaded => provide our domain values to  x and y            
xScale.domain(coordinateAxis().map(d=>d.year));
//d3.max() function to input our domain [0,max] value for y axis.
yScale.domain([0, d3.max(coordinateAxis(),  d=>d.value)]);

//從svg下一層的g才開始加入data
g.append("g")
//use the transform attribute to shift our x-axis towards the bottom of the SVG. We then insert x-axis on this group element using .call(d3.axisBottom(x)).
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(xScale));


//y軸另外調整顯示字樣，tick為中間分段刻度數量
g.append("g")
.call(d3.axisLeft(yScale).tickFormat(function(d){
    return "$" + d;
}).ticks(5));

g.selectAll(".bar")
         .data(coordinateAxis())
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.year); }) //specify the x and y positions of each of the bars and provide a width and height to the bars.
         .attr("y", function(d) { return yScale(d.value); })
         .attr("width", xScale.bandwidth()) //width of  bars
         .attr("height", function(d) { return height - yScale(d.value); }) //height of the SVG minus the corresponding y-value of the bar from the y-scale. Remember that the y-value here would be the tip of the bar since it is calculated from the origin and origin is at (0,0).
         .on('click',()=>console.log('ok'))
      
         svg.append('text')
         .attr("transform", "translate(100,0)")
         .style('font-size','60px')
         .attr("x", 50)
         .attr("y", 50)
         .attr("font-size", "24px")
         .text("title")


         g.append("g")
 .attr("transform", "translate(0," + height + ")")
 .call(d3.axisBottom(xScale))
 .append("text")
 .attr("y", height - 250)
 .attr("x", width - 100)
 .attr("text-anchor", "end")
 .attr("stroke", "black")
 .text("x label");


 g.append("g")
 .call(d3.axisLeft(yScale)
 .tickFormat(function(d){
     return "$" + d;
 }).ticks(10))
 .append("text")
 .attr("transform", "rotate(-90)")
 .attr("y", 6)
 .attr("dy", "-5.1em")
 .attr("text-anchor", "end")
 .attr("stroke", "black")
 .text("y label");

  }










  useEffect(() => {
    generate()
    d3.selectAll("p").style("color", "red");
    //datum每個節點share同一個arr資料
    // d3.selectAll("p")
    //   .datum([1, 2, 3])
    //   .text(function (d) {
    //     return d;
    //   });
    //data 依據把arr資料給節點
    // d3.selectAll("p")
    //   .data([a, b, c])
    //   .text(function (d) {
    //     return d;
    //   });
    const DUMMY_DATA = [
      { id: "d1", value: 10, region: "ED" },
      { id: "d2", value: 5, region: "CD" },
      { id: "d3", value: 3, region: "VH" },
      { id: "d4", value: 6, region: "MK" },
    ];
    //  可以根據資料的作畫範圍 x軸 y軸
    const xScale = d3
      .scaleBand()
      .domain(DUMMY_DATA.map((data) => data.region))
      .rangeRound([0, 250])
      .padding(0.1);
    //值的變化範圍
    const yScale = d3.scaleLinear().domain([0, 15]).range([250, 0]);
    let sampleData = [10, 20, 30];
    //true for toggle
    const container = d3.select(".d3-area").classed("container", true);

    const bars = container
      .selectAll(".bar")
      .data(DUMMY_DATA)
      .enter() //製作上面可以選到的bar
      .append("rect")
      .classed("bar", true)
      .attr("width", xScale.bandwidth())
      .attr("height", (data) => 250 - yScale(data.value))
      .attr("x", (data) => xScale(data.region))
      .attr("y", (data) => yScale(data.value));

    setTimeout(() => {
      //exit()拿到過多的
      bars.data(DUMMY_DATA.slice(0, 2)).exit().remove();
    }, 2000);

    // let svg = d3
    //   .select(".d3-area")
    //   .append("svg")
    //   .attr("width", 500)
    //   .attr("height", 500);
    // svg
    //   .selectAll("circle") // 這裡選了 cirlce 標籤 （對於當前網頁來說是空元素）
    //   .data(sampleData) // 綁定 sampleData 資料給予接下來的元素
    //   .enter() // 透過 enter() 找到仍需要三個元素來存放資料
    //   .append("circle") // 將 enter() 返回的元素數量新增為 circle 標籤
    //   .attr("cx", function (d, i) {
    //     // 透過 attr() 來將前面教學提到的屬性給予 circle 標籤
    //     return (i + 1) * 100; // 其中的 d 為 data， i 為 資料的陣列索引值
    //   })
    //   .attr("cy", 100)
    //   .attr("r", function (d) {
    //     // 這裡的圓形半徑採用綁定的資料
    //     return d;
    //   })
    //   .style("fill", "red"); // 為圓形增添一下樣式
  }, []);

  return (
    <>
      <div>Dthree</div>
      <p>D3 here</p>
      <svg width="600" height="500" className="d3-chart" style={{border:'1px solid teal'}}></svg>



      <svg className="d3-area"></svg>
      <svg height="50" width="50">
        <text
          x="20"
          y="20"
          fill="red"
          rotate="180"
          transform="rotate(30 20,40)"
        >
          SVG
        </text>
      </svg>
    </>
  );
};

export default Dthree;
