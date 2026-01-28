import { Check, RotateCcw, Trophy } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ConfirmationModal } from './ConfirmationModal';

interface WorkoutFooterProps {
  progress: number;
  total: number;
  onFinish: () => void;
  onReset: () => void;
}

export const WorkoutFooter = ({ progress, total, onFinish, onReset }: WorkoutFooterProps) => {
  const [actionType, setActionType] = useState<'finish' | 'reset' | null>(null);

  if (progress === 0) return null;

  const percentage = Math.round((progress / total) * 100);
  const isComplete = percentage === 100;

  const modalConfig = {
    finish: {
      title: isComplete ? "Parabéns! Treino Concluído" : "Concluir Parcialmente?",
      description: isComplete
        ? "Marcar este treino como finalizado e salvar no histórico?"
        : `Você realizou ${progress} de ${total} exercícios. Deseja finalizar o treino assim mesmo?`,
      confirmText: "Sim, Finalizar",
      isDestructive: false 
    },
    reset: {
      title: "Descartar Treino?",
      description: "Isso apagará todo o progresso de hoje. Tem certeza?",
      confirmText: "Sim, Zerar",
      isDestructive: true
    }
  };

  const currentModal = actionType ? modalConfig[actionType] : null;

  return (
    <>
      <View className="absolute bottom-6 left-4 right-4 bg-twilight-950/95 border border-hunter-green-500/30 rounded-2xl p-4 flex-row items-center justify-between shadow-lg">
        <View className="flex-row items-center gap-3">
          <View className={`w-10 h-10 rounded-full border items-center justify-center
             ${isComplete ? 'bg-hunter-green-500 border-hunter-green-400' : 'bg-hunter-green-950 border-hunter-green-800'}
          `}>
             {isComplete ? <Trophy size={18} color="#0c1018" /> : <Text className="text-[10px] font-bold text-hunter-green-400">{percentage}%</Text>}
          </View>
          <View>
             <Text className="text-xs text-twilight-400 font-bold uppercase">Progresso</Text>
             <Text className="text-sm font-bold text-white">{progress} de {total} Concluídos</Text>
          </View>
        </View>

        <View className="flex-row gap-2">
            {!isComplete && (
              <TouchableOpacity 
                onPress={() => setActionType('reset')}
                className="bg-twilight-800 p-3 rounded-xl border border-twilight-700"
              >
                <RotateCcw size={18} color="#cbd5e1" />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
               onPress={() => setActionType('finish')}
               className={`flex-row items-center p-3 rounded-xl bg-hunter-green-600`}
            >
               <Check size={18} color="#fff" strokeWidth={3} />
               {isComplete && <Text className="text-white font-bold text-xs uppercase ml-2">Finalizar</Text>}
            </TouchableOpacity>
        </View>
      </View>

      <ConfirmationModal
        isOpen={!!actionType}
        onClose={() => setActionType(null)}
        onConfirm={() => {
          if (actionType === 'finish') onFinish();
          if (actionType === 'reset') onReset();
          setActionType(null);
        }}
        title={currentModal?.title}
        description={currentModal?.description}
        confirmText={currentModal?.confirmText}
        isDestructive={currentModal?.isDestructive}
      />
    </>
  );
}