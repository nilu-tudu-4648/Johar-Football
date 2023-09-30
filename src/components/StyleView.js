import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, STYLES } from '../constants/theme'

const StyleView = ({ children, style, height, scrollEnabled = false, containerStyle }) => {
    return (
        <View style={[{ flex: 1, backgroundColor: COLORS.darkblue }, containerStyle]}>
            <View style={[{ ...styles.container, height: height ? height : SIZES.height * .7 }, style]}>
                {
                    scrollEnabled ?
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {children}
                        </ScrollView> :
                        <>
                            {children}
                        </>
                }
            </View>
        </View>
    )
}

export default StyleView

const styles = StyleSheet.create({
    container: {
        ...STYLES,
        flex: 1,
        width: SIZES.width,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: 'hidden',
        backgroundColor: COLORS.white,
        padding: SIZES.h5,
    }
})