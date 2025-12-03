// HisView.tsx

import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useState, useEffect } from "react";
import { Note } from "../../domain/note.interface";

type Props = {
    note: Note | null;
    oneSaved: (note: Note) => void;
    onCancel: () => void;
}

export function HisView({ oneSaved, onCancel, note }: Props) {
    //estados ´para text input
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    //funcion para mandar a
    //observar los datos en la propiedad note
    useEffect(() => {
        //poner en los estados la info de la nota
        //si no hay nota poner ''
        setTitle(note?.title ?? '')
        setDescription(note?.description ?? '');
        //   if (note) { setTitle(note.title); }
    }, [note]);



    if (!note) return null;

    const onSave = () => {
        if (title.trim() === "" || description.trim() === "") {
            Alert.alert("Se encontraron campos vacíos");
            return;
        }

        oneSaved({
            id: note.id ?? null,
            title,
            description,
            date: note.id ? note.date : new Date(),
        });
    };

    return (
        <Modal visible={!!note} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <Text style={styles.title}>
                        {note.id ? 'Editar nota' : 'Nueva nota'}
                    </Text>

                    <TextInput
                        placeholder="Título"
                        value={title}
                        onChangeText={setTitle}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Descripción"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={5}
                        style={[styles.input, { minHeight: 100 }]}
                    />

                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={onSave}>
                            <Text style={styles.saveButton}>Guardar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onCancel}>
                            <Text style={styles.cancelButton}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    modalContent: {
        backgroundColor: '#f0f0f0',
        width: '85%',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        gap: 20,
    },
    title: {
        fontWeight: '700',
        fontSize: 20,
    },
    input: {
        width: "100%",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc"
    },
    buttons: {
        flexDirection: "row",
        gap: 20
    },
    saveButton: {
        fontSize: 18,
        color: "darkblue",
        fontWeight: "bold",
    },
    cancelButton: {
        fontSize: 18,
        color: "red",
        fontWeight: "bold",
    }
});