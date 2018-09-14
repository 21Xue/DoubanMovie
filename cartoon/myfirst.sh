#!/bin/sh
m=1
for i in `cat chapter | grep -oh '/book/cartoon/read?book_id=160&chapter_id=[0-9]*'`;  
do
	url=http://x13043.sanby.xyz$i
	curl -o $m.html $url --cookie "Cookie:PHPSESSID=4c15krt8pkg13is1ouddetinr2; link_follow_chapter_num=p3KysxhYOqS%2Fvsgn9WOMMGo%3D; x13043_user=dysDw4L2iIJpT8WzNq%2BFAadduNbjQs6d0OfciGYCjsk47jJ505%2FoyzVbi7D5P%2FL%2FR7B%2BmzChmPvLci%2Bv7LTjs7%2Bo%2B%2BNXiSuyNXeZUrktCsvkzQZbUiPpxq%2FrniVdC3dyI3DWZc%2BDlo6he2W%2FilUA9Cbv8H7m%2BOnBJwrASm%2FBGnxO9%2B%2FtnLW9peJ6AuAaU4YHBR%2B4I1etRRRLVWohNVEH6uLSwLQe5xJm2P6rftPamG%2BXEa46sjDFtlx%2BeXFTI%2B9e%2B88hPlAnXCYRAp6Z%2Fmte%2BDHwDcymWNM0GFz1SeQz5cE%2BoEyRTLdViBo6F2edfJnnTTA5ZW%2BseKyeAaYZ7b3AdC3jGD3WzEOmpKjeUIj3pQ%3D%3D";
	let m++;
done

for i in `ls *.html`;  
do
	cat $i | grep -oh '<img data-lazyload=.* />' > test.html;
	cat test.html > $i;
	sed -i "_bak" 's/data-lazyload/src/g ; s#src="http://img.fox800.xyz/themes/wechat/yellow-theme/default-skin/src/img/default.jpg"##g' $i
done

rm -rf *.html_bak