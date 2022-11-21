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
            placeholder="用户名"
            v-model="searchDto.where.adrUsername"
            clearable @clear="search()" >
        </el-input></el-form-item>
        <el-form-item>
        <pcr /></el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="search()">搜索</el-button>
        </el-form-item>
</el-form>
        <br>
        <el-table
            :data="addressList"
            style="width: 100%">
            <el-table-column
                prop="adrUsername"
                label="姓名"
                >
            </el-table-column>
            <el-table-column
                prop="adrPhone"
                label="电话"
                >
            </el-table-column>
            <el-table-column
                prop="adrProvince"
                label="省份">
                <template slot-scope="scope">
                    <div>
                        {{!scope.row.adrProvince?"无":scope.row.adrProvince}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="adrCity"
                label="城市">
                 <template slot-scope="scope">
                    <div>
                        {{!scope.row.adrCity?"无":scope.row.adrCity}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="adrDistrict"
                label="地区">
                 <template slot-scope="scope">
                    <div>
                        {{!scope.row.adrDistrict?"无":scope.row.adrDistrict}}
                    </div>
                </template>
            </el-table-column>
             <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button size="mini" type="primary" icon="el-icon-delete" @click="delete1(scope.row)">删除</el-button>
                        <el-button size="mini" type="success" icon="el-icon-edit" @click="update(scope.row)">修改</el-button>
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




           <!--   修改弹框 
            <el-form :model="address" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="adrUsername">
                    <el-input v-model="searchDto.where.adrUsername"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="adrPhone">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="update1('ruleForm')">修改</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form> -->

            
    </div>
</template>
<script>
import {page,update,insert,delete1} from '@/api/address';
import pcr from '@/components/pcr.vue'

export default {
    components:{
        pcr
    },
     data() {
        return {
            
            
             searchDto:{
                now: 1,
                size: 50,
                where: {
                    adrProvince: "",
                    adrUsername: "",
                    adrId:0
                }
            },
            addressList:[],
            provinceArr:[],
            pages:0,
            total:0,
            address:{
                adrPhone: "",
                adrUsername: "",
                adrId:""
            }
        }
    },
    methods:{
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
                    this.addressList =  res.list // 当前页数据
                    this.pages = res.pages // 总页数
                    this.total = res.total ; // 总记录数
                })
           },
        
        
           saveorupdate(){

                if(this.address.adrId == ""){
                    axios.post("/address/save",this.address)
                    .then(res=>{
                        if(res.success){
                            this.search(); //刷新页面数据
                        }else{
                            alert(res.msg)
                        }
                    })
                }else{
                    axios.post("/address/update",this.address)
                    .then(res=>{
                        if(res.success){
                            this.search(); //刷新页面数据
                        }else{
                            alert(res.msg)
                        }
                    })
                }

              
           },
           update(item){
                this.address = item;
                this.dialogFormVisible = true;
           },
           delete1(item){
            this.searchDto.where.adrId=item.adrId;
            delete1(this.searchDto).then(res=>{
                this.search();
            })
            
           
           }
    },
    created() {
            //页面加载完毕，立即查询第一页数据
            
            this.search();
            

    },
}
</script>