class SocketGeneralPacker {
  static id = 'cn.apifox.ApifoxExtensions.SocketGeneralPacker';
  static title = '通用';
  static hint = '文本/十六进制/base64';
  static help = 'https://www.apifox.cn/help/';
  static type = 'socketPacker';
  static dataType = 'text';
  static inputs = [
    [
      'format',
      '输入格式',
      'Radio',
      {
        options: [{
            label: '普通文本',
            value: 'raw',
          },
          {
            label: '十六进制文本',
            value: 'hex',
          },
          {
            label: 'base64 文本',
            value: 'base64',
          },
        ],
        defaultValue: 'raw',
        containerStyle: {
          width: '100%',
        },
      },
    ],
  ];

  evaluate(data, options) {
    switch (options.inputs['format']) {
      case 'hex':
        return Buffer.from(data, 'hex');
      case 'base64':
        return Buffer.from(data, 'base64');
      default:
        return Buffer.from(data);
    }
  }
}

module.exports = SocketGeneralPacker;
