import re
import urllib
import time
import json
import news
import codecs


class xinhua_Spider:

    def __init__(self, url):

        self.myUrl = url
        print('news go')

        # 初始化加载页面并将其转码储存

    def news_index(self):
        header_dict = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36',
            'Connection': 'keep - alive',
            'Cookie': 'wdcid=6a7d5a4a5296e15d; uid=d5fc4578af4b4eb7958b2b44bb42c22d; fingerprint=b89a658fa51db9c9d8388cfeae4aa78f; bfdid=87205254007bf95200005f7f012f343e5c6626d1; bfd_g=87205254007bf95200005f7f012f343e5c6626d1; xh_regionalNews_v1=7; bdshare_firstime=1551144239817; tma=182794287.41000983.1550198435309.1550198435309.1551144305960.2; tmd=2.182794287.41000983.1550198435309.; pc=4b54cb1749f087e336f0eb08bfc2b634.1551143857.1551316965.4; RT="sl=0&ss=1551317335634&tt=0&obo=0&sh=&dm=xinhuanet.com&si=66d14011-0481-44f1-bdc5-8c8b5d3a1480&ld=1551317342530&nu=http%3A%2F%2Fwww.news.cn%2Fpolitics%2F&cl=1551319313920&r=http%3A%2F%2Fwww.xinhuanet.com%2Fpolitics%2F&ul=1551332188468&hd=1551332188533"; wdlast=1551336706',
            'Upgrade - Insecure - Requests': 1
        }

        request = urllib.request.Request(self.myUrl, headers=header_dict)
        response = urllib.request.urlopen(request)
        myPage = response.read().decode("UTF-8");

        # myPage = urllib.request.urlopen(self.myUrl).read().decode("UTF-8")
        pageNid = self.page_nid(myPage)
        # print (u'文章名称：' + title)
        # 获取最终的数据
        self.save_data(pageNid)

        # 用来计算一共有多少页

    def page_nid(self, myPage):
        # 匹配 "共有<span class="red">12</span>页" 来获取一共有多少页
        myMatch = re.search('pageNid":\["(\d+?)"\]', myPage, re.S)
        if myMatch:
            pageNid = int(myMatch.group(1))
            print('pageNid=%s' % pageNid)
        else:
            pageNid = 0
            print('no nid')
        return pageNid

    def save_data(self, pageNid):
        # 加载页面数据到数组中
        shortNewsUrl = 'http://qc.wa.news.cn/nodeart/list?nid=%s&pgnum=1&cnt=10&tp=1&orderby=1' % pageNid
        shortNewspage = urllib.request.urlopen(shortNewsUrl).read().decode("UTF-8")
        results = json.loads(shortNewspage[1:-1])['data']['list']

        filename = time.strftime("%Y-%m-%d", time.localtime())
        f = codecs.open(filename + '.txt', 'w+', encoding='utf-8')
        newsList = []
        for result in results:
            temp = news.News(str(result['Title']), result['LinkUrl'],
                             str(result['Abstract']))
            newsList.append(temp.__dict__)

        data = json.dumps(newsList, ensure_ascii=False)
        f.write(data)
        f.write("\n")
        f.close()
        input();

        # 获取页面源码并将其存储到数组中


newsUrl = 'http://www.xinhuanet.com/politics/'

# 调用
mySpider = xinhua_Spider(newsUrl)
mySpider.news_index()
