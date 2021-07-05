import React, { useEffect } from "react";
import * as d3 from "d3";

const ChartUse = () => {
  useEffect(() => {
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
      <div>ChartUse</div>
      <p>D3 here</p>
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

export default ChartUse;
