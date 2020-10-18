/**
 * Apifox Socket 封包插件示例 (含调用 Jar)
 * 封装 JSON 格式包数据，并调用 jar 计算 Base64
 *
 * @class DemoExecuteJarSocketPacker
 */
class DemoExecuteJarSocketPacker {
  // 插件 ID，取 ID 要避免和其他插件冲突
  static id = 'cn.apifox.ApifoxExtensions.DemoExecuteJarSocketPacker';
  // 插件展示名称
  static title = '封包插件示例 (含调用 Jar)';
  // 插件使用帮助链接，可选
  static help = 'https://www.apifox.cn/help/app/extensions/socket-packer/';
  // 插件类型 Socket 封包插件：'socketPacker'
  static type = 'socketPacker';
  // 插件版本号
  static version = '1.0.0';
  // 前端用户输入项设置
  static inputs = [
    ['eol', '包尾分隔符', 'Input', {
      defaultValue: '\\r\\n'
    }]
  ];
  // 解包后的 message 数据类型，可选 'json' 和 'string'
  static dataType = 'json';

  // 等待处理的数据
  _bufferedData = null;

  /**
   * 封包，将用户输入的数据封装处理后用来发送 Socket 包
   *
   * @param {*} message  String | JSON。数据类型同上面的 dataType 保存一致
   * @param {*} options 对象。options.inputs 可读取用户输入项
   * @param {*} context 对象。context.executeJar 可调用 jar 文件
   * @returns String | Buffer
   */
  evaluate(message, options, context) {
    // 包尾结束符
    let eof = '';
    if (options.inputs['eol']) {
      // 处理需要转义的字符
      eof = options.inputs['eol']
        .replace(/\\n/g, '\n') // 换行: \n
        .replace(/\\r/g, '\r') // 回车: \r
        .replace(/\\t/g, '\t') // tab(制表符): \t
        .replace(/\\r/g, '\b') // 退格符: \b
        .replace(/\\r/g, '\f') // 换页符: \f
        .replace(/\\\\/g, '\\'); // 反斜杠: \\
    }
    /**
     * 调用 jar 示例。如果不需调用 jar 可以忽略这段代码
     * 给 message 增加一个字段 base64Data，值为 packetString 的 MD5。
     * 注意：jar 文件 cn.apifox.Base64EncodeDemo.jar 需存放在当前 js 相同目录下
     */
    try {
      if (message) {
        /**
         * context.executeJar 用法说明
         * context.executeJar(jarFileName: string, args?: string[])
         * @param {*} jarFileName String jar 文件名。注意：jar 文件需存放在当前 js 相同目录下。
         * @param {*} args Array<String> 运行参数，为字符串数组
         */
        message.base64Data = context.executeJar('cn.apifox.Base64EncodeDemo.jar', [JSON.stringify(message)]);
      }
    } catch (e) {
      throw new Error(`调用 jar 出错: ${e.message}`);
    }

    return JSON.stringify(message) + eof;
  }
}

module.exports = DemoExecuteJarSocketPacker;