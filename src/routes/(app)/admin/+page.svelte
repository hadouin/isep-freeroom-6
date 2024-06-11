<script lang="ts">
  import { page } from '$app/stores';
</script>

<h1>Admin</h1>

<pre>{JSON.stringify($page.data?.session, null, 2)}</pre>
