<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import 'chartjs-plugin-style';
	import { fade, scale } from 'svelte/transition';
	let cond = true;
	import { DateTime, Info, Interval } from 'luxon';

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
			let dataInput = [];
			//console.log('dentro de chart', await dataLabelsAndData);
			//console.log('resultsFinal', await dataLabelsAndData);
			let resultsFinal = await dataLabelsAndData.data;
			console.log('resultsFinal', resultsFinal);
			/* if (resultsFinal) { */
			labels = resultsFinal[0].labels;
			console.log('labels from Chart', labels);
			//data = resultsFinal.data;
			let dynamicColors = function () {
				let r = Math.floor(Math.random() * 255);
				let g = Math.floor(Math.random() * 255);
				let b = Math.floor(Math.random() * 255);
				return 'rgb(' + r + ',' + g + ',' + b + ')';
			};

			resultsFinal.forEach((element) => {
				let colorAxis = dynamicColors;
				//console.log('colorAxis', colorAxis());
				let obj = {
					label: element.title,
					data: element.data,
					//fill: true,
					borderColor: colorAxis(),

					pointBorderColor: '#fff',
					pointBorderWidth: 4,
					tension: 0.4
				};
				let obj2 = {
					pointBackgroundColor: obj.borderColor,
					backgroundColor: obj.borderColor
				};
				//console.log('colorAxisParte b', colorAxis());
				dataInput.push(Object.assign(obj, obj2));
			});

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

					bodyLines.forEach((body, i) => {
						const tr = document.createElement('tr');
						tr.style.borderWidth = 0;

						const th = document.createElement('th');

						th.style.borderWidth = 0;
						const span = document.createElement('span');
						span.style.color = '#383874';
						span.style.fontWeight = 900;

						const text = document.createTextNode(body);

						const colors = tooltip.labelColors[i];
						const span2 = document.createElement('span');

						/* span.style.color = '#B8B4CB';
						span.style.font = '"20px'; */

						span2.style.background = colors.backgroundColor;
						span2.style.borderColor = colors.borderColor;
						span2.style.borderWidth = '2px';
						span2.style.marginRight = '10px';
						span2.style.height = '10px';
						span2.style.width = '10px';
						span2.style.display = 'inline-block';

						th.appendChild(span2);
						th.appendChild(span);
						span.appendChild(text);

						tr.appendChild(th);
						//td.appendChild(span);
						tableHead.appendChild(tr);
					});

					const tableBody = document.createElement('tbody');
					titleLines.forEach((title, i) => {
						//console.log('colors', tooltip);

						const tr = document.createElement('tr');
						//tr.style.backgroundColor = 'inherit';
						tr.style.borderWidth = 0;

						const span = document.createElement('span');
						span.classList.add('text-tertiary', 'text-[0.8rem]');

						const td = document.createElement('td');
						td.style.borderWidth = 0;
						td.style.display = 'flex';
						td.style.justifyContent = 'center';
						//console.log('title', title);
						let text = '';
						if (dataLabelsAndData.week) {
							let yearCurrent = DateTime.now().year;

							text = document.createTextNode(title + ', ' + yearCurrent);
						} else {
							text = document.createTextNode(title);
						}

						//td.appendChild(span2);
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
					datasets: dataInput
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
								/* display: false */
								position: 'bottom',
								font: {
									family: 'Plus Jakarta Sans'
								}
							},
							tooltip: {
								enabled: false,
								position: 'nearest',
								displayColors: false,
								bodyFont: {
									family: 'Plus Jakarta Sans'
								},
								padding: 5,
								callbacks: {
									label: function (context) {
										let label = '';
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
						/* interaction: {
							intersect: false,
							mode: 'index'
						}, */
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
