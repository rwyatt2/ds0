import React, { useState, useMemo } from 'react';
import { View, TextInput, FlatList, Text, Pressable, StyleSheet } from 'react-native';
interface Props { items: string[]; placeholder?: string; onSelect?: (item: string) => void; }
const Combobox = ({ items, placeholder, onSelect }: Props) => {
    const [query, setQuery] = useState('');
    const filtered = useMemo(() => items.filter(i => i.toLowerCase().includes(query.toLowerCase())), [items, query]);
    return (<View style={s.container}><TextInput style={s.input} value={query} onChangeText={setQuery} placeholder={placeholder} accessibilityRole="search" />{query.length > 0 && <FlatList data={filtered} keyExtractor={(i) => i} renderItem={({ item }) => <Pressable onPress={() => { onSelect?.(item); setQuery(item); }}><Text style={s.item}>{item}</Text></Pressable>} />}</View>);
};
const s = StyleSheet.create({ container: { position: 'relative' }, input: { height: 40, paddingHorizontal: 12, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 6, fontSize: 14 }, item: { padding: 8, fontSize: 14 } });
export { Combobox };
