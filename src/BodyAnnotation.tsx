import React, { useEffect, useRef } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Annotation {
  id: number;
  dotX: number;       // anchor dot position (0-100, percentage of SVG viewBox)
  dotY: number;
  // polyline bend point
  bendX: number;
  bendY: number;
  // box top-left corner
  boxX: number;
  boxY: number;
  side: 'left' | 'right';   // which side the box sits on
  color: 'blue' | 'red' | 'yellow';
  title: string;
  date: string;
  ringMaxR: number;   // max radius the ring expands to (px in SVG coords)
  ringDur: number;    // animation duration in seconds
  ringDelay: number;  // animation delay in seconds
}

// ─── Color map ───────────────────────────────────────────────────────────────
const COLORS = {
  blue: '#5A8FAA',
  red: '#9E6060',
  yellow: '#9E8A50',
} as const;

// ─── Data ────────────────────────────────────────────────────────────────────
// All coordinates are in the SVG viewBox space (0 0 680 510)
const ANNOTATIONS: Annotation[] = [
  {
    id: 1,
    dotX: 358, dotY: 72,
    bendX: 428, bendY: 72,
    boxX: 455, boxY: 18,
    side: 'right',
    color: 'blue',
    title: '脑血管意外',
    date: '2023-10-27（门诊）',
    ringMaxR: 36, ringDur: 5.4, ringDelay: 0.4,
  },
  {
    id: 2,
    dotX: 350, dotY: 108,
    bendX: 428, bendY: 108,
    boxX: 455, boxY: 88,
    side: 'right',
    color: 'yellow',
    title: '脑梗死',
    date: '2023-05-26（住院）',
    ringMaxR: 64, ringDur: 7.2, ringDelay: 2.1,
  },
  {
    id: 3,
    dotX: 402, dotY: 185,
    bendX: 455, bendY: 185,
    boxX: 455, boxY: 160,
    side: 'right',
    color: 'red',
    title: '高血压',
    date: '2023-02-17（门诊）',
    ringMaxR: 56, ringDur: 6.4, ringDelay: 0.9,
  },
  {
    id: 4,
    dotX: 410, dotY: 232,
    bendX: 455, bendY: 232,
    boxX: 455, boxY: 230,
    side: 'right',
    color: 'blue',
    title: '高血压',
    date: '2018-01-16（高血压专科）',
    ringMaxR: 28, ringDur: 4.4, ringDelay: 3.3,
  },
  {
    id: 5,
    dotX: 285, dotY: 235,
    bendX: 225, bendY: 235,
    boxX: 35, boxY: 168,
    side: 'left',
    color: 'yellow',
    title: '尿毒症',
    date: '2023-10-27（住院）',
    ringMaxR: 48, ringDur: 6.0, ringDelay: 1.5,
  },
  {
    id: 6,
    dotX: 290, dotY: 290,
    bendX: 225, bendY: 290,
    boxX: 35, boxY: 238,
    side: 'left',
    color: 'red',
    title: '糖尿病伴并发症',
    date: '2023-09-13（门诊）',
    ringMaxR: 36, ringDur: 5.6, ringDelay: 4.2,
  },
  {
    id: 7,
    dotX: 292, dotY: 455,
    bendX: 225, bendY: 455,
    boxX: 35, boxY: 388,
    side: 'left',
    color: 'blue',
    title: '肢痛',
    date: '2018-05-26（门诊）',
    ringMaxR: 48, ringDur: 6.2, ringDelay: 2.7,
  },
  {
    id: 8,
    dotX: 378, dotY: 440,
    bendX: 455, bendY: 440,
    boxX: 455, boxY: 368,
    side: 'right',
    color: 'yellow',
    title: '肱骨近端多发性骨折',
    date: '2023-10-29（门诊）',
    ringMaxR: 28, ringDur: 4.8, ringDelay: 0.2,
  },
];

const BOX_W = 190;
const BOX_H = 66;

// ─── Single annotation ───────────────────────────────────────────────────────
const AnnotationItem: React.FC<{ a: Annotation }> = ({ a }) => {
  const c = COLORS[a.color];
  // box edge x for polyline endpoint
  const boxEdgeX = a.side === 'right' ? a.boxX : a.boxX + BOX_W;
  const boxMidY = a.boxY + BOX_H / 2;

  // corner bracket coords
  const bx2 = a.boxX + BOX_W;  // right edge
  const by2 = a.boxY + BOX_H;  // bottom edge

  const animId = `ring-anim-${a.id}`;

  return (
    <g>
      {/* ── Pulsing ring ── */}
      <circle r="4" cx={a.dotX} cy={a.dotY} fill="none" stroke={c} strokeWidth="2"
        style={{ opacity: 0 }}
      >
        <animate attributeName="r" from="4" to={String(a.ringMaxR)} dur={`${a.ringDur}s`} begin={`${a.ringDelay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur={`${a.ringDur}s`} begin={`${a.ringDelay}s`} repeatCount="indefinite" />
      </circle>

      {/* ── Solid anchor dot ── */}
      <circle cx={a.dotX} cy={a.dotY} r="3.5" fill={c} />

      {/* ── L-shaped connector line ── */}
      <polyline
        points={`${a.dotX},${a.dotY} ${a.bendX},${a.dotY} ${boxEdgeX},${boxMidY}`}
        fill="none" stroke={c} strokeWidth="0.7"
        strokeLinecap="round" strokeLinejoin="round"
      />

      {/* ── Label box background ── */}
      <rect x={a.boxX} y={a.boxY} width={BOX_W} height={BOX_H} rx="3"
        fill="rgba(6,18,48,0.84)" />

      {/* ── Corner brackets: top-left + bottom-right ── */}
      {/* top-left */}
      <polyline points={`${a.boxX},${a.boxY + 12} ${a.boxX},${a.boxY} ${a.boxX + 13},${a.boxY}`}
        fill="none" stroke={c} strokeWidth="1" />
      {/* bottom-right */}
      <polyline points={`${bx2},${by2 - 12} ${bx2},${by2} ${bx2 - 13},${by2}`}
        fill="none" stroke={c} strokeWidth="1" />

      {/* ── Separator line ── */}
      <line x1={a.boxX} y1={a.boxY + BOX_H / 2} x2={bx2} y2={a.boxY + BOX_H / 2}
        stroke={c} strokeWidth="0.5" opacity="0.3" />

      {/* ── Title text ── */}
      <text
        x={a.boxX + 12} y={a.boxY + BOX_H * 0.27}
        dominantBaseline="central"
        style={{ fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 700, fill: '#E8F4FF' }}
      >
        {a.title}
      </text>

      {/* ── Date text ── */}
      <text
        x={a.boxX + 12} y={a.boxY + BOX_H * 0.75}
        dominantBaseline="central"
        style={{ fontFamily: 'sans-serif', fontSize: '10.5px', fill: '#8AAECC' }}
      >
        {a.date}
      </text>
    </g>
  );
};

// ─── Body silhouette (kept as decorative fallback lines) ─────────────────────
const BodySilhouette: React.FC = () => (
  <g style={{ fill: 'rgba(20,60,120,0.10)', stroke: '#3A7BC8', strokeWidth: 0.8, opacity: 0.35 }}>
    <ellipse cx="340" cy="80" rx="38" ry="44" />
    <rect x="325" y="118" width="30" height="22" />
    <path d="M295 140Q270 150 268 230Q268 310 285 340L310 340Q320 360 340 360Q360 360 370 340L395 340Q412 310 412 230Q410 150 385 140Z" />
    <path d="M268 150Q248 160 240 200Q236 240 242 280Q248 300 255 310L265 310Q268 290 268 260L270 200Z" />
    <path d="M412 150Q432 160 440 200Q444 240 438 280Q432 300 425 310L415 310Q412 290 412 260L410 200Z" />
    <path d="M285 340Q278 370 276 410Q274 440 278 470L305 470Q308 450 310 420Q315 390 320 360Z" />
    <path d="M395 340Q402 370 404 410Q406 440 402 470L375 470Q372 450 370 420Q365 390 360 360Z" />
  </g>
);

// ─── Main export ─────────────────────────────────────────────────────────────
interface BodyAnnotationProps {
  /** Path or URL to the body image.
   *  If omitted the SVG silhouette is shown instead.
   *  Replace with your own asset, e.g. "/assets/body.png"
   */
  bodyImageSrc?: string;
  /** Override the annotations list */
  annotations?: Annotation[];
  className?: string;
  style?: React.CSSProperties;
}

const BodyAnnotation: React.FC<BodyAnnotationProps> = ({
  bodyImageSrc,
  annotations = ANNOTATIONS,
  className = '',
  style,
}) => {
  return (
    <svg
      width="100%"
      max-width="800px"
      viewBox="0 0 680 510"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block', ...style }}
    >
      {/* ── Optional body image ── */}
      {bodyImageSrc ? (
        <image
          href={bodyImageSrc}
          x="240" y="30"
          width="200" height="460"
          preserveAspectRatio="xMidYMid meet"
          style={{ opacity: 0.85 }}
        />
      ) : (
        <BodySilhouette />
      )}

      {/* ── Annotations ── */}
      {annotations.map(a => (
        <AnnotationItem key={a.id} a={a} />
      ))}
    </svg>
  );
};

export default BodyAnnotation;
export type { Annotation };