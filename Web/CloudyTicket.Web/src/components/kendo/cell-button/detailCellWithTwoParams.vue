<template>
    <td style="text-align: center">
    <div>
       <button class="btn btn-primary" @click.prevent.stop="redirect">{{showText}}</button>
    </div>
</td>
</template>


<script>
export default {
    props: {
        dataItem: Object,
        detailLink : String,
        param1: String,
        param2: String,
        showText: String
    },
    mounted(){
        console.log(this.dataItem.no);
        console.log(this.detailLink);
        console.log(this.param1);
        console.log(this.param2);
    },
    methods:{
        redirect(){
             this.$router.push({ path: `${this.detailLink}/${this.param1}&${this.param2}` });
        }
    }
}
</script>