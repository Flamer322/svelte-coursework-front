<script>
  export let sort = {};
  export let sortOrder, sortDir, setOrder;
</script>

<span on:click="{(e) => setOrder(sort.slug)}" style="cursor: pointer; user-select: none; width: fit-content">
      {sort.name}
  {#if sortOrder == sort.slug && sortDir == 1}
      &#9650;
  {:else}
      &#9660;
  {/if}
</span>