<script lang="ts">
	import Head from '$lib/Components/Head.svelte';
	export let data;
</script>

<Head {data} />
<slot />
