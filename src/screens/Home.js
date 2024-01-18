import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Text, Button, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import DB from '../config/database'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import Product from '../components/Product'

export default function Home(){
    const navigation = useNavigation()
    const [products, setProducts] = useState([])


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button title='Add' onPress={() => navigation.navigate('Add')} />
        })
    })

    useEffect(() => {
        const collectionRef = collection(DB, 'products')
        const q = query(collectionRef, orderBy('createdAt', 'desc'))

        //Desuscribirnos
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setProducts(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    emoji: doc.data().emoji,
                    name: doc.data().name,
                    price: doc.data().price,
                    isSold: doc.data().isSold,
                    createAt: doc.data().createAt
                }))
            )
        })

        return unsuscribe
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Products</Text>
            {products.map(product => <Product key={product.id} {...product}/>)}
            <Button title='Go to Add Screen!' onPress={() => navigation.navigate('Add')}></Button>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        bacgroundColor: '#F5F3F9'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 16,
    }
})