<template>
  <div>
    <h2>归还书籍审批</h2>
    <table>
      <thead>
      <tr>
        <th>用户UID</th>
        <th>借阅书籍UID</th>
        <th>归还时间</th>
        <th>是否逾期</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(record, index) in returnRecords" :key="index">
        <td>{{ record.userUid }}</td>
        <td>{{ record.bookUid }}</td>
        <td>{{ record.returnDate }}</td>
        <td>{{ record.isOverdue ? '是' : '否' }}</td>
        <td>
          <button @click="approveReturn(index)">通过</button>
          <button @click="rejectReturn(index)">打回</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ReturnApproval',
  data() {
    return {
      returnRecords: [
        { userUid: 'U001', bookUid: 'B001', returnDate: '2025-01-15', isOverdue: false },
        { userUid: 'U002', bookUid: 'B002', returnDate: '2025-01-18', isOverdue: true },
      ]
    };
  },
  methods: {
    approveReturn(index) {
      alert(`归还书籍 ${this.returnRecords[index].bookUid} 已通过审批`);
    },
    rejectReturn(index) {
      alert(`归还书籍 ${this.returnRecords[index].bookUid} 被打回`);
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
