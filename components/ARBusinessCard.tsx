import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';

type ARStatus = 'CARGANDO...' | 'ESCANEANDO...' | 'OBJETIVO DETECTADO' | 'ERROR AL INICIAR AR';

export const ARBusinessCard: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mindArRef = useRef<any>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [status, setStatus] = useState<ARStatus>('CARGANDO...');

    useEffect(() => {
        if (!containerRef.current || mindArRef.current) return;
        let isDisposed = false;
        let loopId = 0;

        const mindarThree = new MindARThree({
            container: containerRef.current,
            imageTargetSrc: '/tar1.mind',
            maxTrack: 1,
            uiLoading: 'no',
            uiScanning: 'no',
            uiError: 'yes',
            filterMinCF: 0.0001,
            filterBeta: 0.001,
        });

        mindArRef.current = mindarThree;
        const { renderer, scene, camera } = mindarThree;
        const anchor = mindarThree.addAnchor(0);

        const video = document.createElement('video');
        video.src = '/VIDEO.mp4';
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';
        video.preload = 'auto';
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.load();
        videoRef.current = video;

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
            plane.geometry = new THREE.PlaneGeometry(1, aspect);
        }, { once: true });

        anchor.onTargetFound = () => {
            if (isDisposed) return;
            setStatus('OBJETIVO DETECTADO');
            video.play().catch((err) => {
                console.warn('Video playback blocked:', err);
            });
        };

        anchor.onTargetLost = () => {
            if (isDisposed) return;
            setStatus('ESCANEANDO...');
            video.pause();
        };

        const start = async () => {
            try {
                await mindarThree.start();
                if (isDisposed) return;
                setStatus('ESCANEANDO...');
                renderer.setAnimationLoop(() => renderer.render(scene, camera));
            } catch (err) {
                console.error('AR Error:', err);
                if (!isDisposed) setStatus('ERROR AL INICIAR AR');
            }
        };
        start();

        const updateLoop = () => {
            if (anchor.visible && video.paused) {
                video.play().catch(() => {});
            }
            loopId = requestAnimationFrame(updateLoop);
        };
        loopId = requestAnimationFrame(updateLoop);

        return () => {
            isDisposed = true;
            cancelAnimationFrame(loopId);
            renderer.setAnimationLoop(null);
            video.pause();
            texture.dispose();
            material.dispose();
            plane.geometry.dispose();
            try { mindarThree.stop(); } catch (e) {}
            mindArRef.current = null;
            videoRef.current = null;
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, overflow: 'hidden', background: '#000' }}>
            <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
            <div style={{ position: 'fixed', top: '20px', left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
                <div style={{
                    background: status === 'OBJETIVO DETECTADO' ? 'rgba(247,168,27,0.92)' : 'rgba(0,36,108,0.85)',
                    color: status === 'OBJETIVO DETECTADO' ? '#001540' : 'white',
                    padding: '10px 24px', borderRadius: '30px', fontFamily: 'sans-serif',
                    fontWeight: 'bold', letterSpacing: '1px', border: '1px solid #F7A81B',
                    boxShadow: '0 0 15px rgba(247,168,27,0.4)', transition: 'all 0.3s ease'
                }}>{status}</div>
            </div>
            <div style={{ position: 'fixed', bottom: '20px', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none', zIndex: 10 }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px', color: '#F7A81B' }}>ROTARY INTERNATIONAL</div>
                <div style={{ fontSize: '12px', marginTop: '4px', color: 'rgba(255,255,255,0.7)' }}>ESCANEA LA TARJETA ROTARY PARA CONECTAR</div>
            </div>
        </div>
    );
};
