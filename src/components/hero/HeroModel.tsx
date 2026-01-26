import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import type { Group } from 'three';
import { colors } from '../../design/tokens';
import useAudioAnalyser from '../../hooks/useAudioAnalyser';

const SignmonsModel = () => {
  const group = useRef<Group>(null);
  const gltf = useGLTF('/models/signmons3D.glb');
  const { actions, names } = useAnimations(gltf.animations, group);
  const amplitudeRef = useAudioAnalyser({ enabled: false });
  const baseX = 0.35;
  const baseY = -1.12;
  const baseScale = 0.4176;

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

const HeroModel = () => {
  const camera = useMemo(() => ({ position: [0, 0.25, 5.8] as [number, number, number], fov: 40 }), []);

  return (
    <Canvas camera={camera} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 2]} intensity={1.2} />
      <directionalLight position={[-3, -1, -2]} intensity={0.6} color={colors.brand.primary} />
      <Suspense fallback={null}>
        <SignmonsModel />
      </Suspense>
    </Canvas>
  );
};

export default HeroModel;
