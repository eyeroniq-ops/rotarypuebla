import React, { useState } from 'react';
import { ARBusinessCard } from './ARBusinessCard';

const TARGETS = [
    { file: '/target-t1.mind', label: 'DISEÑO 1' },
    { file: '/target-t2.mind', label: 'DISEÑO 2' },
];

const GraciasPage: React.FC = () => {
    const [targetIdx, setTargetIdx] = useState(0);

    const handleSwitch = () => {
        setTargetIdx(prev => (prev + 1) % TARGETS.length);
    };

    const current = TARGETS[targetIdx];

    return (
        <ARBusinessCard
            key={targetIdx}
            targetFile={current.file}
            targetLabel={current.label}
            onSwitch={handleSwitch}
        />
    );
};

export default GraciasPage;
