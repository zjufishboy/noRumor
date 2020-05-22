-- 创建数据库rumor
CREATE DATABASE norumor;

-- 用户表设计：此部分交给授权系统，后端使用token去查询uid
CREATE TABLE norumor.user (
  id        INT                   NOT NULL,    -- 主键
  uid       INT                   NOT NULL,    -- 授权系统id
  title     VARCHAR(40)                   ,    -- 认证头衔
  PRIMARY   KEY (id)                                             
);
-- 创建谣言表information
CREATE TABLE norumor.information (
    pid      INT                  NOT NULL,    -- 主键     , 整形
    corcern  INT                  NOT NULL,    -- 关注度   , 整形
    content  VARCHAR(8000)        NOT NULL,    -- 具体内容 , 不超过10000个char
    thetime  DATE                 NOT NULL,    -- 发布日期
    truth    ENUM('TRUE','FALSE') NOT NULL,    -- 真伪
    uid      VARCHAR(20)          NOT NULL,    -- 发布者ID ，是user表中uid的外键
    pic      VARCHAR(100)         NOT NULL,    -- 封面链接
    title    VARCHAR(25)          NOT NULL,    -- 标题
    subtitle VARCHAR(100)         NOT NULL,    -- 副标题
    PRIMARY KEY (pid)
);

-- 创建问题表problem
CREATE TABLE norumor.problem (
  questionContent   VARCHAR(1000) NOT NULL,            -- 问题内容 ，不超过1000个char
  qid       INT           NOT NULL,            -- 主键ID
  thetime   DATE          NOT NULL,            -- 发布日期
  uid       VARCHAR(20)  NOT NULL,             -- 提问者ID ，是user表uid的外键
  PRIMARY KEY (qid)
);

-- 创建回答表answer
CREATE TABLE norumor.answer (
  replyContent VARCHAR(1000) NOT NULL,              -- 回答内容 ，不超过1000个char
  pid     INT           NOT NULL,              -- 主键ID
  qid     INT           NOT NULL,              -- 问题ID
  PRIMARY KEY (pid),
  foreign key (qid) references norumor.problem (qid)
);

