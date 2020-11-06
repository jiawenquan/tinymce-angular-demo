import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tinymce-angular-demo';

  demo = '';

  constructor() {

  }

  @Input() control = new FormControl();
  tinymceInit = {
    // baseURL: 'assets/tinymce',
    // skin_url: window.location.origin + '/assets/tinymce/skins/lightgray/',
    // skin_url: 'assets/tinymce/skins/lightgray',
    branding: false, // 关闭商标
    // mode: 'textareas',

    plugins: 'image save imagetools paste autolink link codesample autoresize',
    toolbar: 'undo redo | save | formatselect | bold italic backcolor code ' +
      '| alignleft aligncenter alignright alignjustify ' +
      '| bullist numlist outdent indent | image codesample | removeformat ' +
      '| help',
    language: 'zh_CN',
    image_caption: true,
    paste_data_images: true,
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    image_advtab: true,
    // images_upload_url: true,
    images_upload_handler: (blobInfo, success, failure) => {

      // https://segmentfault.com/a/1190000016007665 oss 上传的支持

      if (blobInfo.blob().size > 3 * 1024 * 1024) {
        failure('file cannot be larger than 3 mb');
        return;
      }
      success('data:' + blobInfo.blob().type + ';base64,' + blobInfo.base64());
      console.log(
        blobInfo.blob(),
        blobInfo.base64(),
        blobInfo.blobUri(),
        blobInfo.uri());
      setTimeout(() => {
        success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
      }, 2000);

    },
    // images_upload_handler: (blobInfo, success, failure) => {
    //   const filename = blobInfo.filename();
    //   const index = filename.lastIndexOf(".");
    //   const suffix = filename.substring(index + 1, filename.length);
    //   filename = md5(blobInfo.base64()) + '.' + suffix;
    //   client.multipartUpload(filename, blobInfo.blob()).then(function (result) {
    //     if (result.res.requestUrls) {
    //       success(result.res.requestUrls[0]);
    //     }
    //   }).catch(function (err) {
    //     console.log(err);
    //   });
    // },
    save_onsavecallback: (editor: any) => {

      const tinymceHtml = editor.getContent({format: 'raw'});
      console.log(tinymceHtml.length);
      // 将富文本内容专程base64编码，这个用于上传到服务存储到数据库中
      // const encoded = new Buffer(tinymceHtml,'base64').base64();
      // // 将富文本的base64编码 转换成原来的格式，这个用于将数据库中的富文本展示在界面上
      // let decoded = new Buffer(encoded,'base64').toString();
      const encoded = this.utf8_to_b64(tinymceHtml);
      // 保存为txt文件放在OSS上面
      // 将富文本的base64编码 转换成原来的格式，这个用于将数据库中的富文本展示在界面上
      const decoded = this.b64_to_utf8(encoded);
      console.log(encoded);
      console.log(decoded);
      this.demo = decoded;
    }
  };


  utf8_to_b64(str): any {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  b64_to_utf8(str): any {
    return decodeURIComponent(escape(window.atob(str)));
  }
}
