import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

const draw = async (select, setSelect) => {
  d3.select("svg").remove();
  const width = 960;
  const height = 600;
  const svg = d3
    .select("#draw-edge")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  //選擇投影方式
  const projection = d3
    .geoMercator()
    // .center([121, 24])  //設定中心點
    .scale(140)
    .translate([width / 2, height / 1.4]);
  //投影後的資料來產生路徑資料
  const path = d3.geoPath(projection);
  //群組tag
  const g = svg.append("g");

  const data = await d3.json("/src/data/countries-110m_TOPO.json");
  //  from topoJSON to GeoJSON
  const countries = topojson.feature(data, data.objects.countries);
  g.selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("data-name", (data) => data.properties.name)
    .style("fill", (data) => data.properties.name === `${select}` && "teal")
    .on("click", (e) => setSelect(e.target.dataset.name))
    .attr("d", path);

  //動畫效果，動畫總時間，晚2秒觸發
  // .transition()
  // .duration(5000)
  // .delay(2000)
  // .style("fill", "black");

  console.log({ data: countries.features });
};

const GeoTest = () => {
  const [select, setSelect] = useState(() => null);

  useEffect(() => {
    draw(select, setSelect);
  }, [select]);

  return (
    <>
      <div> GeoTest</div>
      <div
        id="draw-edge"
        style={{
          border: "1px solid black",
          display: "grid",
          placeItems: "center",
        }}
      ></div>
    </>
  );
};

export default GeoTest;
