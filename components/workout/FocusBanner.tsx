import { Dumbbell, Target } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

export const FocusBanner = ({ group }: { group: string }) => (
  <View className="relative overflow-hidden bg-twilight-900 border-l-4 border-hunter-green-500 rounded-2xl p-5 mb-6">
    {/* Ícone decorativo */}
    <View className="absolute -right-4 top-1/2 -translate-y-6 opacity-10 rotate-12">
        <Dumbbell size={100} color="#fff" />
    </View>

    <View className="z-10">
      <View className="flex-row items-center gap-2 mb-1">
        <Target size={12} color="#34d399" /> 
        <Text className="text-[10px] font-bold text-hunter-green-400 uppercase tracking-widest">
          Foco do dia
        </Text>
      </View>
      <Text className="text-xl font-black text-white uppercase tracking-tight">
        {group}
      </Text>
    </View>
  </View>
);