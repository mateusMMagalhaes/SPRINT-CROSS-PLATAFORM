import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, shadows } from '../theme/colors';
import { Trecho } from '../types';
import { RiskBadge } from './RiskBadge';
import { StatusIndicator } from './StatusIndicator';

interface TrechoCardProps {
  trecho: Trecho;
  onPress: () => void;
}

export const TrechoCard: React.FC<TrechoCardProps> = ({ trecho, onPress }) => {
  const progressPercent = (trecho.fotosColetadas / trecho.fotosTotal) * 100;

  return (
    <TouchableOpacity
      style={[styles.card, shadows.card]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.idContainer}>
          <Text style={styles.trechoId}>{trecho.id}</Text>
          <StatusIndicator status={trecho.status} />
        </View>
        <RiskBadge risco={trecho.risco} />
      </View>

      {/* Road Info */}
      <Text style={styles.roadName}>
        {trecho.rodovia} — KM {trecho.kmInicio.toFixed(1)}+000 a {trecho.kmFim.toFixed(1)}+000
      </Text>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <View style={styles.progressLabel}>
            <Ionicons name="camera-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.progressText}>
              {trecho.fotosColetadas}/{trecho.fotosTotal} fotos
            </Text>
          </View>
          <Text style={styles.progressPercent}>{Math.round(progressPercent)}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${progressPercent}%`,
                backgroundColor:
                  progressPercent === 100
                    ? colors.success
                    : progressPercent > 50
                    ? colors.warning
                    : colors.danger,
              },
            ]}
          />
        </View>
      </View>

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={13} color={colors.textMuted} />
          <Text style={styles.infoText}>
            {trecho.latitude.toFixed(4)}, {trecho.longitude.toFixed(4)}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={13} color={colors.textMuted} />
          <Text style={styles.infoText}>{trecho.ultimaManutencao}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  trechoId: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  roadName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    fontWeight: '500',
  },
  progressSection: {
    marginBottom: spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
  },
  progressLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: colors.surfaceLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  infoText: {
    fontSize: 11,
    color: colors.textMuted,
  },
});
