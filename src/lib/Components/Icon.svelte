<script lang="ts">
	type IconName =
		| 'play'
		| 'replay'
		| 'playSpeed'
		| 'pause'
		| 'playBack'
		| 'playForward'
		| 'stop'
		| 'sun'
		| 'moon'
		| 'help'
		| 'git';

	export let name: IconName;
</script>

{#if name === 'play'}
	<svg
		class="play"
		stroke="currentColor"
		fill="currentColor"
		stroke-width="0"
		viewBox="0 0 512 512"
		xmlns="http://www.w3.org/2000/svg"
		><path
			d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-56 296V168l144 88z"
		></path></svg
	>
{:else if name === 'replay'}
	<svg
		stroke="currentColor"
		fill="currentColor"
		stroke-width="0"
		viewBox="0 0 512 512"
		xmlns="http://www.w3.org/2000/svg"
		><path
			d="M256 48C141.31 48 48 141.32 48 256c0 114.86 93.14 208 208 208 114.69 0 208-93.31 208-208 0-114.87-93.13-208-208-208zm94 219a94 94 0 11-94-94h4.21l-24-24L256 129.2l59.8 59.8-59.8 59.8-19.8-19.8 27.92-27.92c-2.4-.08-5.12-.08-8.12-.08a66 66 0 1066 66v-14h28z"
		></path></svg
	>
{:else if name === 'playSpeed'}
	<svg viewBox="0 0 24 24" class="speed"
		><path
			d="M10,8v8l6-4L10,8L10,8z M6.3,5L5.7,4.2C7.2,3,9,2.2,11,2l0.1,1C9.3,3.2,7.7,3.9,6.3,5z            M5,6.3L4.2,5.7C3,7.2,2.2,9,2,11 l1,.1C3.2,9.3,3.9,7.7,5,6.3z            M5,17.7c-1.1-1.4-1.8-3.1-2-4.8L2,13c0.2,2,1,3.8,2.2,5.4L5,17.7z            M11.1,21c-1.8-0.2-3.4-0.9-4.8-2 l-0.6,.8C7.2,21,9,21.8,11,22L11.1,21z            M22,12c0-5.2-3.9-9.4-9-10l-0.1,1c4.6,.5,8.1,4.3,8.1,9s-3.5,8.5-8.1,9l0.1,1 C18.2,21.5,22,17.2,22,12z"
			fill="currentColor"
		></path></svg
	>
{:else if name === 'pause'}
	<svg
		class="play"
		stroke="currentColor"
		fill="currentColor"
		stroke-width="0"
		viewBox="0 0 512 512"
		xmlns="http://www.w3.org/2000/svg"
		><path
			d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-32 288h-32V176h32zm96 0h-32V176h32z"
		></path></svg
	>
{:else if name === 'playBack'}
	<svg
		stroke="currentColor"
		fill="currentColor"
		stroke-width="0"
		viewBox="0 0 512 512"
		xmlns="http://www.w3.org/2000/svg"
		><path d="M143.47 64v163.52L416 64v384L143.47 284.48V448H96V64h47.47z"></path></svg
	>
{:else if name === 'playForward'}
	<svg
		stroke="currentColor"
		fill="currentColor"
		stroke-width="0"
		viewBox="0 0 512 512"
		xmlns="http://www.w3.org/2000/svg"
		><path d="M368.53 64v163.52L96 64v384l272.53-163.52V448H416V64h-47.47z"></path></svg
	>
{:else if name === 'stop'}
	<svg
		stroke="currentColor"
		fill="currentColor"
		stroke-width="0"
		viewBox="0 0 512 512"
		xmlns="http://www.w3.org/2000/svg"><path d="M80 80h352v352H80z"></path></svg
	>
{:else if name === 'git'}
	<svg
		class="nav"
		stroke="currentColor"
		fill="currentColor"
		stroke-width="0"
		viewBox="0 0 496 512"
		xmlns="http://www.w3.org/2000/svg"
		><path
			d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
		></path></svg
	>
{:else if name === 'sun'}
	<svg
		class="nav"
		stroke="currentColor"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
		><path
			d="M480-346.666q55.333 0 94.334-39 39-39.001 39-94.334 0-55.333-39-94.334-39.001-39-94.334-39-55.333 0-94.334 39-39 39.001-39 94.334 0 55.333 39 94.334 39.001 39 94.334 39ZM480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-446.667H40v-66.666h160v66.666Zm720 0H760v-66.666h160v66.666ZM446.667-760v-160h66.666v160h-66.666Zm0 720v-160h66.666v160h-66.666ZM260-655.333l-100.333-97 47.666-49 96 100-43.333 46Zm493.333 496-97.666-100.334 45-45.666 99.666 97.666-47 48.334Zm-98.666-541.334 97.666-99.666 49 47L702-656l-47.333-44.667ZM159.333-207.333 259-305l46.333 45.667-97.666 99.666-48.334-47.666ZM480-480Z"
		/></svg
	>
{:else if name === 'moon'}
	<svg
		class="nav"
		stroke="currentColor"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
		><path
			d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q10 0 20.5.667 10.5.666 24.166 2-37.666 31-59.166 77.833T444-660q0 90 63 153t153 63q53 0 99.667-20.5 46.666-20.5 77.666-56.166 1.334 12.333 2 21.833.667 9.5.667 18.833 0 150-105 255T480-120Zm0-66.666q102 0 179.334-61.167t101.333-147.834q-23.333 9-49.111 13.667-25.778 4.666-51.556 4.666-117.459 0-200.063-82.603Q377.334-542.541 377.334-660q0-22.667 4.333-47.667t14.667-55q-91.334 28.666-150.501 107Q186.666-577.334 186.666-480q0 122 85.667 207.667T480-186.666Zm-6-288.001Z"
		/></svg
	>
{:else if name === 'help'}
	<svg
		class="nav"
		stroke="currentColor"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
		><path
			d="M482-244.667q17.667 0 29.833-12.166Q524-269 524-286.667q0-17.666-12.167-29.833-12.166-12.166-29.833-12.166-17.666 0-29.833 12.166Q440-304.333 440-286.667q0 17.667 12.167 29.834 12.167 12.166 29.833 12.166Zm-35.333-148.666h64q0-28.334 6.833-49 6.833-20.667 41.166-50.334 29.334-26 43.001-50.5 13.666-24.5 13.666-55.5 0-53.999-36.666-85.333-36.667-31.333-93.334-31.333-51.666 0-88.5 26.333Q360-662.667 344-620l57.333 22q9-24.667 29.5-42t52.5-17.333q33.334 0 52.667 18.166 19.334 18.167 19.334 44.5 0 21.334-12.667 40.167-12.667 18.833-35.334 37.834-34.666 30.333-47.666 53.999-13 23.667-13 69.334ZM480-80q-82.333 0-155.333-31.5t-127.334-85.833Q143-251.667 111.5-324.667T80-480q0-83 31.5-156t85.833-127q54.334-54 127.334-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.333-31.5 155.333T763-197.333Q709-143 636-111.5T480-80Zm0-66.666q139.333 0 236.334-97.334 97-97.333 97-236 0-139.333-97-236.334-97.001-97-236.334-97-138.667 0-236 97Q146.666-619.333 146.666-480q0 138.667 97.334 236 97.333 97.334 236 97.334ZM480-480Z"
		/></svg
	>{/if}

<style>
	.nav {
		height: 40px;
		width: 40px;
	}

	svg {
		flex-shrink: 0;
		font-size: inherit;
		height: 1em;
		width: 1em;
		min-width: 30px;
		min-height: 30px;
	}

	@media (min-width: 1600px) {
		svg {
			min-width: 45px;
			min-height: 45px;
		}
	}
</style>
