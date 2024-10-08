import { reactive } from 'vue';
<template>
  <div>
    <!-- 表头分页查询条件， shadow="never" 指定 card 卡片组件没有阴影 -->
    <el-card shadow="never" class="mb-5">
      <!-- flex 布局，内容垂直居中 -->
      <div class="flex items-center">
        <el-text>分类名称</el-text>
        <div class="ml-3 w-52 mr-5">
          <el-input
            v-model="searchCategoryName"
            placeholder="请输入（模糊查询）"
          />
        </div>

        <el-text>创建日期</el-text>
        <div class="ml-3 w-30 mr-5">
          <el-date-picker
            v-model="pickDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            size="default"
            @change="datepickerChange"
          />
        </div>

        <el-button
          type="primary"
          class="ml-3"
          :icon="Search"
          @click="getCategoryList"
          >查询</el-button
        >
        <el-button class="ml-3" :icon="RefreshRight" @click="reset"
          >重置</el-button
        >
      </div>
    </el-card>

    <el-card shadow="never">
      <!-- 新增按钮 -->
      <div class="mb-5">
        <el-button type="primary" @click="add">
          <el-icon class="mr-1">
            <Plus />
          </el-icon>
          新增</el-button
        >
      </div>

      <!-- 分页列表 -->
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
        v-loading="tableLoading"
      >
        <el-table-column prop="name" label="分类名称" width="180" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row)"
            >
              <el-icon class="mr-1">
                <Delete />
              </el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页 -->
    <div class="mt-10 flex justify-center">
      <el-pagination
        v-model:current-page="current"
        v-model:page-size="size"
        :page-sizes="[10, 20, 50]"
        :small="false"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getCategoryList"
      />
    </div>
  </div>
  <FormDialog
    ref="formDialogRef"
    title="添加文章分类"
    destroyOnClose
    @submit="onSubmit"
  >
    <el-form ref="formRef" :rules="rules" :model="form">
      <el-form-item
        label="分类名称"
        prop="name"
        label-width="80px"
        size="large"
      >
        <el-input
          v-model="form.name"
          placeholder="请输入分类名称"
          maxlength="20"
          show-word-limit
          clearable
        />
      </el-form-item>
    </el-form>
  </FormDialog>
</template>

<script setup>
// 引入所需图标
import { Search, RefreshRight, Delete } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import moment from "moment";
import {
  listCategory,
  addCategory,
  deleteCategory,
} from "@/api/admin/category";
import { showMessage } from "@/composables/util";
import FormDialog from "@/components/FormDialog.vue";

const formDialogRef = ref(null);

// 分页查询的分类名称
const searchCategoryName = ref("");
// 日期
const pickDate = ref("");

const current = ref(1);
const total = ref(0);
const size = ref(10);
const tableData = ref([]);
const startDate = reactive({});
const endDate = reactive({});

const dialogVisible = ref(false);

const formRef = ref(null);
const tableLoading = ref(false);
const form = reactive({
  name: "",
});
const rules = {
  name: [
    {
      required: true,
      message: "分类名称不能为空",
      trigger: "blur",
    },
    {
      min: 1,
      max: 20,
      message: "分类名称字数要求大于 1 个字符，小于 20 个字符",
      trigger: "blur",
    },
  ],
};

const add = () => {
  //   dialogVisible.value = true;
  formDialogRef.value.open();
};
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 显示提交按钮 loading
      formDialogRef.value.showBtnLoading();
      addCategory(form).then((res) => {
        if (true === res.success) {
          showMessage("添加成功");
          formDialogRef.value.close();
          getCategoryList();
        } else {
          // 获取服务端返回的错误消息
          let message = res.message;
          // 提示错误消息
          showMessage(message, "error");
        }
      }).finally(() => formDialogRef.value.closeBtnLoading());
    }
  });
};
// 每页展示数量变更事件
const handleSizeChange = (chooseSize) => {
  size.value = chooseSize;
  getCategoryList();
};

// 监听日期组件改变事件，并将开始结束时间设置到变量中
const datepickerChange = (e) => {
  startDate.value = moment(e[0]).format("YYYY-MM-DD");
  endDate.value = moment(e[1]).format("YYYY-MM-DD");

  console.log("开始时间：" + startDate.value + ", 结束时间：" + endDate.value);
};

const reset = () => {
  searchCategoryName.value = "";
  pickDate.value = "";
  startDate.value = null;
  endDate.value = null;
  getCategoryList();
};

const handleDelete = (row) => {
  showModel("是否确定要删除该分类？")
    .then(() => {
      deleteCategory(row.id).then((res) => {
        if (true === res.success) {
          showMessage("删除成功");
          getCategoryList();
        } else {
          // 获取服务端返回的错误消息
          let message = res.message;
          // 提示错误消息
          showMessage(message, "error");
        }
      });
    })
    .catch(() => {
      console.log("取消了");
    });
};
function getCategoryList() {
  tableLoading.value = true;
  let data = {
    current: current.value,
    endDate: endDate.value,
    name: searchCategoryName.value,
    size: size.value,
    startDate: startDate.value,
  };
  listCategory(data)
    .then((res) => {
      console.log(res);
      tableData.value = res.data;
      total.value = res.total;
    })
    .finally(() => (tableLoading.value = false));
}

getCategoryList();
</script>
