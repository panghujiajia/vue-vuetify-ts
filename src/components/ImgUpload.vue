<template>
	<div>
		<a-upload
			name="avatar"
			list-type="picture-card"
			class="avatar-uploader"
			accept=".png,.jpg"
			:show-upload-list="false"
			:before-upload="beforeUpload"
			@change="loading = true"
			:customRequest="customRequest"
		>
			<img class="avatar" v-if="url" :src="url" alt="avatar" />
			<div v-else>
				<a-icon :type="loading ? 'loading' : 'plus'" />
				<div class="ant-upload-text">上传图片</div>
			</div>
		</a-upload>
	</div>
</template>
<script lang="ts">
import {
	$getSignature,
	$upload,
	$uuid,
} from '@/service/modules/Upload.service';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
@Component({
	name: 'ImgUpload',
})
export default class ImgUpload extends Vue {
	@Prop()
	private url!: string;
	private loading = false;
	// 图片访问地址
	private showUrl = 'https://xxx-private.oss-cn-shanghai.aliyuncs.com/';
	// 文件夹名
	private uploadFile = 'images/';
	// 签名
	private signature = {
		accessId: '',
		policy: '',
		signature: '',
	};
	// 把url传给父组件
	@Emit('getUrl')
	private returnImageUrl(url: string) {
		return url;
	}
	// 获取oss签名
	private async getSignature(cb?: () => void) {
		const data = await $getSignature({});
		if (data) {
			this.signature = data;
			cb && cb();
		}
	}
	// 自定义上传
	private async customRequest(item: any) {
		if (!this.signature.signature) {
			// 签名过期
			this.getSignature(() => this.customRequest(item));
			return;
		}
		// 获取文件的后缀名
		const suffix = item.file.name.substring(
			item.file.name.lastIndexOf('.'),
			item.file.name.length
		);
		const fileName = this.uploadFile + $uuid() + suffix;
		const { policy, accessId, signature } = { ...this.signature };
		const formData = new FormData();
		formData.append('key', fileName);
		formData.append('policy', policy);
		formData.append('OSSAccessKeyId', accessId);
		formData.append('success_action_status', '200');
		formData.append('signature', signature);
		formData.append('file', item.file as any, item.file.name);
		const data = await $upload(formData);
		if (data) {
			const url = this.showUrl + fileName;
			this.returnImageUrl(url);
			this.loading = false;
		}
	}
	// 上传前
	private beforeUpload(file: File) {
		return new Promise((resolve, reject) => {
			const loadType = ['image/jpeg', 'image/png'];
			const isJPG = loadType.includes(file.type);
			if (!isJPG) {
				// message.error('请上传jpg或png格式!');
				reject();
				return;
			}
			const isLt5M = file.size / 1024 <= 5 * 1024;
			if (!isLt5M) {
				// message.error('图片大小限制5M内!');
				reject();
				return;
			}
			resolve(true);
		});
	}
}
</script>
<style lang="less" scoped>
.avatar-uploader {
	width: 128px;
	height: 128px;
}
.avatar-uploader /deep/.ant-upload,
.avatar {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.anticon-plus {
		font-size: 30px;
	}
}
</style>
