import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import DB from '../config/database'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { AntDesign } from '@expo/vector-icons'

export default function Product({
    id,
    emoji,
    name,
    price,
    isSold
}){

    const onEdit = () => {
        const docRef = doc(DB, 'products', id)
        updateDoc(docRef, {
            isSold: true
        })
    }

    const onDelete = () => {
        const docRef = doc(DB, 'products', id)
        deleteDoc(docRef)
    }

    return(
        <>
        <View style={styles.productContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.emoji}>{emoji}</Text>
                <AntDesign onPress={() => {onDelete()}} name='delete' size={24}/>
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>$ {price}</Text>
            {isSold ? (
                <TouchableOpacity style={[styles.button, { backgroundColor: 'gray' }]}>
                    <Text style={styles.buttonText}>Purchase!</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity 
                    style={styles.button}
                    onPress={onEdit()}
                >
                    <Text style={styles.buttonText}>Purchase!</Text>
                </TouchableOpacity>
            )}

        </View>
        </>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8
    },
    emoji: {
        fontSize: 100
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gray'
    },
    button: {
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    }
})

