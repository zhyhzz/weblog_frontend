<!--
 * @Author       : zuohy
 * @Date         : 2024-08-05 16:38:16
 * @LastEditTime : 2024-08-23 09:43:07
 * @LastEditors  : zuohy
 * @Description  : 文章管理页
-->
<template>
  <div>
    <el-card shadow="never" class="mb-5">
      <div class="flex items-center">
        <el-text>文章标题</el-text>
        <div class="ml-3 w-52 mr-5">
          <el-input
            v-model="searchArticleTitle"
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
            :shortcuts="shortcuts"
            @change="datepickerChange"
          />
        </div>

        <el-button
          type="primary"
          class="ml-3"
          :icon="Search"
          @click="getTableData"
          >查询</el-button
        >
        <el-button class="ml-3" :icon="RefreshRight" @click="reset"
          >重置</el-button
        >
      </div>
    </el-card>

    <el-card shadow="never">
      <div class="mb-5">
        <el-button type="primary" @click="dialogTableVisible = true">
          <el-icon class="mr-1">
            <EditPen />
          </el-icon>
          写文章</el-button
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
        <el-table-column prop="title" label="标题" width="280" />
        <el-table-column prop="cover" label="封面" width="180">
          <template #default="scope">
            <el-image style="width: 100px; height:auto" :src="scope.row.cover" />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="发布时间" width="180" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="showArticleUpdateEditor(scope.row)">
              <el-icon class="mr-1">
                <Edit />
              </el-icon>
              编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="deleteArticle(scope.row)"
            >
              <el-icon class="mr-1">
                <Delete />
              </el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

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
          @current-change="getTableData"
        />
      </div>
    </el-card>

    <!-- 文章内容 -->
    <el-dialog
      v-model="dialogTableVisible"
      :show-close="false"
      :fullscreen="true"
    >
      <template #header="{ close, titleId, titleClass }">
        <el-affix :offset="10" style="width: 100%">
          <div class="flex h-10 bg-white">
            <h4 class="font-bold">写文章</h4>
            <div class="ml-auto flex">
              <el-button @click="dialogTableVisible = false">取消</el-button>
              <el-button type="primary" @click="publishArticleSubmit">
                <el-icon class="mr-1">
                  <Promotion />
                </el-icon>
                发布
              </el-button>
            </div>
          </div>
        </el-affix>
      </template>
      <el-form
        :model="form"
        label-position="top"
        size="large"
        :rules="rules"
        ref="publishArticleFormRef"
      >
        <el-form-item label="标题" prop="content">
          <el-input
            v-model="form.title"
            autocomplete="off"
            size="large"
            maxlength="40"
            show-word-limit
            clearable
          />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- Markdown 编辑器 -->

          <MdEditor
            v-model="form.content"
            editorId="publishArticleEditor"
            @onUploadImg="onUploadImg"
          />
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="#"
            :on-change="handleCoverChange"
            :auto-upload="false"
            :show-file-list="false"
          >
            <img v-if="form.cover" :src="form.cover" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <!-- :rows="3" 指定 textarea 默认显示 3 行 -->
          <el-input
            v-model="form.summary"
            :rows="3"
            type="textarea"
            placeholder="请输入文章摘要"
          />
        </el-form-item>
        <el-form-item label="分类" prop="categoryId">
          <el-select
            v-model="form.categoryId"
            clearable
            placeholder="---请选择---"
            size="large"
          >
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <!-- 标签选择 -->
          <el-select
            v-model="form.tags"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="---请输入---"
            remote-show-suffix
            :remote-method="remoteMethod"
            default-first-option
            :loading="tagSelectLoading"
            allow-create
            size="large"
          >
            <el-option
              v-for="item in tags"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑博客 -->
    <el-dialog
      v-model="isArticleUpdateEditorShow"
      :fullscreen="true"
      :show-close="false"
      :close-on-press-escape="false"
    >
      <template #header="{ close, titleId, titleClass }">
        <!-- 固钉组件，固钉到顶部 -->
        <el-affix :offset="20" style="width: 100%">
          <!-- 指定 flex 布局， 高度为 10， 背景色为白色 -->
          <div class="flex h-10 bg-white">
            <!-- 字体加粗 -->
            <h4 class="font-bold">编辑文章</h4>
            <!-- 靠右对齐 -->
            <div class="ml-auto flex">
              <el-button @click="isArticleUpdateEditorShow = false"
                >取消</el-button
              >
              <el-button type="primary" @click="updateSubmit">
                <el-icon class="mr-1">
                  <Promotion />
                </el-icon>
                保存
              </el-button>
            </div>
          </div>
        </el-affix>
      </template>
      <!-- label-position="top" 用于指定 label 元素在上面 -->
      <el-form
        :model="updateArticleForm"
        ref="updateArticleFormRef"
        label-position="top"
        size="large"
        :rules="rules"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="updateArticleForm.title"
            autocomplete="off"
            size="large"
            maxlength="40"
            show-word-limit
            clearable
          />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- Markdown 编辑器 -->
          <MdEditor
            v-model="updateArticleForm.content"
            @onUploadImg="onUploadImg"
            editorId="updateArticleEditor"
          />
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <el-upload
            class="avatar-uploader"
            action="#"
            :on-change="handleUpdateCoverChange"
            :auto-upload="false"
            :show-file-list="false"
          >
            <img
              v-if="updateArticleForm.cover"
              :src="updateArticleForm.cover"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <!-- :rows="3" 指定 textarea 默认显示 3 行 -->
          <el-input
            v-model="updateArticleForm.summary"
            :rows="3"
            type="textarea"
            placeholder="请输入文章摘要"
          />
        </el-form-item>
        <el-form-item label="分类" prop="categoryId">
          <el-select
            v-model="updateArticleForm.categoryId"
            clearable
            placeholder="---请选择---"
            size="large"
          >
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <span class="w-60">
            <!-- 标签选择 -->
            <el-select
              v-model="updateArticleForm.tags"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入文章标签"
              remote-show-suffix
              allow-create
              default-first-option
              :remote-method="remoteMethod"
              :loading="tagSelectLoading"
              size="large"
            >
              <el-option
                v-for="item in tags"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
// import { Search, RefreshRight, EditPen } from '@element-plus/icons-vue'
import moment from "moment";
import {
  getArticlePageList,
  delArticle,
  publishArticle,
  getArticleDetail,
  updateArticle,
} from "@/api/admin/article";
import { uploadFile } from "@/api/admin/file";
import { getCategorySelectList } from "@/api/admin/category";
import { searchTag, getTagSelectList } from "@/api/admin/tag";
import { showMessage } from "@/composables/util";
import { ElMessage, ElMessageBox } from "element-plus";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const searchArticleTitle = ref("");
const pickData = ref("");

const startDate = reactive({});
const endDate = reactive({});

const datepickerChange = (e) => {
  startDate.value = moment(e[0]).format("YYYY-MM-DD");
  endDate.value = moment(e[1]).format("YYYY-MM-DD");
};
const shortcuts = [
  {
    text: "最近一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "最近一个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "最近三个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

//重置
const reset = () => {
  searchArticleTitle.value = "";
  pickData.value = "";
  startDate.value = null;
  endDate.value = null;
};

//表格加载
const tableLoading = ref(false);

//表格数据
const tableData = ref([]);
const current = ref(1);
const total = ref(0);
const size = ref(10);

// 获取分页数据
function getTableData() {
  tableLoading.value = true;
  const params = {
    current: current.value,
    size: size.value,
    startDate: startDate.value,
    endDate: endDate.value,
    title: searchArticleTitle.value,
  };

  getArticlePageList(params)
    .then((res) => {
      if (res.success == true) {
        tableData.value = res.data;
        current.value = res.current;
        size.value = res.size;
        total.value = res.total;
      }
    })
    .finally(() => (tableLoading.value = false));
}
getTableData();

const handleSizeChange = (chooseSize) => {
  size.value = chooseSize;
  getTableData();
};

//删除文章
const deleteArticle = (row) => {
  ElMessageBox.confirm(`是否删除标题为${row.title}的文章`, "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      delArticle(row.id).then((res) => {
        if (true === res.success) {
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        }
        getTableData();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};

const dialogTableVisible = ref(false);

//发布文章相关
//获取文章分类
const categories = ref([]);
getCategorySelectList().then((res) => {
  categories.value = res.data;
});

// 标签 select Loading 状态，默认不显示
const tagSelectLoading = ref(false);
// 文章标签
const tags = ref([]);
// 根据用户输入的标签名称，远程模糊查询
const remoteMethod = (query) => {
  console.log("远程搜索：" + tags.value);
  // 如果用户的查询关键词不为空
  if (query) {
    // 显示 loading
    tagSelectLoading.value = true;
    // 调用标签模糊查询接口
    searchTag(query)
      .then((res) => {
        if (res.success) {
          // 设置到 tags 变量中
          tags.value = res.data.map((item) => ({
            ...item,
            label: item.name,
            value: item.id,
          }));
        }
      })
      .finally(() => (tagSelectLoading.value = false)); // 隐藏 loading
  }
};
//上传文章封面图片
const handleCoverChange = (file) => {
  // 表单对象
  let formData = new FormData();
  // 添加 file 字段，并将文件传入
  formData.append("file", file.raw);
  uploadFile(formData).then((e) => {
    // 响参失败，提示错误消息
    if (e.success == false) {
      let message = e.message;
      showMessage(message, "error");
      return;
    }

    // 成功则设置表单对象中的封面链接，并提示上传成功
    form.cover = e.data;
    showMessage("上传成功");
  });
};
// 编辑器图片上传
const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        console.log("==> 编辑器开始上传文件...");
        let formData = new FormData();
        formData.append("file", file);
        uploadFile(formData).then((res) => {
          console.log(res);
          console.log("访问路径：" + res.data);
          // 调用 callback 函数，回显上传图片
          callback([res.data]);
        });
      });
    })
  );
};
const publishArticleFormRef = ref(null);
// 表单对象
const form = reactive({
  id: null,
  title: "",
  content: "请输入内容",
  cover: "",
  categoryId: null,
  tags: [],
  summary: "",
});
// 表单校验规则
const rules = {
  title: [
    { required: true, message: "请输入文章标题", trigger: "blur" },
    {
      min: 1,
      max: 40,
      message: "文章标题要求大于1个字符，小于40个字符",
      trigger: "blur",
    },
  ],
  content: [{ required: true }],
  cover: [{ required: true }],
  categoryId: [{ required: true, message: "请选择文章分类", trigger: "blur" }],
  tags: [{ required: true, message: "请选择文章标签", trigger: "blur" }],
};
// 发布文章
const publishArticleSubmit = () => {
  console.log("提交 md 内容：" + form.content);
  // 校验表单
  publishArticleFormRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }

    publishArticle(form).then((res) => {
      if (res.success == false) {
        // 获取服务端返回的错误消息
        let message = res.message;
        // 提示错误消息
        showMessage(message, "error");
        return;
      }

      showMessage("发布成功");
      // 隐藏发布文章对话框
      dialogTableVisible.value = false;
      // 将 form 表单字段置空
      form.title = "";
      form.content = "";
      form.cover = "";
      form.summary = "";
      form.categoryId = null;
      form.tags = [];
      // 重新请求分页接口，渲染列表数据
      getTableData();
    });
  });
};

// 是否显示编辑文章对话框
const isArticleUpdateEditorShow = ref(false);
// 编辑文章表单引用
const updateArticleFormRef = ref(null);

// 修改文章表单对象
const updateArticleForm = reactive({
  id: null,
  title: "",
  content: "请输入内容",
  cover: "",
  categoryId: null,
  tags: [],
  summary: "",
});

// 编辑文章：上传文章封面图片
const handleUpdateCoverChange = (file) => {
  // 表单对象
  let formData = new FormData();
  // 添加 file 字段，并将文件传入
  formData.append("file", file.raw);
  uploadFile(formData).then((e) => {
    // 响参失败，提示错误消息
    if (e.success == false) {
      let message = e.message;
      showMessage(message, "error");
      return;
    }

    // 成功则设置表单对象中的封面链接，并提示上传成功
    updateArticleForm.cover = e.data;
    showMessage("上传成功");
  });
};

const showArticleUpdateEditor = (row) => {
  isArticleUpdateEditorShow.value = true;
  getArticleDetail(row.id).then((res) => {
    Object.assign(updateArticleForm, res.data);
    updateArticleForm.tags = res.data.tagIds;
  });
};

// 渲染标签数据
getTagSelectList().then((res) => {
  tags.value = res.data;
});

// 保存文章
const updateSubmit = () => {
  updateArticleFormRef.value.validate((valid) => {
    // 校验表单
    if (!valid) {
      return false;
    }

    // 请求更新文章接口
    updateArticle(updateArticleForm).then((res) => {
      if (res.success == false) {
        // 获取服务端返回的错误消息
        let message = res.message;
        // 提示错误消息
        showMessage(message, "error");
        return;
      }

      showMessage("保存成功");
      // 隐藏编辑框
      isArticleUpdateEditorShow.value = false;
      // 重新请求分页接口，渲染列表数据
      getTableData();
    });
  });
};
</script>
<style scoped>
/* 封面图片样式 */
.avatar-uploader .avatar {
  width: 200px;
  height: 100px;
  display: block;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 100px;
  text-align: center;
}
:deep(.md-editor-footer) {
  height: 40px;
}
.el-select--large {
  width: 400px;
}
</style>
