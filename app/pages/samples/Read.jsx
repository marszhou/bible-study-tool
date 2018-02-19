import React, { Component } from 'react'
import ChapterDisplay from '../../components/bible-display/ChapterDisplay'
import BibleDisplayContainer from '../../components/bible-display/BibleDisplayContainer'

// const book = {
//   id: 1153072783907,
//   name: '创世纪',
//   chapterCount: 40
// }

// const verses = [
//   {
//     index: 1,
//     versions: [
//       {
//         index: 1,
//         content:
//           '起初<WH7225>，神<WH430>创造<WH1254><WH8804><WH853x>天<WH8064><WH853x>地<WH776>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 2,
//     versions: [
//       {
//         index: 2,
//         content:
//           '地<WH776>是<WH1961><WH8804>空虚<WH8414>混沌<WH922>，渊<WH8415>面<WH5921x><WH6440>黑暗<WH2822>；神<WH430>的灵<WH7307>运行<WH7363>在水<WH4325>面<WH6440>上<WH5921>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 3,
//     versions: [
//       {
//         index: 3,
//         content:
//           '神<WH430>说<WH559><WH8799>：要有<WH1961><WH8799>光<WH216>，就有了<WH1961><WH8799>光<WH216>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 4,
//     versions: [
//       {
//         index: 4,
//         content:
//           '神<WH430>看<WH7200><WH8799><WH853x>光<WH216><WH3588x>是好的<WH2896>，<WH430x>就把光<WH216><WH996x>暗<WH996x><WH2822>分开了<WH914><WH8686>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 5,
//     versions: [
//       {
//         index: 5,
//         content:
//           '神<WH430>称<WH7121><WH8799>光<WH216>为昼<WH3117>，称<WH7121><WH8804>暗<WH2822>为夜<WH3915>。有<WH1961><WH8799>晚上<WH6153>，有<WH1961><WH8799>早晨<WH1242>，这是头一<WH259>日<WH3117>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 6,
//     versions: [
//       {
//         index: 6,
//         content:
//           '神<WH430>说<WH559><WH8799>：诸水<WH4325>之间<WH8432>要有<WH1961><WH8799>空气<WH7549>，将<WH1961x><WH8799x>水<WH996><WH4325>分<WH914><WH8688>为上下<WH9001x><WH4325x>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 7,
//     versions: [
//       {
//         index: 7,
//         content:
//           '神<WH430>就造出<WH6213><WH8799><WH853x>空气<WH853><WH7549>，将<WH834>空气<WH7549>以下<WH4480><WH8478>的水<WH996><WH4325>、空气<WH7549><WH834x>以上<WH4480><WH5921>的水<WH996><WH4325>分开了<WH914><WH8686>。事就这样<WH3651>成了<WH1961><WH8799>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 8,
//     versions: [
//       {
//         index: 8,
//         content:
//           '神<WH430>称<WH7121><WH8799>空气<WH7549>为天<WH8064>。有<WH1961><WH8799>晚上<WH6153>，有<WH1961><WH8799>早晨<WH1242>，是第二<WH8145>日<WH3117>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 9,
//     versions: [
//       {
//         index: 9,
//         content:
//           '神<WH430>说<WH559><WH8799>：天<WH8064>下<WH4480><WH8478>的水<WH4325>要聚<WH6960><WH8735>在<WH413>一<WH259>处<WH4725>，使旱地<WH3004>露出来<WH7200><WH8735>。事就这样<WH3651>成了<WH1961><WH8799>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 10,
//     versions: [
//       {
//         index: 10,
//         content:
//           '神<WH430>称<WH7121><WH8799>旱地<WH3004>为地<WH776>，称<WH7121><WH8804>水<WH4325>的聚处<WH4723>为海<WH3220>。神<WH430>看着<WH7200><WH8799><WH3588x>是好的<WH2896>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 11,
//     versions: [
//       {
//         index: 11,
//         content:
//           '神<WH430>说<WH559><WH8799>：地<WH776>要发生<WH1876><WH8686>青草<WH1877>和结<WH2232><WH8688>种子<WH2233>的菜蔬<WH6212>，并结<WH6213><WH8802>果子<WH6529>的树木<WH6529><WH6086>，各从其类<WH4327>，果子<WH834x>都包着核<WH2233><WH9002x>。<WH5921x><WH776x>事就这样<WH3651>成了<WH1961><WH8799>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 12,
//     versions: [
//       {
//         index: 12,
//         content:
//           '于是地<WH776>发生了<WH3318><WH8686>青草<WH1877>和结<WH2232><WH8688>种子<WH2233>的菜蔬<WH6212>，各从其类<WH4327>；并结<WH6213><WH8802>果子<WH6529>的树木<WH6086>，各从其类<WH4327>；果子<WH834x>都包着核<WH2233><WH9002x>。神<WH430>看着<WH7200><WH8799><WH3588x>是好的<WH2896>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 13,
//     versions: [
//       {
//         index: 13,
//         content:
//           '有<WH1961><WH8799>晚上<WH6153>，有<WH1961><WH8799>早晨<WH1242>，是第三<WH7992>日<WH3117>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 14,
//     versions: [
//       {
//         index: 14,
//         content:
//           '神<WH430>说<WH559><WH8799>：天上<WH7549><WH8064>要有<WH1961><WH8799>光体<WH3974>，可以分<WH914><WH8687>昼<WH996><WH3117>夜<WH996><WH3915>，<WH1961x><WH8804x>作记号<WH226>，定节令<WH4150>、日子<WH3117>、年岁<WH8141>，',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 15,
//     versions: [
//       {
//         index: 15,
//         content:
//           '并要<WH1961><WH8804>发光<WH3974>在天<WH8064>空<WH7549>，普照<WH215><WH8687>在地<WH776>上<WH5921>。事就这样<WH3651>成了<WH1961><WH8799>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 16,
//     versions: [
//       {
//         index: 16,
//         content:
//           '于是神<WH430>造了<WH6213><WH8799><WH853x>两个<WH8147>大<WH1419>光<WH853><WH3974>，<WH853x>大的<WH1419><WH3974x>管<WH4475>昼<WH3117>，<WH853x>小的<WH6996><WH3974x>管<WH4475>夜<WH3915>，又造<WH853x>众星<WH3556>，',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 17,
//     versions: [
//       {
//         index: 17,
//         content:
//           '<WH430x>就把这些光<WH853x>摆列<WH5414><WH8799>在天<WH8064>空<WH7549>，普照<WH215><WH8687>在地上<WH5921><WH776>，',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 18,
//     versions: [
//       {
//         index: 18,
//         content:
//           '管理<WH4910><WH8800>昼<WH3117>夜<WH3915>，分别<WH914><WH8687>明<WH996><WH216>暗<WH996><WH2822>。神<WH430>看着<WH7200><WH8799><WH3588x>是好的<WH2896>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 19,
//     versions: [
//       {
//         index: 19,
//         content:
//           '有<WH1961><WH8799>晚上<WH6153>，有<WH1961><WH8799>早晨<WH1242>，是第四<WH7243>日<WH3117>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 20,
//     versions: [
//       {
//         index: 20,
//         content:
//           '神<WH430>说<WH559><WH8799>：水<WH4325>要多多滋生<WH8317><WH8799>有生<WH2416>命<WH5315>的物<WH8318>；要有雀鸟<WH5775>飞<WH5774><WH8787>在地面<WH776>以上<WH5921>，天<WH8064>空<WH7549>之中<WH6440>(原文作天空的表面)。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 21,
//     versions: [
//       {
//         index: 21,
//         content:
//           '神<WH430>就造出<WH1254><WH8799><WH853x>大<WH1419>鱼<WH8577>和<WH853x>水<WH4325>中所<WH834>滋生<WH8317><WH8804>各样<WH3605>有生命<WH2416>的动<WH7430><WH8802>物<WH5315>，各从其类<WH4327>；又造出<WH853x>各样<WH3605>飞<WH3671>鸟<WH5775>，各从其类<WH4327>。神<WH430>看着<WH7200><WH8799><WH3588x>是好的<WH2896>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 22,
//     versions: [
//       {
//         index: 22,
//         content:
//           '神<WH430>就赐福<WH1288><WH8762>给这一切<WH853x>，说<WH559><WH8800>：滋生<WH6509><WH8798>繁多<WH7235><WH8798>，充满<WH4390><WH8798><WH853x>海中<WH3220>的水<WH4325>；雀鸟<WH5775>也要多生<WH7235><WH8799>在地上<WH776>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 23,
//     versions: [
//       {
//         index: 23,
//         content:
//           '有<WH1961><WH8799>晚上<WH6153>，有<WH1961><WH8799>早晨<WH1242>，是第五<WH2549>日<WH3117>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 24,
//     versions: [
//       {
//         index: 24,
//         content:
//           '神<WH430>说<WH559><WH8799>：地<WH776>要生出<WH3318><WH8686>活<WH2416>物<WH5315>来，各从其类<WH4327>；牲畜<WH929>、昆虫<WH7431>、野兽<WH2416><WH776>，各从其类<WH4327>。事就这样<WH3651>成了<WH1961><WH8799>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 25,
//     versions: [
//       {
//         index: 25,
//         content:
//           '于是神<WH430>造出<WH6213><WH8799><WH853x>野兽<WH2416><WH776>，各从其类<WH4327>；<WH853x>牲畜<WH929>，各从其类<WH4327>；<WH853x>地上<WH127>一切<WH3605>昆虫<WH7431>，各从其类<WH4327>。神<WH430>看着<WH7200><WH8799><WH3588x>是好的<WH2896>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 26,
//     versions: [
//       {
//         index: 26,
//         content:
//           '神<WH430>说<WH559><WH8799>：我们要照着我们的形像<WH6754>、按着我们的样式<WH1823>造<WH6213><WH8799>人<WH120>，使他们管理<WH7287><WH8799><WH9002x>海<WH3220>里的鱼<WH1710>、<WH9002x>空<WH8064>中的鸟<WH5775>、<WH9002x>地上的牲畜<WH929>，和<WH9002x>全<WH3605>地<WH776>，并<WH9002x>地上<WH5921><WH776>所爬<WH7430><WH8802>的一切<WH3605>昆虫<WH7431>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 27,
//     versions: [
//       {
//         index: 27,
//         content:
//           '神<WH430>就照着自己的形像<WH6754>造<WH1254><WH8799><WH853x>人<WH120>，乃是照着他<WH430>的形像<WH6754>造<WH1254><WH8804><WH853x>男<WH2145>造女<WH5347><WH1254x><WH8804x><WH853x>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 28,
//     versions: [
//       {
//         index: 28,
//         content:
//           '神<WH430>就赐福<WH1288><WH8762>给他们<WH853>，<WH430x>又对他们说<WH559><WH8799>：要生养<WH6509><WH8798>众多<WH7235><WH8798>，遍满<WH4390><WH8798><WH853x>地面<WH776>，治理<WH3533><WH8798>这地，也要管理<WH7287><WH8798><WH9002x>海<WH3220>里的鱼<WH1710>、<WH9002x>空<WH8064>中的鸟<WH5775>，和<WH9002x>地上<WH5921><WH776>各样<WH3605>行动<WH7430><WH8802>的活物<WH2416>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 29,
//     versions: [
//       {
//         index: 29,
//         content:
//           '神<WH430>说<WH559><WH8799>：看哪<WH2009>，我<WH853x>将<WH834>遍<WH3605>地<WH776>上<WH5921><WH6440>一切<WH3605>结<WH2232><WH8802>种子<WH2233>的菜蔬<WH6212>和<WH853x>一切<WH3605>树<WH6086>上所<WH834>结<WH2232><WH8802>有核<WH2233>的果子<WH6529>全<WH9001x>赐<WH5414><WH8804>给你们作<WH1961><WH8799>食物<WH402>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 30,
//     versions: [
//       {
//         index: 30,
//         content:
//           '至于<WH9001x><WH3605x>地上<WH776>的走兽<WH2416>和<WH9001x><WH3605x>空中<WH8064>的飞鸟<WH5775>，并各样<WH3605>爬<WH7430><WH8802>在地上<WH5921><WH776>有<WH834x><WH9002x>生命<WH2416>的物<WH5315>，我将<WH853x><WH3605x>青<WH3418>草<WH6212>赐给它们作食物<WH402>。事就这样<WH3651>成了<WH1961><WH8799>。',
//         version: '和合本'
//       }
//     ]
//   },
//   {
//     index: 31,
//     versions: [
//       {
//         index: 31,
//         content:
//           '神<WH430>看着<WH7200><WH8799><WH853x>一切<WH3605>所<WH834>造<WH6213><WH8804>的<WH2009x>都甚<WH3966>好<WH2896>。有<WH1961><WH8799>晚上<WH6153>，有<WH1961><WH8799>早晨<WH1242>，是第六<WH8345>日<WH3117>。',
//         version: '和合本'
//       }
//     ]
//   }
// ]

// class Read extends Component {
//   render() {
//     return (
//       <div>
//         <ChapterDisplay
//           book={book}
//           chapterIndex={1}
//           verses={verses}
//           selectedVerses={[1, 2]}
//         />
//         <ChapterDisplay
//           book={book}
//           chapterIndex={1}
//           verses={verses}
//           displayCode
//           selectedVerses={[1, 2]}
//         />
//       </div>
//     )
//   }
// }

const book = {
  id: 1153072783907,
  name: '创世纪',
  chapterCount: 40
}
const versions = [{ name: '和合本', id: 'cuvs' }]
class Read extends React.PureComponent {
  render() {
    return (
      <div>
        <BibleDisplayContainer
          book={book}
          chapterIndex={1}
          versions={versions}
        />
      </div>
    )
  }
}

export default Read
