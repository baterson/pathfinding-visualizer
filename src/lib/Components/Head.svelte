<script lang="ts">
	export let data;
	const meta = data.meta;

	//Fallback meta data
	const defaultMeta = {
		description: 'Interactive visualization of pathfinding algorithms.',
		imageAlt: 'Pathfinding visualizer image',
		imageUrl: 'https://pathfinding-visualizer.ivan-sem.com/algo-screen.png',
		locale: 'en_US',
		url: 'https://pathfinding-visualizer.ivan-sem.com/'
	};

	const finalMeta = { ...defaultMeta, ...meta };
</script>

<svelte:head>
	<link rel="canonical" href={finalMeta.url} />

	<link rel="alternate" hreflang="en" href="https://pathfinding-visualizer.ivan-sem.com/" />
	<link rel="alternate" hreflang="ru" href="https://pathfinding-visualizer.ivan-sem.com/ru" />
	<link rel="alternate" hreflang="de" href="https://pathfinding-visualizer.ivan-sem.com/de" />
	<link rel="alternate" hreflang="es" href="https://pathfinding-visualizer.ivan-sem.com/es" />
	<link rel="alternate" hreflang="zh" href="https://pathfinding-visualizer.ivan-sem.com/zh" />

	<!-- General Meta Tags -->
	<meta name="author" content="Ivan Semochkin" />
	<meta name="description" content={finalMeta.description} />
	<meta name="theme-color" content="#22192B" />

	<script type="application/ld+json">
		{@html JSON.stringify({
			"@context": "http://schema.org",
			"@type": "WebApplication",
			"name": data.title,
			"alternateName": [
				"路径查找算法可视化工具",
				"Wegfindung-Algorithmen-Visualizer",
				"Visualizador de Algoritmos de Búsqueda de Rutas",
				"Визуализатор Алгоритмов Поиска Пути"
			],
			"url": finalMeta.url,
			"description": finalMeta.description,
			"applicationCategory": "EducationalApplication",
			"operatingSystem": "All",
			"inLanguage": ["en", "ru", "zh", "es", "de"],
			"author": {
				"@type": "Person",
				"name": "Ivan Semochkin"
			},
			"image": finalMeta.imageUrl
		})}
	</script>

	<!-- Open Graph Meta Tags -->
	<meta property="og:image" content={finalMeta.imageUrl} />
	<meta property="og:image:secure_url" content={finalMeta.imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={finalMeta.imageAlt} />
	<meta property="og:title" content="Pathfinding Algorithms Visualizer" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={finalMeta.url} />
	<meta property="og:description" content={finalMeta.description} />
	<meta property="og:locale" content={finalMeta.locale} />
	<meta property="og:locale:alternate" content="ru_RU" />
	<meta property="og:locale:alternate" content="zh_CN" />
	<meta property="og:locale:alternate" content="es_ES" />
	<meta property="og:locale:alternate" content="de_DE" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="ivan-sem.com" />
	<meta property="twitter:url" content={finalMeta.url} />
	<meta name="twitter:title" content={data.title} />
	<meta name="twitter:description" content={finalMeta.description} />
	<meta name="twitter:image" content={finalMeta.imageUrl} />
</svelte:head>
