<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Breadcrumb from '$lib/components/ui/breadcrumb';
  // noinspection ES6UnusedImports
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { Toaster } from '$lib/components/ui/sonner';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';
  import { formSchema } from '$lib/formSchema';
  import type { PageData } from './$types';
  import { DatePicker } from '$lib/components/date-picker';
  import { Textarea } from '$lib/components/ui/textarea';
  import { TimePicker } from '$lib/components/time-picker';
  import { RoomPicker } from '$lib/components/room-picker';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  import { getLocalTimeZone, parseDate, today } from '@internationalized/date';

  export let data: PageData;

  let rooms = data.rooms;

  let checked = false;

  $: if (!checked) {
    $formData.endDate = undefined;
  } else if ($formData.startDate && $formData.endDate === undefined) {
    $formData.endDate = parseDate($formData.startDate).add({ days: 1 }).toString();
  }

  const form = superForm(data.form, {
    validators: zodClient(formSchema),
    resetForm: true,
    onResult({ result }) {
      console.log(result);
      if (result.status === 200) {
        toast.success('Votre demande a bien été envoyée');
      } else if (result.status === 400) {
        toast.error('Veuillez corriger les erreurs du formulaire');
      } else {
        toast.error("Une erreur s'est produite");
      }
    },
  });

  const { form: formData, enhance } = form;
  const currentDate = new Date();
  $formData.startDate = today(getLocalTimeZone()).toString();
  $formData.startTime = currentDate.getHours().toString() + ':' + currentDate.getMinutes().toString();
  $formData.endTime = (currentDate.getHours() + 1).toString() + ':' + currentDate.getMinutes().toString();
</script>

<main class="flex flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-8">
  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Accueil</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>Réservation</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>

  <form class="mx-auto w-full sm:w-[500px]" method="POST" use:enhance>
    <div class="grid gap-4">
      <h1 class="text-center text-3xl font-bold">Réservation</h1>

      <div class="grid gap-4 sm:grid-cols-2">
        <Form.Field {form} name="firstname">
          <Form.Control let:attrs>
            <Form.Label>Prénom</Form.Label>
            <Input {...attrs} bind:value={$formData.firstname} placeholder="David" type="text" />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="lastname">
          <Form.Control let:attrs>
            <Form.Label>Nom de famille</Form.Label>
            <Input {...attrs} bind:value={$formData.lastname} placeholder="Bowie" type="text" />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <Form.Field {form} name="email">
        <Form.Control let:attrs>
          <Form.Label>Adresse e-mail</Form.Label>
          <Input {...attrs} bind:value={$formData.email} placeholder="prenom.nom@(eleve.)isep.fr" type="email" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="reason">
        <Form.Control let:attrs>
          <Form.Label>Raison ou origine de la demande</Form.Label>
          <Input {...attrs} bind:value={$formData.reason} placeholder="Association, cours, khôlle ..." type="text" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="rooms">
        <Form.Control let:attrs>
          <Form.Label>Salle(s)</Form.Label>
          <RoomPicker {attrs} bind:formDataRooms={$formData.rooms} {rooms} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field class="flex flex-col" {form} name="startDate">
        <Form.Control let:attrs>
          <Form.Label>Date</Form.Label>
          <DatePicker {attrs} bind:formDataDate={$formData.startDate} minValue={today(getLocalTimeZone())} />
        </Form.Control>
        <Form.Description class="sr-only">La date de début de réservation</Form.Description>
        <Form.FieldErrors />
      </Form.Field>

      <div class="flex items-center space-x-2">
        <Checkbox aria-labelledby="end-label" bind:checked id="end" />
        <Label
          class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="end"
          id="end-label"
        >
          Date de fin ultérieure
        </Label>
      </div>
      {#if checked}
        <Form.Field class="flex flex-col" {form} name="endDate">
          <Form.Control let:attrs>
            <Form.Label>Date de fin</Form.Label>
            <DatePicker
              {attrs}
              bind:formDataDate={$formData.endDate}
              minValue={today(getLocalTimeZone()).add({ days: 1 })}
            />
          </Form.Control>
          <Form.Description class="sr-only">La date de début de réservation</Form.Description>
          <Form.FieldErrors />
        </Form.Field>
      {/if}

      <div class="grid gap-4 sm:grid-cols-2">
        <Form.Field class="flex w-full flex-col" {form} name="startTime">
          <Form.Control let:attrs>
            <Form.Label>Heure de début</Form.Label>
            <TimePicker {attrs} bind:formDataTime={$formData.startTime} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field class="flex w-full flex-col" {form} name="endTime">
          <Form.Control let:attrs>
            <Form.Label>Heure de fin</Form.Label>
            <TimePicker {attrs} bind:formDataTime={$formData.endTime} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <Form.Field class="flex flex-col" {form} name="comments">
        <Form.Control let:attrs>
          <Form.Label>Commentaires</Form.Label>
          <Textarea {...attrs} bind:value={$formData.comments} placeholder="Informations complémentaires ..." />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Button>Envoyer</Form.Button>
    </div>
  </form>
  <Toaster />
</main>
