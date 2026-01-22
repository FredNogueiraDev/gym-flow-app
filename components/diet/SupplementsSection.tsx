import { Info } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

export const SupplementsSection = ({ data }: { data: any[] }) => {
  return (
    <View 
      className="bg-frozen-water-950/20 border border-frozen-water-900/30 rounded-3xl p-6 overflow-hidden relative"
    >
      <View className="flex-row items-center gap-2 mb-5">
        <Info size={18} color="#71c1a4" />
        <Text className="text-xs font-black uppercase tracking-widest text-frozen-water-400">
          Protocolo de Suporte
        </Text>
      </View>

      <View className="gap-3">
        {data.map((s, i) => {
           const isSpecial = s.nome.includes('Masteron') || s.nome.includes('Testo');
           
           return (
            <View 
              key={i} 
              className={`flex-row justify-between items-center pb-2 ${
                i !== data.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <Text className="text-xs text-twilight-400 font-medium">
                {s.nome}
              </Text>
              <Text className={`text-xs font-bold ${isSpecial ? 'text-frozen-water-300' : 'text-white'}`}>
                {s.dose}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};