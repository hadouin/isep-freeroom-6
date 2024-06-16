<script lang="ts">
  import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
  import { readable } from 'svelte/store';
  // noinspection ES6UnusedImports
  import * as Table from '$lib/components/ui/table';
  import DataTableActions from './data-table-actions.svelte';
  import DataTableStatus from './data-table-status.svelte';
  import { dev } from '$app/environment';

  export let data: any[];

  const table = createTable(readable(data));

  const columns = table.createColumns([
    table.column({ accessor: 'firstname', header: 'Prénom' }),
    table.column({ accessor: 'lastname', header: 'Nom' }),
    table.column({ accessor: 'email', header: 'Email' }),
    table.column({ accessor: 'reason', header: 'Motif' }),
    table.column({ accessor: 'startDate', header: 'Date de début' }),
    table.column({ accessor: 'endDate', header: 'Date de fin', cell: ({ value }) => value || '-' }),
    table.column({ accessor: 'startTime', header: 'Début' }),
    table.column({ accessor: 'endTime', header: 'Fin' }),
    table.column({ accessor: 'comment', header: 'Commentaire', cell: ({ value }) => value || '-' }),
    table.column({
      accessor: 'status',
      header: 'Statut',
      cell: ({ value }) => createRender(DataTableStatus, { status: value }),
    }),
    table.column({
      accessor: ({ id }) => id,
      header: '',
      cell: ({ value }) => createRender(DataTableActions, { id: value }),
    }),
  ]);

  if (dev) columns.push(...table.createColumns([table.column({ accessor: 'id', header: 'ID (dev)' })]));

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="rounded-md border">
  <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                <Table.Head {...attrs} class="px-2 lg:px-4">
                  <Render of={cell.render()} />
                </Table.Head>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Header>
    <Table.Body {...$tableBodyAttrs}>
      {#each $pageRows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
          <Table.Row {...rowAttrs}>
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <Table.Cell {...attrs} class="p-2 lg:p-4">
                  <Render of={cell.render()} />
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
