import {Canvas,useFrame} from '@react-three/fiber';
import {Float} from '@react-three/drei';
import {useRef} from 'react';
function Sculpture(){
const group=useRef();
useFrame(({clock,pointer},delta)=>{if(!group.current)return;group.current.rotation.y+=(pointer.x*.2-group.current.rotation.y)*delta*2;group.current.rotation.x+=(pointer.y*.12-group.current.rotation.x)*delta*2;group.current.rotation.z=Math.sin(clock.elapsedTime*.18)*.06;});
return <group ref={group}><Float speed={1.4} rotationIntensity={.16} floatIntensity={.3}><mesh rotation={[.5,.4,-.5]}><torusKnotGeometry args={[1.15,.36,240,40,2,3]}/><meshPhysicalMaterial color="#a695eb" metalness={.58} roughness={.23} clearcoat={1} iridescence={.65}/></mesh><mesh position={[1.6,1.25,.3]}><sphereGeometry args={[.29,40,40]}/><meshPhysicalMaterial color="#c8dafa" metalness={.3} roughness={.12} clearcoat={1}/></mesh><mesh position={[-1.65,-.85,.4]} rotation={[.5,.7,.3]}><octahedronGeometry args={[.3]}/><meshStandardMaterial color="#9981d9" metalness={.45} roughness={.25}/></mesh><mesh position={[.55,-1.8,0]} rotation={[1.1,.5,.4]}><torusGeometry args={[.19,.045,20,60]}/><meshStandardMaterial color="#b09bea" metalness={.5} roughness={.25}/></mesh></Float></group>
}
export default function Scene3D(){return <Canvas dpr={[1,1.6]} camera={{position:[0,0,6.8],fov:42}} gl={{alpha:true,antialias:true,powerPreference:'low-power'}}><ambientLight intensity={1.8}/><directionalLight position={[3,5,4]} intensity={5}/><directionalLight position={[-4,0,2]} intensity={3} color="#b7b6ff"/><directionalLight position={[0,-3,-3]} intensity={4} color="#b2d2ff"/><Sculpture/></Canvas>}
