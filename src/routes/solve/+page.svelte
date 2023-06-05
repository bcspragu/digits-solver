<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';
  import Digits from '$lib/components/digits.svelte';
</script>

<MetaTags
  title="Digits Solver"
  description="Solve the NYT Digits puzzle and see the minimum number of operations needed to reach the target."
  canonical="https://tepid.uk/"
  openGraph={{
    url: 'https://tepid.uk',
    title: 'Digits Solver',
    description:
      'Solve the NYT Digits puzzle and see the minimum number of operations needed to reach the target.',
    site_name: 'Digits Solver',
  }}
/>

<Digits />
