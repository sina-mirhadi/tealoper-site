import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Orb, Rings, Cards, Knot, Discs, Bars, Field, TEAL } from './scenes.jsx'
import { computeStops, stationAt } from './stations.js'
import { isLite } from '../lib/ui.js'
import site from '../data/site.json'

const SCENES = { orb: Orb, rings: Rings, cards: Cards, knot: Knot, discs: Discs, bars: Bars }
const ORDER = ['orb', 'rings', 'cards', 'knot', 'discs', 'bars']
const BG = '#0a0d0c'

// هر ایستگاه به یک طرف صحنه تعلق دارد؛ دوربین بین طرف‌ها جابه‌جا می‌شود
const side = i => (i % 2 ? 1 : -1)
export function stationPos(i) {
  return new THREE.Vector3(side(i) * 1.6, Math.sin(i * 0.8) * 0.9, -i * 8)
}
function camPos(i) {
  return new THREE.Vector3(side(i) * 2.8, Math.cos(i * 0.6) * 0.8 + 0.3, -i * 8 + 10)
}
const smooth = t => {
  const x = Math.min(1, Math.max(0, t))
  return x * x * x * (x * (x * 6 - 15) + 10)
}

// دوربین: با اسکرول، در سه بعد حرکت می‌کند (جلو/عقب، چپ/راست، بالا/پایین) و به ایستگاه بعدی نگاه می‌کند
function Rig({ count, stopsRef, yRef, sRef }) {
  const { camera } = useThree()
  const pos = useMemo(() => new THREE.Vector3(), [])
  const look = useMemo(() => new THREE.Vector3(), [])
  useFrame(state => {
    if (count === 0) return
    const s = Math.min(count - 1, stationAt(yRef.current, stopsRef.current))
    sRef.current = s
    const i0 = Math.floor(s)
    const i1 = Math.min(i0 + 1, count - 1)
    const f = smooth(s - i0)
    pos.lerpVectors(camPos(i0), camPos(i1), f)
    pos.x += state.pointer.x * 0.5
    pos.y += state.pointer.y * 0.3
    look.lerpVectors(stationPos(i0), stationPos(i1), f)
    camera.position.lerp(pos, 0.1)
    camera.lookAt(look)
  })
  return null
}

// هر ایستگاه با پیشروی اسکرول به طرف مقابل می‌لغزد، می‌چرخد و کوچک می‌شود (مثل موشن‌گرافیک)
function Station({ i, sRef, kind, levels }) {
  const g = useRef()
  const Scene = SCENES[kind] || Orb
  useFrame(() => {
    const node = g.current
    if (!node) return
    const d = sRef.current - i
    const a = Math.min(1, Math.abs(d))
    const base = stationPos(i)
    node.visible = Math.abs(d) < 2.4
    node.position.set(base.x - d * side(i) * 2.4, base.y + Math.sin(d * 1.4) * 0.35, base.z)
    node.rotation.y = d * 0.6
    node.scale.setScalar(1 - a * 0.4)
  })
  return (
    <group ref={g}>
      <Scene levels={levels} />
    </group>
  )
}

// کف شبکه‌ای که با پیشروی اسکرول حرکت می‌کند و عمق صحنه را نشان می‌دهد
function Floor({ sRef }) {
  const { gl } = useThree()
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 256
    const x = c.getContext('2d')
    x.strokeStyle = 'rgba(95,212,191,0.9)'
    x.lineWidth = 2
    x.beginPath()
    x.moveTo(0, 0); x.lineTo(0, 256)
    x.moveTo(0, 0); x.lineTo(256, 0)
    x.stroke()
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.wrapS = THREE.RepeatWrapping
    t.wrapT = THREE.RepeatWrapping
    t.repeat.set(60, 60)
    t.anisotropy = gl.capabilities.getMaxAnisotropy()
    return t
  }, [gl])
  useFrame(() => { tex.offset.y = sRef.current * 0.02 })
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.8, -40]}>
      <planeGeometry args={[400, 400]} />
      <meshBasicMaterial map={tex} transparent opacity={0.16} depthWrite={false} />
    </mesh>
  )
}

// محیط بازتابی نرم برای براقیت واقعی مواد
function Environment() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    scene.environmentIntensity = 0.5
    return () => { env.dispose(); pmrem.dispose(); scene.environment = null }
  }, [gl, scene])
  return null
}

export default function World() {
  const { pathname } = useLocation()
  const [scenes, setScenes] = useState([])
  const stopsRef = useRef([])
  const yRef = useRef(0)
  const sRef = useRef(0)
  const lite = useMemo(() => isLite(), [])

  useEffect(() => {
    const refresh = () => {
      const els = [...document.querySelectorAll('[data-station]')]
      stopsRef.current = computeStops()
      setScenes(els.map((el, i) => el.dataset.scene || ORDER[i % ORDER.length]))
    }
    const t = setTimeout(refresh, 600)
    const onScroll = () => { yRef.current = window.scrollY }
    window.addEventListener('resize', refresh)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', refresh)
      window.removeEventListener('scroll', onScroll)
    }
  }, [pathname])

  return (
    <Canvas
      className="world"
      camera={{ position: [0, 0, 10], fov: 42, near: 0.1, far: 200 }}
      dpr={[1, lite ? 1.25 : 1.75]}
      gl={{ antialias: !lite, alpha: true }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <fog attach="fog" args={[BG, 16, 70]} />
      <Environment />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 6]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-5, -2, 4]} color={TEAL} intensity={10} distance={26} />
      <pointLight position={[5, 3, -2]} color="#8fd8ff" intensity={4} distance={24} />
      <Field count={lite ? 400 : 900} />
      <Floor sRef={sRef} />
      <Rig count={scenes.length} stopsRef={stopsRef} yRef={yRef} sRef={sRef} />
      {scenes.map((kind, i) => (
        <Station key={i} i={i} sRef={sRef} kind={kind} levels={site.skills.map(s => s.level)} />
      ))}
      {!lite && (
        <EffectComposer>
          <Bloom intensity={0.35} luminanceThreshold={0.6} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  )
}
