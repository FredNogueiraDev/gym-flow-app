import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Loader2 } from 'lucide-react-native'; // Ícone nativo
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { Input } from '../components/Input';
import { supabase } from '../lib/supabase';

const registerSchema = z.object({
  name: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z.email('Digite um email válido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  confirmPassword: z.string().min(1, 'Confirme sua senha.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem.',
  path: ['confirmPassword'],
});

export default function RegisterScreen() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<any>(null);

  async function handleRegister() {
    setLoading(true);
    setFieldErrors(null);

    const parsed = registerSchema.safeParse(formData);
    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors);
      setLoading(false);
      return;
    }

    const { email, password, name } = parsed.data;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (error) {
      Alert.alert('Erro', error.message); 
      setLoading(false);
      return;
    }

    if (data?.user && !data.user.identities?.length) {
      Alert.alert('Erro', 'Email já cadastrado.');
      setLoading(false);
      return;
    }

    Alert.alert('Sucesso', 'Conta criada!', [
      { text: 'OK', onPress: () => router.replace('/') } 
    ]);
    setLoading(false);
  }

  return (
    <View className="flex-1 bg-twilight-950">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        
        <View className="bg-frozen-water-50/5 border border-white/5 p-6 rounded-2xl w-full">
          
          <View className="items-center mb-6 gap-2">
            <Image source={require('../assets/images/logo_white.svg')} style={{ width: 48, height: 48 }} />
            
            <Text className="text-2xl font-black text-white tracking-tight">
              Criar conta
            </Text>
          </View>

          <Input
            id="name"
            placeholder="Digite seu nome..."
            value={formData.name}
            onChangeText={t => setFormData(prev => ({ ...prev, name: t }))}
            fieldErrors={fieldErrors}
          />
          <Input
            id="email"
            placeholder="Digite o seu email..."
            keyboardType="email-address"
            value={formData.email}
            onChangeText={t => setFormData(prev => ({ ...prev, email: t }))}
            fieldErrors={fieldErrors}
          />
          <Input
            id="password"
            placeholder="Crie uma senha..."
            secureTextEntry
            value={formData.password}
            onChangeText={t => setFormData(prev => ({ ...prev, password: t }))}
            fieldErrors={fieldErrors}
          />
          <Input
            id="confirmPassword"
            placeholder="Repita a senha..."
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={t => setFormData(prev => ({ ...prev, confirmPassword: t }))}
            fieldErrors={fieldErrors}
          />

          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            className={`w-full bg-hunter-green-600 h-14 rounded-xl flex-row items-center justify-center mt-2 ${
              loading ? 'opacity-70' : 'active:bg-hunter-green-500'
            }`}
          >
            {loading ? (
              <Loader2 size={24} color="#FFF" className="animate-spin" /> 
            ) : null}
            
            {!loading && <Text className="text-white font-bold text-lg">Criar conta</Text>}
            {loading && <ActivityIndicator color="#FFF" />}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text className="text-sm text-gray-400">Já tem conta? </Text>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text className="text-hunter-green-400 font-bold text-sm">
                Fazer login
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}