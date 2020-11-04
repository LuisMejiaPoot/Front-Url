<template>
    <div>
        <ListUrls />
    </div>
</template>

<script>
import {mapState} from 'vuex'
import ListUrls from '@/components/listUrls.vue'
export default {
    components:{
        ListUrls
    }
}
</script>