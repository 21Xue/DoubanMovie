import scrapy
from scrapy.loader import ItemLoader
from scrapy import Request
from scrapy.selector import Selector
from tutorial.items import DmozItem


class DmozSpider(scrapy.Spider):
    name = "dmoz"
    allowed_domains = ["www.qianjiao288.com"]
    start_urls = [
        "http://www.qianjiao288.com/forum.php?mod=forumdisplay&fid=89"
    ]

    meta = {
        'dont_redirect': True,
        'handle_httpstatus_list': [301, 302]
    }

    def parse(self, response):
        # l = ItemLoader(item=DmozItem(), response=response)
        # l.add_xpath('title', "//a[@class='s xst']/text()")
        # l.add_xpath('link', "//a[@class='s xst']/@href")
        # # yield l.load_item()

        for link in response.xpath("//a[@class='s xst']/@href"):
            yield Request(link.root, callback=self.sub_parse, meta=self.meta)

            # for sel in response.xpath("//tbody[re:test(@id,'stickthread_(.*)')]"):
            #
            #     l = ItemLoader(item=DmozItem(), response=sel)
            #     alllink = sel.xpath('.//th/a[@class="s xst"]')
            #
            #     l.add_xpath('title', './/th/a[@class="s xst"]')
            #     l.add_xpath('link', '//div[@class="product_title"]')
            #
            #     # item = DmozItem(link=alllink.xpath('@href')[0].root, title=alllink.xpath('text()')[0].root)
            #     linklist.append(item)

    def sub_parse(self, response):
        selector = Selector(response)
        tiezi = response.xpath("//div[re:test(@id,'post*')]")
        print 2
