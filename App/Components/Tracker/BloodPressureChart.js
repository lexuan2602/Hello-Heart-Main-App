import React, { useRef, useEffect, useState } from "react";
import { Dimensions, View, Animated, Easing, Alert, Text } from "react-native";
import { style } from "./style";
import Svg, {
  G,
  Line,
  Circle,
  Text as SvgText,
  Path,
  Rect,
} from "react-native-svg";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import GlobalApi from "../../Services/GlobalApi";

const window_width = Dimensions.get("window").width;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvgText = Animated.createAnimatedComponent(SvgText);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const BloodPressureChart = ({
  containerHeight = 400,
  circleColor = "#3cddf3",
  circleRadius = 4,
  axisColor = "#000",
  axisWidth = 2,
  axisLabelFontSize = 10,
  lineChartColor = "#3cddf3",
  lineChartWidth = 2,
  tooltipHeight = 20,
  tooltipWidth = 40,
  tooltipVisible = true,
  line_chart_data,
  onPressItem = (item) =>
    Alert.alert(`${item.time}, ${item.date} | Diastolic rate = ${item.value}`),
}) => {
  const marginFor_x_fromLeft = 40;
  const marginFor_y_fromBottom = 50;
  const padding_from_screenBorder = 20;

  const x_axis_x1_point = marginFor_x_fromLeft;
  const x_axis_y1_point = containerHeight - marginFor_y_fromBottom;
  const x_axis_x2_point = window_width - padding_from_screenBorder;
  const x_axis_y2_point = containerHeight - marginFor_y_fromBottom;
  let x_axis_width;
  let gap_between_x_axis_ticks;

  const y_axis_x1_point = marginFor_x_fromLeft;
  const y_axis_y1_point = padding_from_screenBorder;
  const y_axis_x2_point = marginFor_x_fromLeft;
  const y_axis_y2_point = containerHeight - marginFor_y_fromBottom;
  const y_min_value = 0;
  const y_max_value = Math.max.apply(
    Math,
    line_chart_data.map((item) => item.value)
  );
  const gapBetweenYAxisValues =
    (y_max_value - y_min_value) / (line_chart_data.length - 2);

  const y_axis_actual_height = y_axis_y2_point - y_axis_y1_point;
  const gap_between_y_axis_ticks =
    (y_axis_actual_height - y_min_value) / (line_chart_data.length - 1);
  const [yAxisLabels, setYAxisLabels] = useState([]);
  x_axis_width = x_axis_x2_point - marginFor_x_fromLeft;
  gap_between_x_axis_ticks = x_axis_width / (line_chart_data.length - 1);

  const animated_x_axis_width = useRef(
    new Animated.Value(x_axis_x1_point)
  ).current;
  const animated_y_axis_width = useRef(
    new Animated.Value(y_axis_y2_point)
  ).current;
  const animated_circle_radius = useRef(new Animated.Value(0)).current;
  const animated_ticks_labels_opacity = useRef(new Animated.Value(0)).current;
  const animated_path_ref = useRef(null);
  const animated_path_length = useRef(new Animated.Value(0)).current;
  const animated_path_opacity = useRef(new Animated.Value(0)).current;
  const animated_tooltip_opacity = useRef(new Animated.Value(0)).current;

  const animated_path_ref_second = useRef(null);
  const animated_path_length_second = useRef(new Animated.Value(0)).current;
  const animated_path_opacity_second = useRef(new Animated.Value(0)).current;
  const animated_tooltip_opacity_second = useRef(new Animated.Value(0)).current;

  const [pathLength, setPathLength] = useState(0);
  const [pathLength2, setPathLength2] = useState(0);

  // x, y axis animation
  useEffect(() => {
    const yAxisData = line_chart_data.map((item, index) => {
      if (index === 0) {
        return y_min_value;
      } else {
        return y_min_value + gapBetweenYAxisValues * index;
      }
    });
    setYAxisLabels(yAxisData);
    start_axis_circle_animation();
    start_x_y_axis_animation();
    start_x_y_ticks_labels_animation();
  }, []);

  // line chart path animation
  useEffect(() => {
    animated_path_length.setValue(pathLength);
    Animated.timing(animated_path_length, {
      toValue: 0,
      duration: 1000,
      delay: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
    Animated.timing(animated_path_opacity, {
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
    Animated.timing(animated_tooltip_opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, [pathLength]);

  // second line chart path animation
  useEffect(() => {
    animated_path_length.setValue(pathLength2);
    Animated.timing(animated_path_length_second, {
      toValue: 0,
      duration: 1000,
      delay: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
    Animated.timing(animated_path_opacity_second, {
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
    Animated.timing(animated_tooltip_opacity_second, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, [pathLength2]);

  const start_x_y_axis_animation = () => {
    Animated.timing(animated_x_axis_width, {
      toValue: x_axis_x2_point,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(animated_y_axis_width, {
      toValue: y_axis_y1_point,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();
  };

  const start_axis_circle_animation = () => {
    Animated.timing(animated_circle_radius, {
      toValue: circleRadius,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const start_x_y_ticks_labels_animation = () => {
    Animated.timing(animated_ticks_labels_opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const render_x_y_axis = () => {
    return (
      <G key="x-axis y-axis">
        <AnimatedCircle
          key="x-axis x1y1-circle"
          cx={x_axis_x1_point}
          cy={x_axis_y1_point}
          r={animated_circle_radius}
          fill={circleColor}
        />
        <AnimatedCircle
          key="x-axis x2y2-circle"
          cx={x_axis_x2_point}
          cy={x_axis_y2_point}
          r={animated_circle_radius}
          fill={circleColor}
        />
        <AnimatedCircle
          key="y-axis x1y1-circle"
          cx={y_axis_x1_point}
          cy={y_axis_y1_point}
          r={animated_circle_radius}
          fill={circleColor}
        />
        <AnimatedLine
          key={"x-axis"}
          x1={x_axis_x1_point}
          y1={x_axis_y1_point}
          x2={animated_x_axis_width}
          y2={x_axis_y2_point}
          stroke={axisColor}
          strokeWidth={axisWidth}
        />
        <AnimatedLine
          key={"y-axis"}
          x1={y_axis_x1_point}
          y1={animated_y_axis_width}
          x2={y_axis_x2_point}
          y2={y_axis_y2_point}
          stroke={axisColor}
          strokeWidth={axisWidth}
        />
      </G>
    );
  };

  const render_x_axis_labels_and_ticks = () => {
    return line_chart_data.map((item, index) => {
      let x_point = x_axis_x1_point + gap_between_x_axis_ticks * index;
      return (
        <G key={`x-axis labels and ticks${index}`}>
          <AnimatedLine
            key={`x-axis tick${index}`}
            x1={x_axis_x1_point + gap_between_x_axis_ticks * index}
            y1={x_axis_y1_point}
            x2={x_axis_x1_point + gap_between_x_axis_ticks * index}
            y2={x_axis_y1_point + 10}
            strokeWidth={axisWidth}
            stroke={axisColor}
          />
          <AnimatedSvgText
            x={x_point}
            y={x_axis_y1_point + 20}
            fill={axisColor}
            textAnchor="middle"
            fontWeight={600}
            opacity={animated_ticks_labels_opacity}
            fontSize={axisLabelFontSize}
          >
            {item?.date}
          </AnimatedSvgText>
          <AnimatedSvgText
            x={x_point}
            y={x_axis_y1_point + 40}
            fill={axisColor}
            textAnchor="middle"
            fontWeight={600}
            opacity={animated_ticks_labels_opacity}
            fontSize={axisLabelFontSize}
          >
            {item?.time}
          </AnimatedSvgText>
        </G>
      );
    });
  };

  const render_y_axis_labels_and_ticks = () => {
    return yAxisLabels.map((item, index) => {
      let y_point = y_axis_y2_point - gap_between_y_axis_ticks * index;
      return (
        <G key={`y-axis labels and ticks${index}`}>
          <AnimatedLine
            key={`y-axis ticks${index}`}
            x1={marginFor_x_fromLeft}
            y1={y_point}
            x2={marginFor_x_fromLeft - 10}
            y2={y_point}
            stroke={axisColor}
            strokeWidth={axisWidth}
          />
          <AnimatedSvgText
            key={`y-axis label${index}`}
            x={marginFor_x_fromLeft - 20}
            y={y_point + axisLabelFontSize / 3}
            fill={axisColor}
            textAnchor="end"
            fontWeight={400}
            fontSize={axisLabelFontSize}
            opacity={animated_ticks_labels_opacity}
          >
            {item}
          </AnimatedSvgText>
        </G>
      );
    });
  };

  const getDPath = () => {
    const maxValueAtYAxis = yAxisLabels[yAxisLabels.length - 1];
    if (maxValueAtYAxis) {
      let dPath = "";
      line_chart_data.map((item, index) => {
        let x_point = x_axis_x1_point + gap_between_x_axis_ticks * index;
        let y_point =
          (maxValueAtYAxis - item.value) *
            (gap_between_y_axis_ticks / gapBetweenYAxisValues) +
          padding_from_screenBorder;
        if (index === 0) {
          dPath += `M${x_point},${y_point}`;
        } else {
          dPath += `L${x_point},${y_point}`;
        }
      });
      return dPath;
    }
  };

  const getCurvedPath = (data, xOffset, yOffset) => {
    const maxValueAtYAxis = yAxisLabels[yAxisLabels.length - 1];
    let path = "";
    data.forEach((item, index) => {
      const x = x_axis_x1_point + xOffset * index;
      const y =
        (maxValueAtYAxis - item.value) *
          (gap_between_y_axis_ticks / gapBetweenYAxisValues) +
        padding_from_screenBorder;

      if (index === 0) {
        path += `M${x},${y}`; // Move to the first point
      } else {
        const prevX = x_axis_x1_point + xOffset * (index - 1);
        const prevY =
          (maxValueAtYAxis - data[index - 1].value) *
            (gap_between_y_axis_ticks / gapBetweenYAxisValues) +
          padding_from_screenBorder;

        const midX = (prevX + x) / 2; // Midpoint for control points

        // Use Bézier curve with control points to create a smooth curve
        path += `C${midX},${prevY} ${midX},${y} ${x},${y}`;
      }
    });

    return path;
  };

  const render_lineChart_path = () => {
    // const xOffset = gap_between_x_axis_ticks;
    // const yOffset = y_axis_y2_point; // Use y-axis reference

    // const curvedPath = getCurvedPath(line_chart_data, xOffset, yOffset);

    const dPath = getDPath();
    return (
      <AnimatedPath
        ref={animated_path_ref}
        d={dPath}
        strokeWidth={lineChartWidth}
        stroke={"#0096FF"}
        onLayout={() => {
          setPathLength(animated_path_ref?.current.getTotalLength());
        }}
        strokeDasharray={pathLength}
        strokeDashoffset={animated_path_length}
        opacity={animated_path_opacity}
        fill={"none"}
      />
    );
  };

  const render_lineChart_circles = () => {
    const maxValueAtYAxis = yAxisLabels[yAxisLabels.length - 1];
    if (maxValueAtYAxis) {
      return line_chart_data.map((item, index) => {
        let x_point = x_axis_x1_point + gap_between_x_axis_ticks * index;
        let y_point =
          (maxValueAtYAxis - item.value) *
            (gap_between_y_axis_ticks / gapBetweenYAxisValues) +
          padding_from_screenBorder;
        return (
          <G key={`line chart circles${index}`}>
            <AnimatedCircle
              key={`line chart circle${index}`}
              cx={x_point}
              cy={y_point}
              r={animated_circle_radius}
              fill={circleColor}
              onPress={() => onPressItem(item)}
            />

            {tooltipVisible && (
              <G key={`tooltip${index}`}>
                <AnimatedLine
                  key={`tooltip line${index}`}
                  x1={x_point}
                  y1={y_point}
                  x2={x_point}
                  y2={y_point}
                  stroke={lineChartColor}
                  strokeWidth={lineChartWidth}
                  opacity={animated_tooltip_opacity}
                />
                <AnimatedSvgText
                  key={`tooltip text${index}`}
                  x={index === 0 ? x_point + 15 : x_point}
                  y={y_point - tooltipHeight / 2 - 5}
                  fontSize={axisLabelFontSize}
                  fontWeight={700}
                  textAnchor={"middle"}
                  fill={"#000"}
                  opacity={animated_tooltip_opacity}
                >
                  {item.value}
                </AnimatedSvgText>
              </G>
            )}
            {/* <Rect
              key={`tooltip rect${index}`}
              x={x_point - tooltipWidth / 2}
              y={y_point - tooltipHeight - 10}
              width={tooltipWidth}
              height={tooltipHeight}
              fill={lineChartColor}
              rx={tooltipHeight / 4}
            /> */}
          </G>
        );
      });
    }
  };

  return (
    <View style={[style.svgWrapper, { height: containerHeight }]}>
      <AnimatedSvg height="100%" width="100%" style={style.svgStyle}>
        {render_x_y_axis()}
        {render_x_axis_labels_and_ticks()}
        {render_y_axis_labels_and_ticks()}
        {render_lineChart_path()}
        {render_lineChart_circles()}
      </AnimatedSvg>
    </View>
  );
};

export default BloodPressureChart;
