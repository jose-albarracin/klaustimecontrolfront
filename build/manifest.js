export const manifest = {
	appDir: "_app",
	assets: new Set([".DS_Store","favicon.png","icons/.DS_Store","icons/Spin-1s-200px.svg","icons/arrow-left-solid.svg","icons/chart-line-solid.svg","icons/circle-check-solid.svg","icons/circle-xmark-solid.svg","icons/clock-solid.svg","icons/facebook-brands.svg","icons/floppy-disk-solid.svg","icons/google-brands.svg","icons/house-solid.svg","icons/list-check-solid.svg","icons/loading.svg","icons/pen-to-square-solid.svg","icons/people-group-solid.svg","icons/person-solid.svg","icons/right-from-bracket-solid.svg","icons/table-columns-solid.svg","icons/trash-solid.svg","icons/user-clock-solid.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		entry: {"file":"_app/immutable/start-a8bcc89e.js","imports":["_app/immutable/start-a8bcc89e.js","_app/immutable/chunks/index-213b7a90.js","_app/immutable/chunks/index-01a17379.js","_app/immutable/chunks/singletons-eca981c1.js"],"stylesheets":[]},
		nodes: [
			() => import('./server/nodes/0.js'),
			() => import('./server/nodes/1.js'),
			() => import('./server/nodes/10.js'),
			() => import('./server/nodes/4.js'),
			() => import('./server/nodes/7.js'),
			() => import('./server/nodes/8.js'),
			() => import('./server/nodes/9.js'),
			() => import('./server/nodes/11.js'),
			() => import('./server/nodes/14.js'),
			() => import('./server/nodes/17.js'),
			() => import('./server/nodes/20.js'),
			() => import('./server/nodes/2.js'),
			() => import('./server/nodes/5.js'),
			() => import('./server/nodes/12.js'),
			() => import('./server/nodes/15.js'),
			() => import('./server/nodes/18.js'),
			() => import('./server/nodes/3.js'),
			() => import('./server/nodes/6.js'),
			() => import('./server/nodes/13.js'),
			() => import('./server/nodes/16.js'),
			() => import('./server/nodes/19.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "employees",
				pattern: /^\/employees\/?$/,
				names: [],
				types: [],
				path: "/employees",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "hours",
				pattern: /^\/hours\/?$/,
				names: [],
				types: [],
				path: "/hours",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				id: "hoursEmployee",
				pattern: /^\/hoursEmployee\/?$/,
				names: [],
				types: [],
				path: "/hoursEmployee",
				shadow: null,
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				id: "hoursTeam",
				pattern: /^\/hoursTeam\/?$/,
				names: [],
				types: [],
				path: "/hoursTeam",
				shadow: null,
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				id: "profile",
				pattern: /^\/profile\/?$/,
				names: [],
				types: [],
				path: "/profile",
				shadow: null,
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				id: "tasks",
				pattern: /^\/tasks\/?$/,
				names: [],
				types: [],
				path: "/tasks",
				shadow: null,
				a: [0,8],
				b: [1]
			},
			{
				type: 'page',
				id: "tasksTeam",
				pattern: /^\/tasksTeam\/?$/,
				names: [],
				types: [],
				path: "/tasksTeam",
				shadow: null,
				a: [0,9],
				b: [1]
			},
			{
				type: 'page',
				id: "teams",
				pattern: /^\/teams\/?$/,
				names: [],
				types: [],
				path: "/teams",
				shadow: null,
				a: [0,10],
				b: [1]
			},
			{
				type: 'page',
				id: "employees/add",
				pattern: /^\/employees\/add\/?$/,
				names: [],
				types: [],
				path: "/employees/add",
				shadow: null,
				a: [0,11],
				b: [1]
			},
			{
				type: 'page',
				id: "hours/add",
				pattern: /^\/hours\/add\/?$/,
				names: [],
				types: [],
				path: "/hours/add",
				shadow: null,
				a: [0,12],
				b: [1]
			},
			{
				type: 'page',
				id: "tasks/add",
				pattern: /^\/tasks\/add\/?$/,
				names: [],
				types: [],
				path: "/tasks/add",
				shadow: null,
				a: [0,13],
				b: [1]
			},
			{
				type: 'page',
				id: "tasksTeam/add",
				pattern: /^\/tasksTeam\/add\/?$/,
				names: [],
				types: [],
				path: "/tasksTeam/add",
				shadow: null,
				a: [0,14],
				b: [1]
			},
			{
				type: 'page',
				id: "teams/add",
				pattern: /^\/teams\/add\/?$/,
				names: [],
				types: [],
				path: "/teams/add",
				shadow: null,
				a: [0,15],
				b: [1]
			},
			{
				type: 'page',
				id: "employees/edit/[id]",
				pattern: /^\/employees\/edit\/([^/]+?)\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,16],
				b: [1]
			},
			{
				type: 'page',
				id: "hours/edit/[id]",
				pattern: /^\/hours\/edit\/([^/]+?)\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,17],
				b: [1]
			},
			{
				type: 'page',
				id: "tasks/edit/[id]",
				pattern: /^\/tasks\/edit\/([^/]+?)\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,18],
				b: [1]
			},
			{
				type: 'page',
				id: "tasksTeam/edit/[id]",
				pattern: /^\/tasksTeam\/edit\/([^/]+?)\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,19],
				b: [1]
			},
			{
				type: 'page',
				id: "teams/edit/[id]",
				pattern: /^\/teams\/edit\/([^/]+?)\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,20],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
