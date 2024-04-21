<script lang="ts">

    export let src: string = "";

    let _src = `ic_${src}`;
    export let _class = ";"

</script>

<img class={_class} src={_src} alt="icon">