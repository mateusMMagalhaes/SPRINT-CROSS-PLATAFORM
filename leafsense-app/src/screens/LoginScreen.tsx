import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, borderRadius, spacing, shadows } from '../theme/colors';
import { RootStackParamList } from '../types';
import { credenciaisValidas, operadorMock } from '../data/mockData';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ matricula?: string; senha?: string }>({});

  const validate = (): boolean => {
    const newErrors: { matricula?: string; senha?: string } = {};
    if (!matricula.trim()) newErrors.matricula = 'Matrícula é obrigatória';
    if (!senha.trim()) newErrors.senha = 'Senha é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    setLoading(true);

    // Simulação de autenticação (mock)
    setTimeout(() => {
      if (
        matricula === credenciaisValidas.matricula &&
        senha === credenciaisValidas.senha
      ) {
        setLoading(false);
        navigation.replace('Trechos', { operador: operadorMock });
      } else {
        setLoading(false);
        Alert.alert(
          'Acesso Negado',
          'Matrícula ou senha incorretos.\n\nUse: OP001 / 1234',
          [{ text: 'Tentar novamente' }]
        );
      }
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoIconOuter}>
            <View style={styles.logoIconInner}>
              <Ionicons name="leaf" size={36} color={colors.background} />
            </View>
          </View>
          <Text style={styles.appName}>LeafSense</Text>
          <Text style={styles.subtitle}>Sistema Inteligente de{'\n'}Monitoramento de Vegetação</Text>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>CCR MOTIVA</Text>
            <View style={styles.dividerLine} />
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Iniciar Turno</Text>
          <Text style={styles.formSubtitle}>Identifique-se para começar a coleta</Text>

          {/* Matrícula */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIconBox}>
              <Ionicons name="person-outline" size={18} color={colors.primary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Matrícula do operador"
              placeholderTextColor={colors.textMuted}
              value={matricula}
              onChangeText={(text) => {
                setMatricula(text);
                if (errors.matricula) setErrors((e) => ({ ...e, matricula: undefined }));
              }}
              autoCapitalize="characters"
              autoCorrect={false}
            />
          </View>
          {errors.matricula && (
            <Text style={styles.errorText}>{errors.matricula}</Text>
          )}

          {/* Senha */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIconBox}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.primary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor={colors.textMuted}
              value={senha}
              onChangeText={(text) => {
                setSenha(text);
                if (errors.senha) setErrors((e) => ({ ...e, senha: undefined }));
              }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>
          {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, shadows.button, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <Text style={styles.loginButtonText}>Autenticando...</Text>
            ) : (
              <>
                <Ionicons name="log-in-outline" size={20} color={colors.background} />
                <Text style={styles.loginButtonText}>Iniciar Turno</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Hint */}
          <View style={styles.hintBox}>
            <Ionicons name="information-circle-outline" size={16} color={colors.textMuted} />
            <Text style={styles.hintText}>Demo: OP001 / 1234</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          SIMV v1.0 — Challenge CCR Motiva • CC/ES 2026
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: spacing.xl + spacing.md,
  },
  logoIconOuter: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: colors.primaryGlow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  logoIconInner: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 34,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    width: '60%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 2,
  },
  formSection: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  formSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  inputIconBox: {
    width: 44,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceHover,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: spacing.md,
    color: colors.textPrimary,
    fontSize: 15,
  },
  eyeButton: {
    paddingHorizontal: spacing.md,
    height: 48,
    justifyContent: 'center',
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: -spacing.xs,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    height: 52,
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background,
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.sm,
  },
  hintText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  footer: {
    textAlign: 'center',
    fontSize: 10,
    color: colors.textMuted,
    marginTop: spacing.xl,
    letterSpacing: 0.5,
  },
});
