import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

export const TEAL = '#5fd4bf'
const INK = '#1a2f2a'

// بافت‌های ساخته‌شده با canvas: نقطه‌ی نرم برای ذرات و درخشش پشت اجسام
export function useRadialTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  const { gl } = useThree()
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 128
    const x = c.getContext('2d')
    const g = x.createRadialGradient(64, 64, 0, 64, 64, 64)
    g.addColorStop(0, inner)
    g.addColorStop(0.45, inner.replace(/[\d.]+\)$/, '0.25)'))
    g.addColorStop(1, outer)
    x.fillStyle = g
    x.fillRect(0, 0, 128, 128)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = gl.capabilities.getMaxAnisotropy()
    return t
  }, [gl, inner, outer])
}

export function Glow({ color = TEAL, scale = 4.2, opacity = 0.3 }) {
  const tex = useRadialTexture('rgba(95,212,191,1)', 'rgba(95,212,191,0)')
  return (
    <sprite scale={[scale, scale, 1]}>
      <spriteMaterial map={tex} color={color} transparent opacity={opacity} depthWrite={false} />
    </sprite>
  )
}

// کره‌ی براق با تابش نرم: بدون خطوط سیمی که مصنوعی به نظر می‌رسید
export function Orb() {
  const g = useRef()
  useFrame((_, d) => { g.current.rotation.y += d * 0.12 })
  return (
    <group ref={g}>
      <mesh>
        <sphereGeometry args={[1.25, 96, 96]} />
        <MeshDistortMaterial color="#1f3f38" roughness={0.22} metalness={0.35} distort={0.22} speed={0.9} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      <Glow scale={4.8} opacity={0.22} />
    </group>
  )
}

// حلقه‌های نازک با درخشش ملایم
export function Rings() {
  const g = useRef()
  useFrame((_, d) => { g.current.rotation.z += d * 0.08 })
  return (
    <group ref={g}>
      {[0, 1, 2].map(i => (
        <mesh key={i} rotation={[Math.PI / 2 - i * 0.45, i * 0.9, i * 0.35]}>
          <torusGeometry args={[1.15 + i * 0.32, 0.014, 24, 256]} />
          <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={0.55 - i * 0.1} roughness={0.3} metalness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

// کارت‌های شیشه‌ای با لبه‌ی گرد
export function Cards() {
  const g = useRef()
  useFrame(s => { g.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.25) * 0.35 })
  return (
    <group ref={g}>
      {[-1.5, 0, 1.5].map((x, i) => (
        <RoundedBox key={i} args={[1.1, 1.5, 0.06]} radius={0.07} smoothness={6}
          position={[x, i % 2 ? 0.22 : -0.18, i * 0.12]} rotation={[0, (i - 1) * 0.22, 0]}>
          <meshPhysicalMaterial color="#172622" roughness={0.28} metalness={0.1} clearcoat={1} clearcoatRoughness={0.2}
            emissive={TEAL} emissiveIntensity={i === 1 ? 0.12 : 0.03} />
        </RoundedBox>
      ))}
    </group>
  )
}

// گره‌ی مات و ساتن‌وار
export function Knot() {
  const m = useRef()
  useFrame((_, d) => { m.current.rotation.x += d * 0.18; m.current.rotation.y += d * 0.1 })
  return (
    <mesh ref={m}>
      <torusKnotGeometry args={[0.85, 0.26, 256, 32]} />
      <meshPhysicalMaterial color="#284a43" roughness={0.42} metalness={0.2} clearcoat={0.8} clearcoatRoughness={0.35} />
    </mesh>
  )
}

// سه دیسک مرحله‌ای؛ دیسک اول تأکید فیروزه‌ای دارد
export function Discs() {
  const g = useRef()
  useFrame((_, d) => { g.current.rotation.y += d * 0.25 })
  return (
    <group ref={g}>
      {[0, 1, 2].map(i => (
        <mesh key={i} position={[0, (1 - i) * 0.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.15 - i * 0.22, 1.15 - i * 0.22, 0.08, 96]} />
          <meshPhysicalMaterial color={i === 0 ? TEAL : INK} roughness={0.3} metalness={0.2} clearcoat={1}
            emissive={TEAL} emissiveIntensity={i === 0 ? 0.18 : 0.02} />
        </mesh>
      ))}
    </group>
  )
}

// نمودار سه‌بعدی مهارت‌ها؛ ارتفاع میله‌ها از سطح مهارت است
export function Bars({ levels = [] }) {
  const g = useRef()
  useFrame((_, d) => { g.current.rotation.y += d * 0.18 })
  return (
    <group ref={g} position={[0, -0.9, 0]}>
      {levels.map((lv, i) => {
        const h = (lv / 100) * 2.2
        return (
          <mesh key={i} position={[(i - (levels.length - 1) / 2) * 0.36, h / 2, 0]}>
            <boxGeometry args={[0.2, h, 0.2]} />
            <meshPhysicalMaterial color={TEAL} roughness={0.25} metalness={0.1} clearcoat={1} emissive={TEAL} emissiveIntensity={0.14} />
          </mesh>
        )
      })}
    </group>
  )
}

// ذرات نرم پس‌زمینه
export function Field({ count = 900 }) {
  const ref = useRef()
  const tex = useRadialTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0)')
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) a[i] = (Math.random() - 0.5) * 70
    return a
  }, [count])
  useFrame((_, d) => { ref.current.rotation.y += d * 0.008 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial map={tex} size={0.22} color="#b9f5ea" transparent opacity={0.6} sizeAttenuation depthWrite={false} alphaTest={0.01} />
    </points>
  )
}
