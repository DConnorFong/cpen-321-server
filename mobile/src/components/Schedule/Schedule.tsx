import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { genericStyles } from '../../styles/generic';
import { scheduleStyles } from '../../styles/schedule';

const endpoint = 'http://ec2-18-222-96-240.us-east-2.compute.amazonaws.com';

interface ScheduleProps {
    userID: String;
}

interface ScheduleState {
    courses: any[];
}
export default class Schedule extends Component<ScheduleProps, ScheduleState> {
    constructor(props: ScheduleProps) {
        super(props);
        this.state = { courses: this.tempCourses };
        this.renderCourses = this.renderCourses.bind(this);
        this.getCourses = this.getCourses.bind(this);
    }

    tempCourses = [];

    getCourses() {
        fetch(`${endpoint}/user/${this.props.userID}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) return response.json();
            })
            .then(response => {
                this.setState({ courses: response['courses'] });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <SafeAreaView style={genericStyles.container}>
                <View style={genericStyles.titleContainer}>
                    <Text style={genericStyles.title}>Schedule</Text>
                </View>
                <View style={scheduleStyles.scrollContainer}>
                    <ScrollView>{this.renderCourses()}</ScrollView>
                </View>
                <TouchableOpacity
                    onPress={this.getCourses}
                    style={genericStyles.button}
                >
                    <Text style={genericStyles.buttonText}>
                        Refresh Courses
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    renderCourses() {
        return this.state.courses.map(course => (
            <View style={scheduleStyles.courseContainer} key={course}>
                <Text style={scheduleStyles.courseText}>{course}</Text>
            </View>
        ));
    }
}
