import { SupplementsSection } from '@/components/diet/SupplementsSection';
import { TimelineSection } from '@/components/diet/TimelineSection';
import { getActiveDietPlan } from '@/services/diet';
import { MoreHorizontal } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function DietaScreen() {
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function loadData() {
    setLoading(true);
    const data = await getActiveDietPlan();
    setPlan(data);
    setLoading(false);
  }

  async function onRefresh() {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View className="flex-1 bg-twilight-950">
      <View className="bg-twilight-950/90 border-b border-white/5 pt-12 pb-4 px-6 flex-row items-center justify-between z-20">

        <Text className="text-xs font-bold tracking-widest uppercase text-frozen-water-500/80">
          Protocolo Alimentar
        </Text>
        
        <TouchableOpacity className="p-2 -mr-2">
          <MoreHorizontal size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: 24 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10b981" />
        }
      >
        {loading && !refreshing ? (
          <ActivityIndicator size="large" color="#10b981" className="mt-10" />
        ) : !plan ? (
          <Text className="text-white text-center mt-10">Nenhum plano ativo encontrado.</Text>
        ) : (
          <View>
            <TimelineSection data={plan.refeicoes} />
            <SupplementsSection data={plan.suplementos} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}