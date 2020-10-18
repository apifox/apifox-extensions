class SocketJsonPacker {
  static id = 'cn.apifox.ApifoxExtensions.SocketJsonPacker';
  static title = 'JSON 封包 (包尾分隔符)';
  static hint = 'JSON.stringify';
  static help = 'https://www.apifox.cn/help/';
  static type = 'socketPacker';
  static dataType = 'json';
  static inputs = [
    ['eol', '包尾分隔符', 'Input', {
      defaultValue: '\\r\\n'
    }]
  ];

  evaluate(data, options) {
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

module.exports = SocketJsonPacker;
