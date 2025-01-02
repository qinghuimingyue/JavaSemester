<template>
  <div>
    <h2>个人信息管理</h2>

    <!-- 显示当前用户的信息 -->
    <table>
      <thead>
      <tr>
        <th>姓名</th>
        <th>性别</th>
        <th>账号</th>
        <th>出生日期</th>
        <th>入职日期</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{ userInfo.name }}</td>
        <td>{{ userInfo.gender }}</td>
        <td>{{ userInfo.account }}</td>
        <td>{{ userInfo.birthDate }}</td>
        <td>{{ userInfo.entryDate }}</td>
        <td>
          <button @click="editUserInfo('name')">编辑姓名</button>
          <button @click="editUserInfo('gender')">编辑性别</button>
          <button @click="editUserInfo('account')">编辑账号</button>
          <button @click="editUserInfo('birthDate')">编辑出生日期</button>
          <button @click="editUserInfo('entryDate')">编辑入职日期</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- 编辑表单 -->
    <div v-if="isEditing" class="form-container">
      <h3>编辑个人信息</h3>
      <form @submit.prevent="saveUserInfo">
        <div>
          <label :for="editField">{{ fieldLabel }}</label>
          <input
              v-if="editField !== 'gender'"
              type="text"
              v-model="userInfo[editField]"
              :placeholder="fieldLabel"
              required
          />
          <select v-else v-model="userInfo[editField]" required>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
        <div>
          <button type="submit">保存</button>
          <button type="button" @click="cancelEdit">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 当前登录用户的数据
      userInfo: {
        name: '张三',
        gender: '男',
        account: 'admin001',
        birthDate: '1985-01-01',
        entryDate: '2010-05-12'
      },
      isEditing: false, // 控制是否在编辑模式
      editField: '', // 当前正在编辑的字段
      fieldLabel: '', // 编辑字段的标签
    };
  },
  methods: {
    // 进入编辑模式
    editUserInfo(field) {
      this.editField = field;
      this.isEditing = true;
      this.fieldLabel = this.getFieldLabel(field);
    },

    // 获取编辑字段的标签
    getFieldLabel(field) {
      const labels = {
        name: '姓名',
        gender: '性别',
        account: '账号',
        birthDate: '出生日期',
        entryDate: '入职日期'
      };
      return labels[field];
    },

    // 保存修改后的用户信息
    async saveUserInfo() {
      const updatedData = {
        field: this.editField,
        newValue: this.userInfo[this.editField]
      };

      // 获取 jwt
      const jwt = localStorage.getItem('jwt');

      // 检查 jwt 是否存在
      if (!jwt) {
        alert('请先登录！');
        return;
      }

      // 发送请求更新数据
      try {
        const response = await this.updateUserInfo(updatedData, jwt);
        if (response.success) {
          alert(`${this.fieldLabel}已更新为: ${this.userInfo[this.editField]}`);
          this.isEditing = false;
        } else {
          alert('更新失败，请稍后再试！');
        }
      } catch (error) {
        console.error('请求失败:', error);
        alert('更新失败，请稍后再试！');
      }
    },


    // 取消编辑
    cancelEdit() {
      this.isEditing = false;
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

.form-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}

.form-container form div {
  margin-bottom: 15px;
}

form input, form select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

button[type="button"] {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button[type="button"]:hover {
  background-color: #e53935;
}
</style>
