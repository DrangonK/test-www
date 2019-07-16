<template>
    <div class="header_wrap">
        <div class="preview_basic" ref="header">
            <div class="photo">
                <img :src="imgSrc" />
            </div>
            <div class="line_1">
                <div class="icon-zt_logo"></div>
                <span>{{info.userName}}</span>
                <i v-if="info.gender == 1" class="icon-male_01"></i>
                <i v-else class="icon-gender_female_02"></i>
            </div>
            <div class="line_2">
                {{formatStr()}}
            </div>
            <div class="line_3">
                <p>
                    <i class="icon-mobile_01"></i>
                    <span>{{info.mobile}}</span>
                </p>
                <p>
                    <i class="icon-envelope_02"></i>
                    <span>{{info.email}}</span>
                </p>
                <p>
                    <i class="icon-shape_03"></i>
                    <span>{{info.jobStateStr}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { formatStr, trsforJobyearType } from '../../common/common'

@Component({
  name: 'PreviewHeader'
})
export default class PreviewHeader extends Vue {
  @Prop()
  // @ts-ignore
  public info: basicInfo

  get imgSrc(): string {
    let src: string = ''
    if (this.info.photoUrl) {
      src = this.info.photoUrl
    } else {
      src = `/public/images/${this.info.gender === 1 ? 'boy' : 'girl'}.jpg`
    }
    return src
  }
  // 转换工作年限
  public trsforJobyearType(
    jobyearType: number,
    jobyearTypeStr: string
  ): string {
    return trsforJobyearType(jobyearType, jobyearTypeStr)
  }
  //26岁｜170cm｜未婚｜4年工作经验｜汉族｜现居东莞·莞城区｜宁波籍贯｜共青团员
  public formatStr(): string {
    let jobyearType = this.trsforJobyearType(
      <number>this.info.jobyearType,
      this.info.jobyearTypeStr
    )
    let arr = [
      this.info.age + '岁',
      this.info.stature ? this.info.stature + 'cm' : '',
      this.info.marriageStr,
      jobyearType,
      this.info.nation ? this.info.nation + '族' : '',
      '现居' + this.info.locationStr,
      this.info.hometownStr ? this.info.hometownStr + '籍贯' : '',
      this.info.politicalStr
    ]
    return formatStr(<Array<string>>arr)
  }
}
</script>
