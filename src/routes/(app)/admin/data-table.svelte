<script lang="ts">
  import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
  import { readable } from 'svelte/store';
  import * as Table from '$lib/components/ui/table';
  import DataTableActions from "./data-table-actions.svelte";

  export let data: any[];

  const table = createTable(readable(data));

  const columns = table.createColumns([
    table.column({
      accessor: 'id',
      header: 'ID',
      cell: ({ value }) => value.slice(0, 8),
    }),
    table.column({
      accessor: 'firstname',
      header: 'Prénom',
    }),
    table.column({
      accessor: 'lastname',
      header: 'Nom',
    }),
    table.column({
      accessor: 'email',
      header: 'Email',
    }),
    table.column({
      accessor: 'reason',
      header: 'Motif',
    }),
    table.column({
      accessor: 'startDate',
      header: 'Date',
    }),
    table.column({
      accessor: 'startTime',
      header: 'Début',
    }),
    table.column({
      accessor: 'endTime',
      header: 'Fin',
    }),
    table.column({
      accessor: 'comment',
      header: 'Commentaire',
      cell: ({ value }) => value || '-',
    }),
    table.column({
      accessor: ({ id }) => id,
      header: "",
      cell: ({ value }) => {
        return createRender(DataTableActions, { id: value });
      },
    }),
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="border rounded-md">
  <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                <Table.Head {...attrs}>
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
                <Table.Cell {...attrs}>
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
