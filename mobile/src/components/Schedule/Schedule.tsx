import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

const endpoint = "ec2-18-222-96-240.us-east-2.compute.amazonaws.com"

interface ScheduleProps {userID: String}

interface ScheduleState {courses: any[]; }
export default class Schedule extends Component<ScheduleProps, ScheduleState> {
    constructor(props: ScheduleProps) {
        super(props)
        this.state = {courses: this.tempCourses}
        this.renderCourses = this.renderCourses.bind(this);
    }

    tempCourses = [];

    getCourses() {
        console.log(this.props.userID)
        fetch(`${endpoint}/user/${this.props.userID}`, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
        }
        )
        .then(response => {
          if(response.ok) return response.json();
        })
        .then(response => {
          this.setState({courses: response["courses"]});
        })
    }

    render() {
          return(
              <View style={styles.container}>
                  <View style={styles.scrollContainer}>
                      <ScrollView>
                          {this.renderCourses()}
                      </ScrollView>
                  </View>
                  <View style={styles.buttonContainer}>
                      <TouchableOpacity onPress={this.getCourses}>
                          <View style={styles.button}>
                              <Text style={styles.buttonText}>Refresh Courses</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
              </View>
          );
    }

    renderCourses() {
      return this.state.courses.map(course => (
          <View style={styles.courseContainer}>
            <Text style={styles.courseText}>{course}</Text>
          </View>
      ));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        flex: 7,
    },
    courseContainer: {
        height: 50,
        margin: 7,
        backgroundColor: '#019898',
        alignItems: 'center',
        justifyContent: 'center',
    },
    courseText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonContainer: {
      backgroundColor: '#019898',
      margin: 10,
      height: 50,
      justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 19,
        color: 'white',
    }

});
