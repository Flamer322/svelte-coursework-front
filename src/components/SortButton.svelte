<script>
  export let sort = {};
  export let sortOrder, sortDir, setOrder;
</script>

<style>
    #sortButton {
        cursor: pointer;
        user-select: none;
        width: fit-content
    }
</style>

<span on:click="{(e) => setOrder(sort.slug)}" id="sortButton">
      {sort.name}
  {#if sortOrder == sort.slug && sortDir == 1}
      &#9650;
  {:else}
      &#9660;
  {/if}
</span>