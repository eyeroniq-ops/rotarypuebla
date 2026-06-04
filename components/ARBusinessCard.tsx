import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';

export const ARBusinessCard: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mindArRef = useRef<any>(null);
    const [status, setStatus] = useState<'ESCANEANDO...' | 'OBJETIVO DETECTADO'>('ESCANEANDO...');
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => {
        console.log(msg);
        setLogs(prev => [...prev.slice(-8), msg]);
    };

    useEffect(() => {
        if (!containerRef.current || mindArRef.current) return;

        addLog('Iniciando motor AR...');

        const mindarThree = new MindARThree({
            container: containerRef.current,
            imageTargetSrc: '/targets.mind',
            maxTrack: 2,
            uiLoading: 'no',
            uiScanning: 'no',
            uiError: 'no',
        });

        mindArRef.current = mindarThree;
        const { renderer, scene, camera } = mindarThree;
        const anchor0 = mindarThree.addAnchor(0);
        const anchor1 = mindarThree.addAnchor(1);

        // Prepare the video element
        const video = document.createElement('video');
        video.src = '/VIDEO.mp4';
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.load();

        // Create a plane with the video texture — misma para ambos targets
        const videoTexture = new THREE.VideoTexture(video);
        const material = new THREE.MeshBasicMaterial({ map: videoTexture });
        
        const plane0 = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.5625), material);
        const plane1 = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.5625), material);
        anchor0.group.add(plane0);
        anchor1.group.add(plane1);

        video.addEventListener('loadedmetadata', () => {
            const aspect = video.videoHeight / video.videoWidth;
            plane0.geometry = new THREE.PlaneGeometry(1, aspect);
            plane1.geometry = new THREE.PlaneGeometry(1, aspect);
            addLog(`Video listo: ${video.videoWidth}x${video.videoHeight}`);
        });

        // Track visibility — cualquiera de los 2 targets activa el video
        const onFound = () => {
            addLog('¡Target encontrado!');
            setStatus('OBJETIVO DETECTADO');
            video.play().catch(e => addLog('Error video: ' + e));
        };
        const onLost = () => {
            addLog('Target perdido');
            setStatus('ESCANEANDO...');
            video.pause();
        };

        anchor0.onTargetFound = onFound;
        anchor0.onTargetLost = onLost;
        anchor1.onTargetFound = onFound;
        anchor1.onTargetLost = onLost;

        const start = async () => {
            try {
                addLog('Arrancando MindAR...');
                await mindarThree.start();
                addLog('MindAR OK ✓');
                renderer.setAnimationLoop(() => {
                    renderer.render(scene, camera);
                });
            } catch (err) {
                addLog(`ERROR: ${err}`);
            }
        };

        start();

        return () => {
            renderer.setAnimationLoop(null);
            try { mindarThree.stop(); } catch (e) {}
            video.pause();
            mindArRef.current = null;
        };
    }, []);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            overflow: 'hidden',
            background: '#000'
        }}>
            <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

            {/* Debug panel - verde en pantalla */}
            <div style={{
                position: 'fixed',
                top: '80px',
                left: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.7)',
                color: '#0f0',
                fontFamily: 'monospace',
                fontSize: '11px',
                padding: '6px',
                borderRadius: '6px',
                pointerEvents: 'none',
                zIndex: 999
            }}>
                {logs.map((l, i) => <div key={i}>&gt; {l}</div>)}
            </div>

            {/* Status badge */}
            <div style={{
                position: 'fixed', top: '20px', left: 0, right: 0,
                display: 'flex', justifyContent: 'center',
                pointerEvents: 'none', zIndex: 10
            }}>
                <div style={{
                    background: status === 'OBJETIVO DETECTADO' ? 'rgba(247,168,27,0.9)' : 'rgba(0,36,108,0.85)',
                    padding: '10px 24px',
                    borderRadius: '30px',
                    color: 'white',
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    border: '1px solid #F7A81B',
                    boxShadow: '0 0 15px rgba(247,168,27,0.5)',
                    transition: 'all 0.3s ease'
                }}>
                    {status}
                </div>
            </div>

            {/* Bottom label */}
            <div style={{
                position: 'fixed', bottom: '20px', left: 0, right: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                pointerEvents: 'none', zIndex: 10
            }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px', color: '#F7A81B' }}>
                    ROTARY INTERNATIONAL
                </div>
                <div style={{ fontSize: '12px', marginTop: '4px', color: 'rgba(255,255,255,0.7)' }}>
                    ESCANEA LA TARJETA ROTARY PARA CONECTAR
                </div>
            </div>
        </div>
    );
};
