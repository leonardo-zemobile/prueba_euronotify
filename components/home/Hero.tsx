'use client'

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
    onStart?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary-700 text-sm font-semibold mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-pulse"></span>
                        Certificación Digital con Plena Validez Legal
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-8">
                        Envía <span className="text-primary-600">Emails y SMS</span> con Valor de Prueba Legal
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        EuroNotify garantiza la integridad, envío y recepción de tus notificaciones.
                        La alternativa digital, rápida y económica al Burofax tradicional.
                    </p>

                    <div className="flex justify-center">
                        <button
                            onClick={onStart}
                            className="px-10 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2 transform hover:scale-105 duration-200"
                        >
                            Empezar ahora <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-slate-500 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            Cumple reglamento eIDAS
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            Custodia notarial de 5 años
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            Acta de certificación PDF
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-0 right-0 h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl"></div>
                <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl"></div>
            </div>
        </section>
    );
};

export default Hero;