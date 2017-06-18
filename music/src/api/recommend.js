import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams, options} from './config'

export function getRecommend() {//轮播数据
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	const data = Object.assign({}, commonParams, {
		g_tk: 5381,
		platform: 'h5',
		needNewCode: 1
	})
	
	return jsonp(url, data, options)
}


export function getDiscList() {//分类歌单
    const url = '/api/getDiscList'
	const data = Object.assign({}, commonParams, {
		rnd:0.9565842140567506,
		g_tk: 5381,
		loginUin: 0,
		hostUin: 0,
		platform: 'yqq',
		needNewCode: 0,
		categoryId: 10000000,
		sortId: 5,
		sin: 0,
		ein: 29,
	    format: 'json',
	})

	  return axios.get(url, {
	    params: data
	  }).then((res) => {
	    return Promise.resolve(res.data)
	  })
}