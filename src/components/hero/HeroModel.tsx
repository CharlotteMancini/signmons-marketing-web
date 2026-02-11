import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';
import { AdditiveBlending, CanvasTexture, Color, DoubleSide, MathUtils } from 'three';
import type {
  AmbientLight,
  DirectionalLight,
  FogExp2,
  Group,
  MeshBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  PointLight,
  Points,
  PointsMaterial,
} from 'three';
import useAudioAnalyser from '../../hooks/useAudioAnalyser';

const SignmonsModel = () => {
  const group = useRef<Group>(null);
  const gltf = useGLTF('/models/signmons3D.glb');
  const { actions, names } = useAnimations(gltf.animations, group);
  const amplitudeRef = useAudioAnalyser({ enabled: false });
  const baseX = 1.05;
  const baseY = -2.2;
  const baseScale = 0.56;

  useEffect(() => {
    const firstClipName = names[0];
    if (!firstClipName) return;
    const action = actions[firstClipName];
    if (!action) return;
    action.reset().fadeIn(0.2).play();
    return () => {
      action.fadeOut(0.2);
    };
  }, [actions, names]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const amplitude = amplitudeRef.current;
    const spin = t * 0.25;
    const bob = Math.sin(t * 0.6) * 0.08 * (0.6 + amplitude * 0.9);
    const scaleBoost = 1 + amplitude * 0.08;

    group.current.rotation.y = spin;
    group.current.position.x = baseX;
    group.current.position.y = baseY + bob;
    group.current.scale.setScalar(baseScale * scaleBoost);
  });

  return <primitive ref={group} object={gltf.scene} position={[baseX, baseY, 0]} scale={baseScale} />;
};

type StarFieldProps = {
  isNight: boolean;
};

const seededNoise = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const createNebulaTexture = (seed: number): CanvasTexture | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width * 0.5;
  const centerY = canvas.height * 0.5;
  const gradient = ctx.createRadialGradient(centerX, centerY, canvas.width * 0.08, centerX, centerY, canvas.width * 0.5);
  gradient.addColorStop(0, 'rgba(255,255,255,0.36)');
  gradient.addColorStop(0.45, 'rgba(255,255,255,0.2)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 16; i += 1) {
    const noiseSeed = seed * 100 + i * 11.7;
    const x = seededNoise(noiseSeed + 0.13) * canvas.width;
    const y = seededNoise(noiseSeed + 1.37) * canvas.height;
    const radius = MathUtils.lerp(canvas.width * 0.08, canvas.width * 0.24, seededNoise(noiseSeed + 2.73));
    const alpha = MathUtils.lerp(0.05, 0.14, seededNoise(noiseSeed + 3.91));
    const puff = ctx.createRadialGradient(x, y, 0, x, y, radius);
    puff.addColorStop(0, `rgba(255,255,255,${alpha})`);
    puff.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = puff;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const StarField = ({ isNight }: StarFieldProps) => {
  const farRef = useRef<Points>(null);
  const midRef = useRef<Points>(null);
  const nearRef = useRef<Points>(null);
  const farMaterialRef = useRef<PointsMaterial>(null);
  const midMaterialRef = useRef<PointsMaterial>(null);
  const nearMaterialRef = useRef<PointsMaterial>(null);
  const { farPositions, midPositions, nearPositions } = useMemo(() => {
    const buildLayer = (
      count: number,
      minRadius: number,
      maxRadius: number,
      layerSeed: number
    ) => {
      const data = new Float32Array(count * 3);

      for (let i = 0; i < count; i += 1) {
        const radius = MathUtils.lerp(minRadius, maxRadius, seededNoise(i * 3 + layerSeed + 0.17));
        const theta = seededNoise(i * 3 + layerSeed + 1.23) * Math.PI * 2;
        const phi = Math.acos(MathUtils.lerp(-1, 1, seededNoise(i * 3 + layerSeed + 2.41)));
        const index = i * 3;

        data[index] = radius * Math.sin(phi) * Math.cos(theta);
        data[index + 1] = radius * Math.cos(phi);
        data[index + 2] = -Math.abs(radius * Math.sin(phi) * Math.sin(theta)) - 3.2;
      }

      return data;
    };

    return {
      farPositions: buildLayer(1800, 10, 32, 10),
      midPositions: buildLayer(1300, 8, 22, 1000),
      nearPositions: buildLayer(700, 6.4, 15.5, 2000),
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (farRef.current) {
      farRef.current.rotation.y = t * 0.008;
      farRef.current.rotation.x = Math.sin(t * 0.04) * 0.02;
    }

    if (midRef.current) {
      midRef.current.rotation.y = t * 0.015;
      midRef.current.rotation.x = Math.cos(t * 0.06) * 0.03;
    }

    if (nearRef.current) {
      nearRef.current.rotation.y = t * 0.028;
      nearRef.current.rotation.x = Math.sin(t * 0.09) * 0.04;
    }

    if (farMaterialRef.current) {
      farMaterialRef.current.opacity = MathUtils.damp(
        farMaterialRef.current.opacity,
        isNight ? 0.72 : 0.56,
        3.2,
        delta
      );
    }

    if (midMaterialRef.current) {
      midMaterialRef.current.opacity = MathUtils.damp(
        midMaterialRef.current.opacity,
        isNight ? 0.92 : 0.66,
        3.2,
        delta
      );
    }

    if (nearMaterialRef.current) {
      nearMaterialRef.current.opacity = MathUtils.damp(
        nearMaterialRef.current.opacity,
        isNight ? 0.98 : 0.72,
        3.2,
        delta
      );
    }
  });

  return (
    <>
      <points ref={farRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[farPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={farMaterialRef}
          color="#cfdcff"
          size={0.022}
          sizeAttenuation
          transparent
          opacity={0.56}
          depthWrite={false}
        />
      </points>
      <points ref={midRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[midPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={midMaterialRef}
          color="#dce8ff"
          size={0.033}
          sizeAttenuation
          transparent
          opacity={0.66}
          depthWrite={false}
        />
      </points>
      <points ref={nearRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nearPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={nearMaterialRef}
          color="#ebf2ff"
          size={0.043}
          sizeAttenuation
          transparent
          opacity={0.72}
          depthWrite={false}
        />
      </points>
    </>
  );
};

type SceneFogProps = {
  isNight: boolean;
};

const SceneFog = ({ isNight }: SceneFogProps) => {
  const fogRef = useRef<FogExp2>(null);
  const fogBlendRef = useRef(0);
  const dayFogColor = useMemo(() => new Color('#0d1016'), []);
  const nightFogColor = useMemo(() => new Color('#030406'), []);

  useFrame((_, delta) => {
    fogBlendRef.current = MathUtils.damp(fogBlendRef.current, isNight ? 1 : 0, 3.6, delta);
    const blend = fogBlendRef.current;

    if (fogRef.current) {
      fogRef.current.color.copy(dayFogColor).lerp(nightFogColor, blend);
      fogRef.current.density = MathUtils.lerp(0.012, 0.022, blend);
    }
  });

  return <fogExp2 ref={fogRef} attach="fog" args={['#0d1016', 0.012]} />;
};

type NebulaPlaneSpec = {
  id: string;
  size: [number, number];
  basePosition: [number, number, number];
  baseRotation: [number, number, number];
  dayColor: string;
  nightColor: string;
  dayOpacity: number;
  nightOpacity: number;
  driftX: number;
  driftY: number;
  driftSpeed: number;
  phase: number;
};

const nebulaSpecs: NebulaPlaneSpec[] = [
  {
    id: 'veil-a',
    size: [16.5, 10.2],
    basePosition: [-2.7, 1.7, -16.4],
    baseRotation: [-0.28, 0.3, 0.14],
    dayColor: '#6d727d',
    nightColor: '#40454f',
    dayOpacity: 0.09,
    nightOpacity: 0.14,
    driftX: 0.24,
    driftY: 0.14,
    driftSpeed: 0.07,
    phase: 0.2,
  },
  {
    id: 'veil-b',
    size: [13.4, 8.1],
    basePosition: [2.8, -0.6, -14.8],
    baseRotation: [-0.22, -0.36, -0.1],
    dayColor: '#70757f',
    nightColor: '#434a53',
    dayOpacity: 0.08,
    nightOpacity: 0.13,
    driftX: 0.2,
    driftY: 0.12,
    driftSpeed: 0.08,
    phase: 1.2,
  },
  {
    id: 'veil-c',
    size: [11.8, 7.4],
    basePosition: [-0.8, -2.45, -12.9],
    baseRotation: [0.14, 0.26, 0.18],
    dayColor: '#666b74',
    nightColor: '#3d424b',
    dayOpacity: 0.07,
    nightOpacity: 0.11,
    driftX: 0.18,
    driftY: 0.1,
    driftSpeed: 0.09,
    phase: 2.1,
  },
  {
    id: 'veil-d',
    size: [10.2, 6.4],
    basePosition: [2.5, 2.75, -18.2],
    baseRotation: [-0.24, -0.2, 0.08],
    dayColor: '#595f69',
    nightColor: '#353b44',
    dayOpacity: 0.06,
    nightOpacity: 0.1,
    driftX: 0.14,
    driftY: 0.08,
    driftSpeed: 0.06,
    phase: 3.2,
  },
];

type NebulaPlanesProps = {
  isNight: boolean;
};

const NebulaPlanes = ({ isNight }: NebulaPlanesProps) => {
  const planeRefs = useRef<Array<Mesh | null>>([]);
  const materialRefs = useRef<Array<MeshBasicMaterial | null>>([]);
  const blendRef = useRef(0);
  const dayColors = useMemo(() => nebulaSpecs.map((spec) => new Color(spec.dayColor)), []);
  const nightColors = useMemo(() => nebulaSpecs.map((spec) => new Color(spec.nightColor)), []);
  const nebulaTextures = useMemo(
    () => nebulaSpecs.map((_, index) => createNebulaTexture(index + 1)),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    blendRef.current = MathUtils.damp(blendRef.current, isNight ? 1 : 0, 3.2, delta);
    const blend = blendRef.current;

    for (let i = 0; i < nebulaSpecs.length; i += 1) {
      const spec = nebulaSpecs[i];
      const mesh = planeRefs.current[i];
      const material = materialRefs.current[i];

      if (mesh) {
        mesh.position.x = spec.basePosition[0] + Math.sin(t * spec.driftSpeed + spec.phase) * spec.driftX;
        mesh.position.y = spec.basePosition[1] + Math.cos(t * (spec.driftSpeed + 0.03) + spec.phase) * spec.driftY;
        mesh.rotation.z = spec.baseRotation[2] + Math.sin(t * 0.08 + spec.phase) * 0.035;
      }

      if (material) {
        material.color.copy(dayColors[i]).lerp(nightColors[i], blend);
        material.opacity = MathUtils.lerp(spec.dayOpacity, spec.nightOpacity, blend);
      }
    }
  });

  return (
    <group>
      {nebulaSpecs.map((spec, index) => (
        <mesh
          key={spec.id}
          ref={(meshNode) => {
            planeRefs.current[index] = meshNode;
          }}
          position={spec.basePosition}
          rotation={spec.baseRotation}
        >
          <planeGeometry args={spec.size} />
          <meshBasicMaterial
            ref={(materialNode) => {
              materialRefs.current[index] = materialNode;
            }}
            map={nebulaTextures[index] ?? undefined}
            color={spec.dayColor}
            transparent
            opacity={spec.dayOpacity}
            depthWrite={false}
            depthTest={false}
            blending={AdditiveBlending}
            side={DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

type PlanetMeshesProps = {
  isNight: boolean;
};

type PlanetSpec = {
  id: string;
  radius: number;
  basePosition: [number, number, number];
  dayColor: string;
  nightColor: string;
  driftX: number;
  driftY: number;
  driftZ: number;
  motionSpeed: number;
  spinY: number;
  spinX: number;
  roughness: number;
  metalness: number;
};

const planetSpecs: PlanetSpec[] = [
  {
    id: 'atlas',
    radius: 1.14,
    basePosition: [-3.2, 2.2, -9.2],
    dayColor: '#6fa9ff',
    nightColor: '#4f79d8',
    driftX: 0.16,
    driftY: 0.1,
    driftZ: 0.14,
    motionSpeed: 0.12,
    spinY: 0.08,
    spinX: 0.03,
    roughness: 0.78,
    metalness: 0.06,
  },
  {
    id: 'kepler',
    radius: 1.42,
    basePosition: [3.4, 0.2, -10.6],
    dayColor: '#65b9d9',
    nightColor: '#3f8caf',
    driftX: 0.2,
    driftY: 0.11,
    driftZ: 0.16,
    motionSpeed: 0.1,
    spinY: 0.05,
    spinX: 0.02,
    roughness: 0.74,
    metalness: 0.08,
  },
  {
    id: 'nova',
    radius: 0.92,
    basePosition: [-1.85, -2.75, -7.7],
    dayColor: '#8f95e8',
    nightColor: '#636ad9',
    driftX: 0.12,
    driftY: 0.08,
    driftZ: 0.1,
    motionSpeed: 0.14,
    spinY: 0.1,
    spinX: 0.02,
    roughness: 0.76,
    metalness: 0.06,
  },
  {
    id: 'orion',
    radius: 0.78,
    basePosition: [2.7, -2.2, -13.8],
    dayColor: '#7fa8ef',
    nightColor: '#5c79cb',
    driftX: 0.1,
    driftY: 0.07,
    driftZ: 0.08,
    motionSpeed: 0.11,
    spinY: 0.07,
    spinX: 0.015,
    roughness: 0.8,
    metalness: 0.05,
  },
];

const PlanetMeshes = ({ isNight }: PlanetMeshesProps) => {
  const planetRefs = useRef<Array<Mesh | null>>([]);
  const planetMaterialRefs = useRef<Array<MeshStandardMaterial | null>>([]);
  const ringMainRef = useRef<Mesh>(null);
  const ringMainMaterialRef = useRef<MeshStandardMaterial>(null);
  const moonAlphaRef = useRef<Mesh>(null);
  const moonBetaRef = useRef<Mesh>(null);
  const moonMaterialRefs = useRef<Array<MeshStandardMaterial | null>>([]);
  const nightBlendRef = useRef(0);
  const dayPlanetColors = useMemo(
    () => planetSpecs.map((planet) => new Color(planet.dayColor)),
    []
  );
  const nightPlanetColors = useMemo(
    () => planetSpecs.map((planet) => new Color(planet.nightColor)),
    []
  );
  const dayRingMain = useMemo(() => new Color('#b1d5ff'), []);
  const nightRingMain = useMemo(() => new Color('#6a7de0'), []);
  const dayMoonColors = useMemo(
    () => [new Color('#b8d7ff'), new Color('#9fd7dd')],
    []
  );
  const nightMoonColors = useMemo(
    () => [new Color('#8ea7eb'), new Color('#78a0af')],
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    nightBlendRef.current = MathUtils.damp(nightBlendRef.current, isNight ? 1 : 0, 3.8, delta);
    const blend = nightBlendRef.current;

    for (let i = 0; i < planetSpecs.length; i += 1) {
      const spec = planetSpecs[i];
      const planetMesh = planetRefs.current[i];
      const material = planetMaterialRefs.current[i];

      if (planetMesh) {
        planetMesh.position.x = spec.basePosition[0] + Math.sin(t * spec.motionSpeed) * spec.driftX;
        planetMesh.position.y = spec.basePosition[1] + Math.cos(t * (spec.motionSpeed + 0.03)) * spec.driftY;
        planetMesh.position.z = spec.basePosition[2] + Math.sin(t * (spec.motionSpeed + 0.05)) * spec.driftZ;
        planetMesh.rotation.y += delta * spec.spinY;
        planetMesh.rotation.x += delta * spec.spinX;
      }

      if (material) {
        material.color.copy(dayPlanetColors[i]).lerp(nightPlanetColors[i], blend);
        material.roughness = MathUtils.lerp(spec.roughness, Math.min(0.96, spec.roughness + 0.09), blend);
      }
    }

    const kepler = planetRefs.current[1];
    const atlas = planetRefs.current[0];

    if (kepler && ringMainRef.current) {
      ringMainRef.current.position.copy(kepler.position);
      ringMainRef.current.rotation.x = Math.PI * 0.43 + Math.sin(t * 0.2) * 0.04;
      ringMainRef.current.rotation.y = Math.PI * 0.12 + t * 0.03;
    }

    if (kepler && moonAlphaRef.current) {
      moonAlphaRef.current.position.set(
        kepler.position.x + Math.cos(t * 0.36) * 1.95,
        kepler.position.y + Math.sin(t * 0.31) * 0.44,
        kepler.position.z + Math.sin(t * 0.36) * 1.25
      );
      moonAlphaRef.current.rotation.y += delta * 0.18;
    }

    if (atlas && moonBetaRef.current) {
      moonBetaRef.current.position.set(
        atlas.position.x + Math.sin(t * 0.4) * 1.35,
        atlas.position.y + Math.cos(t * 0.34) * 0.36,
        atlas.position.z + Math.cos(t * 0.4) * 0.92
      );
      moonBetaRef.current.rotation.y += delta * 0.22;
    }

    if (ringMainMaterialRef.current) {
      ringMainMaterialRef.current.color.copy(dayRingMain).lerp(nightRingMain, blend);
      ringMainMaterialRef.current.opacity = MathUtils.lerp(0.48, 0.62, blend);
    }

    for (let i = 0; i < moonMaterialRefs.current.length; i += 1) {
      const moonMaterial = moonMaterialRefs.current[i];
      if (!moonMaterial) continue;
      moonMaterial.color.copy(dayMoonColors[i]).lerp(nightMoonColors[i], blend);
      moonMaterial.roughness = MathUtils.lerp(0.82, 0.9, blend);
    }
  });

  return (
    <group>
      {planetSpecs.map((planet, index) => (
        <mesh
          key={planet.id}
          ref={(meshNode) => {
            planetRefs.current[index] = meshNode;
          }}
          position={planet.basePosition}
        >
          <sphereGeometry args={[planet.radius, 40, 40]} />
          <meshStandardMaterial
            ref={(materialNode) => {
              planetMaterialRefs.current[index] = materialNode;
            }}
            color={planet.dayColor}
            roughness={planet.roughness}
            metalness={planet.metalness}
          />
        </mesh>
      ))}
      <mesh ref={ringMainRef} position={planetSpecs[1].basePosition}>
        <torusGeometry args={[2.08, 0.07, 22, 120]} />
        <meshStandardMaterial
          ref={ringMainMaterialRef}
          color="#b1d5ff"
          roughness={0.7}
          metalness={0.08}
          transparent
          opacity={0.48}
        />
      </mesh>
      <mesh ref={moonAlphaRef} position={[0, 0, -9]}>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshStandardMaterial
          ref={(materialNode) => {
            moonMaterialRefs.current[0] = materialNode;
          }}
          color="#b8d7ff"
          roughness={0.82}
          metalness={0.03}
        />
      </mesh>
      <mesh ref={moonBetaRef} position={[0, 0, -8]}>
        <sphereGeometry args={[0.18, 18, 18]} />
        <meshStandardMaterial
          ref={(materialNode) => {
            moonMaterialRefs.current[1] = materialNode;
          }}
          color="#9fd7dd"
          roughness={0.84}
          metalness={0.02}
        />
      </mesh>
    </group>
  );
};

type SceneLightsProps = {
  isNight: boolean;
};

const SceneLights = ({ isNight }: SceneLightsProps) => {
  const ambientRef = useRef<AmbientLight>(null);
  const keyLightRef = useRef<DirectionalLight>(null);
  const fillLightRef = useRef<DirectionalLight>(null);
  const rimLightRef = useRef<PointLight>(null);
  const nightBlendRef = useRef(0);
  const dayAmbient = useMemo(() => new Color('#ffffff'), []);
  const nightAmbient = useMemo(() => new Color('#6f86de'), []);
  const dayKey = useMemo(() => new Color('#ffffff'), []);
  const nightKey = useMemo(() => new Color('#6b8fff'), []);
  const dayFill = useMemo(() => new Color('#ffffff'), []);
  const nightFill = useMemo(() => new Color('#3c4f96'), []);
  const dayRim = useMemo(() => new Color('#ffffff'), []);
  const nightRim = useMemo(() => new Color('#8a6fff'), []);

  useFrame((_, delta) => {
    const targetBlend = isNight ? 1 : 0;
    nightBlendRef.current = MathUtils.damp(nightBlendRef.current, targetBlend, 5.2, delta);
    const blend = nightBlendRef.current;

    if (ambientRef.current) {
      ambientRef.current.intensity = MathUtils.lerp(0.7, 0.18, blend);
      ambientRef.current.color.copy(dayAmbient).lerp(nightAmbient, blend);
    }

    if (keyLightRef.current) {
      keyLightRef.current.intensity = MathUtils.lerp(1.2, 0.42, blend);
      keyLightRef.current.color.copy(dayKey).lerp(nightKey, blend);
    }

    if (fillLightRef.current) {
      fillLightRef.current.intensity = MathUtils.lerp(0.6, 0.22, blend);
      fillLightRef.current.color.copy(dayFill).lerp(nightFill, blend);
    }

    if (rimLightRef.current) {
      rimLightRef.current.intensity = MathUtils.lerp(0.08, 1.05, blend);
      rimLightRef.current.color.copy(dayRim).lerp(nightRim, blend);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.7} color="#ffffff" />
      <directionalLight ref={keyLightRef} position={[3, 4, 2]} intensity={1.2} color="#ffffff" />
      <directionalLight ref={fillLightRef} position={[-3, -1, -2]} intensity={0.6} color="#ffffff" />
      <pointLight ref={rimLightRef} position={[-2.6, 1.4, -2.2]} intensity={0.08} distance={8} decay={2} color="#ffffff" />
    </>
  );
};

type SceneDepthOfFieldProps = {
  isNight: boolean;
};

const SceneDepthOfField = ({ isNight }: SceneDepthOfFieldProps) => {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <DepthOfField
        target={[1.05, -2.2, 0]}
        focalLength={isNight ? 0.012 : 0.009}
        focusRange={isNight ? 0.12 : 0.09}
        bokehScale={isNight ? 0.85 : 0.55}
        height={640}
      />
    </EffectComposer>
  );
};

const HeroModel = () => {
  const camera = useMemo(
    () => ({ position: [0, 0.22, 6] as [number, number, number], fov: 46 }),
    []
  );
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.querySelector('.marketing-root');

    if (!root) {
      return;
    }

    const syncNightMode = () => {
      setIsNight(
        root.classList.contains('marketing-root--dark') ||
          root.classList.contains('marketing-root--deep-space')
      );
    };

    syncNightMode();

    const observer = new MutationObserver(syncNightMode);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <Canvas
      camera={camera}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100svh' }}
    >
      <SceneFog isNight={isNight} />
      <NebulaPlanes isNight={isNight} />
      <StarField isNight={isNight} />
      <PlanetMeshes isNight={isNight} />
      <SceneLights isNight={isNight} />
      <Suspense fallback={null}>
        <SignmonsModel />
      </Suspense>
      <SceneDepthOfField isNight={isNight} />
    </Canvas>
  );
};

export default HeroModel;
