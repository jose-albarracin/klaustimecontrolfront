import { DateTime } from 'luxon';

//Weekly

let yearNumber = DateTime.now().year;
let weekNumber = DateTime.now().weekNumber;
//let month = DateTime.now().month;
//let daysInMonth = DateTime.now().daysInMonth;

export let dataWeekly = (res) => {
	const dt = DateTime.fromObject({
		weekYear: yearNumber,
		weekNumber: weekNumber
	});
	const dateFromStr = dt.startOf('week');
	//const dateToStr = dt.endOf('week');

	let days = [];
	for (let i = 0; i <= 6; i++) {
		let dateCurrent = dateFromStr.plus({ days: i });
		let dateCurrentFormated = dateCurrent.toFormat('yyyy-MM-dd');
		let value = 0;
		let count = 0;
		//console.log('res.length', res.length);
		while (count < res.length) {
			let dateResCurrent = new Date(res[count].createdAt).toISOString().split('T')[0];

			//console.log('UNO', dateCurrentFormated);

			//console.log('DOS', dateResCurrent);
			if (dateResCurrent == dateCurrentFormated) {
				value = res[count].hours_worked ? res[count].hours_worked : 0;
				break;
			} else {
				value = 0;
				count++;
			}
		}
		days[i] = {
			weekDay: dateCurrent.weekdayShort,
			hoursWorked: value
		};
	}

	let labels = days
		.filter((item) => item.weekDay !== 'Sun' && item.weekDay !== 'Sat')
		.map((item) => {
			return item.weekDay;
		});

	let data = days
		.filter((item) => item.weekDay !== 'Sun' && item.weekDay !== 'Sat')
		.map((item) => {
			return item.hoursWorked;
		});

	return { labels, data };
};

export let dataMonthly = (res) => {
	let months = [];
	let value;
	for (let i = 0; i <= 11; i++) {
		let countMonths = i + 1;
		const dt = DateTime.fromObject({
			year: yearNumber,
			month: countMonths
		});

		let resCount = 0;
		while (resCount < res.length) {
			//console.log('UNO', dateCurrentFormated);

			//console.log('DOS', dateResCurrent);
			if (countMonths === res[resCount]._id) {
				value = res[resCount].totalHoursWorked;
				break;
			} else {
				value = 0;
				resCount++;
			}
		}

		months[i] = {
			month: dt.monthShort,
			totalHoursWorked: value
		};
	}

	let labels = months.map((item) => item.month);
	let data = months.map((item) => item.totalHoursWorked);

	return { labels, data };
};

export let dataYearly = (res) => {
	let years = [];
	let value;
	let rangeAge = 2;
	//console.log('res', res);
	let yearsAgo = yearNumber - rangeAge;

	for (let i = 0; i <= rangeAge; i++) {
		/* const dt = DateTime.fromObject({
				year: yearNumber
			}); */

		let resCount = 0;
		while (resCount < res.length) {
			//console.log('UNO', dateCurrentFormated);

			//console.log('DOS', dateResCurrent);
			if (yearsAgo === res[resCount]._id) {
				value = res[resCount].totalHoursWorked;
				break;
			} else {
				value = 0;
				resCount++;
			}
		}

		years[i] = {
			year: yearsAgo,
			totalHoursWorked: value
		};
		yearsAgo++;
	}

	//console.log('years', years);

	let labels = years.map((item) => item.year);
	let data = years.map((item) => item.totalHoursWorked);

	return { labels, data };
};
