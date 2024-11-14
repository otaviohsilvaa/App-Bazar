// components/header.js
import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export const Header = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (text) => {
        setSearchText(text);
        onSearch(text);
    };

    return (
        <View className="flex items-start justify-center w-full">
            {/* Barra de pesquisa */}
            <View className="w-full flex-row border border-slate-500 h-14 rounded-full items-center gap-2 px-4 bg-transparent">
                <Feather name="search" size={24} color="#045CF1" />
                <TextInput
                    placeholder="Pesquisar..."
                    className="w-72 flex-1 h-full bg-transparent"
                    value={searchText}
                    onChangeText={handleSearchChange}
                />
            </View>

            {/* Localização */}
            <View className="flex flex-row pt-4 gap-1 mb-5">
                <Feather name="map-pin" size={17} color="#3B3B3D" />
                <Text className="text-lg font-bold">Caxias - MA</Text>
            </View>
        </View>
    );
};
