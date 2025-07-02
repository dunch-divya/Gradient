// // import GradientBackground from "./GradientBackground";

import { ShaderBackground } from "./ShaderBackground";




// // export default function Home() {
// //   return (
// //     <div style={{ width: '100vw', height: '100vh' }}>
// //       <GradientBackground/>
// //     </div>
// //   );
// // }
// // app/page.js



// import { ShaderBackground } from "./ShaderBackground";


// export default function Home() {
//   return (
//     <main>
//       <div className="shader-canvas-container">
//         <ShaderBackground />
//       </div>

//       <div className="content-overlay">
//         {/* <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>
//           GLSL Shaders in Next.js
//         </h1>
//         <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
//           This is an animated background rendered with React Three Fiber.
//         </p> */}
//       </div>
//     </main>
//   );
// }
export default function Home() {
  return (
    <main style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#000', 
    }}>
      <div
        style={{
          position: 'relative',
          width: '320px',
          height: '420px',
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: '#0a0a0a',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}>
          <ShaderBackground />
        </div>

        {/* Content Overlay */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ letterSpacing: '2px', fontSize: '0.75rem', opacity: 0.7 }}>DREAM OF VISION</p>
          <h2 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>WATCHES</h2>
          <p style={{ fontSize: '0.9rem', maxWidth: '250px', opacity: 0.8 }}>
            These watches reflect the vision of a house that transforms tradition through futuristic elegance.
          </p>
          <button style={{
            marginTop: '1.5rem',
            padding: '0.6rem 1.5rem',
            background: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: '999px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}>
            DISCOVER WATCHES
          </button>
        </div>
      </div>
    </main>
  );
}

