// Theme data — 7 themes that thread through the book.
// Each theme: bgNote (~100 字 my own context), excerpts (book quotes with source),
// queries (3-4 image search keywords).
window.THEMES = [
  {
    id: 'mobile-home',
    name: '活动房屋',
    nameEn: 'Mobile Home',
    icon: '🚐',
    bgNote: '1960 年前后，美国 mobile home（活动房屋）数量翻了近一倍，正在从蓝领贫民的临时住所变成中产家庭的新选择。它的魅力是：便宜、能跟着工作搬、享受地方公共服务却不用交房地产税——这让地方政府开始头疼。斯坦贝克一路看到它从缅因蔓延到加州河岸，把这当成了"美国人不再扎根"的一个缩影。',
    excerpts: [
      {
        source: '缅因州 · 活动屋区',
        text: '"谁有永恒？工厂关了门，你得继续往前走。景气的时候，一切欣欣向荣，你得往更好的地方去。你坐下来、饿肚子，这就是你的根。"'
      },
      {
        source: '活动屋晚餐',
        text: '厨房以塑料砖为墙，不锈钢的水槽、烤箱与炉子都与墙壁齐平。这是我有生以来最好，或者说是最舒适的一顿晚餐。我贡献了一瓶买来的威士忌，饭后大伙儿陷在垫了泡沫胶的舒服沙发中。'
      },
      {
        source: '一位农夫的解释',
        text: '这种屋子让每个家庭都有了前所未有的隐私。哭闹的宝宝吵不到老人家。新媳妇有了以前住在加盖屋中从未享有过的隐私以及自己的地方，结果婆媳问题也减少了。'
      },
      {
        source: '加州河岸',
        text: '加州也像鲱鱼产卵一样地出现了许多活动屋。到处都是活动屋区，往上缠住了山丘、往下撒向了河岸。'
      }
    ],
    queries: [
      { cn: '1960 年代活动屋区',       q: '1960s mobile home trailer park America color' },
      { cn: '活动屋内部木纹装饰',       q: 'trailer home interior wood paneling 1960s' },
      { cn: '美国中产家庭 · 活动屋',    q: 'American family 1960 mobile home photograph' },
      { cn: 'Airstream 拖车',          q: '1950s 1960s Airstream trailer coach vintage' }
    ]
  },

  {
    id: 'rocinante',
    name: '驽骍难得',
    nameEn: 'Rocinante',
    icon: '🚚',
    bgNote: '斯坦贝克出发前，向一家卡车大厂定制了一辆三吨半 GMC 客货两用车，车顶装了一间带双人床、四嘴炉、冰箱、纱窗的小屋。他给它取名 Rocinante（驽骍难得）——那是堂吉诃德那匹瘦马的名字。朋友们讽刺这趟旅行是老骑士的风车之行，他索性用 16 世纪西班牙书写体把名字漆到车身上。这辆车现存于加州 Salinas 的 National Steinbeck Center。',
    excerpts: [
      {
        source: '出发前 · 定车',
        text: '我需要一台三吨半的客货两用车，必须能够在各种严苛的情况下行驶，我还需要在车上盖间像小船船屋的屋子……一间小屋子，里面有张双人床、一个四嘴炉、暖气、冰箱、储藏室、防蚊虫的纱窗。'
      },
      {
        source: '命名',
        text: '因为这趟旅行引起了朋友间的一些讽刺的言论，所以我为这辆车命名为驽骍难得。你们应该记得，这是堂吉诃德坐骑的名字。'
      },
      {
        source: '旅行观',
        text: '旅行有自己的个性、气质、特质与独特性。旅行本身就是一个个体；世界上没有完全相同的两个个体……只有在体会出这些道理后，天生存在着流浪因子的人才能放松，并顺其自然。'
      },
      {
        source: '荒地夜营',
        text: '我面对密苏里分界时完全没有心理准备，所以看到荒地时也一样没有心理准备……我既然身为人类，也就这样从高速公路转入一条页岩岔路，往前走入孤山群中。'
      }
    ],
    queries: [
      { cn: '斯坦贝克与驽骍难得',       q: 'Steinbeck Rocinante truck 1960 photograph' },
      { cn: 'GMC 定制车顶房',          q: '1960 GMC pickup custom camper shell' },
      { cn: 'National Steinbeck Center 展品', q: 'National Steinbeck Center Rocinante exhibit Salinas' },
      { cn: '堂吉诃德的瘦马',          q: 'Don Quixote Rocinante horse Dore illustration' }
    ]
  },

  {
    id: 'fall-foliage',
    name: '秋叶',
    nameEn: 'Fall Foliage',
    icon: '🍁',
    bgNote: '斯坦贝克 1960 年 9 月底从长岛出发，北上佛蒙特、新罕布什尔、缅因，刚好撞上新英格兰最浓的秋色。新英格兰秋叶全球闻名，缘于其独有的糖枫、红枫在秋天短时间内同时变色。出生在加州的他说"这种色彩的喧闹连照片都诠释不出来"——这是整本书他第一次被美国震慑住。',
    excerpts: [
      {
        source: '佛蒙特乡村',
        text: '路边摊上堆满了金色的番瓜、赤褐色的瓠瓜，还有一篓篓又脆又甜的红苹果，每咬一口，苹果汁就像要爆出来一样。我买了苹果和一加仑的现榨苹果汁。'
      },
      {
        source: '色彩的震撼',
        text: '如果没有亲眼看到树林，我根本无法想像树林的颜色……发现这种色彩的喧闹不但真实存在，而且连照片的诠释都显得逊色与不正确，是相当令人惊讶的事情。'
      },
      {
        source: '新英格兰土生土长的一位女士',
        text: '"秋天很灿烂，而且记不住，因此总是会带来惊喜。"'
      },
      {
        source: '缅因的清晨',
        text: '一层似冰的薄雾罩住了山丘，并在我的挡风玻璃上结霜……每隔一段时间，我就会把驽骍难得驶离道路，凝视着树木、河流，以及顶上冠了高耸入云的针叶木、枞树，还撒了雪的快速隆起的山丘。'
      }
    ],
    queries: [
      { cn: '佛蒙特秋叶乡村路',         q: 'Vermont autumn foliage country road 1960s' },
      { cn: '新英格兰红枫林',           q: 'New England fall colors maple forest' },
      { cn: '缅因州覆盖桥与秋叶',       q: 'Maine autumn covered bridge foliage' },
      { cn: '怀特山脉秋色',            q: 'White Mountains New Hampshire fall foliage' }
    ]
  },

  {
    id: 'rivers',
    name: '河流',
    nameEn: 'Rivers',
    icon: '🌊',
    bgNote: '斯坦贝克横穿美国，跨越的大河是他重新感受这块土地的坐标。他说密苏里河把美国"劈"成了东西两半——此岸还是湿润的东部青草地，彼岸就是褐色的西部荒原。在密西西比河边他写过全书最沉的一段：坐在岸边咀嚼三明治，突然觉得自己病了，"病因是某种悲哀"。',
    excerpts: [
      {
        source: '尼亚加拉瀑布',
        text: '尼亚加拉瀑布非常美丽，它就像放大了的纽约时代广场的旧股票交易看板。我很庆幸自己来看了这个景点，因为从今而后，如果有人问我有没有看过尼亚加拉瀑布，我可以说有。'
      },
      {
        source: '密西西比 · 河之父',
        text: '我买了份阳春三明治后直接出城……一个令人愉快的休息处，这个地方可以让我坐下来咀嚼三明治，仔细思考事情，并望着庄严的河之父缓慢流动的棕色河水，满足心灵的需要。'
      },
      {
        source: '密苏里河 · 俾斯麦/曼丹',
        text: '这里是地图的折痕所在。这里是美国东部与美国西部的分野。俾斯麦这边是一片东部的景色：属于东部的草，散发着东部的风采与气味。密苏里河另一边的曼丹则是纯西部的景致。'
      },
      {
        source: '哥伦比亚河',
        text: '记忆中葱绿、可爱的东华盛顿依然清晰，高贵的哥伦比亚河在路易斯与克拉克的探险中留下了痕迹。'
      }
    ],
    queries: [
      { cn: '尼亚加拉瀑布 1960',       q: 'Niagara Falls 1960 postcard vintage' },
      { cn: '密西西比河驳船',          q: 'Mississippi River barge New Orleans 1960' },
      { cn: '俾斯麦密苏里河',          q: 'Missouri River Bismarck Mandan landscape 1960' },
      { cn: '哥伦比亚河峡谷',          q: 'Columbia River Gorge Oregon vintage' }
    ]
  },

  {
    id: 'homeland',
    name: '家乡',
    nameEn: 'Homeland',
    icon: '🏡',
    bgNote: '斯坦贝克 1902 年出生于加州 Salinas，长于 Pacific Grove 和 Monterey。他最成名的几本书——《愤怒的葡萄》《罐头厂街》《伊甸园东》——写的都是这块他"了解得太多所以反而说不清"的地方。这趟旅行他离家 25 年才回来，Salinas 从小镇变成八千人城镇，阿尔发拉多街全是陌生人，他在 Monterey 的 Johnny Garcia 酒吧里完成了整本书最动情的告别。',
    excerpts: [
      {
        source: '回家的困难',
        text: '我发现要写家乡南加州是件很困难的事。这其实应该是最容易写的地方，因为我对那块切进太平洋的狭长地带的了解，要多过世界上任何其他的地方。但我发现了解不只一种，而是有好多种。'
      },
      {
        source: '萨利纳斯的膨胀',
        text: '我还记得自己的出生地萨利纳斯当初骄傲地宣布第四千位居民的出现。现在这个城镇有八千位居民，而且正以让人惊慌失措的等比级数增加——三年内拥有十万人，十年内也许就会出现二十万人。'
      },
      {
        source: 'Johnny Garcia 酒吧',
        text: '在蒙特雷的强尼·贾西亚酒吧有个令人感动的聚会，有泪、有拥抱、有演说……久远的年代又爬回了他们的洞穴中。这是以前把野牛和大灰熊放进同一个笼子里的蒙特雷，一个甜美又带着敏感暴力的地方。'
      },
      {
        source: '老友的独白',
        text: '"走到街上——陌生人、外国人、千千万万的他们……我到卡蜜儿河谷，我们以前偶尔会拿着三○—三○的猎枪到那儿随便朝一个方向射击。现在就算要对着一块大理石块射击，都会伤到外国人。"'
      }
    ],
    queries: [
      { cn: 'Salinas 1960 主街',       q: 'Salinas California 1960 Main Street historic' },
      { cn: 'Monterey 罐头街',         q: 'Monterey Cannery Row 1960 Steinbeck' },
      { cn: 'Carmel Valley 1960',      q: 'Carmel Valley California 1950s 1960s' },
      { cn: 'Pacific Grove 故居',      q: 'Pacific Grove Steinbeck cottage house' }
    ]
  },

  {
    id: 'wayhouse',
    name: '驿站',
    nameEn: 'The Roadside',
    icon: '🍺',
    bgNote: '1960 年的美国正处在"旧路边"转向"州际公路"的临界点。汽车旅馆（motel）这个词诞生于 1925 年，此时正进入黄金期，塑料桌布、霓虹灯、"冬季特惠价"招牌是它的视觉符号。新英格兰小路边的 diner（弧形餐台+咖啡杯）、佛蒙特乡下卖波本和苹果酒的小酒商店、德州的德国香肠店——这些都是斯坦贝克在车里写字时的背景。',
    excerpts: [
      {
        source: '缅因 · 班戈 塑料汽车旅馆',
        text: '房价并不贵。旅馆招牌上写着"冬季特惠价"……所有的用具都是塑料制品——地板、窗帘、洁白的防热塑料桌布……只有寝具与毛巾是天然材质。马桶盖上也横摆着一张纸条，上面写着"为了您的使用安全，本马桶盖经紫外线消毒"。'
      },
      {
        source: '新英格兰清晨 路边餐厅',
        text: '餐厅客人像蕨类一样紧抱着他们的咖啡杯不放……早起的男人不仅对陌生人话不多，他们彼此间也鲜少交谈。早餐的对话都局限在一连串简洁的嘟囔中。新英格兰人天生的沉默寡言，在早餐时分臻至辉煌的完美境界。'
      },
      {
        source: '佛蒙特 · 糖槭林中的酒商店',
        text: '我订了波本、苏格兰威士忌、琴酒、苦艾酒、伏特加、品质中等的威士忌、陈年苹果酒，还有一箱啤酒。我想这些应该足够应付大多数的情况了。对一家小店来说，这是笔大生意。'
      },
      {
        source: '芝加哥 Ambassador East',
        text: '查理和我那天晚上待在一家我们可以找到的最大的汽车旅馆……我点了一点冰块与汽水，调制了一杯威士忌汽水，喝完后又喝一杯。接着我让服务生进来，点了一份汤、一块牛排，也为查理点了一份一磅重的生汉堡肉。'
      }
    ],
    queries: [
      { cn: '1960 年代汽车旅馆霓虹',    q: '1960s American roadside motel neon sign' },
      { cn: '美式 diner 早餐吧台',      q: '1950s 1960s American diner counter coffee' },
      { cn: '1960 年代酒铺内部',       q: 'American liquor store 1960 whiskey bottles shelves' },
      { cn: 'Ambassador East 芝加哥',  q: 'Ambassador East Hotel Chicago Pump Room vintage' }
    ]
  },

  {
    id: 'segregation',
    name: '种族隔离',
    nameEn: 'Segregation · New Orleans',
    icon: '🏫',
    bgNote: '1960 年 11 月 14 日，6 岁黑人女孩 Ruby Bridges 成为新奥尔良 William Frantz Elementary 第一个黑人学生，由 4 名联邦法警护送每天进校。校门口每天聚集一批白人母亲，用极其污秽的语言嘶吼她——新闻界称她们为 "The Cheerleaders"。斯坦贝克 1960 年 12 月初亲眼目睹了这场"拉拉队员秀"，他在书中写："连把这些经历写下来，都让我再次感到疲惫、无助地反胃。"',
    excerpts: [
      {
        source: '拉拉队员秀 · 现场',
        text: '第二场表演将于放学铃响起时准时开演，那张小小的黑脸必须再次面对指责她的群众……连把这些经历写下来，都让我再次感到疲惫、无助地反胃。这时，写作的目的不在乐趣。这一点都不好玩。'
      },
      {
        source: '曾经的新奥尔良',
        text: '我身处在众多好餐厅云集的新奥尔良市。我认识这儿所有的餐厅，大多数的餐厅也都认识我。但我现在无法再去加拉托餐厅吃客煎蛋卷、喝杯香槟，就像我不会到坟场跳舞一样。'
      },
      {
        source: '南方的疔疮',
        text: '我所感受到的紧张以及一种野蛮恐惧的重量，连一刻都不放过我……每个人，不论白人或黑人，都活在同样的环境中，也都呼吸着同样的空气。这个疔疮是不是一直要到爆裂的时候，才能释出里面的压力呢？'
      },
      {
        source: '南方的白人母亲',
        text: '我所提到一切美国南部的争论，事实上都与废除种族隔离行动所引发的暴行有关——孩子上学的问题，年轻黑人要求使用餐厅、公车与厕所等等被大家视为令人质疑的特权的问题。'
      }
    ],
    queries: [
      { cn: 'Ruby Bridges 进校',        q: 'Ruby Bridges William Frantz Elementary 1960' },
      { cn: '联邦法警护送',            q: 'US Marshals escort Ruby Bridges 1960 school' },
      { cn: '新奥尔良 Cheerleaders',    q: 'New Orleans school desegregation Cheerleaders 1960' },
      { cn: 'Norman Rockwell 画作',    q: 'Norman Rockwell The Problem We All Live With' }
    ]
  }
];
