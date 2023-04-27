import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import SwipeModal from './SwipeModal';

const App = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalDirection, setModalDirection] = useState('');

    const handleModalOpen = (direction) => {
        setIsModalVisible(true);
        setModalDirection(direction);
    };
    console.log({isModalVisible})

    const handleModalClose = () => {
        setIsModalVisible(false);
        setModalDirection('');
    };;

    return (
        <View style={style.container}>
            <Text style={{ marginBottom: 20 }}>Welcome to my app!</Text>
            <Button title="Open Top Modal" onPress={() => handleModalOpen('top')} />
            <Button title="Open Bottom Modal" onPress={() => handleModalOpen('bottom')} />
            <Button title="Open Left Modal" onPress={() => handleModalOpen('left')} />
            <Button title="Open Right Modal" onPress={() => handleModalOpen('right')} />

            <SwipeModal isVisible={isModalVisible} onClose={handleModalClose} direction={modalDirection} closeOnBackdropPress>
                <View style={style.modal}>
                    <Text>This is my custom modal!</Text>
                    <Button title="Close Modal" onPress={handleModalClose} />
                </View>
            </SwipeModal>
        </View>
    );
};

const style = StyleSheet.create({
    container:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    modal:{ 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
})

export default App;