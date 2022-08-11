<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import 'chartjs-plugin-style';
	import { fade, scale } from 'svelte/transition';
	let cond = true;
	import { DateTime } from 'luxon';
	//Nuevosdsds

	const animate = (node, args) => (args.cond ? fade(node, args) : scale(node, args));

	export let dataLabelsAndData;
	export let type;
	export let chartID;
	export let title;
	export let percentage;
	export let push;
	//export let week;
	//export let colorDoughnut;
	//export let colorDoughnutRemaining;

	let data = [''];
	let labels = [''];
	let createChart;

	$: dataLabelsAndData;

	onMount(() => {
		createChart();
	});

	$: {
		createChart = async () => {
			//console.log('dentro de chart', await dataLabelsAndData);
			//console.log('resultsFinal', await dataLabelsAndData);
			let resultsFinal = await dataLabelsAndData.data;
			//console.log('resultsFinal', resultsFinal);
			/* if (resultsFinal) { */
			labels = resultsFinal.labels;
			data = resultsFinal.data;

			//console.log('Title', title);
			//console.log('resultsFinal', resultsFinal.labels);
			//labels = await labels;
			//data = await data;
			let ctx = document.getElementById(chartID).getContext('2d');
			//console.log('ctx', ctx);
			let delayed;

			let gradient = ctx.createLinearGradient(0, 0, 0, 400);
			gradient.addColorStop(0, 'rgba(101, 102, 234, 0.5)');
			gradient.addColorStop(1, 'rgba(101, 102, 234, 0.00)');

			// <block:external:2>
			const getOrCreateTooltip = (chart) => {
				let tooltipEl = document.getElementById('chartjs-tooltip');
				//console.log('getOrCreateToolti', chart.canvas.parentNode.querySelector('div'));

				if (!tooltipEl) {
					tooltipEl = document.createElement('div');
					tooltipEl.id = 'chartjs-tooltip';
					tooltipEl.style.background = 'rgba(255,255,255)';
					tooltipEl.style.borderRadius = '10px';
					tooltipEl.style.color = 'white';
					tooltipEl.style.opacity = 1;
					tooltipEl.style.pointerEvents = 'none';
					tooltipEl.style.position = 'absolute';
					tooltipEl.style.transform = 'translate(-50%, 0)';
					tooltipEl.style.transition = 'all .1s ease';
					tooltipEl.style.boxShadow = '0px 0px 5px 1px rgba(0,0,0,0.15)';
					//tooltipEl.style.borderRadius = 10;
					tooltipEl.style.marginTop = 7;

					const table = document.createElement('table');
					table.style.margin = '0px';

					tooltipEl.appendChild(table);
					chart.canvas.parentNode.appendChild(tooltipEl);
				}

				return tooltipEl;
			};

			const externalTooltipHandler = (context) => {
				// Tooltip Element
				const { chart, tooltip } = context;
				const tooltipEl = getOrCreateTooltip(chart);

				// Hide if no tooltip
				if (tooltip.opacity === 0) {
					tooltipEl.style.opacity = 0;
					return;
				}

				// Set Text
				if (tooltip.body) {
					const titleLines = tooltip.title || [];
					const bodyLines = tooltip.body.map((b) => b.lines);
					//console.log('bodyLines', tooltip.body);
					const tableHead = document.createElement('thead');

					bodyLines.forEach((body) => {
						const tr = document.createElement('tr');
						tr.style.borderWidth = 0;

						const th = document.createElement('th');

						th.style.borderWidth = 0;
						const span = document.createElement('span');
						span.style.color = '#383874';
						span.style.fontWeight = 900;

						const text = document.createTextNode(body);

						th.appendChild(span);
						span.appendChild(text);

						tr.appendChild(th);
						//td.appendChild(span);
						tableHead.appendChild(tr);
					});

					const tableBody = document.createElement('tbody');
					titleLines.forEach((title, i) => {
						/* const colors = tooltip.labelColors[i]; */

						const span = document.createElement('span');

						span.classList.add('text-tertiary', 'text-[0.8rem]');

						const tr = document.createElement('tr');
						//tr.style.backgroundColor = 'inherit';
						tr.style.borderWidth = 0;

						const td = document.createElement('td');
						td.style.borderWidth = 0;
						td.style.display = 'flex';
						//console.log('title', title);
						let text = '';
						if (dataLabelsAndData.week) {
							let yearCurrent = DateTime.now().year;

							text = document.createTextNode(title + ', ' + yearCurrent);
						} else {
							text = document.createTextNode(title);
						}

						td.appendChild(span);
						span.appendChild(text);
						tr.appendChild(td);
						tableBody.appendChild(tr);
					});

					const tableRoot = tooltipEl.querySelector('table');

					//console.log('tableRoot', tableRoot);
					// Remove old children
					while (tableRoot.firstChild) {
						tableRoot.firstChild.remove();
					}

					// Add new children
					tableRoot.appendChild(tableHead);
					tableRoot.appendChild(tableBody);
				}

				const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

				// Display, position, and set styles for font

				//console.log('tooltip.options', tooltip);
				tooltipEl.style.opacity = 1;
				tooltipEl.style.left = positionX + tooltip.caretX + 'px';
				tooltipEl.style.top = positionY + tooltip.caretY + 'px';
				tooltipEl.style.fontFamily = tooltip.options.bodyFont.family;
				tooltipEl.style.padding =
					tooltip.options.padding + 'px ' + tooltip.options.padding * 2 + 'px';
			};
			// </block:external>

			const myChart = new Chart(ctx, {
				type: type,
				data: {
					labels: labels,
					datasets: [
						{
							label: title,
							data: data,

							...(percentage && {
								...(data[0] >= 0 &&
									data[0] <= 25 && {
										backgroundColor: ['#fa4f67', '#fce3e7']
									}),
								...(data[0] >= 26 &&
									data[0] <= 50 && {
										backgroundColor: ['#fcaf3a', '#fef2dc']
									}),
								...(data[0] >= 51 &&
									data[0] <= 75 && {
										backgroundColor: ['#6566EA', '#F0F0FD']
									}),
								...(data[0] >= 76 &&
									data[0] <= 100 && {
										backgroundColor: ['#29ae76', '#d8f3ea']
									}),
								borderWidth: 0,
								cutout: '80%',
								borderRadius: 10,
								rotation: 180
							}),

							...(type === 'line' && {
								fill: true,
								backgroundColor: gradient,
								borderColor: '#6566EA',
								pointBackgroundColor: '#6566EA',
								pointBorderColor: '#fff',
								pointBorderWidth: 4,
								tension: 0.4
							})
						}
					]
				},
				options: {
					//responsive: true,
					maintainAspectRatio: true,

					plugins: {
						...(percentage && {
							tooltip: {
								enabled: false
							},
							legend: {
								display: false
							}
						}),
						...(type === 'line' && {
							legend: {
								display: false
							},
							tooltip: {
								enabled: false,
								position: 'average',
								displayColors: false,
								bodyFont: {
									family: 'Plus Jakarta Sans'
								},
								padding: 5,
								callbacks: {
									label: function (context) {
										let label = '';
										//console.log('context.dataset', context);
										const ctx = context.chart.ctx;

										ctx.fillStyle = 'blue';

										if (label) {
											label += ': ';
										}
										if (context.parsed.y !== null) {
											label += context.parsed.y + 'h';
										}
										return label;
									}
								},
								external: externalTooltipHandler
								/* displayColors: false,
								padding: {
									left: 20,
									right: 20,
									top: 10,
									bottom: 10
								},
								backgroundColor: '#fff',
								footerColor: '#B8B4CB',

								footerFont: {
									family: 'Plus Jakarta Sans',
									weight: 400,
									size: 10
								},
								bodyFont: {
									family: 'Plus Jakarta Sans',
									weight: 900,
									size: 14
								},
								bevelWidth: 3,
								bevelHighlightColor: 'rgb(255, 99, 71)',
								bevelShadowColor: 'rgb(255, 99, 71)',
								shadowOffsetX: 3,
								shadowOffsetY: 3,
								shadowBlur: 10,
								shadowColor: 'rgb(255, 99, 71)',

								callbacks: {
									title: titleTooltip,
									label: function (context) {
										let label = '';
										//console.log('context.dataset', context);
										const ctx = context.chart.ctx;

										ctx.fillStyle = 'blue';

										if (label) {
											label += ': ';
										}
										if (context.parsed.y !== null) {
											label += context.parsed.y + 'h';
										}
										return label;
									},
									labelTextColor: function (context) {
										return '#383874';
									},
									footer: function (context) {
										//console.log('context.dataset', context);

										let label = context[0].label;
										return label;
									}
								} */
							}
						})
					},
					...(type === 'bar' && {
						scales: {
							y: {
								beginAtZero: true
							}
						}
					}),
					...(type === 'line' && {
						interaction: {
							intersect: false,
							mode: 'index'
						},
						radius: 5,
						hitRadius: 30,
						//hoverRadius: 5,

						scales: {
							x: {
								grid: {
									lineWidth: 0
								},
								ticks: {
									font: function (context) {
										var avgSize = Math.round((context.chart.height + context.chart.width) / 2);
										var size = Math.round(avgSize / 32);
										size = size > 14 ? 14 : size; // setting max limit to 12
										return {
											size: size,
											weight: 700
										};
									},
									color: 'rgba(184, 180, 203, 0.9)',
									align: 'inner'
									//stepSize: 1
								}
							},
							y: {
								ticks: {
									callback: function (value) {
										return value + ' h     ';
									},
									font: {
										family: 'Plus Jakarta Sans',
										weight: 900,
										size: 14

										//size: 14
									},
									color: 'rgba(184, 180, 203, 0.9)'

									//stepSize: 1
								},

								beginAtZero: true,
								grid: {
									//drawBorder: true,
									borderDash: [10],
									lineWidth: 2,
									color: 'rgba(184, 180, 203, 0.20)'
								}
							}
						},
						animation: {
							onComplete: () => {
								delayed = true;
							},
							delay: (context) => {
								let delay = 0;
								if (context.type === 'data' && context.mode === 'default' && !delayed) {
									delay = context.dataIndex * 300 + context.datasetIndex * 100;
								}
								return delay;
							}
						}
					})
				},
				...(type === 'line' && {
					plugins: [
						{
							afterDraw: (chart) => {
								if (chart.tooltip?._active?.length) {
									let x = chart.tooltip._active[0].element.x;
									//console.log('x', chart.tooltip._active[0].element);
									let y = chart.tooltip._active[0].element.y;
									let yAxis = chart.scales.y;
									let ctx = chart.ctx;
									//console.log('yAxis', yAxis);
									ctx.save();
									ctx.beginPath();
									ctx.moveTo(x, y);
									ctx.lineTo(x, yAxis ? yAxis.bottom : 0);
									ctx.lineWidth = 2;
									ctx.setLineDash([7, 7]);
									ctx.strokeStyle = 'rgba(101, 102, 234, 0.7)';
									ctx.stroke();
									ctx.restore();
								}
							}
						},
						{
							afterDraw: (chart) => {
								if (chart.tooltip?._active?.length) {
									let x = chart.tooltip._active[0].element.x;
									//console.log('x', chart.tooltip._active[0].element);
									let y = chart.tooltip._active[0].element.y;
									let yAxis = chart.scales.y;
									let ctx = chart.ctx;
									//console.log('chart', chart);
									ctx.save();
									ctx.beginPath();
									ctx.shadowOffsetX = 3;
									ctx.shadowOffsetY = 3;
									ctx.shadowBlur = 10;
									ctx.shadowColor = 'rgb(255, 99, 71)';
									ctx.restore();
								}
							}
						}
					]
				})
			});

			/* 	let shadow = series.tooltip.background.filters.getIndex(0);
			shadow.dx = 10;
			shadow.dy = 10;
			shadow.blur = 5;
			shadow.color = am4core.color('#f55'); */
			//console.log('ChartJS', myChart);

			if (push) {
				async function updateChart() {
					myChart.update();
				}
				updateChart();
			}

			//console.log('myChart', myChart.data);
		};
	}
</script>

<canvas id={chartID} style="width: inherit;" />
