'use client'

import React from 'react';
import { Building2, Landmark, Gavel, BadgeCheck } from 'lucide-react';

const TrustSection: React.FC = () => {
  return (
    <section className="py-10 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
          Empresas y profesionales que confían en EuroNotify
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <Landmark className="h-8 w-8 text-slate-700" />
            <span className="text-xl font-bold text-slate-700">InmoGroup</span>
          </div>
          <div className="flex items-center gap-2">
            <Gavel className="h-8 w-8 text-slate-700" />
            <span className="text-xl font-bold text-slate-700">LegalLex</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-slate-700" />
            <span className="text-xl font-bold text-slate-700">FincasPro</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-8 w-8 text-slate-700" />
            <span className="text-xl font-bold text-slate-700">AseguraT</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;