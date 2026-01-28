import React from 'react';
import { Text, View } from 'react-native';

export const ExerciseMetric = ({ label, value, icon: Icon, highlight = false }: any) => {
  return (
    <View className={`
      flex-1 flex-col items-center justify-center p-2 rounded-lg border
      ${highlight
        ? 'bg-hunter-green-950/30 border-hunter-green-500/20'
        : 'bg-twilight-950/50 border-twilight-800/50'
      }
    `}>
      <View className="flex-row items-center gap-1.5 mb-1">
        <Icon size={12} color={highlight ? "#4ade80" : "#94a3b8"} /> 
        <Text className={`text-[9px] uppercase font-bold tracking-wider ${highlight ? "text-hunter-green-400" : "text-twilight-500"}`}>
          {label}
        </Text>
      </View>
      <Text className={`text-sm font-bold leading-none ${highlight ? "text-hunter-green-100" : "text-white"}`}>
        {value}
      </Text>
    </View>
  );
};
