import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';

const TARGET_SRC = '/targets.mind';
const VIDEO_SRC = '/VIDEO.mp4';
const QR_CENTER_X = -0.02;
const QR_CENTER_Y = 0.02;
const QR_WIDTH = 0.72;
const TARGET_COUNT = 2;

const createVideoKeyMaterial = (texture: THREE.VideoTexture) => {
    return new THREE.ShaderMaterial({
        uniforms: {
            map: { value: texture },
        },
        vertexShader: `
            varying vec2 vUv;

            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D map;
            varying vec2 vUv;

            void main() {
                vec4 color = texture2D(map, vUv);
                float maxChannel = max(max(color.r, color.g), color.b);
                float minChannel = min(min(color.r, color.g), color.b);
                float saturation = maxChannel - minChannel;
                float whiteAmount = smoothstep(0.72, 0.96, minChannel) * (1.0 - smoothstep(0.08, 0.22, saturation));

                float edgeX = smoothstep(0.0, 0.13, vUv.x) * smoothstep(0.0, 0.13, 1.0 - vUv.x);
                float edgeY = smoothstep(0.0, 0.13, vUv.y) * smoothstep(0.0, 0.13, 1.0 - vUv.y);
                float edgeFade = edgeX * edgeY;

                float alpha = (1.0 - whiteAmount) * edgeFade * color.a;
                if (alpha < 0.03) discard;

                gl_FragColor = vec4(color.rgb, alpha);
            }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
    });
};

export const ARBusinessCard: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mindArRef = useRef<any>(null);
    const [status, setStatus] = useState<'ESCANEANDO...' | 'OBJETIVO DETECTADO'>('ESCANEANDO...');
    const [debugLogs, setDebugLogs] = useState<string[]>([]);

    const addLog = (msg: string) => {
        console.log(msg);
        setDebugLogs(prev => [...prev.slice(-10), msg]);
    };

    useEffect(() => {
        if (!containerRef.current || mindArRef.current) return;

        addLog('Initializing AR Engine...');

        const mindarThree = new MindARThree({
            container: containerRef.current,
            imageTargetSrc: TARGET_SRC,
            maxTrack: 1,
            uiLoading: 'no',
            uiScanning: 'no',
            uiError: 'no',
            filterMinCF: 0.0001,
            filterBeta: 0.001,
            warmupTolerance: 1,
            missTolerance: 0,
        });

        mindArRef.current = mindarThree;
        const { renderer, scene, camera } = mindarThree;
        const anchors = Array.from({ length: TARGET_COUNT }, (_, index) => mindarThree.addAnchor(index));

        const video = document.createElement('video');
        video.src = VIDEO_SRC;
        video.loop = true;
        video.muted = true;
        video.autoplay = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.load();

        const texture = new THREE.VideoTexture(video);
        texture.encoding = THREE.sRGBEncoding;
        const material = createVideoKeyMaterial(texture);

        const videoAspect = 16 / 9;
        const planes = anchors.map((anchor) => {
            const plane = new THREE.Mesh(
                new THREE.PlaneGeometry(QR_WIDTH, QR_WIDTH / videoAspect),
                material
            );
            plane.position.set(QR_CENTER_X, QR_CENTER_Y, 0.01);
            plane.visible = false;
            anchor.group.add(plane);
            return plane;
        });

        video.addEventListener('loadedmetadata', () => {
            const aspect = video.videoWidth / video.videoHeight || videoAspect;
            planes.forEach((plane) => {
                plane.geometry.dispose();
                plane.geometry = new THREE.PlaneGeometry(QR_WIDTH, QR_WIDTH / aspect);
            });
        }, { once: true });

        const tryPlayVideo = () => {
            video.play().catch((err) => {
                addLog(`Video play blocked: ${err}`);
            });
        };

        const primeVideo = () => {
            video.play().then(() => {
                video.pause();
                video.currentTime = 0;
            }).catch(() => {});
        };

        window.addEventListener('touchstart', primeVideo, { once: true, passive: true });
        window.addEventListener('click', primeVideo, { once: true });

        const start = async () => {
            try {
                addLog('Starting MindAR...');
                await mindarThree.start();
                addLog('MindAR Started OK');
                primeVideo();

                renderer.setAnimationLoop(() => {
                    renderer.render(scene, camera);
                });
            } catch (err) {
                addLog(`ERROR Starting: ${err}`);
                console.error('MindAR start error:', err);
            }
        };

        start();

        let lastVisible = false;
        const updateLoop = () => {
            const visibleAnchorIndex = anchors.findIndex((anchor) => anchor.visible);
            const isVisible = visibleAnchorIndex !== -1;

            if (isVisible !== lastVisible) {
                lastVisible = isVisible;
                const newStatus = lastVisible ? 'OBJETIVO DETECTADO' : 'ESCANEANDO...';
                setStatus(newStatus);
                addLog(`Status: ${newStatus}${visibleAnchorIndex >= 0 ? ` target ${visibleAnchorIndex + 1}` : ''}`);

                if (lastVisible) {
                    tryPlayVideo();
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            }

            planes.forEach((plane, index) => {
                plane.visible = index === visibleAnchorIndex;
            });

            if (isVisible) {
                if (video.paused) tryPlayVideo();
            } else {
                video.pause();
                video.currentTime = 0;
            }

            requestAnimationFrame(updateLoop);
        };
        const loopId = requestAnimationFrame(updateLoop);

        return () => {
            addLog('Cleaning up AR...');
            cancelAnimationFrame(loopId);
            window.removeEventListener('touchstart', primeVideo);
            window.removeEventListener('click', primeVideo);
            video.pause();
            texture.dispose();
            material.dispose();
            planes.forEach((plane) => plane.geometry.dispose());

            if (mindarThree) {
                try {
                    mindarThree.stop();
                    renderer.setAnimationLoop(null);
                } catch (e) {
                    console.warn('Cleanup error', e);
                }
            }

            mindArRef.current = null;
        };
    }, []);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden',
            background: 'transparent',
        }}>
            <div ref={containerRef} style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }} />

            <div style={{
                display: 'none',
                position: 'absolute',
                top: '80px',
                left: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.5)',
                color: '#0f0',
                fontFamily: 'monospace',
                fontSize: '10px',
                padding: '5px',
                borderRadius: '5px',
                pointerEvents: 'none',
                zIndex: 100,
            }}>
                {debugLogs.map((log, i) => (
                    <div key={i}>&gt; {log}</div>
                ))}
            </div>

            <div style={{
                position: 'absolute',
                top: '20px',
                left: '0',
                right: '0',
                display: 'flex',
                justifyContent: 'center',
                pointerEvents: 'none',
                zIndex: 10,
            }}>
                <div style={{
                    background: status === 'OBJETIVO DETECTADO' ? 'rgba(247, 168, 27, 0.9)' : 'rgba(0, 36, 108, 0.8)',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    color: 'white',
                    fontFamily: 'sans-serif',
                    border: '1px solid #F7A81B',
                    boxShadow: status === 'OBJETIVO DETECTADO' ? '0 0 20px #F7A81B' : '0 0 10px #F7A81B',
                    transition: 'all 0.3s ease',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                }}>
                    {status}
                </div>
            </div>

            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '0',
                right: '0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white',
                fontFamily: 'sans-serif',
                opacity: 0.7,
                pointerEvents: 'none',
            }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px', color: '#F7A81B' }}>
                    ROTARY INTERNATIONAL
                </div>
                <div style={{ fontSize: '12px', marginTop: '4px' }}>
                    ESCANEA LA TARJETA ROTARY PARA CONECTAR
                </div>
            </div>
        </div>
    );
};
