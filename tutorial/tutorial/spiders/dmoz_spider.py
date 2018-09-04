import scrapy

from tutorial.items import DmozItem


class DmozSpider(scrapy.Spider):
    name = "dmoz"
    allowed_domains = ["www.qianjiao288.com"]
    start_urls = [
        "http://www.qianjiao288.com/forum.php?mod=forumdisplay&fid=89"
    ]

    def parse(self, response):
        linklist = []

        for sel in response.xpath("//tbody[re:test(@id,'stickthread_(.*)')]"):
            alllink = sel.xpath('.//th/a[@class="s xst"]')
            # .xpath('@href').extract()
            item = DmozItem(link=alllink.xpath('@href')[0].root, title=alllink.xpath('text()')[0].root)


            linklist.append(item)
        print linklist
