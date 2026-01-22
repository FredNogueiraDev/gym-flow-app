import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { Input } from '../components/Input';
import { supabase } from '../lib/supabase';

const loginSchema = z.object({
  email: z.email('Digite um email válido.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
});

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<any>(null);

  async function handleLogin() {
    setLoading(true);
    setFieldErrors(null);

    const parsed = loginSchema.safeParse({ email, password });
    
    if (!parsed.success) {
      const flattened = z.flattenError(parsed.error)
      setFieldErrors(flattened.fieldErrors);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Erro no Login', 'Email ou senha incorretos.');
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace('/(tabs)');
  }

  return (
    <View className="flex-1 bg-twilight-950">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        
        <View className="bg-frozen-water-50/5 border border-white/5 p-6 rounded-2xl w-full">
          
          <View className="items-center mb-8 gap-2">
            <Image source={require('../assets/images/logo_white.svg')} className="w-12 h-12" />

            <Text className="text-2xl font-black text-white tracking-tight text-center">
              Seja bem vindo!
            </Text>
          </View>

          <Input
            id="email"
            placeholder="Digite o seu email..."
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            fieldErrors={fieldErrors}
          />

          <Input
            id="password"
            placeholder="Digite a sua senha..."
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            fieldErrors={fieldErrors}
          />

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className={`w-full bg-hunter-green-600 h-14 rounded-xl flex-row items-center justify-center mt-4 shadow-lg shadow-hunter-green-500/20 ${
              loading ? 'opacity-70' : 'active:bg-hunter-green-500 active:scale-[0.98]'
            }`}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text className="text-white font-bold text-lg">Entrar</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text className="text-sm text-twilight-50">Ainda não tem conta? </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text className="text-hunter-green-400 font-bold text-sm">
                Criar agora
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}