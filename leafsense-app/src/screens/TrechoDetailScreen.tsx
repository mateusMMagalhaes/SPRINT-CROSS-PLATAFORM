import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, borderRadius, spacing, shadows } from '../theme/colors';
import { RootStackParamList } from '../types';
import { Header } from '../components/Header';
import { RiskBadge } from '../components/RiskBadge';
import { StatusIndicator } from '../components/StatusIndicator';

type Props = NativeStackScreenProps<RootStackParamList, 'TrechoDetail'>;

export const TrechoDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { trecho, operador } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const progressPercent = (trecho.fotosColetadas / trecho.fotosTotal) * 100;

  const handleRegistrarOcorrencia = () => {
    setModalVisible(false);
    Alert.alert('Ocorrência Registrada', `Ocorrência registrada com sucesso para o trecho ${trecho.id}.`);
  };

  return (
    <View style={styles.container}>
      <Header operador={operador} title={`Trecho ${trecho.id}`} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Identity Card */}
        <View style={[styles.card, shadows.card]}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Identificação</Text>
            <StatusIndicator status={trecho.status} />
          </View>
          <Text style={styles.roadTitle}>{trecho.rodovia} — KM {trecho.kmInicio.toFixed(1)}+000 a {trecho.kmFim.toFixed(1)}+000</Text>
          <View style={styles.row}>
            <RiskBadge risco={trecho.risco} size="large" />
            {trecho.alturaVegetacao !== undefined && (
              <View style={styles.vegHeight}>
                <Ionicons name="resize-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.vegHeightText}>{trecho.alturaVegetacao} cm</Text>
                <Text style={styles.vegHeightLabel}>altura vegetação</Text>
              </View>
            )}
          </View>
        </View>

        {/* Photo Coverage */}
        <View style={[styles.card, shadows.card]}>
          <Text style={styles.sectionTitle}>Cobertura Fotográfica</Text>
          <View style={styles.progressRow}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressCircleValue}>{Math.round(progressPercent)}%</Text>
            </View>
            <View style={styles.progressDetails}>
              <Text style={styles.progressMainText}>{trecho.fotosColetadas} de {trecho.fotosTotal} fotos</Text>
              <Text style={styles.progressSubText}>
                {trecho.fotosColetadas === trecho.fotosTotal ? 'Cobertura completa ✓' : `Faltam ${trecho.fotosTotal - trecho.fotosColetadas} fotos`}
              </Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, {
                  width: `${progressPercent}%`,
                  backgroundColor: progressPercent === 100 ? colors.success : progressPercent > 50 ? colors.warning : colors.danger,
                }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Geolocation */}
        <View style={[styles.card, shadows.card]}>
          <Text style={styles.sectionTitle}>Geolocalização</Text>
          <View style={styles.geoGrid}>
            <View style={styles.geoItem}>
              <Ionicons name="navigate-outline" size={18} color={colors.primary} />
              <View>
                <Text style={styles.geoLabel}>Latitude</Text>
                <Text style={styles.geoValue}>{trecho.latitude.toFixed(6)}</Text>
              </View>
            </View>
            <View style={styles.geoItem}>
              <Ionicons name="navigate-outline" size={18} color={colors.primary} />
              <View>
                <Text style={styles.geoLabel}>Longitude</Text>
                <Text style={styles.geoValue}>{trecho.longitude.toFixed(6)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map-outline" size={32} color={colors.textMuted} />
            <Text style={styles.mapPlaceholderText}>Mapa indisponível no MVP</Text>
          </View>
        </View>

        {/* Maintenance History */}
        <View style={[styles.card, shadows.card]}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Histórico de Manutenções</Text>
            <Text style={styles.historyCount}>{trecho.historicoManutencoes.length} registros</Text>
          </View>
          {trecho.historicoManutencoes.map((m, i) => (
            <View key={i} style={[styles.historyItem, i < trecho.historicoManutencoes.length - 1 && styles.historyItemBorder]}>
              <View style={styles.historyDot}>
                <View style={[styles.historyDotInner, i === 0 && { backgroundColor: colors.primary }]} />
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyType}>{m.tipo}</Text>
                <View style={styles.historyMeta}>
                  <View style={styles.historyMetaItem}>
                    <Ionicons name="calendar-outline" size={12} color={colors.textMuted} />
                    <Text style={styles.historyMetaText}>{m.data}</Text>
                  </View>
                  <View style={styles.historyMetaItem}>
                    <Ionicons name="people-outline" size={12} color={colors.textMuted} />
                    <Text style={styles.historyMetaText}>{m.equipe}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity style={[styles.actionButton, shadows.button]} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
          <Ionicons name="add-circle-outline" size={22} color={colors.background} />
          <Text style={styles.actionButtonText}>Registrar Ocorrência</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, shadows.card]}>
            <Ionicons name="alert-circle-outline" size={48} color={colors.warning} />
            <Text style={styles.modalTitle}>Registrar Ocorrência</Text>
            <Text style={styles.modalText}>Confirma o registro de uma nova ocorrência para o trecho {trecho.id}?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={handleRegistrarOcorrencia}>
                <Text style={styles.modalConfirmText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: spacing.lg, paddingBottom: spacing.xxl * 2 },
  card: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  roadTitle: { fontSize: 14, color: colors.textSecondary, marginBottom: spacing.md, fontWeight: '500' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  vegHeight: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  vegHeightText: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },
  vegHeightLabel: { fontSize: 11, color: colors.textMuted },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.sm },
  progressCircle: { width: 64, height: 64, borderRadius: 32, borderWidth: 3, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  progressCircleValue: { fontSize: 16, fontWeight: '800', color: colors.primary },
  progressDetails: { flex: 1 },
  progressMainText: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
  progressSubText: { fontSize: 12, color: colors.textSecondary, marginBottom: spacing.sm },
  progressBarBg: { height: 6, backgroundColor: colors.surfaceLight, borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 3 },
  geoGrid: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  geoItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceLight, padding: spacing.sm, borderRadius: borderRadius.sm },
  geoLabel: { fontSize: 10, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  geoValue: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  mapPlaceholder: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xl, marginTop: spacing.md, backgroundColor: colors.surfaceLight, borderRadius: borderRadius.md, gap: spacing.xs, borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed' },
  mapPlaceholderText: { fontSize: 12, color: colors.textMuted },
  historyCount: { fontSize: 12, color: colors.textMuted },
  historyItem: { flexDirection: 'row', paddingVertical: spacing.sm, gap: spacing.md },
  historyItemBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  historyDot: { width: 20, alignItems: 'center', paddingTop: 4 },
  historyDotInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.textMuted },
  historyContent: { flex: 1 },
  historyType: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  historyMeta: { flexDirection: 'row', gap: spacing.md },
  historyMetaItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  historyMetaText: { fontSize: 11, color: colors.textMuted },
  actionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, borderRadius: borderRadius.md, height: 52, gap: spacing.sm, marginTop: spacing.sm },
  actionButtonText: { fontSize: 16, fontWeight: '700', color: colors.background },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: spacing.xl },
  modalContent: { backgroundColor: colors.surface, borderRadius: borderRadius.xl, padding: spacing.xl, alignItems: 'center', width: '100%', maxWidth: 340, borderWidth: 1, borderColor: colors.border },
  modalTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginTop: spacing.md },
  modalText: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginVertical: spacing.md, lineHeight: 20 },
  modalButtons: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm, width: '100%' },
  modalCancel: { flex: 1, paddingVertical: spacing.md, borderRadius: borderRadius.md, backgroundColor: colors.surfaceLight, alignItems: 'center' },
  modalCancelText: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  modalConfirm: { flex: 1, paddingVertical: spacing.md, borderRadius: borderRadius.md, backgroundColor: colors.primary, alignItems: 'center' },
  modalConfirmText: { fontSize: 14, fontWeight: '700', color: colors.background },
});
