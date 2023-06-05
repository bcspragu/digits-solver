<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';

  import Play from '$lib/components/play.svelte';
</script>

<MetaTags
  title="Numbers Game"
  description="Combine the numbers to reach the target."
  canonical="https://tepid.uk/play"
  openGraph={{
    url: 'https://tepid.uk/play',
    title: 'Numbers Game',
    description: 'Combine the numbers to reach the target.',
    site_name: 'Numbers Game',
  }}
/>

<Play />
