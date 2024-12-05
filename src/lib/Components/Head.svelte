<svelte:head>
	<meta name="author" content="Ivan Semochkin" />
	<meta
		name="description"
		content="Visual explanation and practical application of Dijkstra, A*, BFS, and DFS pathfinding algorithms through an interactive visualization built with Svelte and TypeScript."
	/>
	<meta
		name="keywords"
		content="pathfinding, algorithms, Dijkstra, A*, BFS, DFS, visualization, 路径查找, 算法, 可视化, Wegfindung, Algorithmen, Visualisierung, búsqueda de rutas, algoritmos, visualización"
	/>

	<script type="application/ld+json">
		{
		  "@context": "http://schema.org",
		  "@type": "WebApplication",
		  "name": "Pathfinding Algorithms Visualizer",
		  "alternateName": [
			"路径查找算法可视化工具",
			"Wegfindung-Algorithmen-Visualizer",
			"Visualizador de Algoritmos de Búsqueda de Rutas",
			"Визуализатор Алгоритмов Поиска Пути"
		  ],
		  "url": "https://ivan-sem.com/pathfinding_visualizer",
		  "description": "Interactive visualization of Dijkstra, A*, BFS, and DFS pathfinding algorithms built with Svelte and TypeScript.",
		  "applicationCategory": "EducationalApplication",
		  "operatingSystem": "All",
		  "inLanguage": ["en", "ru", "zh", "es", "de"],
		  "author": {
			"@type": "Person",
			"name": "Ivan Semochkin"
		  },
		  "image": "https://ivan-sem.com/pathfinding_visualizer/algo-vis.jpg"
		}
	</script>

	<meta property="og:image" content="https://ivan-sem.com/pathfinding_visualizer/algo-vis.jpg" />
	<meta
		property="og:image:secure_url"
		content="https://ivan-sem.com/pathfinding_visualizer/algo-vis.jpg"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta
		property="og:image:alt"
		content="Pathfinding Algorithms Visualizer build with Svelte and TypeScript."
	/>
	<meta property="og:title" content="Pathfinding Algorithms Visualizer" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ivan-sem.com/pathfinding_visualizer" />
	<meta
		property="og:description"
		content="Visual explanation and practical application of Dijkstra, A*, BFS, and DFS pathfinding algorithms through an interactive visualization built with Svelte and TypeScript."
	/>
	<meta property="og:locale" content="en_US" />

	<meta property="og:locale:alternate" content="ru_RU" />
	<meta property="og:locale:alternate" content="zh_CN" />
	<meta property="og:locale:alternate" content="es_ES" />
	<meta property="og:locale:alternate" content="de_DE" />

	<!-- Twitter Meta Tags -->
	<meta property="twitter:domain" content="ivan-sem.com" />
	<meta property="twitter:url" content="https://ivan-sem.com/pathfinding_visualizer" />
	<meta name="twitter:title" content="Pathfinding Visualizer" />
	<meta
		name="twitter:description"
		content="Pathfinding Algorithms Visualizer build with Svelte and TypeScript."
	/>
	<meta name="twitter:image" content="https://ivan-sem.com/pathfinding_visualizer/algo-vis.jpg" />

	<meta name="theme-color" content="#22192B" />
</svelte:head>
