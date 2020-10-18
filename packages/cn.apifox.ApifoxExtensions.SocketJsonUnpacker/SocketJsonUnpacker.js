class SocketJsonUnpacker {
  static id = 'cn.apifox.ApifoxExtensions.SocketJsonUnpacker';
  static title = 'JSON 解包 (包尾分隔符)';
  static help = 'https://www.apifox.cn/help/';
  static type = 'socketUnpacker';
  static inputs = [
    ['eol', '包尾分隔符', 'Input', {
      defaultValue: '\\r\\n'
    }]
  ];

  static dataType = 'json';

  _bufferedData = null; // 等待处理的数据

  onData(chunk, options) {
    let data = Buffer.from(chunk);

    if (this._bufferedData) {
      data = Buffer.concat([this._bufferedData, data]);
    }

    let items = [];

    let eof;
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

    // 匹配行尾结束符，如果匹配到则退出，否则一直等待
    if (eof) {
      let stringData = data.toString();
      let index = stringData.indexOf(eof);
      while (index !== -1) {
        let packet = stringData.substring(0, index);
        // 解包后的信息：人性化展示的内容，方便理解内容，一般为 JSON 格式
        let message;
        // 解包异常错误
        let error;
        try {
          message = JSON.parse(packet);
        } catch (e) {
          error = new Error(`返回的数据不是正确的 JSON 格式: ${e.message}`);
        }
        // item 格式：[原始报文, 解包后的信息(可选), 解包异常错误(可选)]
        const item = [Buffer.from(packet + eof), message, error];
        items.push(item);
        stringData = stringData.substr(index + eof.length);
        index = stringData.indexOf(eof);
      }
      this._bufferedData = stringData ? Buffer.from(stringData) : null;
    } else {
      this._bufferedData = data;
    }

    // 函数返回格式为： [[[原始报文1, 解包后的报文1],[原始报文2, 解包后的报文2]], 等待处理的数据]
    return [items, this._bufferedData];
  }
}

module.exports = SocketJsonUnpacker;
