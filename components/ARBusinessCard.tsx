import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';

// Video element lives outside React so it survives remounts
let sharedVideo: HTMLVideoElement | null = null;
function getSharedVideo() {
    if (sharedVideo) return sharedVideo;
    sharedVideo = document.createElement('video');
    sharedVideo.src = '/VIDEO.mp4';
    sharedVideo.loop = true;
    sharedVideo.muted = true;
    sharedVideo.playsInline = true;
    sharedVideo.setAttribute('playsinline', '');
    sharedVideo.setAttribute('webkit-playsinline', '');
    sharedVideo.load();
    return sharedVideo;
}

interface Props {
    targetFile: string;
    targetLabel: string;
    onSwitch: () => void;
}

export const ARBusinessCard: React.FC<Props> = ({ targetFile, targetLabel, onSwitch }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mindArRef = useRef<any>(null);
    const [status, setStatus] = useState<string>(`ESCANEANDO ${targetLabel}...`);
    const [found, setFound] = useState(false);

    useEffect(() => {
        if (!containerRef.current || mindArRef.current) return;

        const video = getSharedVideo();

        const mindarThree = new MindARThree({
            container: containerRef.current,
            imageTargetSrc: targetFile,
            maxTrack: 1,
            uiLoading: 'yes',  // Mostrar carga nativa de MindAR
            uiScanning: 'yes', // Mostrar scanner nativo de MindAR
            uiError: 'yes',
            filterMinCF: 0.0001,
            filterBeta: 0.001,
        });

        mindArRef.current = mindarThree;
        const { renderer, scene, camera } = mindarThree;
        const anchor = mindarThree.addAnchor(0);

        // Video plane
        const videoTexture = new THREE.VideoTexture(video);
        const material = new THREE.MeshBasicMaterial({ map: videoTexture });
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.5625), material);
        anchor.group.add(plane);

        video.addEventListener('loadedmetadata', () => {
            const aspect = video.videoHeight / video.videoWidth;
            plane.geometry = new THREE.PlaneGeometry(1, aspect);
        }, { once: true });

        // Track visibility via polling (same as /pto working project)
        let lastVisible = false;
        let gracePeriodTimer: ReturnType<typeof setTimeout> | null = null;
        let switchTimer: ReturnType<typeof setTimeout> | null = null;
        let animLoopId: number | null = null;

        animLoopId = requestAnimationFrame(function updateLoop() {
            if (anchor.visible !== lastVisible) {
                lastVisible = anchor.visible;

                if (lastVisible) {
                    if (gracePeriodTimer) { clearTimeout(gracePeriodTimer); gracePeriodTimer = null; }
                    if (switchTimer)      { clearTimeout(switchTimer);      switchTimer = null; }
                    setFound(true);
                    setStatus('¡TARJETA DETECTADA!');
                    video.play().catch(() => {});
                } else {
                    setFound(false);
                    setStatus(`ESCANEANDO ${targetLabel}...`);
                    gracePeriodTimer = setTimeout(() => {
                        video.pause();
                        onSwitch();
                    }, 4000);
                }
            }
            animLoopId = requestAnimationFrame(updateLoop);
        });

        const start = async () => {
            try {
                await mindarThree.start();

                renderer.setAnimationLoop(() => renderer.render(scene, camera));

                // Auto-switch after 10s if nothing detected
                switchTimer = setTimeout(() => {
                    if (!lastVisible) onSwitch();
                }, 10000);

            } catch (err) {
                console.error('AR Error:', err);
                setStatus('ERROR AR');
            }
        };
        start();

        return () => {
            if (animLoopId) cancelAnimationFrame(animLoopId);
            if (gracePeriodTimer) clearTimeout(gracePeriodTimer);
            if (switchTimer)      clearTimeout(switchTimer);
            try {
                renderer.setAnimationLoop(null);
                mindarThree.stop();
            } catch (e) {}
            mindArRef.current = null;
        };
    }, []);

    return (
        <div style={{
            width: '100vw', height: '100vh',
            position: 'fixed', top: 0, left: 0,
            overflow: 'hidden'
        }}>
            <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

            {/* Status badge */}
            <div style={{
                position: 'fixed', top: '20px', left: 0, right: 0,
                display: 'flex', justifyContent: 'center',
                pointerEvents: 'none', zIndex: 10
            }}>
                <div style={{
                    background: found ? 'rgba(247,168,27,0.92)' : 'rgba(0,36,108,0.85)',
                    color: found ? '#001540' : 'white',
                    padding: '10px 24px', borderRadius: '30px',
                    fontFamily: 'sans-serif', fontWeight: 'bold',
                    letterSpacing: '1px', fontSize: '14px',
                    border: '1px solid #F7A81B',
                    boxShadow: '0 0 15px rgba(247,168,27,0.4)',
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
