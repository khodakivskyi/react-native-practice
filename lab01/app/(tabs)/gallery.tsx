import {View, Text, StyleSheet, ScrollView} from "react-native";

export default function GalleryScreen() {
    const images = Array.from({length: 12}, (_, i) => i + 1);

    return (
        <ScrollView>
            <View style={styles.container}>
                {images.map((item) => (
                    <View key={item} style={styles.card}>
                        <Text style={styles.text}>Image {item}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 16,
    },
    card: {
        width: '48%',
        height: 120,
        backgroundColor: '#ccc',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        fontWeight: 'bold',
    }
});