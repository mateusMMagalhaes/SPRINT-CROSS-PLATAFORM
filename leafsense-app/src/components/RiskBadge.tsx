import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing } from '../theme/colors';

interface RiskBadgeProps {
  risco: 'baixo' | 'medio' | 'alto';
  size?: 'small' | 'large';
}

const riskConfig = {
  baixo: {
    label: 'BAIXO',
    color: colors.success,
    bgColor: colors.successLight,
    icon: '●',
  },
  medio: {
    label: 'MÉDIO',
    color: colors.warning,
    bgColor: colors.warningLight,
    icon: '▲',
  },
  alto: {
    label: 'ALTO',
    color: colors.danger,
    bgColor: colors.dangerLight,
    icon: '◆',
  },
};

export const RiskBadge: React.FC<RiskBadgeProps> = ({ risco, size = 'small' }) => {
  const config = riskConfig[risco];
  const isLarge = size === 'large';

  return (
    <View style={[
      styles.container,
      { backgroundColor: config.bgColor },
      isLarge && styles.containerLarge,
    ]}>
      <Text style={[
        styles.icon,
        { color: config.color },
        isLarge && styles.iconLarge,
      ]}>
        {config.icon}
      </Text>
      <Text style={[
        styles.label,
        { color: config.color },
        isLarge && styles.labelLarge,
      ]}>
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  containerLarge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  icon: {
    fontSize: 8,
  },
  iconLarge: {
    fontSize: 12,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  labelLarge: {
    fontSize: 13,
    letterSpacing: 1.5,
  },
});
