<script lang="ts">
let url: string;
let isUploading: boolean;

async function submit(e: SubmitEvent) {
	isUploading = true;
	e.preventDefault();
	const formData = new FormData(e.currentTarget as HTMLFormElement);
	const request = await fetch("/api/upload", {
		method: "POST",
		body: formData,
	});
	const response = await request.json();
	url = response.data;
	isUploading = false;
}
</script>

<style>
  img {
    max-width: 500px;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  button {
   background-color: #6E57FF;
   color: white;
   border: none;
   border-radius: 5px;
   padding: 0.75rem 1.5rem;
   font-weight: bold;
  }
</style>

<form on:submit={submit}>
  <input type="file" id="file" name="file" required />
  <button>{isUploading ? "Uploading..." : "Upload"}</button>
  {#if url}
    <img src={url} alt="pinnie" />
  {/if}
</form>
