<?php
namespace blog\manager\controller;
use \think\View;
use \think\Controller;
use \think\Db;

class Index
{
    public function index()
    {
        // 要使得你的全局替换生效，确保你的控制器类继承think\Controller或者使用view助手函数渲染输出
        $view = new View([], \think\Config::get('view_replace_str'));
        return $view->fetch('index');
    }

    public function manage() {
    	// 要使得你的全局替换生效，确保你的控制器类继承think\Controller或者使用view助手函数渲染输出
        $view = new View([], \think\Config::get('view_replace_str'));
        return $view->fetch('manage');
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
        return $view->fetch('article');
    }

    public function managerLoginregister() {
    	$view = new View([], \think\Config::get('view_replace_str'));
    	$mid = input('get.mid');
        $midpwd = input('get.midpwd');
    	$type = input('get.type');

        if ($mid === '') {
        	// $view->tiptype = '错误';
        	// $view->tipcontext = '您未填写管理员账户';
        	// return $view->fetch('tip');
        	return '0';
        }
        if ($midpwd === '') {
        	// $view->tiptype = '错误';
        	// $view->tipcontext = '您未填写管理员密码';
        	// return $view->fetch('tip');
        	return '1';
        }
        if (!$type) {
	        // 对输入的用户名以及密码进行验证
	        $ifmid = DB::query('select * from manager where mid = "'.$mid.'"');
	        if (!$ifmid) {
	        	// $view->tiptype = '错误';
	        	// $view->tipcontext = '您输入的用户名不存在';
	        	// return $view->fetch('tip');
	        	return '2';
	        }
	        $ifmidpwd = DB::query('select * from manager where mid = "'.$mid.'" and pwd = "'.$midpwd.'"');
	        if (!$ifmidpwd) {
	        	// $view->tiptype = '警告';
	        	// $view->tipcontext = '密码错误';
	        	// return $view->fetch('tip');
	        	return '3';
	        }
	        elseif ($ifmidpwd[0]['type'] === 'u') {
	        	return '4';
	        }
	        return '5';
	    }
	    else {
	    	$ifhas = DB::query('select * from manager where mid = "'.$mid.'"');
	    	if ($ifhas) {
	    		return '6';
	    	}
 	    	$ifregister = DB::execute('insert into manager values("'.$mid.'", "'.$midpwd.'", "'.$type.'")');
	        // 检测注册是否成功
	        if (!$ifregister) {
	        	return '7';
	        } 
	        else {
	        	return '8';
	        }
	    }
    }
    // public function managerregister() {
    // 	$view = new View([], \think\Config::get('view_replace_str'));
    //     $mid = input('get.mid');
    //     $midpwd = input('get.midpwd');
    // 	$type = input('get.type');

    // 	if ($mid === '') {
    //     	return '0';
    //     }
    //     elseif ($midpwd === '') {
    //     	return '1';
    //     }
    //     $ifregister = DB::execute('insert into manager values("'.$mid.'", "'.$midpwd.'", "'.$type.'")');
    //     // 检测注册是否成功
    //     if (!$ifregister) {
    //     	return '2';
    //     } 
    //     else {
    //     	return '3';
    //     }
    // }
    // 查看管理员页面是否有有效的cookie登陆信息
    public function managerLogincookie() {
        // $view = new View([], \think\Config::get('view_replace_str'));
        $mid = input('get.mid');
        $midpwd = input('get.midpwd');
        $ifmidright = DB::query('select * from manager where mid = "'.$mid.'" and pwd = "'.$midpwd.'"');

        if ($ifmidright) {
            return $ifmidright[0]['type'];
        }
        else {
            return '0';
        }
    }
    // 超级管理员授权
    public function superAuthorize() {
        $mid = input('get.mid');
        if (!$mid) {
            $view = new View([], \think\Config::get('view_replace_str'));
            $unvalidmanager = DB::query('select * from manager where type= "u"');
            // var_dump($unvalidmanager);
            $num_rows = sizeof($unvalidmanager);
            $unvalid = '';
            for ($i = 0; $i < $num_rows; $i++) {
                $unvalid .= '<tr><td id=name'.$i.'>'.$unvalidmanager[$i]['mid'].'</td><td><input id="$'.$i.'" type="checkbox" style="cursor: pointer;"></td></tr>';
            }
            $view->unvalid = $unvalid;
            return $view->fetch('superauthorize');
        }
        else {
            $validresult = DB::execute('update manager set type = "v" where mid = "'.$mid.'"');
            if ($validresult) {
                return '已授权';
            }
            return '授权失败';
        }
    }
    public function articleToDB() {
        if (!isset($_GET['article']) || empty($_GET['article']) || trim($_GET['article']) === '') {
            return '您还没有编辑文章';
        }
        if (!isset($_GET['kind']) || empty($_GET['kind']) || trim($_GET['kind']) === '') {
            return '您还没有选择文章种类';
        }
        if (!isset($_GET['title']) || empty($_GET['title']) || trim($_GET['title']) === '') {
            return '您还没有编辑标题';
        }
        if (!isset($_GET['cover']) || empty($_GET['cover']) || trim($_GET['cover']) === '') {
            return '您还没有编辑文章封面图片';
        }
        if (!isset($_GET['mid']) || empty($_GET['mid']) || trim($_GET['mid']) === '') {
            return '没有管理员登陆';
        }
        // 此处在接收到经过编码的article后，通过=操作符，实现了解码
        $time = (string)time();
        $atno = $time;
        $type = $_GET['kind'];
        $title = $_GET['title'];
        $cover = $_GET['cover'];
        $text = $_GET['article'];
        $mid = $_GET['mid'];

        // 查询文章类型是否已经存在
        $ifexistkind = DB::query('select * from atype where type = "'.$type.'"');
        if (!$ifexistkind) {
            DB::execute('insert into atype values("'.$atno.'", "'.$type.'", 0, "'.$mid.'")');
        }
        else {
            $atno = $ifexistkind[0]['atno'];
            // 考虑写成触发器
            // DB::execute('update atype set amount = amount + 1 where atno = "'.$atno.'"');
        }
        $ifinsert = DB::execute('insert into article values("'.$time.'", "'.$atno.'", "'.$title.'", "'.$cover.'", "'.$text.'", 0)');
        if (!$ifinsert) {
            return '失败！管理员文章发布失败！';
        }
        else {
            // 考虑写个存储过程;
            // DB::execute('insert into mhistory values("'.$mid.'", "'.$title.'", "'.$time.'", "c")');
            DB::execute('call blog.insert_mhistory("'.$mid.'", "'.$title.'", "'.$time.'", "c")');
            // DB::execute()
            return '成功！管理员文章发布成功！';
        }
    }
    public function getarticle() {
        $view = new View([], \think\Config::get('view_replace_str'));
        if (!isset($_GET['page']) || empty($_GET['page'])) {
            return $_GET['page'].'参数错误';
        }
        $page = $_GET['page'];
        $limit = ($page - 1) * 10;
        $allarticle = DB::query('select * from article');
        $num_select_all_result = sizeof($allarticle);
        // 计算并打印出当前数据库文章的总页数，每页10条文章
        echo ceil($num_select_all_result / 10);
        // 打印表头
        echo '<tr style="color: #C3C3C3; font-weight: bold; font-size: 30px;"><td style="padding: 10px 15px;">序号</td><td style="padding: 10px 15px;">编辑日期</td><td style="padding: 10px 15px;">文章类别</td><td style="padding: 10px 15px;">文章标题</td><td style="padding: 10px 15px;">作者</td><td style="padding: 10px 15px;">删除？</td><td style="padding: 10px 15px;">修改？</td><td style="padding: 10px 15px;">预览？</td></tr>';
        // echo '<tr style="color: #C3C3C3; font-weight: bold; font-size: 30px;"><td style="padding: 10px 15px;">序号</td><td style="padding: 10px 15px;">编辑日期</td><td style="padding: 10px 15px;">文章类别</td><td style="padding: 10px 15px;">作者->文章标题</td><td style="padding: 10px 15px;">删除？</td><td style="padding: 10px 15px;">修改？</td><td style="padding: 10px 15px;">预览？</td></tr>';
        $select_result = DB::query('select * from article limit '.$limit.',10');
        // 获得查询结果数量
        $num_select_result = sizeof($select_result);
        // 打印文章列表，没有则什么都不会打印
        for ($i = 0; $i < $num_select_result; $i++) {
            // $row = $select_result->fetch_assoc();
            $row = $select_result[$i];
            $date = date('Y-m-d H:i:s', $row['ano']);
            $ano = $row['ano'];
            $type = DB::query('select type from atype where atno = "'.$row['atno'].'"')[0]['type'];
            $author = DB::query('select distinct mid from mhistory where title = "'.$row['title'].'"')[0]['mid'];
            if ($page === '1' && $i < 9) {
                // echo '<tr style="color: #C3C3C3; font-weight: bold;"><td>0'.(($page - 1) * 10 + $i + 1).'</td><td>'.$date.'</td><td>'.$type.'</td><td><span style="color: #fff;">'.$author.'</span>->'.$row['title'].'</td><td id="remove'.$ano.'" style="cursor: pointer;">删除</td><td style="cursor: pointer;" id="update'.$ano.'">修改</td><td id="preview'.$ano.'"><a href="./articleShow.php?ano='.$ano.'" target="_blank">预览</a></td></tr>';
                echo '<tr style="color: #C3C3C3; font-weight: bold;"><td>0'.(($page - 1) * 10 + $i + 1).'</td><td>'.$date.'</td><td>'.$type.'</td><td>'.$row['title'].'</td><td>'.$author.'</td><td id="remove'.$ano.'" style="cursor: pointer;">删除</td><td style="cursor: pointer;" id="update'.$ano.'">修改</td><td id="preview'.$ano.'"><a href="./showArticle?ano='.$ano.'" target="_blank">预览</a></td></tr>';
            }
            else {
                echo '<tr style="color: #C3C3C3; font-weight: bold;"><td>'.(($page - 1) * 10 + $i + 1).'</td><td>'.$date.'</td><td>'.$type.'</td><td>'.$row['title'].'</td><td>'.$author.'</td><td id="remove'.$ano.'" style="cursor: pointer;">删除</td><td style="cursor: pointer;" id="update'.$ano.'">修改</td><td id="preview'.$ano.'"><a href="./showArticle?ano='.$ano.'" target="_blank">预览</a></td></tr>';
            }
        }
    }
    public function getoneArticle() {
        if (!isset($_GET['time']) || empty($_GET['time'])) {
            return;
        }
        $article_time = $_GET['time'];

        // 通过文章序号查询文章
        // 获得查询结果
        $select_result = DB::query('select * from article where ano = "'.$article_time.'"');
        // 获得查询结果数量
        $num_select_result = sizeof($select_result);

        for ($i = 0; $i < $num_select_result; $i++) {
            $row = $select_result[$i];
            // $kind = str_replace('\\', '\\\\', $row['kind']);
            // $title = str_replace('\\', '\\\\', $row['title']);
            // $cover = str_replace('\\', '\\\\', $row['cover']);
            // $article = str_replace('\\', '\\\\', $row['article']);
            // 将各字符串中的双引号"进行转义处理，否则前端用JSON.parse的时候
            // 会将双引号"误认为包裹对象名的双引号"
            // 之所以不将此步骤放在前端中处理，是因为后台传到前端时，
            // 不仅是json值中会含有双引号"，对象名也有包裹它的双引号"
            // 这时如果用前端去处理转义，就会误将包裹对象名的双引号"也转义了
            // 导致不能成功使用JSON.parse函数
            $kind = DB::query('select type from atype where atno = "'.$row['atno'].'"')[0]['type'];
            $kind = str_replace('"', '\"', $kind);
            $title = str_replace('"', '\"', $row['title']);
            $cover = str_replace('"', '\"', $row['cover']);
            $article = str_replace('"', '\"', $row['text']);
            return '{"kind": "'.$kind.'", "title": "'.$title.'", "cover": "'.$cover.'", "article": "'.$article.'"}';
        }

    }
    // 删除文章
    public function removearticle() {
        if (!isset($_GET['time']) || empty($_GET['time'])) {
            return '无法获取文章标识';
        }
        // 获取发生删除事件的时间
        $removetime = (string)time();
        $time = $_GET['time'];
        // 获取文章作者以及文章标题
        $title = DB::query('select title from article where ano = "'.$time.'"')[0]['title'];
        $mid = DB::query('select distinct mid from mhistory where title = "'.$title.'"')[0]['mid'];
        // 抢先在文章被删除之前获取该文章的文章类型号
        $atno = DB::query('select atno from article where ano = "'.$time.'"');
        $delete_result = DB::execute('delete from article where ano = "'.$time.'"');

        if (!$delete_result) {
            return '删除失败';
        }
        else {
            // 考虑写为触发器
            // DB::execute('update atype set amount = amount - 1 where atno = "'.$atno[0]['atno'].'"');
            // 考虑写为存储过程
            // DB::execute('insert into mhistory values("'.$mid.'", "'.$title.'", "'.$removetime.'", "d")');
            DB::execute('call blog.insert_mhistory("'.$mid.'", "'.$title.'", "'.$removetime.'", "d")');
            return '成功删除了一篇文章！';
        }
    }
    // 更新文章
    public function updateArticle() {
        if (!isset($_GET['article']) || empty($_GET['article']) || trim($_GET['article']) === '') {
            return $_GET['article'].'警告:您编辑的文章为空';
        }
        if (!isset($_GET['kind']) || empty($_GET['kind']) || trim($_GET['kind']) === '') {
            return '警告:文章种类为空';
        }
        if (!isset($_GET['title']) || empty($_GET['title']) || trim($_GET['title']) === '') {
            return '警告:文章标题为空';
        }
        if (!isset($_GET['cover']) || empty($_GET['cover']) || trim($_GET['cover']) === '') {
            return '警告:文章封面图片为空';
        }
        // 获取发生更新文章事件的时间
        $updatetime = (string)time();
        $time = $_GET['time'];
        $kind = $_GET['kind'];
        $title = $_GET['title'];
        $cover = $_GET['cover'];
        $article = $_GET['article'];
        $atno = '';
        $atnoresult = DB::query('select atno from atype where type = "'.$kind.'"');
        if (!$atnoresult) {
            return '文章修改失败！文章类型不存在';
        }
        else {
            $atno = $atnoresult[0]['atno'];
        }
        $old = DB::query('select * from article where ano = "'.$time.'"');
        if ($old[0]['atno'] === $atno && $old[0]['title'] === $title && $old[0]['cover'] === $cover && $old[0]['text'] === $article) {
            return '您并没有做出任何修改';
        }
        $updateresult = DB::execute('update article set atno = "'.$atno.'", title = "'.$title.'", cover = "'.$cover.'", text = "'.$article.'" where ano = "'.$time.'"');
        if (!$updateresult) {
            return '发生错误，文章更新失败！';
        }
        else {
            // 获取文章作者
            $mid = DB::query('select distinct mid from mhistory where title = "'.$title.'"')[0]['mid'];
            // 考虑写为存储过程
            // DB::execute('insert into mhistory values("'.$mid.'", "'.$title.'", "'.$updatetime.'", "u")');
            DB::execute('call blog.insert_mhistory("'.$mid.'", "'.$title.'", "'.$updatetime.'", "u")');
            return '文章修改成功保存！';
        }
    }
    public function test() {
        $time = '1482987634';
        $title = DB::query('select title from article where ano = "'.$time.'"')[0]['title'];
        // $atno = DB::query('select atno from article where ano = "'.$time.'"');
        // $update = DB::execute('update atype set amount = amount - 1 where atno = "'.$atno[0]['atno'].'"');
        var_dump($title);
    }
    // // 超级管理员授权
    // public function superAuthorize() {
    //     $mid = input('get.mid');
    //     if (!$mid) {
    //         $view = new View([], \think\Config::get('view_replace_str'));
    //         $unvalidmanager = DB::query('select * from manager where type= "u"');
    //         // var_dump($unvalidmanager);
    //         $num_rows = sizeof($unvalidmanager);
    //         $unvalid = '';
    //         for ($i = 0; $i < $num_rows; $i++) {
    //             $unvalid .= '<tr><td id=name'.$i.'>'.$unvalidmanager[$i]['mid'].'</td><td><input id="$'.$i.'" type="checkbox" style="cursor: pointer;"></td></tr>';
    //         }
    //         $view->unvalid = $unvalid;
    //         return $view->fetch('superauthorize');
    //     }
    //     else {
    //         $validresult = DB::execute('update manager set type = "v" where mid = "'.$mid.'"');
    //         if ($validresult) {
    //             return '已授权';
    //         }
    //         return '授权失败';
    //     }
    // }
    public function messageManage() {
        // 要使得你的全局替换生效，确保你的控制器类继承think\Controller或者使用view助手函数渲染输出
        $view = new View([], \think\Config::get('view_replace_str'));
        $message_result = DB::query('select * from comment');
        $num_rows = sizeof($message_result);
        $message = '';
        for ($i = 0; $i < $num_rows; $i++) {
            $row = $message_result[$i];
            $title = DB::query('select title from article where ano = "'.$row['ano'].'"')[0]['title'];
            $message .= '<tr><td style="display: none;">'.$row['time'].'</td><td style="display: none;">'.$row['ano'].'</td>';
            $message .= '<td>'.date('Y-m-d h:i:s', $row['time']).'</td><td>'.$row['uid'].'</td><td>'.$title.'</td>';
            $message .= '<td id ="name'.$i.'">';
            $message .= $row['message'].'</td><td><input id="$'.$i.'" type="checkbox" style="cursor: pointer;"></td></tr>';
        }
        $view->message = $message;
        return $view->fetch('messageManage');
    }
    public function uidManage() {
        // 要使得你的全局替换生效，确保你的控制器类继承think\Controller或者使用view助手函数渲染输出
        $view = new View([], \think\Config::get('view_replace_str'));
        $uid_result = DB::query('select * from user');
        $num_rows = sizeof($uid_result);
        $user = '';
        for ($i = 0; $i < $num_rows; $i++) {
            $row = $uid_result[$i];
            $user .= '<tr><td id=name'.$i.'>'.$row['uid'].'</td><td><input id="$'.$i.'" type="checkbox" style="cursor: pointer;"></td></tr>';
        }
        $view->user = $user;
        return $view->fetch('uidManage');
    }
    public function removemessage() {
        $uid = input('get.uid');
        $ano = input('get.ano');
        $time = input('get.time');
        // $ano = DB::query('select ano from article where title = "'.$title.'"')[0]['ano'];
        $ifdelete = DB::execute('delete from comment where uid = "'.$uid.'" and ano = "'.$ano.'" and time = "'.$time.'"');
        if ($ifdelete) {
            return '删除该条评论成功';
        }
        else {
            return '删除该条评论失败';
        }
    }
    public function removeuid() {
        $uid = input('get.uid');
        $ifdelete = DB::execute('delete from user where uid = "'.$uid.'"');
        if ($ifdelete) {
            return '删除该用户成功';
        }
        else {
            return '删除该用户失败';
        }
    }
    function showhistory() {
        // 要使得你的全局替换生效，确保你的控制器类继承think\Controller或者使用view助手函数渲染输出
        $view = new View([], \think\Config::get('view_replace_str'));
        $vhistory_result = DB::query('select * from vhistory');
        $num_rows = sizeof($vhistory_result);
        $vhistory = '';
        for ($i = 0; $i < $num_rows; $i++) {
            $row = $vhistory_result[$i];
            $title = DB::query('select title from article where ano = "'.$row['ano'].'"')[0]['title'];
            $vhistory .= '<tr><td id="name'.$i.'">'.date('Y-m-d h:i:s', $row['time']).'</td><td>'.$row['vid'].'</td><td>'.$title.'</td></tr>';
        }
        $view->vhistory = $vhistory;
        return $view->fetch('showVhistory');
    }
}
