import { View, Text, StyleSheet, Button } from "react-native"
import { Note } from "../../domain/note.interface";

type Props = {
    note: Note,
    onEdit: (note: Note) => void,
    onDelete: (id: string) => void
}

export function NoteItem({ note, onEdit, onDelete }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.description}>{note.description}</Text>
            <Text style={styles.date}>
                {note.date.toLocaleString()}
            </Text>

            <Button
                title="Editar"
                onPress={() => onEdit(note)}
            />

            <View style={{ height: 6 }} />

            <Button
                title="Eliminar"
                color="red"
                onPress={() => onDelete(note.id)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 14,
        marginVertical: 8,
        backgroundColor: "#eee",
        borderRadius: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        marginTop: 4,
    },
    date: {
        marginTop: 6,
        fontSize: 12,
        color: "#555"
    }
});