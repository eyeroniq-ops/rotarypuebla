import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, AlertCircle } from 'lucide-react';

interface VoteCounts {
    'Casa de Jorge': number;
    'Solesta': number;
    'Otro': number;
    [key: string]: number;
}

const SuperBowlPoll: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [customOption, setCustomOption] = useState<string>('');
    const [hasVoted, setHasVoted] = useState(false);
    const [votes, setVotes] = useState<VoteCounts>({ 'Casa de Jorge': 0, 'Solesta': 0, 'Otro': 0 });
    const [totalVotes, setTotalVotes] = useState(0);
    const [customOptions, setCustomOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        checkIfVoted();
    }, []);

    const getIp = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (e) {
            console.error('Error fetching IP:', e);
            return null;
        }
    };

    const checkIfVoted = async () => {
        const ip = await getIp();
        if (!ip) return;

        const { data } = await supabase
            .from('votes')
            .select('id')
            .eq('ip_address', ip);

        if (data && data.length > 0) {
            setHasVoted(true);
            setShowResults(true);
            fetchResults();
        }
    };

    const fetchResults = async () => {
        const { data, error } = await supabase
            .from('votes')
            .select('option, custom_option');

        if (error) {
            console.error('Error fetching votes:', error);
            return;
        }

        const counts: VoteCounts = { 'Casa de Jorge': 0, 'Solesta': 0, 'Otro': 0 };
        const customs: string[] = [];
        let total = 0;

        data.forEach((vote: any) => {
            total++;
            if (vote.option === 'Otro') {
                counts['Otro'] = (counts['Otro'] || 0) + 1;
                if (vote.custom_option && vote.custom_option.trim() !== '') {
                    customs.push(vote.custom_option);
                }
            } else if (counts[vote.option] !== undefined) {
                counts[vote.option]++;
            } else {
                // Handle unexpected options if necessary
                counts[vote.option] = 1;
            }
        });

        setVotes(counts);
        setCustomOptions(customs);
        setTotalVotes(total);
    };

    const handleVote = async () => {
        if (!selectedOption) {
            setError('Por favor selecciona una opción.');
            return;
        }
        if (selectedOption === 'Otro' && !customOption.trim()) {
            setError('Por favor escribe tu opción.');
            return;
        }

        setLoading(true);
        setError(null);

        const ip = await getIp();
        if (!ip) {
            setError('No pudimos verificar tu conexión. Intenta de nuevo.');
            setLoading(false);
            return;
        }

        // Check again just in case
        const { data: existingVote } = await supabase
            .from('votes')
            .select('id')
            .eq('ip_address', ip)
            .single();

        if (existingVote) {
            setHasVoted(true);
            setShowResults(true);
            setLoading(false);
            fetchResults();
            return;
        }

        const { error: insertError } = await supabase
            .from('votes')
            .insert([
                {
                    option: selectedOption,
                    custom_option: selectedOption === 'Otro' ? customOption : null,
                    ip_address: ip
                }
            ]);

        if (insertError) {
            setError('Hubo un error al registrar tu voto. Intenta más tarde.');
            console.error(insertError);
        } else {
            setHasVoted(true);
            setShowResults(true);
            fetchResults();
        }
        setLoading(false);
    };

    const getPercentage = (count: number) => {
        if (totalVotes === 0) return 0;
        return Math.round((count / totalVotes) * 100);
    };

    return (
        <div className="card p-8 border-2 border-blue-600/20 shadow-xl bg-gradient-to-br from-white to-blue-50">
            <div className="flex items-center gap-3 mb-6">
                <Trophy className="text-yellow-500 w-8 h-8" />
                <h3 className="text-2xl font-bold text-slate-800">¿Dónde vemos el Super Bowl?</h3>
            </div>

            <p className="text-slate-600 mb-6">El domingo es el gran juego. ¡Vota por tu lugar favorito!</p>

            {!hasVoted && !showResults ? (
                <div className="space-y-4">
                    {['Casa de Jorge', 'Solesta', 'Otro'].map((option) => (
                        <div key={option}>
                            <label
                                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedOption === option
                                    ? 'border-blue-600 bg-blue-50'
                                    : 'border-slate-200 hover:border-blue-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="poll"
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value);
                                        setError(null);
                                    }}
                                    className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-3 font-medium text-slate-700">{option}</span>
                            </label>

                            {option === 'Otro' && selectedOption === 'Otro' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-2 ml-8"
                                >
                                    <input
                                        type="text"
                                        placeholder="Escribe tu opción..."
                                        value={customOption}
                                        onChange={(e) => setCustomOption(e.target.value)}
                                        className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </motion.div>
                            )}
                        </div>
                    ))}

                    {error && (
                        <div className="flex items-center text-red-500 text-sm gap-2 mt-2">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleVote}
                            disabled={loading}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex-1 shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Enviando...' : 'Votar'}
                        </button>
                        <button
                            onClick={() => { setShowResults(true); fetchResults(); }}
                            className="px-6 py-3 text-blue-600 font-bold hover:bg-blue-50 rounded-xl transition-colors"
                        >
                            Ver Resultados
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {hasVoted && (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200 mb-4">
                            <CheckCircle2 size={20} />
                            <span className="font-medium">¡Gracias por tu voto!</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        {Object.entries(votes).map(([option, count]) => (
                            <div key={option} className="space-y-1">
                                <div className="flex justify-between text-sm font-medium text-slate-700">
                                    <span>{option}</span>
                                    <span>{getPercentage(count)}% ({count})</span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${getPercentage(count)}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className={`h-full rounded-full ${option === 'Casa de Jorge' ? 'bg-blue-500' :
                                            option === 'Solesta' ? 'bg-green-500' : 'bg-purple-500'
                                            }`}
                                    />
                                </div>

                                {option === 'Otro' && customOptions.length > 0 && (
                                    <div className="mt-2 ml-2 pl-3 border-l-2 border-purple-200">
                                        <p className="text-xs font-semibold text-slate-500 mb-1">Opciones propuestas:</p>
                                        <ul className="text-xs text-slate-600 space-y-1">
                                            {customOptions.map((opt, idx) => (
                                                <li key={idx}>• {opt}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 text-center space-y-4">
                        <p className="text-slate-500 text-sm">Total de votos: {totalVotes}</p>

                        {!hasVoted && (
                            <button
                                onClick={() => setShowResults(false)}
                                className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-all text-sm"
                            >
                                ← Volver a la votación
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuperBowlPoll;
