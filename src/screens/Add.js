import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import EmojiPicker  from 'rn-emoji-keyboard'
import DB from '../config/database'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

export default function Add(){
    const navigation = useNavigation()

    // Configuración para el teclado emoji
    const [isOpen, setIsOpen] = useState(false)
    const [newItem, setNewItem] = useState({
        emoji: '❤️',
        name: '',
        price: 0,
        isSold: false,
        createdAt: new Date(),
    })

    const handlePick = (emojiObject) => {
        setNewItem ({
            ...newItem,
            emoji: emojiObject.emoji
        })
    }

    const onSend = async () => {
        await addDoc(collection(DB, 'products'), newItem)
        console.log(newItem)
        navigation.goBack()
    }

    return(
        <View style={styles.container}>
            <Text>Sell a new product</Text>
            <Text style={styles.emoji} onPress={() => setIsOpen(true)}>{newItem.emoji}</Text>
            <EmojiPicker 
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />
            
            <TextInput
                style={styles.inputContainer}
                placeholder='Product name'
                onChangeText={(text) => setNewItem({...newItem, name: text})}
            />

            <TextInput
                style={styles.inputContainer}
                placeholder='$ Price'
                onChangeText={(text) => setNewItem({...newItem, price: text})}
                keyboardType='number-pad'
            />

            <Button title='Publish!' onPress={onSend}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '700'
    },
    inputContainer: {
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6
    },
    emoji: {
        fontSize: 100,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 6,
        padding: 5,
        marginVertical: 6
    }
})