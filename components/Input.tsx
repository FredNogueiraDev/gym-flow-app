import { AlertCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  id: string;
  fieldErrors?: Record<string, string[] | undefined> | null;
}

export function Input({ id, fieldErrors, style, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  // Verifica se existe erro para este campo
  const error = fieldErrors?.[id];
  const hasError = error && error.length > 0;

  // Lógica de estilos da borda (replicando seu CSS original)
  let borderColorClass = 'border-twilight-800'; // Padrão
  if (hasError) borderColorClass = 'border-red-500'; // Erro
  else if (isFocused) borderColorClass = 'border-hunter-green-500'; // Foco

  return (
    <View className="w-full mb-4 space-y-1.5">
      <View className="relative w-full">
        <TextInput
          className={`
            w-full bg-twilight-900 border text-white text-base rounded-xl py-4 px-3
            ${borderColorClass}
          `}
          placeholderTextColor="#435e89" // twilight-600 aproximado
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          {...props}
        />
      </View>

      {hasError && (
        <View className="flex-row items-center gap-1 pl-1 mt-1">
          <AlertCircle size={12} color="#f87171" /> 
          <Text className="text-red-400 text-xs">
            {error[0]}
          </Text>
        </View>
      )}
    </View>
  );
}