import { memo, FC, useMemo } from 'react';
import styled from 'styled-components';

interface Props {
  percentage: number;
  width?: number;
  stroke?: number;
  className?: string;
}

const Style = styled.svg`
  width: 1em;

  circle + circle {
    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
`;

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 0.2em;
`;

const RADIUS = 150;
const STROKE = 10;

export const CircleProgress: FC<Props> = memo((props) => {
  const circumference = 2 * RADIUS * Math.PI;
  const [boxWidth, radius, cx, cy, percentage] = useMemo(
    () =>
      !props.stroke
        ? [0, 0, 0, 0, 0]
        : [
            RADIUS * 2 + props.stroke,
            RADIUS,
            RADIUS + props.stroke / 2,
            RADIUS + props.stroke / 2,
            Math.max(0, Math.min(props.percentage, 100)),
          ],
    [props.stroke, props.percentage]
  );

  return (
    <Style
      style={{ fontSize: props.width }}
      className={props.className}
      preserveAspectRatio="xMinYMin meet"
      viewBox={`0 0 ${boxWidth} ${boxWidth}`}
    >
      <circle
        stroke="#dddddd"
        strokeWidth={props.stroke}
        fill="transparent"
        r={radius}
        cx={cx}
        cy={cy}
      ></circle>
      <circle
        stroke="red"
        strokeWidth={props.stroke}
        fill="transparent"
        strokeLinecap="round"
        r={radius}
        cx={cx}
        cy={cy}
        strokeDashoffset={circumference - (percentage / 100) * circumference}
        strokeDasharray={`${circumference} ${circumference}`}
      ></circle>
      <foreignObject x="0" y="0" width={boxWidth} height={boxWidth}>
        {props.children || <Centered>{props.percentage}</Centered>}
      </foreignObject>
    </Style>
  );
});

CircleProgress.defaultProps = {
  stroke: STROKE,
};
