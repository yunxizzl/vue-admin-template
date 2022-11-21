<template>
    <div class="app-container">
       <!--  <input
      type="text"
      placeholder="请输入用户名"
      v-model="searchDto.where.adrUsername"
    />
    <select v-model="searchDto.where.adrProvince">
      <option
        v-for="(item, index) in provinceArr"
        :key="index"
        :value="item.name"
      >
        {{ item.name }}
      </option>
    </select>
    <input type="button" value="search" @click="search()" />
    <table style="width: 100%;" width="60%" border="1px solid gray"  cellspacing="0px">
                    <tr>
                        <td>用户名</td>
                        <td>省份</td>
                        <td>城市</td>
                        <td>区/街道</td>
                        <td>操作</td>
                    </tr>
                    <tr v-for="(item, index) in addressList" :key="index">
                        <td>{{item.adrUsername}}</td>
                        <td>{{item.adrProvince}}</td>
                        <td>{{item.adrCity}}</td>
                        <td>{{item.adrDistrict}}</td>
                        <td><button @click="update(item)">update</button><button>delete</button></td>
                    </tr>
            </table>
            
 -->
 <el-form :inline="true">
 <el-form-item>
        <el-input
            placeholder="题目搜索"
            v-model="searchDto.data.title"
            clearable @clear="search()" />
          <el-button type="primary" round @click="search()">搜索</el-button>
          <el-button type="primary" round @click="add1()">添加</el-button>
          <el-button type="primary" round @click="delete3()">批量删除</el-button>
          <el-button type="primary" round @click="tuichu()">退出登录</el-button>
    </el-form-item>
    <br/>
    
  <div style="margin: 15px 0;"></div>
</el-form>
        <br>
        <el-table @selection-change="selChange"
            :data="list"
            style="width: 100%">
            
            <el-table-column
            type="selection" width="55" >
            </el-table-column>
            <el-table-column
                prop="id"
                label="题库ID"
                >

            </el-table-column>
            <el-table-column
                prop="code"
                label="题库编号"
                >
            </el-table-column>
           <el-table-column
                prop="title"
                label="题库名称"
                >
            </el-table-column>
            <el-table-column
                prop="radioCount"
                label="单选数量"
                >
            </el-table-column>
           <el-table-column
                prop="multiCount"
                label="多选数量"
                >
            </el-table-column>
            <el-table-column
                prop="judgeCount"
                label="判断数量"
                >
            </el-table-column>
             <el-table-column
                prop="remark"
                label="题库备注"
                >
            </el-table-column>
             <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button size="mini" type="primary" icon="el-icon-delete" @click="delete1(scope.row)">删除</el-button>
                        <el-button size="mini" type="success" icon="el-icon-edit" @click="update1(scope.row)">修改</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
            <div class="block">
                <el-pagination  style="float:right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchDto.now"
                :page-sizes="[2,3,5,10]"
                :page-size="searchDto.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>

           <!--   修改弹框 -->
           <el-dialog :visible.sync="dialogFormVisible">
            <el-form :model="list1" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                <el-form-item label="题库名称" prop="title">
                    <el-input v-model="list1.title"></el-input>
                </el-form-item>
                <el-form-item label="题库备注" prop="remark">
                    <el-input v-model="list1.remark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="update2()">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form> 
           </el-dialog>

            
    </div>
</template>
<script>
import {page,delete2,update,add} from '@/api/repo/page';


export default {
   
     data() {
        return {
             
             searchDto:{
                now: 1,
                size: 3,
                data: {
                    id:"",
                    code:"",
                    title:"",
                    radioCount:0,
                    multiCount:0,
                    judgeCount:0,
                    remark:""

                }
            },
            type:"",
            idList:[],
            list:[],
            list1:{
                title:"",
                remark:""
            },
            total:0,
            pages:0,
            dialogFormVisible:false

        }
    },
    methods:{
        tuichu(
        ){
            localStorage.removeItem("token");
        },
        selChange(item){
            console.log(item);
            this.idList=[];
            for (let index = 0; index < item.length; index++) {
                this.idList.push(item[index].id);
                
            }
        },
        
        handleSizeChange(val){
                this.searchDto.size=val;
                this.search()
                
            },
        handleCurrentChange(val){
                this.searchDto.now=val;
                this.search()
            },
        

        search(){
            
             page(this.searchDto).
                then(res=>{
                    this.list =  res.list // 当前页数据
                    this.pages = res.pages // 总页数
                    this.total = res.total ; // 总记录数
                })
           },
        
           update1(item){
                this.dialogFormVisible = true;
                this.list1.title=item.title;
                this.list1.remark=item.remark;
                this.type="update";
                console.log(this.list1);
                


           },
           update2(){
            if (this.type=="add") {
                console.log(this.list1);
                add(this.list1).then(res=>{
                    this.search();
                    this.list1=[];
                    this.dialogFormVisible=false;
                })
            }else{
            update(this.list1).then(res=>{
                    this.search();
                    this.list1=[];
                    this.dialogFormVisible=false;
                })}

           },
           delete1(item){
                this.idList.push(item.id)
                console.log(this.idList);
                delete2(this.idList).then(res=>{
                    this.search()
                    this.idList=[];
                
                })    
                
            },
            delete3(){
                delete2(this.idList).then(res=>{
                    this.search()
                    this.idList=[];
                
                })  
            },
            add1(){
                this.type="add"
                this.dialogFormVisible = true;  
                
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
                    
    
                
    },
    created() {
            //页面加载完毕，立即查询第一页数据
            
            this.search();
            

    },
}
</script>