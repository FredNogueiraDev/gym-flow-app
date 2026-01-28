import { SupplementsSection } from '@/components/diet/SupplementsSection';
import { TimelineSection } from '@/components/diet/TimelineSection';
import { getActiveDietPlan } from '@/services/diet';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';

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
    <View className="flex-1 bg-twilight-950 pt-12">
      <View className="px-6 mb-4">
        <Text className="text-white font-black text-2xl">Protocolo Alimentar</Text>
      </View>
      
      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 12 }}
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