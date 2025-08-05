首页
  产品销量，收入，加单率。
  技师排名，收入，加单率。
  订单列表
（产品-列表，CRUD  技师-列表，RUD， 订单）
待办（照片审核，报警信息）
  待办流程
  已办流程
报警（及时响应）
  报警处理
  处理详细
  回访记录
账务（总收入，收入比例）
  收入记录
  分配比例
  城市收入分析


https://poe.com/

# local
dev
http://localhost:8001/devclient/
http://localhost:8001/devtech/
http://localhost:8001/devservice/
prod
http://localhost:8001/prodclient/
http://localhost:8001/prodtech/
http://localhost:8001/prodservice/
backend
http://127.0.0.1:8000/docs

# publish
dev
http://visualstreet.cn/devclient/
http://visualstreet.cn/devtech/
http://visualstreet.cn/devservice/
prod
http://visualstreet.cn/prodclient/
http://visualstreet.cn/prodtech/
http://visualstreet.cn/prodservice/
backend
http://visualstreet.cn:8000/docs

# 发布版本信息配置（Prod）
  # api/apiClient.js
    const apiClient = axios.create({
      // baseURL: process.env.REACT_APP_API_URL,
      baseURL: "http://visualstreet.cn:8000",
      // baseURL: "http://120.26.38.176:8000",
      // baseURL: "http://127.0.0.1:8000",
      timeout: 10000,
    });
  # webpack.config.js
    const baseUrl = 'prodclient' //生产环境
    // const baseUrl = 'devclient'  //开发环境
  # util/config.js
    // export const isDev = true
    export const isDev = false
    // 用于上线测试版本，生成版本
    // export const baseUrl = `devclient`
    export const baseUrl = `prodclient`


# GIT 
  代码提交：
    添加所有文件：
    git add .
    执行第一次提交，并添加提交信息：
    git commit -m "初次提交"
    如果你还没有将本地仓库与远程仓库关联，可以使用以下命令添加远程仓库：
    git remote add origin <远程仓库URL>
    如果你想将第一次提交推送到远程仓库，使用以下命令：
    git push -u origin main

  你可以通过以下命令检查哪些文件将被忽略：
  bash
  git check-ignore -v *

remove macOS 系统文件
find .  -name "._*" | xargs rm -f

find . -name "._*" -print
find . -name "._*" -delete
git rm --cached .gitignore

# 技师端
机器人位置更新；
https://restapi.amap.com/v3/place/text?keywords=雷迪森&offset=20&page=1&extensions=all&key=1c4a139d09e6d072011d125b6d54d4e6


泰到位出行规则：
出租出行，白天起步15元（3公里），夜间起步15元，里程计价2.5元1公里，22:00 点后3.55元1公里;超过20:00点后只可选择出租出行。
爱尚网约出行规则：
起步价11元（3公里），超过3公里后每公里3元
尚达元规则：
起步价14元（3公里），白天2.5元1公里，夜间3.5元1公里, 22点后算晚上