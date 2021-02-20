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
						<v-toolbar :color="selectedEvent.color" dark height="45">
							<v-toolbar-title v-html="selectedEvent.title"></v-toolbar-title>
							<v-spacer></v-spacer>
							<v-btn icon>
								<v-btn icon @click="selectedOpen = false">
									<v-icon>mdi-close</v-icon>
								</v-btn>
							</v-btn>
						</v-toolbar>
						<v-card-text>
							<span v-html="selectedEvent.details"></span>
						</v-card-text>
					</v-card>
				</v-menu>
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script>
import { db } from '../main';
import moment from 'moment';
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
		colorsMapper: {
			labs: 'deep-purple',
			lectures: 'green',
			tutorials: 'orange',
		},
		typesMapper: {
			labs: 'Practical',
			lectures: 'Lecture',
			tutorials: 'Tutorial',
		},
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
			const snaps = await db.collection('courses').get();
			let courses = [];
			snaps.forEach((doc) => courses.push({ id: doc.id, ...doc.data() }));

			this.courses = courses;
			this.$emit('stopLoading');
			this.dataLoaded = true;

			let daysArr = this.getDaysArray(
				this.startTimestamp.date,
				this.endTimestamp.date
			);
			this.setCalenderSlots(daysArr);
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
			let daysArr = this.getDaysArray(start.date, end.date);
			this.setCalenderSlots(daysArr);
		},
		setCalenderSlots(daysArr) {
			let events = [];
			let courses = this.courses;
			for (let j = 0; j < daysArr.length; j++) {
				let curDt = daysArr[j];
				for (let i = 0; i < courses.length; i++) {
					let sb = courses[i];
					let lec = sb.lectures.length > 0,
						tut = sb.tutorials.length > 0,
						lab = sb.labs.length > 0;
					if (lec) events.push(...this.setSlots(sb, curDt, 'lectures'));
					if (tut) events.push(...this.setSlots(sb, curDt, 'tutorials'));
					if (lab) events.push(...this.setSlots(sb, curDt, 'labs'));
				}
			}
			this.events = events;
		},
		setSlots(course, date, type) {
			let slots = [];
			let currSlot = course[type][0];
			let timings = currSlot.timings;
			let curDtCode = this.daysMapper[date.getDay()];
			let hasClass = timings.findIndex((it) => it.dayCode === curDtCode);
			if (hasClass >= 0) {
				let classHour = timings[hasClass].time;
				let [s, e] = classHour.split(' - ');
				let startEvent = `${date.toISOString().substr(0, 10)} ${s}`;
				let endEvent = `${date.toISOString().substr(0, 10)} ${e}`;

				let instructorsList = ``;
				currSlot.instructors.forEach(
					(it) => (instructorsList += `<li>${it}</li>`)
				);

				let evData = {
					start: startEvent,
					end: endEvent,
					color: this.colorsMapper[type],
					name: `${course.courseCode}`,
					title: `${course.courseName}`,
					details: `
						<h4>${this.typesMapper[type]} Section - ${currSlot.section}</h4>
						<h4>Instructor(s)</h4>
						<ul>
							${instructorsList}
						</ul>
						<h4>Comprehensive Exam: ${moment(course.comprehensiveExamDate).format(
							'Do MMM,  h:mm A'
						)}</h4>
						<h4>Course IC: ${course.IC}</h4>
					`,
				};
				slots.push(evData);
			}
			return slots;
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
