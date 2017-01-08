<?php
namespace test\index\controller;
use \think\View;
use \think\Controller;

class Index
{
    public function index()
    {
        // $view = new View();
        // 要使得你的全局替换生效，确保你的控制器类继承think\Controller或者使用view助手函数渲染输出
        $view = new View([], \think\Config::get('view_replace_str'));
        // $view->assign('CSS', __DIR__.'/css');
        return $view->fetch('blog');
        // return __DIR__;
        // return '<style type="text/css">*{ padding: 0; margin: 0; } .think_default_text{ padding: 4px 48px;} a{color:#2E5CD5;cursor: pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family: "Century Gothic","Microsoft yahei"; color: #333;font-size:18px} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"> <h1>:)</h1><p> ThinkPHP V5<br/><span style="font-size:30px">十年磨一剑 - 为API开发设计的高性能框架</span></p><span style="font-size:22px;">[ V5.0 版本由 <a href="http://www.qiniu.com" target="qiniu">七牛云</a> 独家赞助发布 ]</span></div><script type="text/javascript" src="http://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script><script type="text/javascript" src="http://ad.topthink.com/Public/static/client.js"></script><thinkad id="ad_bd568ce7058a1091"></thinkad>';
    }

    public function test($test01 = 2, $test02 = 2) {
    	$view = new View();
    	$view->test01 = $test01;
    	$view->test02 = $test02;
    	$view->title = 'test';
    	$view->keywords = '我的测试软件';
    	return $view->fetch('fuck');
    	// return __DIR__;
    }
}
