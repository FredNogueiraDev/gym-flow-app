import { AlertCircle, Trophy, X } from 'lucide-react-native';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText = "Cancelar",
  isDestructive = false
}: ConfirmationModalProps) => {
  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-twilight-950/80 px-4">
        <View className="w-full max-w-sm bg-twilight-950 border border-twilight-800 rounded-2xl p-6 relative">
          
          <TouchableOpacity 
            onPress={onClose}
            className="absolute top-3 right-3 p-2 z-10"
          >
            <X size={20} color="#64748b" />
          </TouchableOpacity>

          <View className="items-center mb-4">
            {isDestructive ? (
               <AlertCircle size={48} color="#7f1d1d" /> 
            ) : (
               <Trophy size={48} color="#34d399" />
            )}
          </View>

          <Text className="text-lg font-bold text-white text-center mb-2">
            {title}
          </Text>
          <Text className="text-sm text-twilight-400 text-center mb-6">
            {description}
          </Text>

          <View className="flex-row gap-3 justify-center">
            <TouchableOpacity
              onPress={() => { onConfirm(); onClose(); }}
              className={`px-5 py-3 rounded-xl ${isDestructive ? 'bg-red-900' : 'bg-hunter-green-600'}`}
            >
              <Text className={`font-bold text-sm ${isDestructive ? 'text-white' : 'text-white'}`}>
                {confirmText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              className="px-5 py-3 rounded-xl bg-twilight-900 border border-twilight-800"
            >
              <Text className="text-twilight-300 font-bold text-sm">
                {cancelText}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};