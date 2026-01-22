import { Dumbbell, Play, Repeat, Timer, Weight, X } from 'lucide-react-native';
import React, { useRef } from 'react';
import { Modal, PanResponder, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: any;
}

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const MetricRow = ({ icon: Icon, label, value, highlight = false }: any) => (
  <View className={`
    flex-row items-center justify-between p-4 rounded-xl border mb-3
    ${highlight
      ? 'bg-hunter-green-950/20 border-hunter-green-500/20'
      : 'bg-twilight-950/40 border-twilight-800/50'
    }
  `}>
    <View className="flex-row items-center gap-3">
      <View className={`p-2 rounded-lg ${highlight ? 'bg-hunter-green-500/10' : 'bg-twilight-900'}`}>
        <Icon size={18} color={highlight ? '#34d399' : '#94a3b8'} />
      </View>
      <Text className="text-sm font-bold uppercase tracking-wider text-twilight-400">
        {label}
      </Text>
    </View>
    <Text className={`text-lg font-black ${highlight ? 'text-hunter-green-100' : 'text-white'}`}>
      {value || '-'}
    </Text>
  </View>
);

export const ExerciseModal = ({ isOpen, onClose, exercise }: ExerciseModalProps) => {
  // Mantendo a sua versão do PanResponder que funcionou
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Nada aqui, mantém simples
      },
      onPanResponderRelease: (_, gestureState) => {
        // Se arrastou para baixo mais de 50px
        if (gestureState.dy > 50) {
          onClose();
        }
      },
    })
  ).current;

  if (!exercise) return null;

  const videoId = getYoutubeId(exercise.video_url || exercise.videoUrl);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        
        {/* CORREÇÃO: Usar TouchableOpacity com activeOpacity={1} é mais robusto que TouchableWithoutFeedback para backdrops */}
        <TouchableOpacity 
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(12, 16, 24, 0.8)' }}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Bottom Sheet */}
        <View className="bg-twilight-900 w-full h-[85%] rounded-t-[32px] border-t border-twilight-700/50 overflow-hidden relative z-10">
            
            {/* Header com PanResponder (Área de arraste) */}
            <View 
              {...panResponder.panHandlers} 
              className="w-full h-12 items-center justify-center bg-twilight-900 border-b border-white/5"
            >
                {/* Puxador Visual */}
                <View className="w-12 h-1.5 bg-twilight-700 rounded-full" />
                
                {/* Botão Fechar no canto */}
                <TouchableOpacity
                  onPress={onClose}
                  className="absolute right-4 p-2 bg-twilight-950/50 rounded-full"
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                >
                  <X size={20} color="#cbd5e1" />
                </TouchableOpacity>
            </View>

            {/* Conteúdo com Scroll */}
            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
                
                <View className="mb-8">
                    <Text className="text-2xl font-black text-white uppercase tracking-tight mb-1 pr-8">
                        {exercise.name || exercise.nome}
                    </Text>
                    <Text className="text-xs text-hunter-green-400 font-bold uppercase tracking-wider">
                        Detalhes Técnicos
                    </Text>
                </View>

                <View className="mb-6">
                    <MetricRow icon={Dumbbell} label="Séries" value={exercise.series} />
                    <MetricRow icon={Repeat} label="Repetições" value={exercise.reps || exercise.repeticoes} />
                    <MetricRow icon={Weight} label="Carga" value={exercise.load || exercise.carga} highlight />
                    <MetricRow icon={Timer} label="Descanso" value={exercise.rest || exercise.descanso} />
                </View>

                {exercise.notes && (
                    <View className="mb-8 relative overflow-hidden rounded-2xl bg-twilight-950 border border-twilight-800 p-5">
                        <View className="absolute top-0 left-0 w-1 h-full bg-hunter-green-500" />
                        <Text className="text-xs font-bold text-hunter-green-400 uppercase tracking-wider mb-2">
                            Observações
                        </Text>
                        <Text className="text-sm text-twilight-200 leading-relaxed font-medium">
                            {exercise.notes}
                        </Text>
                    </View>
                )}

                <View>
                    <View className="flex-row items-center gap-2 mb-3 opacity-80">
                        <Play size={14} color="#34d399" fill="#34d399" />
                        <Text className="text-xs font-bold text-twilight-400 uppercase tracking-wider">
                            Execução
                        </Text>
                    </View>

                    {videoId ? (
                        <View className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-twilight-800">
                             <WebView
                                style={{ flex: 1 }}
                                javaScriptEnabled={true}
                                source={{ uri: `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0&showinfo=0&controls=1` }}
                             />
                        </View>
                    ) : (
                        <View className="w-full aspect-video bg-twilight-950/50 rounded-xl border border-twilight-800 border-dashed items-center justify-center gap-3">
                             <View className="p-4 rounded-full bg-twilight-900">
                                <Play size={32} color="#334155" />
                             </View>
                             <Text className="text-xs font-medium text-twilight-600">Vídeo indisponível</Text>
                        </View>
                    )}
                </View>

            </ScrollView>
        </View>
      </View>
    </Modal>
  );
};