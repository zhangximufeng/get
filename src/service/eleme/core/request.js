const axios = require('axios-https-proxy-fix');
const proxyServer = require('../../proxy-server');
const logger = require('../../../util/logger')('service/eleme');

const origin = 'https://h5.ele.me';
const referer = `${origin}/hongbao/`;

module.exports = class Request {
  constructor({sn}) {
    this.sn = sn;
    this.http = axios.create({
      baseURL: origin,
      withCredentials: true,
      timeout: 3000,
      headers: {
        origin,
        referer,
        'content-type': 'text/plain;charset=UTF-8',
        'user-agent':
          'Mozilla/5.0 (Linux; Android 7.0; MIX Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044004 Mobile Safari/537.36 V1_AND_SQ_7.5.0_794_YYB_D QQ/7.5.0.3430 NetType/WIFI WebP/0.3.0 Pixel/1080'
      },
      transformRequest: [
        (data, headers) => {
          headers['x-shared'] = headers['x-shared'] || `eosid=${parseInt(sn, 16)}`;
          return JSON.stringify(data);
        }
      ],
      proxy: proxyServer()
    });
  }

  async lucky({theme_id = '0'}) {
    const {data = {}} = await this.http.get(`/restapi/marketing/themes/${theme_id}/group_sns/${this.sn}`);
    return data;
  }

  async hongbao({openid, sign, sid, sn = this.sn}) {
    logger.info('开始领取饿了么', {
      openid,
      sign,
      sid,
      sn
    });
    const {data = {}} = await this.http.post(
      `/restapi/marketing/promotion/weixin/${openid}`,
      {
        device_id: '',
        group_sn: sn,
        hardware_id: '',
        method: 'phone',
        phone: '',
        platform: 4,
        sign,
        track_id: '',
        unionid: 'fuck', // 别问为什么传 fuck，饿了么前端就是这么传的
        weixin_avatar: 'http://thirdqq.qlogo.cn/qqapp/101204453/BC8AA42E86ED825455B5895212AE7917/40',
        weixin_username: 'mtdhb.org'
      },
      {
        headers: {
          'x-shard': `eosid=${parseInt(sn, 16)}`,
          cookie: `SID=${sid}`
        }
      }
    );
    data.promotion_records = data.promotion_records || [];
    return data;
  }
};
