// components/ShaderBackground.jsx

"use client"; 

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';



const vertexShader = `
// 1. Declare a varying variable ,variable is a 2D vector
  varying vec2 vUv;
//uv-> built-in attribute

   // 2. The main function, which runs for every vertex
  void main() {


   // 3. Pass the UV coordinates to the fragment shader
    vUv = uv;


     // 4. Calculate and set the final position of the vertex => positioning
     //It's a vec3 that holds the local 3D coordinates of the vertex
     //To do matrix math for 3D transformations (like translation, rotation, scaling), we need to use 4D vectors, known as homogeneous coordinates. We convert our vec3 position into a vec4 by adding a w component of 1.0.
     //Model Matrix: Transforms the vertex from its local object space into the global 3D world space.
//View Matrix: Transforms the vertex from the world space into the camera's point of view.
//Multiplying by this matrix effectively places the vertex correctly in the scene relative to the camera.

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  // Uniforms passed from React
  uniform float u_time;
  uniform vec2 u_resolution;

  // Constants from the article
  const float L = 0.0015;
  const float S = 0.13;
  const float Y_SCALE = 3.0;

  // Colors for the gradient
  // const vec3 color1 = vec3(0.031, 0.0, 0.561);
  // const vec3 color2 = vec3(0.980, 0.0, 0.125);
  // const vec3 color3 = vec3(1.0, 0.8, 0.169);
  const vec3 color1 = vec3(0.1);  // Dark grey
const vec3 color2 = vec3(0.5);  // Mid grey
const vec3 color3 = vec3(0.9);  // Light grey


  // --- Simplex Noise Functions ---
  // A standard 3D simplex noise implementation
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float simplex_noise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  // --- Helper functions from the article ---

  float background_noise() {
    float x = gl_FragCoord.x;
    float y = gl_FragCoord.y * Y_SCALE;
    
    float F = 0.11 * u_time;

    // float noise = 0.5;
    // noise += simplex_noise(vec3(x * L * 1.0 + F * 1.0, y * L * 1.0, u_time * S)) * 0.30;
    // noise += simplex_noise(vec3(x * L * 0.6 - F * 0.6, y * L * 0.85, u_time * S)) * 0.26;
    // noise += simplex_noise(vec3(x * L * 0.4 + F * 0.8, y * L * 0.70, u_time * S)) * 0.22;
    float noise = 0.4;
noise += simplex_noise(vec3(x * L * 0.5 + F * 0.5, y * L * 0.6, u_time * S * 0.5)) * 0.5;
noise += simplex_noise(vec3(x * L * 0.2 - F * 0.3, y * L * 0.4, u_time * S * 0.3)) * 0.3;

    
    return clamp(noise, 0.0, 1.0);
  }

  vec3 calc_color(float t) {
    vec3 color = color1;
    color = mix(color, color2, min(1.0, t * 2.0));
    color = mix(color, color3, max(0.0, (t - 0.5) * 2.0));
    return color;
  }

  // --- Main Execution ---

  // void main() {
  //   float t = background_noise();
  //   vec3 final_color = calc_color(t);
  //   gl_FragColor = vec4(final_color, 1.0);
  // }
    void main() {
    float t = background_noise();
    vec3 final_color = calc_color(t);

    // --- Fade only in the bottom-right corner ---
    float fadeX = smoothstep(u_resolution.x - 60.0, u_resolution.x, gl_FragCoord.x);
    float fadeY = smoothstep(u_resolution.y - 60.0, u_resolution.y, gl_FragCoord.y);
    float mask = fadeX * fadeY;
    mask = mix(1.0 , mask , t);

    gl_FragColor = vec4(final_color, mask);
  }

`;

// This creates a THREE.ShaderMaterial with our shaders and uniforms
const BackgroundMaterial = shaderMaterial(
  {
    u_time: 0,
    u_resolution: new THREE.Vector2(),
  },
  vertexShader,
  fragmentShader
);

// We need to extend R3F to recognize our material as a JSX tag
import { extend } from '@react-three/fiber';
extend({ BackgroundMaterial });


// The main React component that renders the shader
const ShaderPlane = () => {
  const ref = useRef();
  const resolution = useMemo(() => new THREE.Vector2(window.innerWidth, window.innerHeight), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.uniforms.u_time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      {/* <planeGeometry args={[2, 2]} /> */}
      <planeGeometry args={[4, 2.5]} />

      <backgroundMaterial
        ref={ref}
        u_resolution={resolution}
        key={BackgroundMaterial.key}
      />
    </mesh>
  );
};


// The Canvas wrapper
// export const ShaderBackground = () => {
//   return (
//     <Canvas camera={{ position: [0, 0, 1] }}>
//       <ShaderPlane />
//     </Canvas>
//   );
// };
export const ShaderBackground = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{ width: '100%', height: '100%' }} // so it fits the div box
    >
      <ShaderPlane />
    </Canvas>
  );
};
