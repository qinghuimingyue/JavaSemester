<template>
  <div>
    <h2>借阅书籍审批</h2>
    <table>
      <thead>
      <tr>
        <th>用户UID</th>
        <th>借阅书籍UID</th>
        <th>借阅时间</th>
        <th>预计归还时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(record, index) in borrowRecords" :key="index">
        <td>{{ record.userUid }}</td>
        <td>{{ record.bookUid }}</td>
        <td>{{ record.borrowDate }}</td>
        <td>{{ record.expectedReturnDate }}</td>
        <td>
          <button @click="approveBorrow(index)">通过</button>
          <button @click="rejectBorrow(index)">打回</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BorrowApproval',
  data() {
    return {
      borrowRecords: [
        { userUid: 'U001', bookUid: 'B001', borrowDate: '2025-01-01', expectedReturnDate: '2025-01-15' },
        { userUid: 'U002', bookUid: 'B002', borrowDate: '2025-01-03', expectedReturnDate: '2025-01-17' },
      ]
    };
  },
  methods: {
    approveBorrow(index) {
      alert(`借阅书籍 ${this.borrowRecords[index].bookUid} 已通过审批`);
    },
    rejectBorrow(index) {
      alert(`借阅书籍 ${this.borrowRecords[index].bookUid} 被打回`);
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
