export class Post {
    id: number | undefined;
    title: string = '';
    text: string = '';
    author: string = '';
    publishDate: Date = new Date();
    get isNew(): boolean {
        return this.id === undefined;
    }

    constructor(initializer?: any) {
        if(!initializer) return;
        if(initializer.id) this.id = initializer.id;
        if(initializer.title) this.title = initializer.title;
        if(initializer.text) this.text = initializer.text;
        if(initializer.author) this.author = initializer.author;
        if(initializer.publishDate) this.publishDate = initializer.publishDate;
    }
}

