import localforage from "localforage";
import type HighlightSource from "web-highlighter/dist/model/source";

export type BookNote = {
    id: string;
    link: string;
    highlight: {
        color?: string;
        source: HighlightSource;
    };
    note?: {
        text: string;
    };
};

type BookMark = {
    url: string;
    data: BookNote[];
};
class BookNoteManager {
    BookMark: LocalForage;
    constructor() {
        this.BookMark = localforage.createInstance({
            name: "book-mark",
        });
    }
    watchingBook?: BookMark;

    async addNote(Note: BookNote) {
        if (this.watchingBook!.data.some((i) => i.id === Note.id)) return;
        this.watchingBook!.data.push(Note);
        return this.saveBook();
    }
    async removeNote(id: string) {
        this.watchingBook!.data = this.watchingBook!.data.filter(
            (i) => i.id !== id
        );
        return this.saveBook();
    }
    getNote(id: string) {
        return this.watchingBook!.data.find((i) => i.id === id);
    }
    saveBook() {
        if (this.BookMark) {
            this.BookMark.setItem(this.watchingBook!.url, this.watchingBook);
        }
    }
    async openBook(url: string) {
        if (!this.watchingBook || this.watchingBook.url !== url) {
            // 打开新书
            this.watchingBook = await this.BookMark.getItem<BookMark>(url).then(
                (res) => res || { url, data: [] }
            );
        }
        return this.watchingBook;
    }
}
export const BookNotes = new BookNoteManager();
