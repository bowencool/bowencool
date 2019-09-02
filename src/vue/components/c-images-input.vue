<style lang="scss">
  .c-images-input {
    vertical-align: top;
    .item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 90px;
      height: 90px;
      margin-right: 15px;
      margin-bottom: 15px;
      overflow: hidden;
      vertical-align: top;
      border: 1px solid #c9c9c9b9;
      // border-radius: 4px;
      .anticon {
        font-size: 26px;
      }
      // & + .item {
      //  margin-left: 5px;
      // }
      &.image-wrapper {
        position: relative;
        cursor: move;
        cursor: -webkit-grab;
        img {
          max-width: 100%;
          max-height: 100%;
          margin: auto;
          // $c: #b1b1b1;
          // $s: 16px;
          background-color: #333;
          // background-image: linear-gradient(
          //     45deg,
          //     $c 25%,
          //     transparent 25%,
          //     transparent 75%,
          //     $c 75%,
          //     $c
          //   ),
          //   linear-gradient(
          //     45deg,
          //     $c 25%,
          //     transparent 25%,
          //     transparent 75%,
          //     $c 75%,
          //     $c
          //   );
          // background-size: $s $s;
          // background-position: 0 0, $s/2 $s/2;
        }
        .mask {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: none;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: #252525ad;
          will-change: display;
          .anticon,
          [class^='el-icon'] {
            padding: 5px;
            font-size: 18px;
            cursor: pointer;
          }
        }
        &:hover {
          .mask {
            display: inline-flex;
          }
        }
      }
      &.add {
        // border-style: dashed;
        // flex-direction: column;
        position: relative;
        cursor: pointer;
        span {
          position: absolute;
          bottom: 4px;
          font-size: 12px;
        }
      }
    }
  }
</style>

<template>
  <div class="c-images-input">
    <Draggable v-model="list" :options="{ draggable: '.draggable' }">
      <div
        v-for="(img, i) in list"
        :key="img.url + i + img.id"
        class="image-wrapper draggable item"
      >
        <i v-if="img.status === 'uploading'" class="el-icon-loading"></i>
        <template v-else>
          <i class="el-icon-warning" v-if="img.status === 'error'"></i>

          <img v-else :src="img.url" />
          <div class="mask">
            <!-- <a-icon
              v-if="img.status !== 'error'"
              type="eye"
              @click="onPreview(i)"
            ></a-icon>-->
            <!-- <a-icon
              type="delete"
              @click="onDelete(i)"
            ></a-icon>-->
            <i class="el-icon-view" @click="onPreview(i)"></i>
            <i class="el-icon-delete" @click="onDelete(i)"></i>
          </div>
        </template>
      </div>
      <div v-if="value.length < maxCount" slot="footer" class="item add" @click="onAdd">
        <!-- <a-icon type="plus"></a-icon> -->
        <i class="el-icon-plus"></i>
        <span>{{ value.length }}/{{ maxCount }}</span>
      </div>
    </Draggable>
    <imageGallery ref="imageGallery"></imageGallery>
  </div>
</template>

<script>
import { BASE_URL } from '@/config';
import { upload } from '@/api/common';
import imageGallery from '@/components/common/imagegallery';
import Draggable from 'vuedraggable';

// import { message } from 'element-ui';

export default {
  name: 'c-images-input',
  components: { Draggable, imageGallery },
  props: {
    value: {
      type: Array,
      default: () => [
        // {
        //   url: 'https://w.mg-cdn.com/dist/website/static/img/qr.7251b6e.png',
        //   id: 0,
        // },
        // {
        //   url: '/public/loading.png',
        //   id: 2,
        // },
      ],
    },
    maxSize: {
      type: Number,
      default: 3 * 2 ** 20,
    },
    maxCount: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    list: {
      get() {
        return this.value;
      },
      set(v) {
        // console.log(v);
        this.$emit('input', v);
        this.$emit('change', v);
      },
    },
  },
  methods: {
    onDelete(i) {
      // console.log(i);
      const payload = [...this.list];
      payload.splice(i, 1);
      this.$emit('change', payload);
      this.$emit('input', payload);
    },
    onPreview(i) {
      // this.$imageGallery({
      //   value: this.value.map(f => f.url),
      //   activeIndex: i,
      // });
      this.$refs.imageGallery.showImg(this.value, i);
    },
    onAdd() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = this.onChange;
      if (this.maxCount > 1) input.multiple = 'true';
      input.click();
    },
    onChange(e) {
      const { files } = e.target || e.currentTarget;

      const uploadFiles = Array.prototype.filter
        .call(files, file => file.size <= this.maxSize)
        .map(file => ({
          id: Math.random(),
          url: '',
          status: 'uploading',
          progress: 0,
          file,
        }));

      if (uploadFiles.length < files.length) {
        this.$message.warning('图片过大，请重新选择');
      }

      if (uploadFiles.length + this.list.length > this.maxCount) {
        this.$message.error(`您本次最多可以选择${this.maxCount}张图片`);
        return;
      }
      // console.log(uploadFiles);

      const payload = [...this.value, ...uploadFiles];

      this.$emit('change', payload);
      this.$emit('input', payload);
      // const rez = await Promise.all(uploadFiles.map(file => upload({ file })));

      uploadFiles.forEach(async (file, i) => {
        // console.log(i, file);
        try {
          const { id, url } = await upload({
            file: file.file,
            progress(n) {
              // eslint-disable-next-line
              file.progress = ~~n;
            },
          });
          file.status = 'done';
          file.id = id;
          file.url = url;
        } catch (error) {
          console.error(error);
          file.status = 'error';
        }
        this.$forceUpdate();
      });
    },
  },
};
</script>
