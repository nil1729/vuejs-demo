<template>
	<v-row class="fill-height" v-show="dataLoaded">
		<v-col>
			<v-sheet height="64">
				<v-toolbar flat>
					<v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
						Today
					</v-btn>
					<v-btn fab text small color="grey darken-2" @click="prev">
						<v-icon small>
							mdi-chevron-left
						</v-icon>
					</v-btn>
					<v-btn fab text small color="grey darken-2" @click="next">
						<v-icon small>
							mdi-chevron-right
						</v-icon>
					</v-btn>
					<v-toolbar-title v-if="$refs.calendar">
						{{ $refs.calendar.title }}
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-menu bottom right>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
								<span>{{ typeToLabel[type] }}</span>
								<v-icon right>
									mdi-menu-down
								</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item @click="type = 'day'">
								<v-list-item-title>Day</v-list-item-title>
							</v-list-item>
							<v-list-item @click="type = 'week'">
								<v-list-item-title>Week</v-list-item-title>
							</v-list-item>
							<v-list-item @click="type = 'month'">
								<v-list-item-title>Month</v-list-item-title>
							</v-list-item>
							<v-list-item @click="type = '4day'">
								<v-list-item-title>4 days</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-toolbar>
			</v-sheet>
			<v-sheet height="75vh">
				<v-calendar
					ref="calendar"
					v-model="focus"
					color="primary"
					:events="events"
					:event-color="getEventColor"
					:type="type"
					:first-interval="7.8"
					:interval-minutes="60"
					:interval-count="13"
					@click:event="showEvent"
					@click:more="viewDay"
					@click:date="viewDay"
					@change="updateRange"
				></v-calendar>
				<v-menu
					v-model="selectedOpen"
					:close-on-content-click="false"
					:activator="selectedElement"
					offset-x
				>
					<v-card color="grey lighten-4" min-width="350px" flat>
						<v-toolbar :color="selectedEvent.color" dark>
							<v-btn icon>
								<v-icon>mdi-pencil</v-icon>
							</v-btn>
							<v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
							<v-spacer></v-spacer>
							<v-btn icon>
								<v-icon>mdi-heart</v-icon>
							</v-btn>
							<v-btn icon>
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</v-toolbar>
						<v-card-text>
							<span v-html="selectedEvent.details"></span>
						</v-card-text>
						<v-card-actions>
							<v-btn text color="secondary" @click="selectedOpen = false">
								Cancel
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-menu>
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script>
import { db } from '../main';
export default {
	data: () => ({
		focus: '',
		type: 'week',
		typeToLabel: {
			month: 'Month',
			week: 'Week',
			day: 'Day',
			'4day': '4 Days',
		},
		startTimestamp: null,
		endTimestamp: null,
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false,
		events: [],
		courses: [],
		dataLoaded: false,
		colors: [
			'blue',
			'indigo',
			'deep-purple',
			'cyan',
			'green',
			'orange',
			'grey darken-1',
		],
		names: [
			'Meeting',
			'Holiday',
			'PTO',
			'Travel',
			'Event',
			'Birthday',
			'Conference',
			'Party',
		],
		daysMapper: {
			0: 'Su',
			1: 'M',
			2: 'T',
			3: 'W',
			4: 'Th',
			5: 'F',
			6: 'S',
		},
	}),
	mounted() {
		this.$refs.calendar.checkChange();
		this.getEvents();
	},
	methods: {
		viewDay({ date }) {
			this.focus = date;
			this.type = 'day';
		},
		getEventColor(event) {
			return event.color;
		},
		setToday() {
			this.focus = '';
		},
		prev() {
			this.$refs.calendar.prev();
		},
		next() {
			this.$refs.calendar.next();
		},
		showEvent({ nativeEvent, event }) {
			const open = () => {
				this.selectedEvent = event;
				this.selectedElement = nativeEvent.target;
				setTimeout(() => {
					this.selectedOpen = true;
				}, 10);
			};

			if (this.selectedOpen) {
				this.selectedOpen = false;
				setTimeout(open, 10);
			} else {
				open();
			}

			nativeEvent.stopPropagation();
		},
		async getEvents() {
			let events = [];

			const snaps = await db.collection('courses').get();
			let s = this.startTimestamp.date;
			let e = this.endTimestamp.date;
			let courses = [];
			let daysArr = this.getDaysArray(s, e);

			snaps.forEach((doc) => {
				let evData = { id: doc.id, ...doc.data() };
				courses.push(evData);
			});

			this.courses = courses;
			this.$emit('stopLoading');
			this.dataLoaded = true;

			for (let j = 0; j < daysArr.length; j++) {
				let curDt = daysArr[j];
				for (let i = 0; i < courses.length; i++) {
					let sb = courses[i];
					let lec = sb.lectures.length > 0,
						tut = sb.tutorials.length > 0,
						lab = sb.labs.length > 0;
					if (lec) {
						lec = sb.lectures[0];
						let timings = lec.timings;
						let curDtCode = this.daysMapper[curDt.getDay()];
						let hasClass = timings.findIndex((it) => it.dayCode === curDtCode);
						if (hasClass >= 0) {
							let classHour = timings[hasClass].time;
							let [s, e] = classHour.split(' - ');
							let startEvent = `${curDt.toISOString().substr(0, 10)} ${s}`;
							let endEvent = `${curDt.toISOString().substr(0, 10)} ${e}`;

							let evData = {
								start: startEvent,
								end: endEvent,
								color: 'green',
								name: `${sb.courseCode} - ${lec.section}`,
								details: `${sb.courseName} - ${lec.instructors.join(', ')}`,
							};

							events.push(evData);
						}
					}
					if (tut) {
						tut = sb.tutorials[0];
						let timings = tut.timings;
						let curDtCode = this.daysMapper[curDt.getDay()];
						let hasClass = timings.findIndex((it) => it.dayCode === curDtCode);
						if (hasClass >= 0) {
							let classHour = timings[hasClass].time;
							let [s, e] = classHour.split(' - ');
							let startEvent = `${curDt.toISOString().substr(0, 10)} ${s}`;
							let endEvent = `${curDt.toISOString().substr(0, 10)} ${e}`;

							let evData = {
								start: startEvent,
								end: endEvent,
								color: 'orange',
								name: `${sb.courseCode} - ${tut.section}`,
								details: `${sb.courseName} - ${tut.instructors.join(', ')}`,
							};

							events.push(evData);
						}
					}
					if (lab) {
						lab = sb.labs[0];
						let timings = lab.timings;
						let curDtCode = this.daysMapper[curDt.getDay()];
						let hasClass = timings.findIndex((it) => it.dayCode === curDtCode);
						if (hasClass >= 0) {
							let classHour = timings[hasClass].time;
							let [s, e] = classHour.split(' - ');
							let startEvent = `${curDt.toISOString().substr(0, 10)} ${s}`;
							let endEvent = `${curDt.toISOString().substr(0, 10)} ${e}`;

							let evData = {
								start: startEvent,
								end: endEvent,
								color: 'deep-purple',
								name: `${sb.courseCode} - ${lab.section}`,
								details: `${sb.courseName} - ${lab.instructors.join(', ')}`,
							};

							events.push(evData);
						}
					}
				}
			}
			this.events = events;
		},
		getDaysArray(start, end) {
			var arr = [];
			for (
				let dt = new Date(start);
				dt <= new Date(end);
				dt.setDate(dt.getDate() + 1)
			) {
				arr.push(new Date(dt));
			}
			return arr;
		},
		updateRange({ start, end }) {
			this.startTimestamp = start;
			this.endTimestamp = end;

			let events = [];

			let s = start.date;
			let e = end.date;
			let courses = this.courses;
			let daysArr = this.getDaysArray(s, e);

			for (let j = 0; j < daysArr.length; j++) {
				let curDt = daysArr[j];
				for (let i = 0; i < courses.length; i++) {
					let sb = courses[i];
					let lec = sb.lectures.length > 0,
						tut = sb.tutorials.length > 0,
						lab = sb.labs.length > 0;
					if (lec) {
						lec = sb.lectures[0];
						let timings = lec.timings;
						let curDtCode = this.daysMapper[curDt.getDay()];
						let hasClass = timings.findIndex((it) => it.dayCode === curDtCode);
						if (hasClass >= 0) {
							let classHour = timings[hasClass].time;
							let [s, e] = classHour.split(' - ');
							let startEvent = `${curDt.toISOString().substr(0, 10)} ${s}`;
							let endEvent = `${curDt.toISOString().substr(0, 10)} ${e}`;

							let evData = {
								start: startEvent,
								end: endEvent,
								color: 'green',
								name: `${sb.courseCode} - ${lec.section}`,
								details: `${sb.courseName} - ${lec.instructors.join(', ')}`,
							};

							events.push(evData);
						}
					}
					if (tut) {
						tut = sb.tutorials[0];
						let timings = tut.timings;
						let curDtCode = this.daysMapper[curDt.getDay()];
						let hasClass = timings.findIndex((it) => it.dayCode === curDtCode);
						if (hasClass >= 0) {
							let classHour = timings[hasClass].time;
							let [s, e] = classHour.split(' - ');
							let startEvent = `${curDt.toISOString().substr(0, 10)} ${s}`;
							let endEvent = `${curDt.toISOString().substr(0, 10)} ${e}`;

							let evData = {
								start: startEvent,
								end: endEvent,
								color: 'orange',
								name: `${sb.courseCode} - ${tut.section}`,
								details: `${sb.courseName} - ${tut.instructors.join(', ')}`,
							};

							events.push(evData);
						}
					}
					if (lab) {
						lab = sb.labs[0];
						let timings = lab.timings;
						let curDtCode = this.daysMapper[curDt.getDay()];
						let hasClass = timings.findIndex((it) => it.dayCode === curDtCode);
						if (hasClass >= 0) {
							let classHour = timings[hasClass].time;
							let [s, e] = classHour.split(' - ');
							let startEvent = `${curDt.toISOString().substr(0, 10)} ${s}`;
							let endEvent = `${curDt.toISOString().substr(0, 10)} ${e}`;

							let evData = {
								start: startEvent,
								end: endEvent,
								color: 'deep-purple',
								name: `${sb.courseCode} - ${lab.section}`,
								details: `${sb.courseName} - ${lab.instructors.join(', ')}`,
							};

							events.push(evData);
						}
					}
				}
			}
			this.events = events;
		},
		rnd(a, b) {
			return Math.floor((b - a + 1) * Math.random()) + a;
		},
	},
};
</script>
<style>
.v-calendar .v-event-timed-container {
	margin-right: 2px !important;
	margin-left: 2px;
}
.v-calendar .v-event-timed {
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 300;
	font-size: 12px !important;
}
</style>
