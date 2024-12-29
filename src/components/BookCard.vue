<template>
    <div class="book-card">
        <img :src="book.cover" alt="Book Cover" />
        <div class="book-info">
            <h3>{{ book.name }}</h3>
            <p>{{ book.author }}</p>
            <p>{{ book.status }}</p>
            <button @click="borrowBook">借阅</button>
            <button @click="collectBook">收藏</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        book: Object
    },
    methods: {
        borrowBook() {
            this.$emit("borrow", this.book);
        },
        collectBook() {
            this.$emit("collect", this.book);
        }
    }
};
</script>

<style scoped>
.book-card {
    border: 1px solid #ddd;
    padding: 20px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
}

.book-card img {
    max-width: 100%;
    height: auto;
}

.book-card .book-info {
    text-align: center;
}

.book-card button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.book-card button:hover {
    background-color: #0056b3;
}
</style>
