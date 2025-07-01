// import GradientBackground from "./GradientBackground";




// export default function Home() {
//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <GradientBackground/>
//     </div>
//   );
// }
// app/page.js
import { ShaderBackground } from "./ShaderBackground";


export default function Home() {
  return (
    <main>
      <div className="shader-canvas-container">
        <ShaderBackground />
      </div>

      <div className="content-overlay">
        {/* <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>
          GLSL Shaders in Next.js
        </h1>
        <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
          This is an animated background rendered with React Three Fiber.
        </p> */}
      </div>
    </main>
  );
}
