import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';

const TARGET_SRC = '/targets.mind';
const VIDEO_SRC = '/VIDEO.mp4';

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
        });

        mindArRef.current = mindarThree;
        const { renderer, scene, camera } = mindarThree;
        const anchor = mindarThree.addAnchor(0);

        const video = document.createElement('video');
        video.src = VIDEO_SRC;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.load();

        const texture = new THREE.VideoTexture(video);
        texture.encoding = THREE.sRGBEncoding;

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            toneMapped: false,
        });

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 0.5625),
            material
        );
        anchor.group.add(plane);

        video.addEventListener('loadedmetadata', () => {
            const aspect = video.videoHeight / video.videoWidth;
            plane.geometry.dispose();
            plane.geometry = new THREE.PlaneGeometry(1, aspect);
        }, { once: true });

        const start = async () => {
            try {
                addLog('Starting MindAR...');
                await mindarThree.start();
                addLog('MindAR Started OK');

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
            if (anchor.visible !== lastVisible) {
                lastVisible = anchor.visible;
                const newStatus = lastVisible ? 'OBJETIVO DETECTADO' : 'ESCANEANDO...';
                setStatus(newStatus);
                addLog(`Status: ${newStatus}`);
            }

            if (anchor.visible && video.paused) {
                video.play().catch(() => {});
            } else if (!anchor.visible && !video.paused) {
                video.pause();
            }

            requestAnimationFrame(updateLoop);
        };
        const loopId = requestAnimationFrame(updateLoop);

        return () => {
            addLog('Cleaning up AR...');
            cancelAnimationFrame(loopId);
            video.pause();
            texture.dispose();
            material.dispose();
            plane.geometry.dispose();

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
