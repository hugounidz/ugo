import { supabase } from "@/lib/supabase";
import { Note } from "../domain/note.interface";
//comentario

export async function getNotes(): Promise<Note[]> {
    const { data } = await supabase
        .from('notes4a')
        .select('*')

    return (data ?? []).map(item => ({
        ...item,
        date: new Date(item.date)
    }));
}

export async function saveNote(note: Note): Promise<Note | null> {
    if (!note.id) {
        const { data } = await supabase
            .from('notes4a')
            .insert([{
                title: note.title,
                description: note.description,
                date: new Date().toISOString()
            }])
            .select();

        return data
            ? { ...data[0], date: new Date(data[0].date) }
            : null;
    }

    const { data } = await supabase
        .from('notes4a')
        .update({
            title: note.title,
            description: note.description,
            date: new Date().toISOString()
        })
        .eq('id', note.id)
        .select();

    return data
        ? { ...data[0], date: new Date(data[0].date) }
        : null;
}
export async function deleteNote(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('notes4a')
        .delete()
        .eq('id', id);

    return !error;
}