import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function BreathingCity({ aqi = 168 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050b1f');
    const camera = new THREE.PerspectiveCamera(45, 1.4, 0.1, 1000);
    camera.position.set(0, 18, 35);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(900, 360);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ emissive: new THREE.Color('#00ffd1'), emissiveIntensity: 0.8 });
    const buildings = [];
    for (let i = 0; i < 20; i += 1) {
      const mesh = new THREE.Mesh(geometry, material.clone());
      mesh.position.x = (i % 5 - 2.2) * 3;
      mesh.position.z = Math.floor(i / 5) * 3 - 6;
      mesh.position.y = 1 + Math.random() * 4;
      mesh.scale.set(1.4, 2 + Math.random() * 3, 1.4);
      scene.add(mesh);
      buildings.push(mesh);
    }

    const particles = new THREE.Group();
    for (let i = 0; i < 80; i += 1) {
      const particle = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.08, 0.08),
        new THREE.MeshBasicMaterial({ color: 0x7dd3fc })
      );
      particle.position.set((Math.random() - 0.5) * 20, Math.random() * 12, (Math.random() - 0.5) * 20);
      particles.add(particle);
    }
    scene.add(particles);

    const light = new THREE.PointLight(0x00ffd1, 20, 80);
    light.position.set(0, 15, 12);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      buildings.forEach((building, index) => {
        const pulse = Math.sin(elapsed * 1.2 + index) * 0.04 + 0.98;
        building.scale.y = (building.scale.y / 1.5) * 1.5 + pulse * 0.025;
        const color = aqi > 220 ? 0xff3b5c : aqi > 150 ? 0xffb347 : 0x00ffd1;
        building.material.color.set(color);
        building.material.emissive.set(color);
      });
      particles.rotation.y = elapsed * 0.08;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [aqi]);

  return <div ref={mountRef} className="glass-panel h-[360px] overflow-hidden rounded-[2rem]" />;
}

export default BreathingCity;
