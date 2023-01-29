<template>
    <td style="text-align: center">
        <div>
            <button class="btn" :class="isAction ?'btn-danger' : 'btn-primary'" @click.prevent.stop="exe">{{showText}}</button>
        </div>
    </td>
</template>


<script>
export default {
    props: {
        dataItem: Object,
        detailLink : String,
        param: String,
        showText: String,
        isAction: Boolean
    },
    mounted(){
        console.log(this.dataItem.no);
        console.log(this.detailLink);
        console.log(this.param);
        console.log(this.isAction);
    },
    methods:{
        exe(){
            this.$emit('do-action', {id: this.param});
        }
    }
}
</script>