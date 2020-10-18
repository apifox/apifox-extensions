/**
 * Apifox Socket 封包插件示例
 * 封装 JSON 格式包数据
 *
 * @class DemoSocketPacker
 */
class DemoSocketPacker {
  // 插件 ID，取 ID 要避免和其他插件冲突
  static id = 'cn.apifox.ApifoxExtensions.DemoSocketPacker';
  // 插件展示名称
  static title = '封包插件示例';
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
   * @param {*} data  String。
   * @param {*} options 对象。options.inputs 可读取用户输入项
   * @param {*} context 对象。context.executeJar 可调用 jar 文件
   * @returns String | Buffer
   */
  evaluate(data, options, context) {
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
    return JSON.stringify(data) + eof;
  }
}

module.exports = DemoSocketPacker;