<template>
    <el-dialog @closed="closed" class="uploadImage" title="编辑头像" width="656px" :visible.sync="visible" :close-on-click-modal="false">
        <div class="preview-content">
            <div>
                <i class="icon-user_02"></i>
                <p>
                    <i class="icon-success_03"></i>
                    <span>正确示范</span>
                </p>
            </div>
            <ul>
                <li>
                    <i class="icon-user_error_01"></i><br>非人物照</li>
                <li>
                    <i class="icon-user_error_02"></i><br>五官遮挡</li>
                <li>
                    <i class="icon-user_error_03"></i><br>迷糊不清</li>
                <li>
                    <i class="icon-user_error_04"></i><br>衣着不当</li>
            </ul>
            <p>
                <i class="icon-error_01"></i>
                <span>错误示范</span>
            </p>
        </div>
        <div class="cropper">
            <vueCropper v-if="isShowCropper" ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixed="option.fixed" :info="true" :full="true">
            </vueCropper>
            <div v-else class="upload-btn">
                <el-upload :show-file-list="false" action="" :auto-upload="false" accept="image/*" :on-change="uploadImg">
                    <el-button slot="trigger" class="btn-shadow" size="medium" type="primary" round>选择照片</el-button>
                </el-upload>
                <p class="text">支持jpg、jpeg、gif、png格式，不超过1M<br>请勿上传艺术照</p>
            </div>
        </div>
        <div class="button_box">
            <button @click="submit" class="custom_btn" type="button">确定上传</button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { uploadPhoto } from '../api/resume'
import VueCropper from 'vue-cropper'
@Component({
  components: {
    VueCropper
  }
})
export default class UploadImage extends Vue {
  @Prop({
    type: Boolean
  })
  // @ts-ignore
  public visible: boolean
  public isShowCropper: boolean = false
  public previews = {}
  public option = {
    img: null,
    size: 1,
    info: true,
    autoCrop: true,
    outputType: 'png',
    autoCropWidth: 100,
    autoCropHeight: 100,
    fixed: true
  }
  // 确定
  public submit() {
    if (this.$refs.cropper) {
      // @ts-ignore
      this.$refs.cropper.getCropData(data => {
        const canvas = document.createElement('canvas')
        const ctx: any = canvas.getContext('2d')
        canvas.width = this.option.autoCropWidth
        canvas.height = this.option.autoCropHeight
        ctx.fillStyle = '#fff'
        ctx.fillRect(
          0,
          0,
          this.option.autoCropWidth,
          this.option.autoCropHeight
        )
        ctx.save()
        const img = new Image()
        img.onload = async () => {
          ctx.drawImage(
            img,
            0,
            0,
            this.option.autoCropWidth,
            this.option.autoCropHeight
          )
          ctx.restore()
          const dataURL = canvas.toDataURL('image/jpeg')
          const file = this.dataURLtoFile(
            dataURL,
            new Date().getTime() + '.jpg'
          )

          let param = new FormData()
          param.append('resumeId', this.$store.state.resumeId)
          param.append('photoFile', file, new Date().getTime() + '.jpg')
          /* console.log(dataURL)
          console.log(file)
          console.log(param) */
          let res: any = await uploadPhoto(param)
          if (res.code === 200) {
            this.$store.commit('saveBasicInfo', {
              photoPath: res.data.photoUrl
            })
            this.$emit('save') //头像也会影响到简历的完整度(积分)
            this.$message.success('头像上传成功!')
            this.closed()
          } else {
            this.$message.error('上传失败!错误信息:' + res.msg)
          }
        }
        img.src = data
      })
    } else {
      this.$confirm('请选择上传的图片！', '提示', {
        showCancelButton: false,
        type: 'warning',
        roundButton: true
      })
    }
  }
  // 将base64转换为文件
  public dataURLtoFile(dataurl: string, filename: string) {
    const arr: any = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    const file = new Blob([u8arr], { type: mime })
    return file
  }
  // 选择图片
  public uploadImg(file: any) {
    if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
      this.$alert('图片类型必须是jpg、jpeg、gif、png中的一种', '提示', {
        confirmButtonText: '确定',
        type: 'error'
      })
      return false
    }
    if (file.size > 1024 * 1024 * 2) {
      this.$alert('图片不能超过2M', '提示', {
        confirmButtonText: '确定',
        type: 'error'
      })
      return;
    }

    const reader = new FileReader()
    const _this = this
    reader.readAsDataURL(file.raw)
    reader.onload = function() {
      _this.option.img = this.result
      _this.isShowCropper = true
    }
    // this.option.img = file.url
    // this.option.img = this.$store.state.photoPath
    // console.log(file.raw)
  }
  public closed(): void {
    this.isShowCropper = false
    this.$emit('hideUploadBox')
  }
}
</script>

