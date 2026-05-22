import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing } from '../theme/colors';

interface StatusIndicatorProps {
  status: 'coletado' | 'pendente' | 'critico';
  showLabel?: boolean;
}

const statusConfig = {
  coletado: {
    label: 'Coletado',
    color: colors.success,
    bgColor: colors.successLight,
  },
  pendente: {
    label: 'Pendente',
    color: colors.warning,
    bgColor: colors.warningLight,
  },
  critico: {
    label: 'Crítico',
    color: colors.danger,
    bgColor: colors.dangerLight,
  },
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  showLabel = true,
}) => {
  const config = statusConfig[status];

  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: config.color }]}>
        <View style={[styles.dotInner, { backgroundColor: config.color }]} />
      </View>
      {showLabel && (
        <Text style={[styles.label, { color: config.color }]}>
          {config.label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    opacity: 0.6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
