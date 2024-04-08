<template>
  <div>
    <div class="block">
      <span class="demonstration">默认 click 触发子菜单</span>
      <el-cascader
        v-model="value"
        :options="options"
        @change="handleChange"
      ></el-cascader>
    </div>
    <div class="block">
      <span class="demonstration">hover 触发子菜单</span>
      <el-cascader
        v-model="value"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
      ></el-cascader>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options1:[],
      options: [
        {
          value: 'guangdong',
          label: '广东',
          children: [
            {
              value: 'guangzhou',
              label: '广州',
              children: [
                {
                  value: 'baiyunqu',
                  label: '白云区',
                },
                {
                  value: 'haizhuqu',
                  label: '海珠区',
                },
                {
                  value: 'huaduqu',
                  label: '花都区',
                },
              ],
            },
            {
              value: 'zhuhai',
              label: '珠海',
              children: [
                {
                  value: 'doumenqu',
                  label: '斗门区',
                },
                {
                  value: 'jinwanqu',
                  label: '金湾区',
                },
              ],
            },
            {
              value: 'shenzhen',
              label: '深圳',
              children: [
                {
                  value: 'nanshanqu',
                  label: '南山区',
                },
                {
                  value: 'yantianqu',
                  label: '盐田区',
                },
                {
                  value: 'futianqu',
                  label: '福田区',
                },
                {
                  value: 'luohuqu',
                  label: '罗湖区',
                },
                {
                  value: 'longgangqu',
                  label: '龙岗区',
                },
                {
                  value: 'dongklonghuaxinqu',
                  label: '东龙华新区',
                },
                {
                  value: 'baoanqu',
                  label: '宝安区',
                },
              ],
            },
            {
              value: 'shantou',
              label: '汕头',
              children: [
                {
                  value: 'longhuqu',
                  label: '龙湖区',
                },
                {
                  value: 'chaonanqu',
                  label: '潮南区',
                },
                {
                  value: 'haojiangqu',
                  label: '濠江区',
                },
              ],
            },
            {
              value: 'foshan',
              label: '佛山',
              children: [
                {
                  value: 'chanchengqu',
                  label: '禅城区',
                },
                {
                  value: 'gaomingqu',
                  label: '高明区',
                },
                {
                  value: 'nanhaiqu',
                  label: '南海区',
                },
              ],
            },
            {
              value: 'donguan',
              label: '东莞',
              children: [
                {
                  value: 'chashanzhen',
                  label: '茶山镇',
                },
                {
                  value: 'changanzhen',
                  label: '长安镇',
                },
                {
                  value: 'dalangzhen',
                  label: '大朗镇',
                },
              ],
            },
            {
              value: 'huizhou',
              label: '惠州',
              children: [
                {
                  value: 'huidongxian',
                  label: '惠东县',
                },
                {
                  value: 'boluoxian',
                  label: '博罗县',
                },
                {
                  value: 'longmenxian',
                  label: '龙门县',
                },
              ],
            },
          ],
        },
        {
          value: 'tianjin',
          label: '天津',
          children: [
            {
              value: 'tianjinshi',
              label: '天津市',
              children: [
                {
                  value: 'baodiqu',
                  label: '宝坻区',
                },
                {
                  value: 'beichenqu',
                  label: '北辰区',
                },
                {
                  value: 'binhaixinqu',
                  label: '滨海新区',
                },
                {
                  value: 'dongliqu',
                  label: '东丽区',
                },
                {
                  value: 'hebeiqu',
                  label: '河北区',
                },
                {
                  value: 'hedongqu',
                  label: '河东区',
                },
              ],
            },
          ],
        },
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            {
              value: 'hanzhoushi',
              label: '杭州市',
              children: [
                {
                  value: 'binjiangqu',
                  label: '滨江区',
                },
                {
                  value: 'chunanxian',
                  label: '淳安县',
                },
                {
                  value: 'fuyangqu',
                  label: '富阳区',
                },
              ],
            },
            {
              value: 'jiaxingshi',
              label: '嘉兴市',
              children: [
                {
                  value: 'hainingqu',
                  label: '海宁区',
                },
                {
                  value: 'haiyanxian',
                  label: '海盐县',
                },
                {
                  value: 'jiashanxian',
                  label: '嘉善县',
                },
              ],
            },
            {
              value: 'ningboshi',
              label: '宁波市',
              children: [
                {
                  value: 'beilunqu',
                  label: '北仑区',
                },
                {
                  value: 'cixishi',
                  label: '慈溪市',
                },
                {
                  value: 'fenghuaqu',
                  label: '奉化区',
                },
              ],
            },
          ],
        },
        {
          value: 'shanghai',
          label: '上海',
          children: [
            {
              value: 'shanghaishi',
              label: '上海市',
              children: [
                {
                  value: 'pudongxinqu',
                  label: '浦东新区',
                },
                {
                  value: 'baoshanqu',
                  label: '宝山区',
                },
                {
                  value: 'changningqu',
                  label: '长宁区',
                },
                {
                  value: 'chongmingqu',
                  label: '崇明区',
                },
                {
                  value: 'fengxianqu',
                  label: '奉贤区',
                },
                {
                  value: 'hongkouqu',
                  label: '虹口区',
                },
              ],
            },
          ],
        },
        {
          value: 'shandong',
          label: '山东',
          children: [
            {
              value: 'binzhoushi',
              label: '滨州市',
              children: [
                {
                  value: 'binchengqu',
                  label: '滨城区',
                },
                {
                  value: 'boxingxian',
                  label: '博兴县',
                },
                {
                  value: 'huiminxian',
                  label: '惠民县',
                },
              ],
            },
            {
              value: 'dezhoushi',
              label: '德州市',
              children: [
                {
                  value: 'dechengqu',
                  label: '德城区',
                },
                {
                  value: 'lelingshi',
                  label: '乐陵市',
                },
                {
                  value: 'linyixian',
                  label: '临邑县',
                },
              ],
            },
            {
              value: 'dongyingshi',
              label: '东营市',
              children: [
                {
                  value: 'dongyingqu',
                  label: '东营区',
                },
                {
                  value: 'guangraoxian',
                  label: '广饶县',
                },
                {
                  value: 'hekouqu',
                  label: '河口区',
                },
              ],
            },
          ],
        },
        {
          value: 'anhui',
          label: '安徽',
          children: [
            {
              value: 'anqingshi',
              label: '安庆市',
              children: [
                {
                  value: 'daguanqu',
                  label: '大观区',
                },
                {
                  value: 'huainingxian',
                  label: '怀宁县',
                },
                {
                  value: 'susongxian',
                  label: '宿松县',
                },
              ],
            },
            {
              value: 'chuzhoushi',
              label: '滁州市',
              children: [
                {
                  value: 'dingyuanxian',
                  label: '定远县',
                },
                {
                  value: 'fengyangxian',
                  label: '凤阳县',
                },
                {
                  value: 'laianxian',
                  label: '来安县',
                },
              ],
            },
            {
              value: 'hefeishi',
              label: '合肥市',
              children: [
                {
                  value: 'baohequ',
                  label: '包河区',
                },
                {
                  value: 'changfengxian',
                  label: '长丰县',
                },
                {
                  value: 'feidongshi',
                  label: '肥东市',
                },
              ],
            },
          ],
        },
        {
          value: 'shanxi',
          label: '山西',
          children: [
            {
              value: 'changzhishi',
              label: '长治市',
              children: [
                {
                  value: 'luchengqu',
                  label: '潞城区',
                },
                {
                  value: 'qinxian',
                  label: '沁县',
                },
                {
                  value: 'shangdangqu',
                  label: '上党取',
                },
              ],
            },
            {
              value: 'datongshi',
              label: '大同市',
              children: [
                {
                  value: 'guanglingxian',
                  label: '广灵县',
                },
                {
                  value: 'lingqiuxian',
                  label: '灵丘县',
                },
                {
                  value: 'pingchengqu',
                  label: '平城区',
                },
              ],
            },
            {
              value: 'jinzhongshi',
              label: '晋中市',
              children: [
                {
                  value: 'heshunxian',
                  label: '和顺县',
                },
                {
                  value: 'jiexiushi',
                  label: '介休市',
                },
                {
                  value: 'lingshixian',
                  label: '灵石县',
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>
