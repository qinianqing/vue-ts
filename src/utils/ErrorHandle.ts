import iView from 'view-design';
const ivu: any = iView;
/**
 * 错误收集及消息弹框提示
 */
class ErrorHandle {
  /**
   * 显示消息
   * @param code  消息code
   * @param msg   消息文本
   * @param option {
   *     type: 消息类型--> warning, error, info
   *     duration: 消息显示时长 --> 单位 (秒)
   * }
   */
  public static showMsg(code: string | number | null, msg: string, option?: any): void {
    // 消息中的占位符替换,消息格式如：xxx#{user_name}xxx,option中则有{user_name: 'hzb'},结果如：xxxhzbxxx

    code =
      !code && msg === 'Network Error' ? 'NETWORKERROR' : code ? code.toString().toUpperCase() : msg ? '' : 'UNKNOW';
    if (this.errorMessage[code]) {
      msg = this.errorMessage[code];
    }
    const msgKeys: any = msg.match(/#{[a-zA-Z0-9]+}/g);
    if (msgKeys && option) {
      msgKeys.forEach((key: string) => {
        const keys = key.substr(2, key.length - 1);
        msg = msg.replace(new RegExp('#{' + keys + '}'), option[keys]);
      });
    }

    const message = Object.assign(
      {},
      {
        code: code,
        message: msg,
        type: option ? option.type || 'warning' : 'warning',
        duration: option ? option.duration || this.duration : this.duration,
      },
    );

    const msgIndex = this.messages.findIndex((item: any) => item.message === message.message);

    if (msgIndex < 0) {
      this.messages.push(message);
    }
    if (!this.isShowMessage) {
      this.alertMessage();
    }
  }

  private static isShowMessage: boolean = false;
  // 消息队列
  private static messages: any[] = [];
  private static readonly duration: number = 3;
  private static errorMessage: any = {
    ECONNABORTED: '请求超时。',
    NETWORKERROR: '网络错误。',
    UNKNOW: '未知错误。',
  };

  /**
   * 从消息队列中取消息逐条显示
   */
  private static alertMessage(): void {
    const alert = (): void => {
      const message: any = this.messages[0];
      ivu.Message[message.type]({
        content: message.message,
        duration: message.duration,
      });
      setTimeout(() => {
        this.messages.splice(0, 1);
        if (this.messages && this.messages.length > 0) {
          alert();
        } else {
          this.isShowMessage = false;
        }
      }, message.duration * 1100);
    };
    if (this.messages && this.messages.length > 0) {
      this.isShowMessage = true;
      alert();
    }
  }
}

export default ErrorHandle;
