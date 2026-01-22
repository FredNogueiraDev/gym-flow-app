import { Clock } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

const MealCard = ({ option, index }: { option: any, index: number }) => (
  <View className="bg-twilight-900 border border-white/5 rounded-2xl p-4 mb-3">
    <View className="flex-row justify-between mb-2">
      <Text className="text-white font-bold">Opção {index + 1}</Text>
      {option.macros && (
        <Text className="text-xs text-hunter-green-400 font-medium">
          P: {option.macros.protein}g • C: {option.macros.carbs}g • G: {option.macros.fat}g
        </Text>
      )}
    </View>
    <View className="gap-1">
      {option.itens.map((item: string, idx: number) => (
        <Text key={idx} className="text-twilight-300 text-sm">• {item}</Text>
      ))}
    </View>
  </View>
);

export const TimelineSection = ({ data }: { data: any[] }) => {
  return (
    <View className="relative">
      {data.map((ref, idx) => (
        <View key={idx} className="mb-5 relative">
          <View className="flex-row items-center gap-3 mb-2">
            <View className="flex-row items-center p-1 bg-frozen-water-950/40 rounded border border-frozen-water-900/50">
              <Clock size={11} color="#95d0ba" />
              <Text className="text-[10px] ml-1 font-bold text-frozen-water-300">
                {ref.horario}
              </Text>
            </View>
            <Text className="text-sm font-black text-white tracking-wide uppercase">
              {ref.titulo}
            </Text>
          </View>
          <View>
            {ref.opcoes.map((op: any, opIdx: number) => (
              <MealCard
                key={opIdx}
                option={op}
                index={opIdx}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};