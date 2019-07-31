<template>
    <div>
      <el-upload
        action="http://localhost:8080/mall/cos/upload"
        ref="upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :multiple=multiple
        :auto-upload=autoUpload

      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <div>
        <el-button type="primary" @click="submitUpload" icon="el-icon-search">上传</el-button>
      </div>
    </div>

</template>

<script>
  import {
    uploadFile
  } from '@/api/upload'
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        autoUpload:false,
        multiple:true
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(this.dialogImageUrl)
      },
      beforeUpload(file){
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      uploadSuccess(response, file, fileList){
        //上传成功返回结果,多张图片会返回多次
        console.log(response)
        console.log(file)
        console.log(fileList)
      }
    }
  }
</script>

<style scoped>

</style>
