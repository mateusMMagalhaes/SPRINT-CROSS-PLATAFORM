import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, borderRadius, spacing } from '../theme/colors';
import { RootStackParamList, Trecho } from '../types';
import { trechosMock } from '../data/mockData';
import { Header } from '../components/Header';
import { TrechoCard } from '../components/TrechoCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Trechos'>;
type FilterType = 'todos' | 'coletado' | 'pendente' | 'critico';

const filterOptions: { key: FilterType; label: string; icon: string }[] = [
  { key: 'todos', label: 'Todos', icon: 'grid-outline' },
  { key: 'coletado', label: 'Coletados', icon: 'checkmark-circle-outline' },
  { key: 'pendente', label: 'Pendentes', icon: 'time-outline' },
  { key: 'critico', label: 'Críticos', icon: 'warning-outline' },
];

export const TrechosScreen: React.FC<Props> = ({ navigation, route }) => {
  const { operador } = route.params;
  const [filter, setFilter] = useState<FilterType>('todos');
  const [refreshing, setRefreshing] = useState(false);

  const filteredTrechos = useMemo(() => {
    if (filter === 'todos') return trechosMock;
    return trechosMock.filter((t) => t.status === filter);
  }, [filter]);

  const stats = useMemo(() => ({
    total: trechosMock.length,
    coletados: trechosMock.filter((t) => t.status === 'coletado').length,
    pendentes: trechosMock.filter((t) => t.status === 'pendente').length,
    criticos: trechosMock.filter((t) => t.status === 'critico').length,
  }), []);

  const onRefresh = () => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1500); };

  const renderStatCard = (label: string, value: number, color: string, icon: string) => (
    <View style={[styles.statCard, { borderLeftColor: color }]} key={label}>
      <Ionicons name={icon as any} size={18} color={color} />
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header operador={operador} title="Monitoramento de Trechos" />
      <View style={styles.statsRow}>
        {renderStatCard('Total', stats.total, colors.textPrimary, 'map-outline')}
        {renderStatCard('Coletados', stats.coletados, colors.success, 'checkmark-circle-outline')}
        {renderStatCard('Pendentes', stats.pendentes, colors.warning, 'time-outline')}
        {renderStatCard('Críticos', stats.criticos, colors.danger, 'warning-outline')}
      </View>
      <View style={styles.filterRow}>
        {filterOptions.map((opt) => (
          <TouchableOpacity key={opt.key} style={[styles.filterTab, filter === opt.key && styles.filterTabActive]} onPress={() => setFilter(opt.key)} activeOpacity={0.7}>
            <Ionicons name={opt.icon as any} size={14} color={filter === opt.key ? colors.primary : colors.textMuted} />
            <Text style={[styles.filterTabText, filter === opt.key && styles.filterTabTextActive]}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredTrechos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (<TrechoCard trecho={item} onPress={() => navigation.navigate('TrechoDetail', { trecho: item, operador })} />)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>Nenhum trecho encontrado</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  statsRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.sm },
  statCard: { flex: 1, backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.sm + 2, alignItems: 'center', borderLeftWidth: 3, gap: 2 },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 9, color: colors.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  filterRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, marginBottom: spacing.md, gap: spacing.sm },
  filterTab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.sm, borderRadius: borderRadius.sm, backgroundColor: colors.surface, gap: spacing.xs, borderWidth: 1, borderColor: colors.border },
  filterTabActive: { backgroundColor: colors.primaryGlow, borderColor: colors.primary },
  filterTabText: { fontSize: 11, fontWeight: '600', color: colors.textMuted },
  filterTabTextActive: { color: colors.primary },
  listContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  emptyContainer: { alignItems: 'center', paddingVertical: spacing.xxl * 2, gap: spacing.md },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
});
