import { View, Text, Image, StyleSheet } from 'react-native';

type Props = {
    title: string;
    date: string;
    text: string;
};

export function NewsCard({ title, date, text }: Props) {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: 'https://via.placeholder.com/60' }}
                style={styles.image}
            />

            <View style={styles.textBlock}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>{date}</Text>
                <Text>{text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        gap: 10,
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        backgroundColor: '#ddd',
    },
    textBlock: {
        flex: 1,
    },
    title: {
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
});