import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export const WorkoutSelector = ({ activeIndex, options, onSelect }: { activeIndex: number, options: any[], onSelect: (i: number) => void }) => (
  <View className="h-16 mb-4">
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={{ gap: 12, paddingHorizontal: 4 }}
    >
      {options.map((t, idx) => {
        const isActive = activeIndex === idx;
        return (
          <TouchableOpacity
            key={idx}
            onPress={() => onSelect(idx)}
            className={`
              px-5 py-3 rounded-2xl border items-center justify-center
              ${isActive
                ? 'bg-hunter-green-500 border-hunter-green-400'
                : 'bg-twilight-900/50 border-twilight-800'
              }
            `}
          >
            <Text 
              className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-twilight-950' : 'text-twilight-400'}`}
            >
              {t.identificador}
            </Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  </View>
);