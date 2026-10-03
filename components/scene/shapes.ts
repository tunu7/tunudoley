import { PART_CENTERS } from "./bus";

/** Deterministic PRNG so the shapes are identical on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Vec = [number, number, number];
type Sampler = (i: number, n: number, r: () => number) => Vec;

const jitter = (v: Vec, r: () => number, amt: number): Vec => [
  v[0] + (r() - 0.5) * amt,
  v[1] + (r() - 0.5) * amt,
  v[2] + (r() - 0.5) * amt,
];

const onSphere = (r: () => number, radius: number): Vec => {
  const u = r() * 2 - 1;
  const a = r() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  return [Math.cos(a) * s * radius, u * radius, Math.sin(a) * s * radius];
};

const add = (a: Vec, b: Vec): Vec => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

/** Hero: a neural core, a dense shell around a looser interior. */
const core: Sampler = (i, n, r) => {
  if (i % 10 < 7) {
    // Fibonacci shell for an even, "engineered" surface.
    const k = i + 0.5;
    const phi = Math.acos(1 - (2 * k) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * k;
    const rad = 1.75;
    return jitter([Math.cos(theta) * Math.sin(phi) * rad, Math.cos(phi) * rad, Math.sin(theta) * Math.sin(phi) * rad], r, 0.04);
  }
  const p = onSphere(r, 1.15 * Math.cbrt(r()));
  return p;
};

/** About: a double helix, founder and engineer strands joined by rungs. */
const helix: Sampler = (i, n, r) => {
  const strand = i % 3;
  const t = r();
  const y = (t * 2 - 1) * 2.3;
  const a = t * Math.PI * 5;
  const rad = 0.95;
  if (strand < 2) {
    const off = strand === 0 ? 0 : Math.PI;
    return jitter([Math.cos(a + off) * rad, y, Math.sin(a + off) * rad], r, 0.08);
  }
  const rung = Math.floor(t * 26) / 26;
  const ry = (rung * 2 - 1) * 2.3;
  const ra = rung * Math.PI * 5;
  const s = r() * 2 - 1;
  return jitter([Math.cos(ra) * rad * s, ry, Math.sin(ra) * rad * s], r, 0.03);
};

/** Building: company (sphere), client projects (cube), experiments (sparks), stacked like the cards. */
const building: Sampler = (i, n, r) => {
  const f = i / n;
  if (f < 0.45) return add(PART_CENTERS[0], jitter(onSphere(r, 0.72), r, 0.05));
  if (f < 0.75) {
    const face = Math.floor(r() * 6);
    const u = (r() - 0.5) * 1.1;
    const v = (r() - 0.5) * 1.1;
    const h = 0.55 * (face % 2 ? 1 : -1);
    const p: Vec = face < 2 ? [h, u, v] : face < 4 ? [u, h, v] : [u, v, h];
    return add(PART_CENTERS[1], jitter(p, r, 0.03));
  }
  // Sparks: a few loose clumps.
  const clump = Math.floor(r() * 7);
  const cr = mulberry32(clump * 97 + 13);
  const c: Vec = [(cr() - 0.5) * 1.8, (cr() - 0.5) * 0.6, (cr() - 0.5) * 1.2];
  return add(PART_CENTERS[2], add(c, onSphere(r, 0.18 * Math.cbrt(r()))));
};

/** Work: agent network, product lattice, stacked strategy layers. */
const NODES: Vec[] = (() => {
  const r = mulberry32(7);
  return Array.from({ length: 11 }, () => [(r() - 0.5) * 1.9, (r() - 0.5) * 0.9, (r() - 0.5) * 1.3] as Vec);
})();
const EDGES: [number, number][] = (() => {
  const edges: [number, number][] = [];
  NODES.forEach((a, i) => {
    const near = NODES.map((b, j) => ({ j, d: Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) }))
      .filter((x) => x.j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, 2);
    near.forEach(({ j }) => edges.push([i, j]));
  });
  return edges;
})();

const work: Sampler = (i, n, r) => {
  const f = i / n;
  if (f < 0.4) {
    if (r() < 0.45) {
      const node = NODES[Math.floor(r() * NODES.length)];
      return add(PART_CENTERS[0], add(node, onSphere(r, 0.09 * Math.cbrt(r()))));
    }
    const [a, b] = EDGES[Math.floor(r() * EDGES.length)];
    const t = r();
    const A = NODES[a];
    const B = NODES[b];
    return add(PART_CENTERS[0], jitter([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t], r, 0.02));
  }
  if (f < 0.72) {
    const g = () => (Math.floor(r() * 5) / 4 - 0.5) * 1.1;
    return add(PART_CENTERS[1], jitter([g(), g(), g()], r, 0.04));
  }
  const layer = Math.floor(r() * 3);
  return add(PART_CENTERS[2], jitter([(r() - 0.5) * 1.4, (layer - 1) * 0.28, (r() - 0.5) * 1.4], r, 0.02));
};

/** Principles: a calm, wide field, the foundation everything sits on. */
const field: Sampler = (i, n, r) => {
  const x = (r() - 0.5) * 4.2;
  const z = (r() - 0.5) * 4.2;
  const y = 0.22 * Math.sin(x * 1.8) * Math.cos(z * 1.6);
  // Tilt toward the viewer so it reads as a surface.
  const a = 0.75;
  return jitter([x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)], r, 0.02);
};

/** Contact: an open ring, a door. */
const ring: Sampler = (i, n, r) => {
  const u = r() * Math.PI * 2;
  const v = r() * Math.PI * 2;
  const R = 1.55;
  const tube = 0.18 * Math.sqrt(r());
  return [(R + tube * Math.cos(v)) * Math.cos(u), (R + tube * Math.cos(v)) * Math.sin(u), tube * Math.sin(v)];
};

const SAMPLERS: Sampler[] = [core, helix, building, work, field, ring];

export function buildShapes(n: number) {
  const r = mulberry32(42);
  const shapes = SAMPLERS.map((sample) => {
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const p = sample(i, n, r);
      arr[i * 3] = p[0];
      arr[i * 3 + 1] = p[1];
      arr[i * 3 + 2] = p[2];
    }
    return arr;
  });
  const rand = new Float32Array(n);
  for (let i = 0; i < n; i++) rand[i] = r();
  return { shapes, rand };
}
