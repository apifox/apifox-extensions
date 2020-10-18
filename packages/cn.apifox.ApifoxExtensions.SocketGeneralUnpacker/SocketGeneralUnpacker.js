class SocketGeneralUnpacker {
  static id = 'cn.apifox.ApifoxExtensions.SocketGeneralUnpacker';
  static title = '通用';
  static hint = '文本/二进制原始输出';
  static help = 'https://www.apifox.cn/help/';
  static type = 'socketUnpacker';
  static version = '0.0.1';

  static dataType = 'buffer';

  _bufferedData = null; // 等待处理的数据

  onData(chunk, options) {
    let data = Buffer.from(chunk);

    if (this._bufferedData) {
      this._bufferedData = Buffer.concat([this._bufferedData, data]);
    } else {
      this._bufferedData = data;
    }

    // 函数返回格式为： [[[原始报文1, 解包后的报文1],[原始报文2, 解包后的报文2]], 等待处理的数据]
    return [
      [], this._bufferedData
    ];
  }
}

module.exports = SocketGeneralUnpacker;
