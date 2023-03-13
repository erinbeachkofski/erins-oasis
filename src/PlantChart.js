"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.accentColorDark =
  exports.accentColor =
  exports.background2 =
  exports.background =
    void 0;
const react_1 = __importDefault(require("react"));
const shape_1 = require("@visx/shape");
const WaterData_1 = __importDefault(require("./WaterData"));
const curve_1 = require("@visx/curve");
const grid_1 = require("@visx/grid");
const scale_1 = require("@visx/scale");
const gradient_1 = require("@visx/gradient");
const d3_array_1 = require("d3-array");
const d3_time_format_1 = require("d3-time-format");
exports.background = "#3b6978";
exports.background2 = "#204051";
exports.accentColor = "#edffea";
exports.accentColorDark = "#75daad";
// util
const formatDate = (0, d3_time_format_1.timeFormat)("%b %d, '%y");
// accessors
const getWaterDate = (wd) => new Date(wd.date);
const getDaysLeft = (wd) => wd.daysLeft;
function PlantChart({
  width,
  height,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
}) {
  if (width < 10) return null;
  // bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  // scales
  const waterDateScale = (0, scale_1.scaleTime)({
    range: [margin.left, innerWidth + margin.left],
    domain: (0, d3_array_1.extent)(WaterData_1.default, getWaterDate),
  });
  const waterDaysLeftScale = (0, scale_1.scaleLinear)({
    range: [innerHeight + margin.top, margin.top],
    domain: [
      0,
      ((0, d3_array_1.max)(WaterData_1.default, getDaysLeft) || 0) +
        innerHeight / 3,
    ],
    nice: true,
  });
  return react_1.default.createElement(
    "div",
    null,
    react_1.default.createElement(
      "svg",
      { width: width, height: height },
      react_1.default.createElement("rect", {
        x: 0,
        y: 0,
        width: width,
        height: height,
        fill: "url(#area-background-gradient)",
        rx: 14,
      }),
      react_1.default.createElement(gradient_1.LinearGradient, {
        id: "area-background-gradient",
        from: exports.background,
        to: exports.background2,
      }),
      react_1.default.createElement(gradient_1.LinearGradient, {
        id: "area-gradient",
        from: exports.accentColor,
        to: exports.accentColor,
        toOpacity: 0.1,
      }),
      react_1.default.createElement(grid_1.GridRows, {
        left: margin.left,
        scale: waterDaysLeftScale,
        width: innerWidth,
        strokeDasharray: "1,3",
        stroke: exports.accentColor,
        strokeOpacity: 0,
        pointerEvents: "none",
      }),
      react_1.default.createElement(grid_1.GridColumns, {
        top: margin.top,
        scale: waterDateScale,
        height: innerHeight,
        strokeDasharray: "1,3",
        stroke: exports.accentColor,
        strokeOpacity: 0.2,
        pointerEvents: "none",
      }),
      react_1.default.createElement(shape_1.AreaClosed, {
        data: WaterData_1.default,
        x: (wd) => {
          var _a;
          return (_a = waterDateScale(getWaterDate(wd))) !== null &&
            _a !== void 0
            ? _a
            : 0;
        },
        y: (wd) => {
          var _a;
          return (_a = waterDaysLeftScale(getDaysLeft(wd))) !== null &&
            _a !== void 0
            ? _a
            : 0;
        },
        yScale: waterDaysLeftScale,
        strokeWidth: 1,
        stroke: "url(#area-gradient)",
        fill: "url(#area-gradient)",
        curve: curve_1.curveMonotoneX,
      }),
      react_1.default.createElement(shape_1.Bar, {
        x: margin.left,
        y: margin.top,
        width: innerWidth,
        height: innerHeight,
        fill: "transparent",
        rx: 14,
      })
    )
  );
}
exports.default = PlantChart;
