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
        param: String,
        showText: String
    },
    mounted(){
        console.log(this.dataItem.no);
        console.log(this.detailLink);
        console.log(this.param);
    },
    methods:{
        redirect(){
             this.$router.push({ path: `${this.detailLink}/${this.param}` });
        }
    }
}
</script>