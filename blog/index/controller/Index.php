<?php
namespace blog\index\controller;
use \think\View;
use \think\Controller;
use \think\Db;

class Index
{
    public function index()
    {
        // 要使得你的全局替换生效，确保你的控制器类继承think\Controller或者使用view助手函数渲染输出
        $view = new View([], \think\Config::get('view_replace_str'));
        if (!isset($_GET['nowtype']) || empty($_GET['nowtype'])) {
            $nowtype = 'all';
        }
        else {
            $nowtype = input('get.nowtype');
        }
        if ($nowtype === 'all') {
            $view->nowtype = '站内全部文章';
        }
        else {
            $view->nowtype = $nowtype;
        }
        if (!isset($_GET['nowpage']) || empty($_GET['nowpage'])) {
            $nowpage = 1;
        }
        else {
            $nowpage = input('get.nowpage');
        }
        if ($nowpage < 0) {
            $nowpage = 1;
        }
        $view->visitnum = DB::query('select count(*) from uhistory')[0]['count(*)']
            + DB::query('select count(*) from vhistory')[0]['count(*)'];
        $middlearticle = '';
        $newestarticle = '';
        $num = 4;
        $numsql = 'select count(*) from view_nowarticle';
        $articlesql = 'select * from view_nowarticle';
        if ($nowtype !== 'all') {
            $numsql .= ' where type = "'.$nowtype.'"';
            $articlesql .= ' where type = "'.$nowtype.'"';
        }
        $allarticle = DB::query($numsql)[0]['count(*)'];
        $limit = $allarticle - $nowpage * 4;
        if ($limit < 0) {
            $num = $limit + 4;
            $limit = 0;
        }
        $article = DB::query($articlesql.' limit '.$limit.', '.$num);
        $newarticle = DB::query($articlesql);
        // if ($nowtype === 'all') {
        //     $allarticle = DB::query('select count(*) from view_nowarticle')[0]['count(*)'];
        //     $limit = $allarticle - $nowpage * 4;
        //     if ($limit < 0) {
        //         $num = $limit + 4;
        //         $limit = 0;
        //     }
        //     $article = DB::query('select * from view_nowarticle limit '.$limit.', '.$num);
        //     $newarticle = DB::query('select * from view_nowarticle');
        // }
        // else {
        //     $allarticle = DB::query('select count(*) from view_nowarticle where type = "'.$nowtype.'"')[0]['count(*)'];
        //     $limit = $allarticle - $nowpage * 4;
        //     if ($limit < 0) {
        //         $num = $limit + 4;
        //         $limit = 0;
        //     }
        //     $article = DB::query('select * from view_nowarticle where type = "'.$nowtype.'" limit '.$limit.', '.$num);
        //     $newarticle = DB::query('select * from view_nowarticle where type = "'.$nowtype.'"');
        // }
        $allpage = ceil($allarticle / 4);
        if ($nowpage > $allpage) {
            $nowpage = $allpage;
        }
        $view->allpage = $allpage;
        $view->nowpage = $nowpage;
        $banner = '';
        // 如果文章总页数低于1，那么就不需要分页条
        if ($allpage > 0) {
            // 先将所有可能不需要‘...’的情况的$allpage的最大数求出来，这里则是5+2=7
            if ($allpage <= 7) {
                for ($i = 1; $i <= $allpage; $i++) {
                    if ($i == $nowpage) {
                        $banner .= '<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage='.$i;
                        $banner .= '" class="now">'.$i.'</a>';
                    }
                    else {
                        $banner .= '<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage='.$i.'">'.$i.'</a>';
                    }
                }   
            }
            // 剩下的情况是需要‘...’的
            else {
                // 这里是只需要前面一个‘...’的情况
                if ($nowpage <= 4) {
                    for ($i = 1; $i <= 5; $i++) {
                        if ($i == $nowpage) {
                            $banner .= '<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage='.$i;
                            $banner .= '" class="now">'.$i.'</a>';
                        }
                        else {
                            $banner .= '<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage='.$i.'">'.$i.'</a>';
                        }
                    }
                    if ($nowpage == 4) {
                        $banner .= '<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage=6">6</a>';
                    }
                    $banner .= '...<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage='.$allpage.'">'.$allpage.'</a>';
                }
                // 这里是只需要后面一个‘...’的情况
                else if ($nowpage >= $allpage - 3) {
                    $banner .= '<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage=1">1</a>...';
                    if ($nowpage == $allpage - 3) {
                        $banner .= '<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage='.($allpage - 5).'">'.($allpage - 5).'</a>';
                    }
                    for ($i = $allpage; $i > $allpage - 5; $i--) {
                        if ($i == $nowpage) {
                            $banner .= '<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage='.$i;
                            $banner .= '" class="now">'.$i.'</a>';
                        }
                        else {
                            $banner .= '<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage='.$i.'">'.$i.'</a>';
                        }
                    }
                }
                // 这里是前面后面都需要一个‘...’的情况
                else {
                    $banner .= '<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage=1">1</a>...';
                    for ($i = $nowpage - 2; $i <= $nowpage + 2; $i++) {
                        if ($i == $nowpage) {
                            $banner .= '<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage='.$i;
                            $banner .= '" class="now">'.$i.'</a>';
                        }
                        else {
                            $banner .= '<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage='.$i.'">'.$i.'</a>';
                        }
                    }
                    $banner .= '...<a href="__BLOG__/Index/index?nowtype='.$nowtype.'&nowpage='.$allpage.'">'.$allpage.'</a>';
                }
            }
        }
        $view->banner = $banner;
        $length = sizeof($article);
        $newlength = sizeof($newarticle);
        for ($i = $length - 1; $i >= 0; $i--) {
            $row = $article[$i];
            switch ($i) {
                case 0:
                    $class = 'forth';
                    break;
                case 1:
                    $class = 'third';
                    break;
                case 2:
                    $class = 'second';
                    break;
                case 3:
                    $class = 'first';
                    break;
                default:
                    break;
            }
            $middlearticle .= '<div class="article-list '.$class.'"><ul><a target="_blank" href="__BLOG__/Index/showArticle?ano='.$row['ano'].'">'.$row['title'];
            $middlearticle .='</a></ul><div><a target="_blank" href="__BLOG__/Index/showArticle?ano='.$row['ano'].'"><span style="background-image:url('.$row['cover'].');"';
            $middlearticle .= '></span></a></div><ul>'.date('Y-m-d H:i:s', $row['ano']).'<span>总计评论'.$row['ctimes'].'次</span></ul></div>';
        }
        for ($i = $newlength - 1; $i > $newlength - 6 && $i >= 0; $i--) {
            $row = $newarticle[$i];
            $newestarticle .= '<li><div class="item-thumbnail"><a target="_blank" href="__BLOG__/Index/showArticle?ano='.$row['ano'];
            $newestarticle .='" class="thumbnail"><span style="background-image:url('.$row['cover'].');"></span></a></div>';
            $newestarticle .= '<div class="item-inner"><p><a href="">'.$row['title'].'</a></p><p class="newest-time">'.date('Y-m-d H:i:s', $row['ano']).'</p></div></li>';
        }
        $view->middlearticle = $middlearticle;
        $view->newestarticle = $newestarticle;
        $view->commentnum = DB::query('select * from view_ctimes')[0]['allctimes'];
        $total = DB::query('select * from atype');
        if (!$total) {
            $view->lefttotal = '';
        }
        else {
            $allnum = DB::query('select * from view_allarticles')[0]['totalnum'];
            $lefttotal = '<li><a href="__BLOG__/Index/index?nowtype=all&nowpage=1">全部文章</a><span>('.$allnum.')</span></li>';
            $totalnum = sizeof($total);
            for ($i = 0; $i < $totalnum; $i++) {
                $lefttotal .= '<li><a href="__BLOG__/Index/index?nowtype='.$total[$i]['type'].'&nowpage=1">'.$total[$i]['type'].'</a><span>('.$total[$i]['amount'].')</span></li>';
            }

            $view->lefttotal = $lefttotal;
        }
        return $view->fetch('blog');
        // return '<style type="text/css">*{ padding: 0; margin: 0; } .think_default_text{ padding: 4px 48px;} a{color:#2E5CD5;cursor: pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family: "Century Gothic","Microsoft yahei"; color: #333;font-size:18px} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"> <h1>:)</h1><p> ThinkPHP V5<br/><span style="font-size:30px">十年磨一剑 - 为API开发设计的高性能框架</span></p><span style="font-size:22px;">[ V5.0 版本由 <a href="http://www.qiniu.com" target="qiniu">七牛云</a> 独家赞助发布 ]</span></div><script type="text/javascript" src="http://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script><script type="text/javascript" src="http://ad.topthink.com/Public/static/client.js"></script><thinkad id="ad_bd568ce7058a1091"></thinkad>';
    }

    // 查看博客主页面是否有有效的cookie登陆信息
    public function userLogincookie() {
        // $view = new View([], \think\Config::get('view_replace_str'));
        $uid = input('get.uid');
        $uidpwd = input('get.uidpwd');
        $ifuidright = DB::query('select * from user where uid = "'.$uid.'" and pwd = "'.$uidpwd.'"');

        if ($ifuidright) {
            return '1';
        }
        else {
            return '0';
        }
    }

    function addVid() {
        $vid = input('get.vid');
        $ifhas = DB::query('select * from visitor where vid = "'.$vid.'"');
        if (!$ifhas) {
            DB::query('insert into visitor values("'.$vid.'")');
        }
    }
    public function ulogin() {
        // 要使得你的全局替换生效，确保你的控制器类继承think\Controller或者使用view助手函数渲染输出
        $view = new View([], \think\Config::get('view_replace_str'));
        return $view->fetch('login');
    }

    public function showArticle() {
        $view = new View([], \think\Config::get('view_replace_str'));
        $ano = input('get.ano');
        $article = DB::query('select * from view_nowarticle where ano = "'.$ano.'"');
        $content = '';
        $content .= '<title>'.$article[0]['title'].'-许源锐的博客</title></head><body>';
        $content .= '<div id="all">';
        $content .= '<p class="title">【'.$article[0]['type'].'】'.$article[0]['title'].'</p>';
        $content .= date('Y-m-d h:i:s', $ano).'<br>'.'<a id="backMain" href="__BLOG__" target="_blank">许源锐的博客</a>';
        $content .= '</span>';
        $content .= '<div id="article" style="visibility: visible;">'.$article[0]['text'].'</div>';
        $view->content = $content;
        $message_select = DB::query('select * from comment where ano = "'.$ano.'"');
        $message = '';
        $length = sizeof($message_select);
        for ($i = $length - 1; $i >= 0; $i--) {
            $row = $message_select[$i];
            $message .= '<div class="old"><div class="left"><div class="lou">第'.($i + 1).'楼</div><div class="uid">用户:'.$row['uid'];
            $message .= '</div><div class="time">'.date('Y-m-d h:i:s', $row['time']).'</div></div>';
            $message .= '<div class="right">'.$row['message'].'</div></div>';
        }
        $view->message = $message;
        // $view->message = $length;
        return $view->fetch('article');
    }    
    public function test($test01, $test02) {
    	$view = new View();
    	$view->test01 = $test01;
    	$view->test02 = $test02;
    	$view->title = 'test';
    	$view->keywords = '我的测试软件';
    	return $view->fetch('fuck');
    	// return __DIR__;
    }
    public function userLoginregister() {
        $view = new View([], \think\Config::get('view_replace_str'));
        $uid = input('get.uid');
        $uidpwd = input('get.uidpwd');
        $type = input('get.type');

        if ($uid === '') {
            // $view->tiptype = '错误';
            // $view->tipcontext = '您未填写管理员账户';
            // return $view->fetch('tip');
            return '0';
        }
        if ($uidpwd === '') {
            // $view->tiptype = '错误';
            // $view->tipcontext = '您未填写管理员密码';
            // return $view->fetch('tip');
            return '1';
        }
        if (!$type) {
            // 对输入的用户名以及密码进行验证
            $ifuid = DB::query('select * from user where uid = "'.$uid.'"');
            if (!$ifuid) {
                // $view->tiptype = '错误';
                // $view->tipcontext = '您输入的用户名不存在';
                // return $view->fetch('tip');
                return '2';
            }
            $ifuidpwd = DB::query('select * from user where uid = "'.$uid.'" and pwd = "'.$uidpwd.'"');
            if (!$ifuidpwd) {
                // $view->tiptype = '警告';
                // $view->tipcontext = '密码错误';
                // return $view->fetch('tip');
                return '3';
            }
            return '4';
        }
        else {
            $ifhas = DB::query('select * from user where uid = "'.$uid.'"');
            if ($ifhas) {
                return '5';
            }
            $ifregister = DB::execute('insert into user values("'.$uid.'", "'.$uidpwd.'")');
            // 检测注册是否成功
            if (!$ifregister) {
                return '6';
            } 
            else {
                return '7';
            }
        }
    }
    // 添加游客的访问记录
    function addhistory() {
        $id = input('get.id');
        $ano = input('get.ano');
        $time = input('get.time');
        $type = input('get.type');
        if ($type === 'u') {
            DB::execute('insert into uhistory values("'.$id.'", "'.$ano.'", "'.$time.'")');
        }
        else { 
            DB::execute('insert into vhistory values("'.$id.'", "'.$ano.'", "'.$time.'")');
        }
    }
    // 添加文章评论
    function leaveMessage() {
        $uid = input('get.uid');
        $ano = input('get.ano');
        $time = input('get.time');
        $message = input('get.message');
        DB::execute('insert into comment values("'.$uid.'", "'.$ano.'", "'.$time.'", "'.$message.'")');
    }
}
