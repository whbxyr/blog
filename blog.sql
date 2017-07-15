-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-12-31 08:40:19
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `blog`
--

DELIMITER $$
--
-- 存储过程
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_mhistory`(IN `mid` CHAR(10), IN `title` CHAR(50), IN `time` CHAR(10), IN `type` CHAR(1))
begin
    insert into mhistory values(mid, title, time, type);
end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `ano` char(10) CHARACTER SET utf8 NOT NULL COMMENT '文章号',
  `atno` char(10) CHARACTER SET utf8 NOT NULL COMMENT '类型号',
  `title` char(50) CHARACTER SET utf8 NOT NULL COMMENT '标题',
  `cover` text CHARACTER SET utf8 COMMENT '封面',
  `text` text CHARACTER SET utf8 COMMENT '内容',
  `ctimes` int(4) NOT NULL COMMENT '评论次数',
  PRIMARY KEY (`ano`),
  UNIQUE KEY `title` (`title`),
  KEY `fk_ar_at_atno` (`atno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='文章表';

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`ano`, `atno`, `title`, `cover`, `text`, `ctimes`) VALUES
('1482993593', '1482993593', 'hello， world', 'http://cdn.aixifan.com/dotnet/artemis/u/cms/www/201411/28140924e5gu.jpg?imageView2/1/w/160/h/90', '&lt;p&gt;fdsfsd&lt;/p&gt;&lt;p&gt;dfgf&lt;/p&gt;', 1),
('1483003013', '1483003013', 'scscd01', 'https://gss0.baidu.com/8_BXsjip0QIZ8tyhnq/timg?wh_rate=0&amp;wapiknow&amp;quality=100&amp;size=w250&amp;sec=0&amp;di=de3d64340a7461be50afc53f1bccdc0f&amp;src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fwh%253D800%252C450%2Fsign%3D805e3ef44f2309f7e73aa51a423e20c7%2Ffaedab64034f78f03822b19370310a55b3191ca0.jpg', '&lt;p&gt;scscd01&lt;/p&gt;&lt;p&gt;bbj&lt;/p&gt;', 6),
('1483003112', '1483003013', 'sdscd01', 'https://gss0.baidu.com/8_BXsjip0QIZ8tyhnq/timg?wh_rate=0&amp;wapiknow&amp;quality=100&amp;size=w250&amp;sec=0&amp;di=2f8cbb4eb7d669d563c124b0c1fd345a&amp;src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fwh%253D800%252C450%2Fsign%3D2258b7524390f60304e5944f09229f2f%2F7e3e6709c93d70cf931d916ef1dcd100bba12be9.jpg', '&lt;p&gt;sdscd01&lt;/p&gt;&lt;p&gt;dsfs&lt;/p&gt;', 1),
('1483017537', '1482928265', 'sdvfsdfsdf', 'http://cdn.aixifan.com/dotnet/artemis/u/cms/www/201408/11080550mfjh.jpg?imageView2/1/w/160/h/90', '&lt;p&gt;dgdfgsfdb&lt;/p&gt;&lt;p&gt;bzbxgf&lt;/p&gt;&lt;p&gt;cvbfg&lt;/p&gt;&lt;p&gt;dgdfgsfdb&lt;/p&gt;&lt;p&gt;bzbxgf&lt;/p&gt;&lt;p&gt;cvbfg&lt;/p&gt;&lt;p&gt;dgdfgsfdb&lt;/p&gt;&lt;p&gt;bzbxgf&lt;/p&gt;&lt;p&gt;cvbfg&lt;/p&gt;&lt;p&gt;dgdfgsfdb&lt;/p&gt;&lt;p&gt;bzbxgf&lt;/p&gt;&lt;p&gt;cvbfg&lt;/p&gt;&lt;p&gt;dgdfgsfdb&lt;/p&gt;&lt;p&gt;bzbxgf&lt;/p&gt;&lt;p&gt;cvbfg&lt;/p&gt;&lt;p&gt;dgdfgsfdb&lt;/p&gt;&lt;p&gt;bzbxgf&lt;/p&gt;&lt;p&gt;cvbfg&lt;/p&gt;&lt;p&gt;dgdfgsfdb&lt;/p&gt;&lt;p&gt;bzbxgf&lt;/p&gt;&lt;p&gt;cvbfg&lt;/p&gt;&lt;p&gt;dgdfgsfdb&lt;/p&gt;&lt;p&gt;bzbxgf&lt;/p&gt;&lt;p&gt;cvbfg&lt;/p&gt;&lt;p&gt;好几年&lt;/p&gt;', 1),
('1483020770', '1483020770', '来来来', 'http://cdn.aixifan.com/dotnet/artemis/u/cms/www/201604/29220848sb604cxk.jpg?imageView2/1/w/160/h/90', '&lt;p&gt;大法师&lt;/p&gt;', 0),
('1483020840', '1483020770', '测试', 'http://imgs.aixifan.com/cms/2016_11_11/1478851298755.png?imageView2/1/w/260/h/164/q/100', '&lt;p&gt;大法师&lt;/p&gt;&lt;p&gt;你好&lt;/p&gt;&lt;p&gt;给过吧&lt;/p&gt;', 0);

--
-- 触发器 `article`
--
DROP TRIGGER IF EXISTS `atype_afert_delete_article`;
DELIMITER //
CREATE TRIGGER `atype_afert_delete_article` AFTER DELETE ON `article`
 FOR EACH ROW BEGIN
    declare oldamount INT;
    set oldamount = (select amount from atype where atno = old.atno);
    update atype set amount = oldamount - 1 where atno = old.atno;
end
//
DELIMITER ;
DROP TRIGGER IF EXISTS `atype_afert_insert_article`;
DELIMITER //
CREATE TRIGGER `atype_afert_insert_article` AFTER INSERT ON `article`
 FOR EACH ROW BEGIN
    declare oldamount INT;
    set oldamount = (select amount from atype where atno = new.atno);
    update atype set amount = oldamount + 1 where atno = new.atno;
end
//
DELIMITER ;

-- --------------------------------------------------------

--
-- 表的结构 `atype`
--

CREATE TABLE IF NOT EXISTS `atype` (
  `atno` char(10) CHARACTER SET utf8 NOT NULL COMMENT '类型号',
  `type` char(20) CHARACTER SET utf8 NOT NULL COMMENT '类型名',
  `amount` int(4) NOT NULL COMMENT '文章数',
  `mid` char(20) CHARACTER SET utf8 NOT NULL COMMENT '账号',
  PRIMARY KEY (`atno`),
  KEY `fk_at_ma_mid` (`mid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='文章类型表';

--
-- 转存表中的数据 `atype`
--

INSERT INTO `atype` (`atno`, `type`, `amount`, `mid`) VALUES
('1482928062', '超算生活', 0, 'super'),
('1482928265', '前沿科技', 1, 'super'),
('1482987077', '测试类型', 0, 'super'),
('1482988192', 'sdcsd', 0, 'super'),
('1482993593', 'aaa的文章类型', 1, 'aaa'),
('1483003013', 'sdscd', 2, 'super'),
('1483020770', '数据库课设', 2, 'super'),
('1483049596', '新的文章类型', 0, 'super');

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `uid` char(20) CHARACTER SET utf8 NOT NULL COMMENT '账号',
  `ano` char(10) CHARACTER SET utf8 NOT NULL COMMENT '文章号',
  `time` char(10) CHARACTER SET utf8 NOT NULL COMMENT '时间',
  `message` text CHARACTER SET utf8 NOT NULL COMMENT '评论内容',
  PRIMARY KEY (`uid`,`ano`,`time`),
  KEY `fk_co_ar_ano` (`ano`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='普通用户评论表';

--
-- 转存表中的数据 `comment`
--

INSERT INTO `comment` (`uid`, `ano`, `time`, `message`) VALUES
('aaa', '1483003013', '1483093441', '泳钊是shabi'),
('aaa', '1483003013', '1483093531', '泳钊是shabi'),
('aaa', '1483003013', '1483093532', '泳钊是shabi'),
('aaa', '1483003013', '1483093533', '泳钊是shabi'),
('aaa', '1483003112', '1483089053', '老师给个优秀吧！'),
('ray', '1483003013', '1483086471', 'Hello teacher! Will you give an A?'),
('ray', '1483003013', '1483088858', '老师给个优秀吧');

--
-- 触发器 `comment`
--
DROP TRIGGER IF EXISTS `article_after_delete_comment`;
DELIMITER //
CREATE TRIGGER `article_after_delete_comment` AFTER DELETE ON `comment`
 FOR EACH ROW begin
declare oldctimes int;
set oldctimes = (select ctimes from article where ano = old.ano);
update article set ctimes = oldctimes - 1 where ano = old.ano;
end
//
DELIMITER ;
DROP TRIGGER IF EXISTS `article_after_insert_comment`;
DELIMITER //
CREATE TRIGGER `article_after_insert_comment` AFTER INSERT ON `comment`
 FOR EACH ROW begin
    declare oldctimes INT(4);
    set oldctimes = (select ctimes from article where ano = new.ano);
    update article set ctimes = oldctimes + 1 where ano = new.ano;
end
//
DELIMITER ;

-- --------------------------------------------------------

--
-- 表的结构 `manager`
--

CREATE TABLE IF NOT EXISTS `manager` (
  `mid` char(20) CHARACTER SET utf8 NOT NULL COMMENT '账号',
  `pwd` char(32) CHARACTER SET utf8 NOT NULL COMMENT '密码',
  `type` char(1) CHARACTER SET utf8 NOT NULL COMMENT '类型',
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='管理员表，包含超级管理员、已认证或者未认证的管理员';

--
-- 转存表中的数据 `manager`
--

INSERT INTO `manager` (`mid`, `pwd`, `type`) VALUES
('aaa', '47bce5c74f589f4867dbd57e9ca9f808', 'v'),
('bbb', '08f8e0260c64418510cefb2b06eee5cd', 'v'),
('ccc', '9df62e693988eb4e1e1444ece0578579', 'v'),
('ddd', '77963b7a931377ad4ab5ad6a9cd718aa', 'v'),
('eee', 'd2f2297d6e829cd3493aa7de4416a18f', 'v'),
('fff', '343d9040a671c45832ee5381860e2996', 'u'),
('ggg', 'ba248c985ace94863880921d8900c53f', 'v'),
('super', '1b3231655cebb7a1f783eddf27d254ca', 's'),
('xxx', 'f561aaf6ef0bf14d4208bb46a4ccb3ad', 'v');

-- --------------------------------------------------------

--
-- 表的结构 `mhistory`
--

CREATE TABLE IF NOT EXISTS `mhistory` (
  `mid` char(20) CHARACTER SET utf8 NOT NULL COMMENT '账号',
  `title` char(50) CHARACTER SET utf8 NOT NULL COMMENT '标题',
  `time` char(10) CHARACTER SET utf8 NOT NULL COMMENT '时间',
  `type` char(1) CHARACTER SET utf8 NOT NULL COMMENT '类型',
  PRIMARY KEY (`mid`,`title`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='管理员管理文章的历史表';

--
-- 转存表中的数据 `mhistory`
--

INSERT INTO `mhistory` (`mid`, `title`, `time`, `type`) VALUES
('aaa', 'aaa1', '1482982503', 'c'),
('aaa', 'aaa2', '1482982522', 'c'),
('aaa', 'aaa2', '1482983667', 'c'),
('aaa', 'aaa3', '1482982541', 'c'),
('aaa', 'aaas', '1482984388', 'c'),
('aaa', 'aaa发布的第一篇文章', '1482933746', 'c'),
('aaa', 'hello， world', '1482993593', 'c'),
('aaa', 'hello， world', '1482993633', 'u'),
('super', '??', '1483088769', 'u'),
('super', '??????', '1483087724', 'c'),
('super', '??????', '1483088950', 'c'),
('super', 'cdscdsv', '1482990735', 'c'),
('super', 'cdscdsv', '1482990756', 'd'),
('super', 'dscfsd', '1482987634', 'c'),
('super', 'dscsdcsd', '1482988192', 'c'),
('super', 'efwe', '1482989550', 'c'),
('super', 'efwe', '1482989557', 'u'),
('super', 'efwe', '1482989609', 'd'),
('super', 'fsef', '1482990196', 'c'),
('super', 'fsef', '1482990237', 'u'),
('super', 'fsef', '1483017486', 'u'),
('super', 'fsef', '1483049159', 'd'),
('super', 'fsefcx', '1482990492', 'c'),
('super', 'fsefcx', '1483043435', 'd'),
('super', 'hfhg', '1482988874', 'c'),
('super', 'hjghgghj', '1482989220', 'c'),
('super', 'scscd01', '1483003013', 'c'),
('super', 'scscd01', '1483059080', 'u'),
('super', 'sdcsd01', '1483003167', 'c'),
('super', 'sdcsd01', '1483060184', 'd'),
('super', 'sdgdg', '1482990089', 'c'),
('super', 'sdgdg', '1482990203', 'd'),
('super', 'sdsa', '1482989337', 'c'),
('super', 'sdscd01', '1483003112', 'c'),
('super', 'sdscd01', '1483060189', 'u'),
('super', 'sdvfsdfsdf', '1483017537', 'c'),
('super', 'sdvfsdfsdf', '1483087964', 'u'),
('super', '再来一篇超算生活的文章', '1482928894', 'c'),
('super', '历史日志测试', '1482987077', 'c'),
('super', '如何让IIS 能响应HTTP PUT和DELETE请求', '1482984494', 'c'),
('super', '来来大范甘迪', '1483020797', 'c'),
('super', '来来大范甘迪', '1483043246', 'd'),
('super', '来来来', '1483020770', 'c'),
('super', '测试', '1483020840', 'c'),
('super', '测试类型01', '1483003051', 'c'),
('super', '测试类型01', '1483011024', 'u'),
('super', '测试类型01', '1483043368', 'd'),
('super', '的士速递', '1483050000', 'c'),
('super', '的士速递', '1483059065', 'd'),
('super', '第一篇测试文章', '1482928062', 'c'),
('super', '第三篇测试文章', '1482928325', 'c'),
('super', '第三篇测试文章', '1482937841', 'c'),
('super', '第二篇测试文章', '1482928265', 'c'),
('super', '第四篇测试文章', '1482928494', 'c');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uid` char(20) CHARACTER SET utf8 NOT NULL COMMENT '账号',
  `pwd` char(32) CHARACTER SET utf8 NOT NULL COMMENT '密码',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='普通注册用户表';

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`uid`, `pwd`) VALUES
('aaa', '47bce5c74f589f4867dbd57e9ca9f808'),
('ccc', '9df62e693988eb4e1e1444ece0578579'),
('eee', 'd2f2297d6e829cd3493aa7de4416a18f'),
('ray', 'fb0b32aeafac4591c7ae6d5e58308344');

-- --------------------------------------------------------

--
-- 表的结构 `vhistory`
--

CREATE TABLE IF NOT EXISTS `vhistory` (
  `vid` char(10) CHARACTER SET utf8 NOT NULL COMMENT '临时账号',
  `ano` char(10) CHARACTER SET utf8 NOT NULL COMMENT '文章号',
  `time` char(10) CHARACTER SET utf8 NOT NULL COMMENT '时间',
  PRIMARY KEY (`vid`,`ano`,`time`),
  KEY `fk_vh_ar_ano` (`ano`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='游客的访问历史表';

--
-- 转存表中的数据 `vhistory`
--

INSERT INTO `vhistory` (`vid`, `ano`, `time`) VALUES
('1483019488', '1482993593', '1483086345'),
('1483019488', '1482993593', '1483090356'),
('1483019488', '1483003013', '1483090354'),
('1483019488', '1483003013', '1483093393'),
('1483019488', '1483003112', '1483046859'),
('1483019488', '1483017537', '1483046128'),
('1483019488', '1483017537', '1483046825'),
('1483019488', '1483017537', '1483048102'),
('1483019488', '1483020840', '1483039033'),
('1483019488', '1483020840', '1483088414');

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_allarticles`
--
CREATE TABLE IF NOT EXISTS `view_allarticles` (
`totalnum` decimal(32,0)
);
-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_ctimes`
--
CREATE TABLE IF NOT EXISTS `view_ctimes` (
`allctimes` decimal(32,0)
);
-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_nowarticle`
--
CREATE TABLE IF NOT EXISTS `view_nowarticle` (
`ano` char(10)
,`title` char(50)
,`cover` text
,`text` text
,`ctimes` int(4)
,`type` char(20)
);
-- --------------------------------------------------------

--
-- 表的结构 `visitor`
--

CREATE TABLE IF NOT EXISTS `visitor` (
  `vid` char(10) CHARACTER SET utf8 NOT NULL COMMENT '临时账号',
  PRIMARY KEY (`vid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='游客表';

--
-- 转存表中的数据 `visitor`
--

INSERT INTO `visitor` (`vid`) VALUES
('1483019488');

-- --------------------------------------------------------

--
-- 视图结构 `view_allarticles`
--
DROP TABLE IF EXISTS `view_allarticles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_allarticles` AS select sum(`atype`.`amount`) AS `totalnum` from `atype`;

-- --------------------------------------------------------

--
-- 视图结构 `view_ctimes`
--
DROP TABLE IF EXISTS `view_ctimes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_ctimes` AS select sum(`article`.`ctimes`) AS `allctimes` from `article`;

-- --------------------------------------------------------

--
-- 视图结构 `view_nowarticle`
--
DROP TABLE IF EXISTS `view_nowarticle`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_nowarticle` AS select `article`.`ano` AS `ano`,`article`.`title` AS `title`,`article`.`cover` AS `cover`,`article`.`text` AS `text`,`article`.`ctimes` AS `ctimes`,`atype`.`type` AS `type` from (`article` join `atype`) where (`article`.`atno` = `atype`.`atno`);

--
-- 限制导出的表
--

--
-- 限制表 `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `fk_ar_at_atno` FOREIGN KEY (`atno`) REFERENCES `atype` (`atno`) ON DELETE CASCADE;

--
-- 限制表 `atype`
--
ALTER TABLE `atype`
  ADD CONSTRAINT `fk_at_ma_mid` FOREIGN KEY (`mid`) REFERENCES `manager` (`mid`);

--
-- 限制表 `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_co_ar_ano` FOREIGN KEY (`ano`) REFERENCES `article` (`ano`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_co_us_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE;

--
-- 限制表 `mhistory`
--
ALTER TABLE `mhistory`
  ADD CONSTRAINT `fk_mh_ma_mid` FOREIGN KEY (`mid`) REFERENCES `manager` (`mid`);

--
-- 限制表 `vhistory`
--
ALTER TABLE `vhistory`
  ADD CONSTRAINT `fk_vh_ar_ano` FOREIGN KEY (`ano`) REFERENCES `article` (`ano`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_vh_vi_vid` FOREIGN KEY (`vid`) REFERENCES `visitor` (`vid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
