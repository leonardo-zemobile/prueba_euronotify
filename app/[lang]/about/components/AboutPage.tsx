'use client'

import React, { useEffect } from 'react';
import { ShieldCheck, Users, Target, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-white">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6">
                        Democratizando la <span className="text-primary-600">seguridad jurídica</span> digital
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        En EuroNotify, creemos que cualquier persona o empresa debe poder proteger sus derechos de forma sencilla, rápida y económica.
                    </p>
                </div>
            </div>

            {/* Stats/Mission */}
            <div className="bg-slate-50 py-16 mb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Nuestra Misión</h3>
                            <p className="text-slate-600">Proveer herramientas de certificación digital accesibles y con plena validez legal para todos.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                                <Target className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Nuestra Visión</h3>
                            <p className="text-slate-600">Ser la referencia europea en servicios de confianza digital y notificaciones electrónicas.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                                <Award className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Nuestros Valores</h3>
                            <p className="text-slate-600">Transparencia, seguridad, innovación y excelencia en el servicio al cliente.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team (Simulated) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">Equipo Directivo</h2>
                    <p className="mt-4 text-slate-600">Expertos en derecho, criptografía y desarrollo de software.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[
                        { name: "Elena Mayorga", role: "CEO & Fundadora", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                        { name: "David Chen", role: "CTO", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                        { name: "Marta Ruiz", role: "Directora Legal", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
                    ].map((member, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-2xl">
                            <img src={member.img} alt={member.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-slate-900 to-transparent p-6 pt-20">
                                <h4 className="text-white text-xl font-bold">{member.name}</h4>
                                <p className="text-slate-300">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;